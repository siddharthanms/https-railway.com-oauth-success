import profile from "@/data/profile.json";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-8">
      <div className="container flex flex-col items-center justify-between gap-2 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p>Built with Next.js & Tailwind CSS.</p>
      </div>
    </footer>
  );
}
