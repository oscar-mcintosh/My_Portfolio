Portfolio Application — Architecture & Engineering Standards
Status: Foundational specification
Purpose: Personal portfolio for Data Analytics and Web Development
Design reference: https://visuvate.com/works

1. Product mission
   Build a polished, fast, accessible portfolio that presents Data Analytics and Web Development as equally important professional disciplines. The site should demonstrate analytical thinking, engineering ability, design judgment, and measurable work through authentic project case studies.
   Audience

- Hiring managers and recruiters evaluating analytics or development work
- Clients seeking websites, applications, dashboards, or automation
- Technical collaborators reviewing methods, architecture, and source code
  Product principles

1. Show evidence of work before making claims.
2. Treat analytical projects with the same visual care as web projects.
3. Favor clarity, performance, and usability over visual effects.
4. Make projects easy to add without rewriting components.
5. Do not invent outcomes, client testimonials, or metrics.
6. Information architecture

- Home: Concise introduction, selected projects, skills, contact CTA.
- Works / Portfolio: All Projects, Data Analytics, Web Development filters; counts derived from data.
- Project details: Dedicated, shareable case-study route per project.
- About: Background, methods, skills, and experience.
- Contact: Accessible contact options and relevant professional links.
  The gallery is inspired by the editorial hierarchy, categories, project previews, and project detail navigation at Visuvate's Works page. Build an original implementation; do not copy proprietary imagery, branding, content, or code.

3. Recommended stack and adaptation rules
   Preferred if consistent with the existing repository: Nuxt 4, Vue 3 Composition API, TypeScript, custom CSS, and GSAP for selective motion.

- Inspect the existing repository first. Preserve its framework, conventions, and working features.
- Do not migrate frameworks or add a CMS, database, animation library, or global state manager without a concrete need.
- Start with typed local project content or existing content source; introduce a CMS only when editorial workflow requires it.
- Use native Nuxt routing, image optimization, SEO metadata, and static generation or SSR as appropriate to deployment.
- Prefer simple local state for category filtering; Pinia is unnecessary for an isolated gallery.
- Use custom CSS; no Tailwind, Bootstrap, or utility-framework dependency.

4. Suggested folder structure
   app/
   components/
   portfolio/
   PortfolioFilters.vue
   PortfolioGallery.vue
   ProjectCard.vue
   ProjectMetadata.vue
   ProjectHero.vue
   CaseStudySection.vue
   ui/
   BaseButton.vue
   ResponsiveImage.vue
   composables/
   useProjectFilters.ts
   pages/
   works/index.vue
   works/[slug].vue
   about.vue
   contact.vue
   assets/css/
   tokens.css
   base.css
   components.css
   utils/
   project-utils.ts
   content/
   projects/
   project-slug.md
   public/
   images/projects/
   types/
   project.ts
   Adapt directories to the existing Nuxt version and installed content solution. This is a reference layout, not an instruction to introduce dependencies.
5. Project data contract
   Use a single validated source of truth for project records.
   export type Discipline = 'data-analytics' | 'web-development'

export interface Project {
slug: string
title: string
discipline: Discipline
category: string
summary: string
year: number
coverImage: string
coverAlt: string
technologies: string[]
featured?: boolean
demoUrl?: string
repositoryUrl?: string
sections: CaseStudySection[]
}

export interface CaseStudySection {
id: string
heading: string
body: string
images?: Array<{ src: string; alt: string }>
}
Requirements:

- Unique stable slugs and section IDs.
- Validate required fields, safe links, and available images at build time where practical.
- Derive filters and project counts from project records.
- Never store formatted HTML in the data model unless sanitized and justified.
- Use authentic screenshots or clearly identified conceptual visuals.
- Add optional discipline-specific fields only when useful; do not create separate incompatible gallery models.

6. Project case-study templates
   Data Analytics

- Problem statement and stakeholder context
- Dataset origin, scope, and limitations
- Tools: SQL, Python/Pandas, BI platform, spreadsheets, etc.
- Cleaning, transformation, and validation
- Analytical methods, queries, and assumptions
- Charts/dashboard with accessible descriptions
- Key insights and practical recommendations
- Verified outcomes or clearly labeled potential impact
- Optional source repository and reproducibility notes
  Protect confidential or personal data. Publish only authorized datasets and sanitized screenshots.
  Web Development
- Problem and project goals
- Audience and design constraints
- UX/UI decisions
- Technical architecture and implementation
- Integrations, APIs, and data flows
- Responsive screenshots and key features
- Accessibility, performance, and SEO
- Verified results, trade-offs, and lessons learned
- Optional live demo and repository

7. Visual system

- Editorial typography and generous whitespace.
- Consistent spacing and typography tokens; no arbitrary one-off values without reason.
- Image-led project gallery with restrained metadata and category labels.
- Distinct but cohesive visuals for analytics dashboards and websites.
- Filter navigation with clear active state and project counts.
- Reusable image aspect ratios; specify width/height or aspect-ratio to prevent shifts.
- Sophisticated hover/focus states that do not conceal essential information.
- Avoid generic boxed cards, heavy shadows, excessive glass effects, and distracting animations.
  Responsive behavior
- Mobile-first layout and content order.
- Responsive grid based on available space, not fixed device assumptions.
- No horizontal overflow; comfortable touch targets.
- Test mobile, tablet, desktop, long titles, empty categories, and very large images.

8. Engineering rules (mandatory)
   Component design
1. One clear responsibility per component.
1. Separate project content, state/filter logic, and presentation.
1. Use props and emits for parent-child communication; avoid hidden shared mutable state.
1. Extract a component or composable when reuse or complexity justifies it, not automatically.
1. Prefer explicit, readable code over clever abstractions.
1. Avoid deeply nested conditionals, oversized components, and duplicated markup.
1. Use stable project IDs/slugs as Vue keys; never use array index for reordered/filtered records.
   TypeScript and JavaScript
1. Use strict types where configured; avoid any unless documented.
1. Name functions and variables for intent.
1. Use pure functions for sorting, grouping, filtering, and formatting where possible.
1. Keep computed values derived rather than duplicating state.
1. Handle missing data, malformed links, and asynchronous errors explicitly.
1. Avoid unnecessary watchers and side effects; clean up listeners and GSAP contexts.
1. Do not introduce dependencies for functionality achievable cleanly with the platform.
   CSS
1. Use custom CSS and design tokens for colors, typography, spacing, radii, and motion.
1. Follow consistent semantic class naming, preferably a hybrid BEM/CUBE approach if aligned with the repository.
1. Avoid !important except for a documented override.
1. Avoid inline styles for static design decisions.
1. Use Grid for galleries and Flexbox for one-dimensional alignment.
1. Use responsive fluid typography and modern CSS thoughtfully, with fallbacks where necessary.
1. Prefer transform/opacity for animation; avoid costly layout thrashing.
   Accessibility
1. Target WCAG 2.2 AA.
1. Use semantic landmarks, heading order, links, and buttons.
1. Category filters must be keyboard operable with clear active state; do not misuse tab semantics.
1. Provide meaningful alt text, accessible chart descriptions, and sufficient contrast.
1. Show visible focus indicators and respect prefers-reduced-motion.
1. Do not rely solely on color, hover, or animation to convey meaning.
   Security and privacy
1. Never commit credentials, tokens, or secrets.
1. Validate external links and sanitize untrusted rich content.
1. Avoid exposing confidential analytics datasets or client information.
1. Keep dependencies maintained and minimize third-party scripts.
1. Use privacy-conscious analytics if tracking is enabled.
   Performance and SEO
1. Optimize image formats and responsive sources; lazy-load below-the-fold images.
1. Prioritize the first visible gallery media appropriately; avoid indiscriminate lazy loading.
1. Reserve image dimensions to prevent layout shifts.
1. Minimize client-side JavaScript and animation overhead.
1. Give every project a unique title, description, canonical URL, and social preview where appropriate.
1. Make project URLs directly accessible and indexable.
1. Prefer semantic, crawlable content over content hidden behind client-only interactions.
1. Animation standards
   Use GSAP only for meaningful, controlled motion and only if already installed or approved. Prefer CSS for simple hover transitions. Scope animations to component lifecycles and revert on unmount. Respect reduced-motion settings. Never make navigation, content, or filtering dependent on an animation completing. Test animations on lower-powered devices.
1. Testing and acceptance criteria

- All three top-level filters work without page reloads.
- Category counts accurately reflect project data.
- Every project card links to a valid case-study route.
- Deep links and browser back/forward navigation work.
- Missing images, optional links, and empty states are handled.
- No duplicate project cards or unstable list keys.
- Mobile and keyboard experiences remain fully usable.
- Reduced-motion mode works.
- Lint, type check, and production build pass where scripts exist.
- Relevant unit tests cover filtering, sorting, slug resolution, and data validation.
- Check accessibility and performance with available tooling; record actual results rather than inventing scores.

11. AI coding-agent operating procedure
1. Inspect repository structure, dependencies, routes, styles, and existing project data.
1. Identify reusable modules and conflicts before editing.
1. Propose a short plan with file changes and architectural decisions.
1. Implement the smallest coherent changes incrementally.
1. Reuse existing utilities/components; avoid parallel duplicate implementations.
1. Run tests, lint, type checks, and build when available.
1. Review responsive layout, keyboard access, image loading, and reduced motion.
1. Summarize changes, files touched, checks run, unresolved issues, and next steps.
   Do not delete working functionality, overwrite content, change the stack, invent projects/results, or introduce major dependencies without approval.
1. Definition of done
   The site presents a compelling, consistent portfolio across Data Analytics and Web Development; projects are data-driven and easy to maintain; case studies explain the work clearly; the interface is fast, accessible, responsive, and visually distinctive; and the implementation is readable, reusable, and verified against available checks.
