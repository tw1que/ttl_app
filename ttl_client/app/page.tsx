import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="min-h-dvh flex items-center justify-center p-6">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold">Next.js + shadcn/ui</h1>
        <p className="text-muted-foreground">Client migrated to Next on port 5173.</p>
        <div className="space-x-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </div>
    </main>
  );
}

