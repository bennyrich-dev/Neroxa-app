import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Search, PlaySquare, Home, Compass, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden dark">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-t-0 rounded-none bg-background/40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <PlaySquare className="w-8 h-8 text-primary group-hover:neon-glow transition-all" />
            <span className="text-2xl font-bold tracking-tighter neon-text">
              NEXORA
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/" current={location} icon={<Home className="w-4 h-4" />}>
              Home
            </NavLink>
            <NavLink href="/browse" current={location} icon={<Compass className="w-4 h-4" />}>
              Browse
            </NavLink>
            <NavLink href="/search" current={location} icon={<Search className="w-4 h-4" />}>
              Search
            </NavLink>
            <NavLink href="/watchlist" current={location} icon={<Bookmark className="w-4 h-4" />}>
              Watchlist
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 min-h-[calc(100vh-4rem)]">
        {children}
      </main>
      
      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-b-0 border-l-0 border-r-0 rounded-none h-16 flex items-center justify-around px-4">
        <MobileNavLink href="/" current={location} icon={<Home className="w-5 h-5" />} />
        <MobileNavLink href="/browse" current={location} icon={<Compass className="w-5 h-5" />} />
        <MobileNavLink href="/search" current={location} icon={<Search className="w-5 h-5" />} />
        <MobileNavLink href="/watchlist" current={location} icon={<Bookmark className="w-5 h-5" />} />
      </nav>
    </div>
  );
}

function NavLink({ href, current, children, icon }: { href: string; current: string; children: ReactNode; icon: ReactNode }) {
  const active = current === href || (href !== "/" && current.startsWith(href));
  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
        active ? "text-primary neon-text" : "text-muted-foreground"
      )}
    >
      {icon}
      {children}
    </Link>
  );
}

function MobileNavLink({ href, current, icon }: { href: string; current: string; icon: ReactNode }) {
  const active = current === href || (href !== "/" && current.startsWith(href));
  return (
    <Link 
      href={href} 
      className={cn(
        "flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all",
        active ? "text-primary bg-primary/10 neon-glow" : "text-muted-foreground"
      )}
    >
      {icon}
    </Link>
  );
}
