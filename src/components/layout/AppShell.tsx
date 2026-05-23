import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { Separator } from '@/components/ui/separator';

export default function AppShell() {
  const location = useLocation();

  if (location.pathname.startsWith('/track/')) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-normal text-muted-foreground">PoC interne</p>
            <h1 className="text-2xl font-semibold tracking-normal">Générateur de suivi colis</h1>
          </div>
          <nav className="flex items-center gap-3 text-sm font-medium">
            <NavLink className={({ isActive }) => (isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground')} to="/generator">
              Générateur
            </NavLink>
          </nav>
        </header>
        <Separator />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
