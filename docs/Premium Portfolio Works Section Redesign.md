AI Agent Task: Premium Portfolio Works Section Redesign

Objective

Redesign the Projects/Works section of my personal portfolio website using the following website as the primary visual and interaction reference:

Reference: https://visuvate.com/works

My portfolio showcases two professional disciplines:

Data Analytics

Web Development

The final design must feel like an award-winning digital agency portfolio, with sophisticated typography, strong visual hierarchy, refined interactions, polished transitions, and exceptional attention to detail.

This is an existing application. Inspect the current codebase, identify its framework and conventions, and integrate the redesign without unnecessarily rebuilding the application or disrupting existing functionality.

1. Design Reference

Study the Visuvate Works page carefully.

Pay particular attention to:

The oversized, editorial-style section heading.

The category filtering interface.

The visual presentation of projects.

The spacing, alignment, and image proportions.

The typography hierarchy and project labels.

The hover effects, image transitions, and interactive details.

The relationship between project imagery, titles, and categories.

The responsive behavior of the portfolio layout.

Use this reference as the foundation for the design direction, while creating an original implementation suited to my personal brand.

Do not reproduce the reference site's branding, assets, copy, or source code.

2. Portfolio Structure

Create one unified portfolio experience with two primary disciplines.

Primary categories

All Projects — Displays projects from both disciplines.

Data Analytics — Displays analytical work, including:

Interactive dashboards

SQL analysis

Python and Pandas projects

Business intelligence and reporting

Data visualization

Financial and operational analytics

Data cleaning and transformation

Web Development — Displays technical and design work, including:

Custom websites

Nuxt/Vue applications

SaaS platforms

CRM and dashboard interfaces

API integrations

Automation systems

Webflow development

Use an elegant, animated category navigation system inspired by the reference.

Display the project count next to each category.

Filtering must work without reloading the page.

3. Project Gallery

Create a premium, image-led project gallery.

Each project must support:

Project title

Primary discipline

Secondary category

Cover image or visual preview

Short description

Technologies used

Project year

Project detail page

Optional live demo

Optional GitHub repository

Optional case study

Visual treatment

Use large, visually compelling project imagery.

Web development projects should showcase website mockups, application interfaces, or actual screenshots.

Data analytics projects should showcase dashboards, charts, analytical interfaces, or other authentic visual representations of the work.

Both disciplines must receive equally sophisticated visual treatment.

Use consistent image proportions, intentional spacing, subtle clipping, refined typography, and polished hover interactions.

Avoid generic portfolio cards with excessive borders, shadows, and repetitive boxed layouts.

4. Interactions and Animation

Implement restrained, high-quality motion.

Suggested interactions:

Smooth category transitions.

Project image reveal effects.

Subtle image scaling on hover.

Animated project titles and metadata.

A contextual "View Project" interaction.

Staggered entrance animations when appropriate.

Smooth transitions between gallery and project details.

Use GSAP only where it materially improves the experience and fits the existing stack.

Respect prefers-reduced-motion.

Ensure hover interactions have equivalent touch and keyboard-accessible behavior.

Avoid unnecessary animation libraries or effects that compromise performance.

5. Project Detail Pages

Every project must have a dedicated case-study page.

Use a shared page structure with discipline-specific content sections.

Data Analytics case study

Include:

Project overview

Business problem or analytical question

Data sources and tools

Data preparation and methodology

SQL/Python or analytical approach

Dashboard or visualization

Findings and insights

Business recommendations

Outcomes and measurable impact, when verified

Web Development case study

Include:

Project overview

Client or project challenge

Goals and requirements

UX/UI design approach

Technical architecture

Technologies and integrations

Screenshots and features

Performance, accessibility, and SEO considerations

Results and lessons learned

Support project-specific sections without duplicating entire page components.

Never fabricate client outcomes, performance improvements, or business metrics.

6. Technical Implementation

Use the application's existing framework and conventions.

If the application uses Nuxt/Vue, favor:

Vue 3 Composition API

Nuxt conventions and file-based routing

TypeScript where configured

Reusable Vue components

Composables for shared logic

Scoped or appropriately organized custom CSS

Semantic HTML

Do not introduce Tailwind, Bootstrap, or another CSS framework.

Use custom CSS and a consistent naming convention.

Prefer CSS Grid and Flexbox for layout.

Keep project content separate from presentation logic.

Project filtering should be data-driven, not hardcoded into the markup.

7. Reusability and Maintainability

Build reusable components for:

Category filters

Project gallery

Project cards

Project metadata

Image previews

Technology labels

Case-study sections

Project navigation

Use a centralized, typed project data model.

Adding a new project should require adding project content and assets, not rewriting the gallery or modifying category-filter logic.

Avoid duplicated code, oversized components, unnecessary dependencies, and deeply nested conditional logic.

8. Responsive Design

Build mobile-first.

Desktop: expansive editorial gallery with carefully controlled spacing.

Tablet: responsive gallery that maintains the visual hierarchy.

Mobile: readable, touch-friendly layout with accessible filtering and optimized imagery.

Avoid horizontal overflow, layout shifts, and interactions that depend exclusively on hover.

9. Quality Standards

The completed implementation must:

Meet WCAG 2.2 AA accessibility goals.

Use semantic HTML and keyboard-accessible controls.

Support SEO-friendly project detail pages.

Use optimized responsive images and lazy loading where appropriate.

Maintain good Core Web Vitals.

Avoid layout shifts caused by media.

Support loading, empty, and error states where applicable.

Follow the project's established coding standards.

Avoid unnecessary network requests and runtime dependencies.

10. Agent Workflow

Before writing code:

Inspect the existing application structure and dependencies.

Identify reusable components and styles already present.

Study the reference page and document the relevant design patterns.

Present a concise implementation plan.

Identify any assumptions or missing project assets.

Then implement the redesign incrementally.

Preserve existing project data and routes wherever possible.

After implementation, run available linting, type checking, and build checks.

Test filtering, project navigation, accessibility, responsiveness, and reduced-motion behavior.

Report any failures honestly rather than claiming tests passed without executing them.

Definition of Done

The portfolio must present Data Analytics and Web Development as two equally important professional capabilities.

The Works section should visually communicate senior-level craftsmanship, technical expertise, and attention to detail.

The result should feel distinctive, premium, and intentional, with the sophistication of the reference page and the maintainability of a professionally engineered application.
