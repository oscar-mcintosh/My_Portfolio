# Portfolio Redesign — Working Summary

Reference notes for the portfolio (Works) section redesign. Source specs live in this folder:

- `PORTFOLIO-ARCHITECTURE.md` — the full architecture and engineering standards (summarised below).
- `Premium Portfolio Works Section Redesign.md` — **empty on disk (0 bytes) as of 2026-10-21**. Re-check it and fold in its requirements once it has content.

**Current scope:** only the portfolio gallery section on the home page. Home hero, About, Contact, the project detail page (`pages/projects/[id].vue`), and a standalone `/works` route are out of scope for now.

---

## 1. Spec digest (from PORTFOLIO-ARCHITECTURE.md)

**Mission:** a fast, accessible portfolio that treats Data Analytics and Web Development as equal disciplines. Design reference: visuvate.com/works (editorial hierarchy, categories, image-led previews). Build an original version; never copy their imagery, branding, content, or code.

**Principles**
1. Show evidence before claims; never invent outcomes, metrics, or testimonials.
2. Analytics projects get the same visual care as web projects.
3. Clarity, performance, and usability come before effects.
4. Adding a project must not require component changes.

**Stack rules**
- Keep the existing stack (Nuxt 3, Vue 3, JS, Pinia, Firestore, GSAP). No framework migration, no CMS, no Tailwind or Bootstrap, and no new dependencies without a concrete need.
- Use local state for filtering. Pinia isn't needed for an isolated gallery.
- Custom CSS with design tokens. Grid for galleries, Flexbox for 1-D layout. No `!important`, and no inline styles for static design.

**Data contract (target)**: `slug, title, discipline ('data-analytics' | 'web-development'), category, summary, year, coverImage, coverAlt, technologies[], featured?, demoUrl?, repositoryUrl?, sections[]`. Filters and counts are derived from the data. Slugs are stable and unique. Links are validated, and no unsanitized HTML is stored.

**Case-study templates**
- *Data Analytics*: problem and stakeholders → dataset origin, scope and limits → tools → cleaning and validation → methods and assumptions → charts with accessible descriptions → insights and recommendations → verified or clearly labelled potential impact → repo and reproducibility notes. Never expose confidential data.
- *Web Development*: problem and goals → audience and constraints → UX/UI decisions → architecture → integrations and APIs → responsive screenshots → a11y, performance and SEO → results, trade-offs and lessons → demo and repo.

**Visual system:** editorial type, generous whitespace, image-led gallery with restrained metadata, and a filter bar with a clear active state and counts. Reserve aspect ratios to prevent layout shift. Hover and focus states must never hide information. Avoid boxed cards, heavy shadows, glass effects, and distracting motion. Mobile-first, with no horizontal overflow and comfortable touch targets.

**Engineering musts**
- One responsibility per component. Content, filter logic, and presentation stay separate. Components talk through props and emits.
- Keys come from stable ids, never the array index.
- Sorting, filtering, and formatting use pure functions. Prefer derived computed values to duplicated state.
- Handle missing data, bad links, and async errors explicitly. Clean up listeners and GSAP contexts.
- Target WCAG 2.2 AA: semantic landmarks and headings; filters are keyboard-operable buttons (not fake tabs); visible focus; `prefers-reduced-motion` is respected; nothing is conveyed by colour or hover alone.
- Performance: lazy-load below-the-fold images, load the first visible images eagerly, and reserve image dimensions.
- GSAP only for meaningful motion, scoped to the component and reverted on unmount. Nothing may depend on an animation finishing.

**Acceptance criteria:** all three filters work without a reload · counts match the data · every card links to a valid case-study route · deep links and back/forward work · missing images, optional links, and empty states are handled · no duplicate cards or unstable keys · mobile and keyboard work · reduced motion works · build passes · unit tests cover filtering, sorting, slug resolution, and validation · a11y and performance checks report real results only.

**Agent procedure:** inspect → plan → make small coherent changes → reuse existing code → run tests and build → review responsive, keyboard, and motion behaviour → report honestly. Don't delete working functionality, change the stack, or invent content.

---

## 2. What was implemented (2026-10-21)

### New files
| File | Role |
|---|---|
| `utils/project-utils.js` | Pure helpers: `DISCIPLINES`, `normalizeDiscipline`, `getProjectDiscipline`, `filterProjectsByDiscipline`, `countProjectsByDiscipline`, `dedupeProjectsById`, `getProjectTechnologies`, `getProjectPath`, `isSafeExternalUrl`. No Vue/Nuxt imports, so it can be unit tested with plain Node. |
| `composables/useProjectFilters.js` | Reads the active filter from `?discipline=` in the URL, derives the filter list, counts, and filtered projects, and exposes `setDiscipline()` (uses `router.push`, so deep links and back/forward work). |
| `components/portfolio/PortfolioGallery.vue` | The section: header, loading, error-with-retry, empty, and empty-category states, an `aria-live` result count, and the responsive grid (`TransitionGroup`, enter-only fade). |
| `components/portfolio/PortfolioFilters.vue` | `<nav>` holding `<button aria-pressed>` filters with zero-padded counts. Emits `change`. |
| `components/portfolio/ProjectCard.vue` | Auto-imported as `<PortfolioProjectCard>`. 4:3 image with `object-fit: cover`, a plain tinted placeholder when the image is missing or fails, a "View case study →" label over the image area on hover or keyboard focus, discipline eyebrow, title link stretched over the whole card, summary, and up to 4 technologies. Eager loading for the first 2 cards, lazy for the rest. |
| `tests/project-utils.test.js` | 8 `node:test` tests. Run with `npm test`. |

### Edited files
- `pages/index.vue`: the old `<ProjectFilter />` section is replaced by `<PortfolioGallery />`. Removed the duplicate client fetch and the unused store import; the gallery now owns loading.
- `stores/projectStore.js`: also maps `imageAlt` and `discipline` from Firestore documents.
- `assets/css/main.css`: added spacing, radius, and motion tokens (`--space-*`, `--radius-*`, `--ease-out`, `--duration-*`) and a global `.visually-hidden` utility.
- `package.json`: added `"test": "node --test \"tests/**/*.test.js\""`.

### Key decisions
- **Content source stays Firestore**, loaded on the client through the existing Pinia store. The spec says to adapt to the existing source, so there was no migration to local content.
- **Discipline mapping:** an explicit Firestore `discipline` field wins. Otherwise it is inferred from `category` keywords: data/analy/sql/python/snowflake/tableau/power bi/excel/dashboard → Data Analytics; web/front/vue/nuxt/wordpress/webflow/shopify/javascript → Web Development. Projects that match neither appear only under All.
- **Every card links internally** to `/projects/{id}`. The old `ProjectFilter` sent SQL and Python projects straight to their external `link`; that link is still shown on the detail page.
- **Filter state lives in the URL** (`/?discipline=web-development#portfolio`). Changing a filter pushes a history entry and scrolls to `#portfolio`, which has `scroll-margin-top` to clear the fixed header.
- **No GSAP in the gallery.** CSS transitions only, all disabled under `prefers-reduced-motion`.
- **Grid:** the layout is fluid (`auto-fill`, 20rem minimum), giving 1–2 columns below 1024px and exactly 3 columns at 1024px and up, with a tighter column gap there.
- **Card hover (added at the user's request):** a light 1px border (`--card-border`, 14% of `--title-color`). On hover the image blurs (4px, scale 1.06) and two comet lines chase each other around the border. The lines are a rotating `conic-gradient` on `.work-card::before`, masked down to a ring and animated through the registered `@property --chase-angle`. Under reduced motion the chase is replaced by a solid border highlight.
- Colours reuse the existing theme tokens (`--title-color`, `--text-color`, `--container-color`, `--body-color`), so dark mode works. `--text-color-light` is avoided for text because it fails AA contrast on the light background.

### Checks run
- `npm test`: 8/8 pass.
- `nuxt generate`: succeeds. The prerendered `index.html` contains the new section (in its loading state, because data is fetched on the client). Remaining build warnings are pre-existing (`style.css` background images, chunk size, Node deprecations).
- **Not yet verified in a browser:** live Firestore data, visual layout, keyboard pass, dark mode, reduced motion, Lighthouse.

### Optional Firestore fields now supported
- `discipline`: `"data-analytics"` or `"web-development"`. Recommended on every project so the filters don't rely on keyword guessing.
- `imageAlt`: meaningful alt text for the cover image. Falls back to "<name> project preview".

---

## 3. Open items / next steps
1. Fill in `Premium Portfolio Works Section Redesign.md` and reconcile it with this implementation.
2. Browser QA: mobile, tablet, desktop, long titles, empty categories, very large or tall images, keyboard-only use, dark mode, reduced motion.
3. `components/ProjectFilter.vue` is now unused. Delete it once the new gallery is confirmed (it had uncommitted edits, so it was left in place).
4. Add `discipline` and `imageAlt` to each Firestore project document.
5. Later phases (out of current scope): a `/works` route; restructuring the detail page around the case-study templates; moving the project data model toward the full contract (`year`, `sections[]`, `featured`, etc.); making project content crawlable at build time instead of fetching it on the client.
