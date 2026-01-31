# Agent Instructions for Link Shortener Project

This document serves as the master guide for AI assistants working on this project. All agents must follow these instructions to maintain consistency, code quality, and project standards.

## ⚠️ CRITICAL: READ DOCUMENTATION FIRST ⚠️

**BEFORE writing ANY code, you MUST:**

1. **Read the relevant documentation file(s) in `/docs`** for the feature you're implementing
2. **Understand the established patterns** in those documents
3. **Follow the guidelines exactly** as specified

**Failure to read documentation BEFORE coding will result in incorrect implementations that don't follow project standards.**

### Available Documentation:

- 🔐 **[Authentication](docs/authentication.md)** - MUST read before any auth-related code
- 🎨 **[shadcn/ui Components](docs/shadcn-ui.md)** - MUST read before creating any UI components

**DO NOT skip this step. DO NOT assume you know the patterns. ALWAYS read first.**

## Project Overview

This is a **Link Shortener** application built with modern web technologies:

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Clerk
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Deployment**: Vercel-ready

## Quick Reference

| Aspect          | Standard                   |
| --------------- | -------------------------- |
| Node Version    | 20+                        |
| Package Manager | npm                        |
| Code Style      | ESLint + TypeScript strict |
| Import Aliases  | `@/*` for root imports     |
| Database        | PostgreSQL (Neon)          |
| ORM             | Drizzle                    |
| UI Components   | shadcn/ui (required)       |

## Document Structure

**🚨 MANDATORY READING BEFORE CODING 🚨**

The `/docs` directory contains detailed guidelines that you **MUST READ** before generating any related code:

### Authentication Work

**READ FIRST:** [docs/authentication.md](docs/authentication.md)

- Clerk setup and configuration
- Modal vs redirect modes
- Server-side auth patterns
- Protected routes implementation
- User data access patterns

**❌ DO NOT write auth code without reading this file first!**

### UI Components Work

**READ FIRST:** [docs/shadcn-ui.md](docs/shadcn-ui.md)

- shadcn/ui component usage
- Available components and variants
- Button, Form, Card, Dialog patterns
- Component customization rules

**❌ DO NOT create UI components without reading this file first!**

---

**WORKFLOW RULE:** When you receive a task:

1. Identify which documentation file(s) are relevant
2. Read the ENTIRE relevant documentation file(s)
3. Understand the patterns and requirements
4. ONLY THEN start writing code

**No exceptions. No shortcuts. Read the docs first.**

## Core Principles

### 1. Type Safety First

- Use TypeScript's strict mode at all times
- Avoid `any` types - use `unknown` or proper typing
- Leverage Drizzle's type inference for database operations
- Export and reuse types from schema definitions

### 2. Server-First Approach

- Prefer Server Components by default
- Use Client Components (`'use client'`) only when necessary:
  - Interactive elements (forms, buttons with handlers)
  - Browser APIs (localStorage, window, document)
  - React hooks (useState, useEffect, etc.)
  - Third-party libraries requiring client-side rendering

### 3. Performance & SEO

- Implement proper metadata in every page/layout
- Use Next.js Image component for all images
- Lazy load heavy components when appropriate
- Implement proper loading states

### 4. Security & Privacy

- **Use Clerk exclusively for authentication** - NO other auth methods allowed
- Sign in/sign up must always use modal mode
- Redirect authenticated users from homepage to `/dashboard`
- All database operations must validate user permissions
- Use Clerk's `auth()` helper for server-side authentication
- Never expose sensitive data in client components
- Sanitize user inputs before database operations

### 5. Code Organization

```
app/                 # Next.js app router pages
  ├── (auth)/       # Auth-protected routes
  ├── api/          # API routes
  └── ...           # Public routes
components/         # Shared React components
  ├── ui/           # Base UI components
  └── features/     # Feature-specific components
db/                 # Database configuration
  ├── schema.ts     # Drizzle schema definitions
  └── index.ts      # Database client
lib/                # Utility functions and helpers
types/              # Shared TypeScript types
```

## Development Workflow

### Before Starting Any Task

1. **🚨 READ RELEVANT DOCUMENTATION FROM `/docs` FIRST** - This is NOT optional
   - Authentication work? → Read `docs/authentication.md` completely
   - UI components? → Read `docs/shadcn-ui.md` completely
   - Database work? → Read any relevant database documentation
2. **Understand the existing code patterns** from the documentation
3. **Check for similar implementations** in the codebase that follow those patterns
4. **Ensure you have the full context** of related files
5. **ONLY THEN** start writing code

**⚠️ WARNING:** Skipping step 1 will result in code that doesn't follow project standards and will need to be rewritten.

### When Implementing Features

1. Start with database schema if needed
2. Create types based on schema
3. Implement server-side logic (API routes/Server Actions)
4. Build UI components
5. Add client-side interactivity if needed
6. Test thoroughly

### When Modifying Existing Code

1. Maintain consistency with existing patterns
2. Update related documentation if needed
3. Check for breaking changes in dependent code
4. Preserve backward compatibility when possible

## Common Patterns

### Database Queries

```typescript
// Use Drizzle's query builder with proper typing
import { db } from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

const link = await db.query.links.findFirst({
  where: eq(links.shortCode, code),
});
```

### Authentication

```typescript
// Server Components/API Routes
import { auth } from "@clerk/nextjs/server";

const { userId } = await auth();
if (!userId) {
  // Handle unauthorized access
}
```

### Error Handling

```typescript
// Use proper error types and messages
try {
  // Operation
} catch (error) {
  console.error("Context-specific error message:", error);
  // Return appropriate error response
}
```

## What NOT to Do

❌ Don't use `any` type  
❌ Don't bypass type checking with `@ts-ignore`  
❌ Don't create Client Components unnecessarily  
❌ Don't expose sensitive data to the client  
❌ Don't skip error handling  
❌ Don't hardcode configuration values  
❌ Don't ignore ESLint warnings  
❌ Don't create inline styles (use Tailwind)  
❌ Don't forget to handle loading and error states

## Questions to Ask Before Implementing

1. Does this need to be a Client Component?
2. Is this data properly typed?
3. Are user permissions validated?
4. Is this following existing patterns?
5. Will this scale with more users/data?
6. Is error handling comprehensive?
7. Are edge cases considered?

## Getting Help

When uncertain about implementation:

1. Search the codebase for similar patterns
2. Consult the specific guide in `/docs`
3. Check Next.js and Drizzle documentation
4. Ask for clarification with specific context

## Version Control

- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Reference issues/tickets when applicable

---

**Remember**: Consistency is key. When in doubt, follow existing patterns in the codebase.
