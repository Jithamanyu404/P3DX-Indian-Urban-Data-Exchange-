# Meridian — Global Data Gateway Console

A premium, enterprise-grade SaaS interface for managing cross-border data
jurisdictions ("worlds"), institutions, agents, secure storage lockers,
gateways, consent workflows, and transactions — built as a portfolio-quality
frontend with no backend, powered entirely by local mock JSON data.

Design direction: Linear's precision, Stripe's data density, Apple's restraint.
Dark charcoal canvas, electric blue + violet gradients, glassmorphic cards,
20px radii, generous spacing, and purposeful Framer Motion throughout.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (CSS-first `@theme` design tokens, no config file needed)
- Framer Motion — page transitions, shared layout animation, micro-interactions
- React Router v7 — routing, nested layout, breadcrumbs
- React Flow — interactive World Explorer graph
- Recharts — dashboard and transaction charts
- Lucide React — icon system

## Getting started

```bash
npm install
npm run dev      # start local dev server
npm run build    # type-check + production build
```

## Folder structure (feature-based)

```
src/
  components/
    ui/          reusable primitives — Button, Card, Modal, Drawer, Table,
                  SearchBar, Badge, Skeleton, EmptyState, ErrorState
    layout/      Sidebar, Navbar, Breadcrumbs, CommandPalette, MobileNav
    dashboard/   dashboard-only widgets (stat cards, charts, timeline...)
    world/       World Explorer custom React Flow node
    shared/      cross-page components (AnimatedCounter, PageLoader)
  layouts/       AppLayout — sidebar + navbar + animated route outlet
  pages/         one file per route
  hooks/         useInfiniteScroll, etc.
  types/         shared domain types (World, Agent, Locker, Gateway...)
  data/          deterministic mock data generators (no backend)
  context/       CommandPaletteContext (Cmd+K global state)
  utils/         cn() class merger, formatters
  animations/    PageTransition wrapper
```

## Pages

- **Dashboard** — welcome header, animated stat counters, network activity
  chart, world overview map, gateway health, recent transactions, pending
  approvals, live timeline, quick actions, activity heatmap.
- **World Explorer** (`/worlds`) — interactive React Flow graph of the
  network hub -> jurisdictions -> institutions -> gateways, with search,
  region filters, minimap, zoom, and a detail drawer.
- **World Detail** (`/worlds/:id`) — per-jurisdiction stats, trend chart,
  gateway list, agent roster, and policy summary.
- **Agents** (`/agents`) — searchable, sortable directory with infinite
  scroll and a profile drawer.
- **Lockers** (`/lockers`) — storage cards with usage bars, security tier,
  publish/consent status.
- **Gateways** (`/gateways`) — live-feeling packet-flow visualization,
  latency/throughput/uptime, recent requests.
- **Consent** (`/consent`) — Requested -> Pending -> Approved -> Connected ->
  Expired workflow stepper with an approve/reject/revoke confirmation modal.
- **Transactions** (`/transactions`) — filterable, paginated table with a
  volume chart and a transaction detail drawer.

## Notes

- All data lives in `src/data/` and is generated deterministically so the
  UI is stable across reloads.
- Command palette: Cmd+K / Ctrl+K anywhere in the app.
- Dark mode is the only mode, by design — it's core to the visual identity.
- Respects `prefers-reduced-motion`.
