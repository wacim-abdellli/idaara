# Rule 03: UI / UX & Design System Guidelines

Idaara.tn is designed with an enterprise-grade dark SaaS aesthetic inspired by **Linear**, **Raycast**, and **Vercel**. Every component must look mature, polished, and dignified.

---

## 1. Color Palette & Surfaces
- **Background Root:** `bg-[#090a0d]` (deep Obsidian black).
- **Cards & Surfaces:**
  - Base Card: `bg-zinc-950/80` or `bg-zinc-900/60` with `border border-zinc-850` or `border-zinc-800/80`.
  - Hover Card: `hover:border-zinc-700/80` with smooth transition (`transition-all duration-200`).
  - Active/Focused: subtle emerald rim `ring-1 ring-emerald-500/30`.
- **Primary Brand Accent (Emerald):**
  - Solid: `#00C07F` / `bg-emerald-500`
  - Hover: `hover:bg-emerald-400`
  - Text: `text-emerald-400`
  - Subtle Badges: `bg-emerald-500/10 border border-emerald-500/25 text-emerald-400`
  - Ambient Glow: `bg-emerald-500/10 blur-3xl rounded-full`
- **Text Hierarchy:**
  - Headings: `text-white font-bold tracking-tight`
  - Body: `text-zinc-300 font-normal leading-relaxed`
  - Subtitles & Meta: `text-xs text-zinc-400`
  - Dimmed / Footers: `text-[11px] text-zinc-500`

---

## 2. Mobile Ergonomics & Accessibility (Crucial)

1. **Tap Target Minimum (44px Rule):**
   - Every interactive button, pill, link, and toggle MUST have a touch target of at least **44 × 44 px** on mobile devices.
   - Use `min-h-[44px]` or `p-2.5` / `py-2.5 px-4` for clickable elements.
2. **Prevent iOS Safari Viewport Zoom:**
   - On iOS Safari, any input or textarea with font size below 16px causes the browser to forcefully zoom in on focus, ruining the layout.
   - ALWAYS use `text-base` (16px) on mobile inputs (`ChatInput.tsx`, search bars, textareas).
   - Use `sm:text-sm` or `sm:text-xs` only on screens >= 640px.
3. **Safe Area Insets (`pb-safe`):**
   - Any fixed bottom navigation dock or floating chat bar must use `.pb-safe` (defined in `globals.css` using `env(safe-area-inset-bottom)`) so it does not collide with the iPhone home indicator bar.
4. **Horizontal Overflow Prevention:**
   - The body and top-level page wrappers must enforce `overflow-x-hidden` to avoid horizontal scrollbars on mobile viewports.

---

## 3. Typography & Internationalization Layout
- **Arabic / Derja Font:** `Cairo` (variable font loaded via Next.js Google font in `src/app/layout.tsx`).
- **Latin / Technical Font:** `Space Grotesk`.
- **RTL Mirroring:**
  - For directional arrows (`ArrowRight`), always add `rtl:rotate-180`.
  - For sidebars and absolute close buttons:
    ```tsx
    className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'}`}
    ```
- **Monospace Usage:** Never display entire emails or user names in monospace in dialogs. Monospace is reserved strictly for legal decree numbers, hash codes, and technical keys.
