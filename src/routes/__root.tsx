import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import { FloatingNav } from "@/components/FloatingNav";
import { SiteFooter } from "@/components/SiteFooter";
import { AvatarGuide } from "@/components/AvatarGuide";


import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Lost in space</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for has drifted out of orbit.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[color:var(--neon)] to-[color:var(--neon-2)] px-5 py-2.5 text-sm font-semibold text-background shadow-[var(--shadow-neon)]"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rehan Shaikh — Developer Portfolio" },
      { name: "description", content: "Immersive 3D portfolio of Rehan Shaikh — full-stack, DevOps and cloud engineer." },
      { name: "author", content: "Rehan Shaikh" },
      { property: "og:title", content: "Rehan Shaikh — Developer Portfolio" },
      { property: "og:description", content: "Immersive 3D portfolio of Rehan Shaikh — full-stack, DevOps and cloud engineer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div aria-hidden className="grid-bg pointer-events-none fixed inset-0 z-0 opacity-30" />
      <FloatingNav />
      <Outlet />
      <SiteFooter />
      <AvatarGuide />
    </div>
  );
}
