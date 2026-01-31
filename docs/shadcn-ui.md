# shadcn/ui Component Guidelines

## Core Rule

**ALL UI components in this app MUST use shadcn/ui. DO NOT create custom components when shadcn/ui alternatives exist.**

## Installation

### Initial Setup

```bash
npx shadcn@latest init
```

### Adding Components

```bash
# Add individual components
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
npx shadcn@latest add dialog

# Add multiple at once
npx shadcn@latest add button input card dialog form
```

## Component Location

All shadcn/ui components are installed in:

```
components/ui/
├── button.tsx
├── input.tsx
├── card.tsx
├── dialog.tsx
└── ...
```

## Usage Patterns

### Buttons

```typescript
// ✅ DO - Use shadcn Button
import { Button } from '@/components/ui/button';

export function ActionButtons() {
  return (
    <div className="flex gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}

// ❌ DON'T - Create custom button component
export function CustomButton() {
  return <button className="px-4 py-2 bg-blue-600">Click</button>;
}
```

### Forms

```typescript
// ✅ DO - Use shadcn Form components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export function LinkForm() {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormDescription>Enter the URL to shorten</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Shorten URL</Button>
      </form>
    </Form>
  );
}

// ❌ DON'T - Create custom form components
export function CustomForm() {
  return (
    <form>
      <div className="mb-4">
        <label className="block mb-2">URL</label>
        <input className="border px-3 py-2" />
      </div>
    </form>
  );
}
```

### Cards

```typescript
// ✅ DO - Use shadcn Card
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function LinkCard({ link }: { link: Link }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{link.title}</CardTitle>
        <CardDescription>{link.shortCode}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{link.url}</p>
        <p className="text-sm font-medium">{link.clicks} clicks</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">View Details</Button>
      </CardFooter>
    </Card>
  );
}
```

### Dialogs/Modals

```typescript
// ✅ DO - Use shadcn Dialog
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function DeleteLinkDialog({ linkId }: { linkId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your link.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Data Tables

```typescript
// ✅ DO - Use shadcn Table
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function LinksTable({ links }: { links: Link[] }) {
  return (
    <Table>
      <TableCaption>A list of your shortened links</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Short Code</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Clicks</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {links.map((link) => (
          <TableRow key={link.id}>
            <TableCell className="font-medium">{link.shortCode}</TableCell>
            <TableCell>{link.url}</TableCell>
            <TableCell>{link.clicks}</TableCell>
            <TableCell>{formatDate(link.createdAt)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Dropdowns

```typescript
// ✅ DO - Use shadcn DropdownMenu
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function LinkActions({ link }: { link: Link }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Copy Link</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Alerts & Toasts

```typescript
// ✅ DO - Use shadcn Alert
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

export function InfoAlert() {
  return (
    <Alert>
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Info</AlertTitle>
      <AlertDescription>Your link has been created successfully.</AlertDescription>
    </Alert>
  );
}

// ✅ DO - Use shadcn Toast
import { useToast } from '@/hooks/use-toast';

export function useDeleteLink() {
  const { toast } = useToast();

  async function deleteLink(id: string) {
    try {
      await fetch(`/api/links/${id}`, { method: 'DELETE' });
      toast({
        title: 'Success',
        description: 'Link deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete link',
        variant: 'destructive',
      });
    }
  }

  return { deleteLink };
}
```

### Badges

```typescript
// ✅ DO - Use shadcn Badge
import { Badge } from '@/components/ui/badge';

export function LinkStatus({ isActive }: { isActive: boolean }) {
  return (
    <Badge variant={isActive ? 'default' : 'secondary'}>
      {isActive ? 'Active' : 'Inactive'}
    </Badge>
  );
}
```

### Skeleton Loaders

```typescript
// ✅ DO - Use shadcn Skeleton
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function LinkCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-1/4" />
      </CardContent>
    </Card>
  );
}
```

### Separators

```typescript
// ✅ DO - Use shadcn Separator
import { Separator } from '@/components/ui/separator';

export function Section() {
  return (
    <div>
      <h2>Links</h2>
      <Separator className="my-4" />
      <div>Content</div>
    </div>
  );
}
```

## Available Components

Common shadcn/ui components to use:

- **Layout**: `Card`, `Separator`, `Tabs`, `Accordion`
- **Forms**: `Form`, `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `Label`
- **Buttons**: `Button`, `Toggle`, `ToggleGroup`
- **Overlays**: `Dialog`, `Sheet`, `Popover`, `Tooltip`, `DropdownMenu`
- **Feedback**: `Alert`, `Toast`, `Progress`, `Skeleton`
- **Data**: `Table`, `Badge`, `Avatar`, `Calendar`
- **Navigation**: `NavigationMenu`, `Menubar`, `ContextMenu`

## Component Variants

### Button Variants

```typescript
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Button Sizes

```typescript
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

### Alert Variants

```typescript
<Alert variant="default">Default</Alert>
<Alert variant="destructive">Destructive</Alert>
```

### Badge Variants

```typescript
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
```

## Customization

### Theming

shadcn/ui uses CSS variables defined in `app/globals.css`:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    /* ... more variables */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... more variables */
  }
}
```

### Extending Components

```typescript
// ✅ DO - Extend shadcn components with additional props
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  loading?: boolean;
}

export function LoadingButton({ loading, children, ...props }: LoadingButtonProps) {
  return (
    <Button disabled={loading} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}

// ❌ DON'T - Create entirely new button component
export function CustomLoadingButton() {
  return <button className="...">...</button>;
}
```

## Icons

Use Lucide React icons with shadcn/ui:

```typescript
import { Trash2, Copy, ExternalLink, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Actions() {
  return (
    <div className="flex gap-2">
      <Button size="icon" variant="ghost">
        <Copy className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <ExternalLink className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="destructive">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
```

## Form Validation

Use shadcn/ui forms with React Hook Form and Zod:

```typescript
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL' }),
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
});

export function LinkForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: '', title: '' },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

## Common Mistakes

❌ **DON'T** create custom styled buttons  
❌ **DON'T** build custom form components  
❌ **DON'T** create custom card components  
❌ **DON'T** implement custom modal/dialog logic  
❌ **DON'T** build custom dropdown menus  
❌ **DON'T** create custom loading skeletons

✅ **DO** use shadcn/ui Button component  
✅ **DO** use shadcn/ui Form components  
✅ **DO** use shadcn/ui Card component  
✅ **DO** use shadcn/ui Dialog component  
✅ **DO** use shadcn/ui DropdownMenu component  
✅ **DO** use shadcn/ui Skeleton component

## When You Need Something Custom

If shadcn/ui doesn't have a component you need:

1. **Check if it exists** - Review the [full component list](https://ui.shadcn.com/docs/components)
2. **Compose existing components** - Combine shadcn components to achieve the desired result
3. **Extend shadcn components** - Add props/logic to existing components
4. **Only as last resort** - Create a truly custom component if absolutely necessary

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [shadcn/ui Examples](https://ui.shadcn.com/examples)
- [Lucide Icons](https://lucide.dev)
