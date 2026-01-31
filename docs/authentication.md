# Authentication Guidelines

## Authentication Provider

**This app uses Clerk exclusively for authentication. DO NOT implement any other authentication methods.**

## Core Rules

1. ✅ **Use Clerk only** - All authentication must go through Clerk
2. ✅ **Modal authentication** - Sign in and sign up must always launch as modals
3. ✅ **Protected routes** - `/dashboard` requires authentication
4. ✅ **Smart redirects** - Logged-in users accessing homepage should redirect to `/dashboard`

## Setup

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

### Root Layout

```typescript
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

## Authentication UI

### Modal Sign In/Sign Up

Always use modal mode for authentication:

```typescript
// components/Header.tsx
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export function Header() {
  return (
    <header>
      <SignedOut>
        <SignInButton mode="modal">
          <button>Sign In</button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button>Sign Up</button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
```

### User Button

Use Clerk's built-in UserButton component:

```typescript
import { UserButton } from '@clerk/nextjs';

<UserButton
  afterSignOutUrl="/"
  appearance={{
    elements: {
      avatarBox: "w-10 h-10"
    }
  }}
/>
```

## Protected Routes

### Dashboard (Protected)

```typescript
// app/dashboard/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/');
  }

  // User is authenticated
  return <DashboardContent />;
}
```

### Using Middleware (Alternative)

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

## Homepage Redirect

Redirect logged-in users from homepage to dashboard:

```typescript
// app/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = await auth();

  // Redirect authenticated users to dashboard
  if (userId) {
    redirect('/dashboard');
  }

  // Show landing page for unauthenticated users
  return <LandingPage />;
}
```

## Server Components

### Checking Authentication

```typescript
import { auth } from '@clerk/nextjs/server';

export default async function ServerComponent() {
  const { userId } = await auth();

  if (!userId) {
    return <div>Please sign in</div>;
  }

  return <div>Welcome, user {userId}</div>;
}
```

### Getting User Data

```typescript
import { currentUser } from '@clerk/nextjs/server';

export default async function UserProfile() {
  const user = await currentUser();

  if (!user) return null;

  return (
    <div>
      <p>{user.firstName} {user.lastName}</p>
      <p>{user.emailAddresses[0].emailAddress}</p>
    </div>
  );
}
```

## Client Components

### Using Auth Hooks

```typescript
'use client';

import { useAuth, useUser } from '@clerk/nextjs';

export function ClientComponent() {
  const { isLoaded, userId, sessionId } = useAuth();
  const { isLoaded: userLoaded, user } = useUser();

  if (!isLoaded || !userLoaded) {
    return <div>Loading...</div>;
  }

  if (!userId) {
    return <div>Not signed in</div>;
  }

  return <div>Hello, {user?.firstName}!</div>;
}
```

## API Routes

### Protecting API Routes

```typescript
// app/api/links/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch user's data
  const links = await db.query.links.findMany({
    where: eq(links.userId, userId),
  });

  return NextResponse.json(links);
}
```

### Using getAuth() in API Routes

```typescript
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Continue with authenticated logic
}
```

## Database Integration

### Storing User IDs

Always store Clerk's userId in your database:

```typescript
// db/schema.ts
export const links = pgTable("links", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(), // Clerk user ID
  url: text("url").notNull(),
  // ...
});
```

### Querying User Data

Always filter by userId:

```typescript
// ✅ DO - Filter by authenticated user
const links = await db.query.links.findMany({
  where: eq(links.userId, userId),
});

// ❌ DON'T - Fetch all data without filtering
const links = await db.query.links.findMany();
```

## Webhooks

### Syncing User Data

```typescript
// app/api/webhooks/clerk/route.ts
import { Webhook } from "svix";
import { headers } from "next/headers";

export async function POST(request: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error("CLERK_WEBHOOK_SECRET is not set");
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing svix headers", { status: 400 });
  }

  const payload = await request.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(webhookSecret);

  let evt;
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as any;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error: Invalid signature", { status: 400 });
  }

  const { id, ...attributes } = evt.data;
  const eventType = evt.type;

  // Handle events
  if (eventType === "user.created") {
    // Create user record in your database
  }

  if (eventType === "user.updated") {
    // Update user record
  }

  if (eventType === "user.deleted") {
    // Handle user deletion
  }

  return new Response("Webhook processed", { status: 200 });
}
```

## Customization

### Appearance

```typescript
// app/layout.tsx
<ClerkProvider
  appearance={{
    variables: {
      colorPrimary: '#2563eb',
      colorBackground: '#ffffff',
    },
    elements: {
      formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
      card: 'shadow-xl',
    },
  }}
>
```

### Localization

```typescript
<ClerkProvider localization={{
  signIn: {
    start: {
      title: 'Sign in to your account',
      subtitle: 'Welcome back!',
    },
  },
}}>
```

## Common Patterns

### Conditional Rendering

```typescript
import { SignedIn, SignedOut } from '@clerk/nextjs';

export function Navigation() {
  return (
    <nav>
      <SignedOut>
        <Link href="/">Home</Link>
      </SignedOut>

      <SignedIn>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/links">My Links</Link>
      </SignedIn>
    </nav>
  );
}
```

### Organization Support (Future)

```typescript
import { useOrganization } from '@clerk/nextjs';

export function OrgSwitcher() {
  const { organization } = useOrganization();

  return <div>{organization?.name}</div>;
}
```

## Security Checklist

- [ ] All protected routes check `userId`
- [ ] API routes verify authentication
- [ ] Database queries filter by `userId`
- [ ] Sign in/sign up use modal mode
- [ ] Homepage redirects authenticated users
- [ ] Environment variables are set
- [ ] Webhooks use signature verification
- [ ] No custom auth implementation

## Common Mistakes

❌ **DON'T** implement custom authentication  
❌ **DON'T** use redirect mode for sign in/sign up  
❌ **DON'T** show landing page to authenticated users  
❌ **DON'T** skip userId checks in API routes  
❌ **DON'T** expose user data without authentication

✅ **DO** use Clerk exclusively  
✅ **DO** use modal mode for auth  
✅ **DO** redirect logged-in users from homepage  
✅ **DO** protect all sensitive routes  
✅ **DO** filter database queries by userId

## Resources

- [Clerk Next.js Quickstart](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Components](https://clerk.com/docs/components/overview)
- [Clerk API Reference](https://clerk.com/docs/references/nextjs/overview)
