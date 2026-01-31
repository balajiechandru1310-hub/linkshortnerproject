import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Link2,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Lock,
} from "lucide-react";

export default async function Home() {
  const { userId } = await auth();

  // Redirect authenticated users to dashboard
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center gap-8 py-24 md:py-32">
        <Badge variant="secondary">Fast & Secure Link Shortening</Badge>
        <h1 className="max-w-4xl text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Shorten Links.
          <br />
          <span className="text-primary">Track Performance.</span>
        </h1>
        <p className="max-w-2xl text-center text-lg text-muted-foreground md:text-xl">
          Create short, memorable links in seconds. Track clicks, analyze
          traffic, and manage all your links from one powerful dashboard.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <SignUpButton mode="modal">
            <Button size="lg">Get Started Free</Button>
          </SignUpButton>
          <Button variant="outline" size="lg" asChild>
            <a href="#features">Learn More</a>
          </Button>
        </div>
      </section>

      <Separator />

      {/* Features Section */}
      <section id="features" className="container py-24 md:py-32">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <Badge variant="outline">Features</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything you need to manage links
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Powerful features designed to make link management effortless and
            efficient.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Link2 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Instant Shortening</CardTitle>
              <CardDescription>
                Create shortened links in milliseconds with our blazing-fast
                infrastructure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Custom short codes</li>
                <li>• Bulk link creation</li>
                <li>• QR code generation</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>
                Track every click with detailed analytics and real-time
                statistics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Click tracking</li>
                <li>• Geographic insights</li>
                <li>• Referrer analysis</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Secure & Reliable</CardTitle>
              <CardDescription>
                Enterprise-grade security with 99.9% uptime guarantee.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Encrypted connections</li>
                <li>• Spam protection</li>
                <li>• Regular backups</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Optimized for speed with global CDN and edge network.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Instant redirects</li>
                <li>• Global edge network</li>
                <li>• Minimal latency</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Custom Domains</CardTitle>
              <CardDescription>
                Use your own domain for branded short links.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Custom domain support</li>
                <li>• SSL certificates</li>
                <li>• Brand consistency</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Lock className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Privacy First</CardTitle>
              <CardDescription>
                Your data is private and secure. We never sell your
                information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• GDPR compliant</li>
                <li>• Data encryption</li>
                <li>• Anonymous tracking</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* CTA Section */}
      <section className="container py-24 md:py-32">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Ready to get started?
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Join thousands of users who trust us with their link management.
            Start shortening links today.
          </p>
          <SignUpButton mode="modal">
            <Button size="lg">Create Your Free Account</Button>
          </SignUpButton>
        </div>
      </section>
    </div>
  );
}
