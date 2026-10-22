<template>
  <div class="projects section main">
    <div
      class="bg__image"
      v-if="projectStore.currentProject"
      :class="{ 'fade-in': bgImageLoaded }"
    >
      <img
        :src="projectStore.currentProject.bg_image"
        alt=""
        @load="onBgImageLoad"
      />
    </div>
    <div class="bg__blur" v-if="projectStore.currentProject"></div>
    <div
      class="project-details-section section-gap-tb-165"
      v-if="projectStore.currentProject"
    >
      <div class="project-details-box">
        <div class="container">
          <!-- Project Navigation at the top -->
          <!-- <div class="project-navigation-top">
             <NuxtLink
               v-if="projectStore.previousProject"
               :to="`/projects/${projectStore.previousProject.id}`"
               class="nav-link prev"
             >
               <span class="arrow">←</span>
               <span class="text">Previous Project</span>
             </NuxtLink>
             
             <span v-else class="nav-link prev disabled">
               <span class="arrow">←</span>
               <span class="text">Previous Project</span>
             </span>
             
             <div class="nav-logo-center">
               <NuxtLink to="/" class="nav-logo-link">
                 <img src="/assets/images/logo2.svg" alt="Logo" class="nav-logo" />
               </NuxtLink>
             </div>
             
             <NuxtLink
               v-if="projectStore.nextProject"
               :to="`/projects/${projectStore.nextProject.id}`"
               class="nav-link next"
             >
               <span class="text">Next Project</span>
               <span class="arrow">→</span>
             </NuxtLink>
             
             <span v-else class="nav-link next disabled">
               <span class="text">Next Project</span>
               <span class="arrow">→</span>
             </span>
           </div> -->

          <div class="row project-layout">
            <div class="col-12 project-details">
              <div class="project-content-section pos-relative">
                <div class="row">
                  <div class="col-lg-8">
                    <div
                      class="default-content-style pos-relative"
                      :style="{
                        color:
                          projectStore.currentProject?.font_color || 'inherit',
                      }"
                    >
                      <h1
                        class="title"
                        :style="{
                          color:
                            projectStore.currentProject?.font_color ||
                            'inherit',
                        }"
                      >
                        {{ projectStore.currentProject.name }}
                      </h1>
                      <p
                        class="project-description"
                        v-html="safeDescription"
                        :style="{
                          color:
                            projectStore.currentProject?.font_color ||
                            'inherit',
                        }"
                      ></p>
                    </div>
                  </div>
                  <div class="col-xl-3 col-lg-4 offset-xl-1">
                    <div
                      class="project-sidebar"
                      :style="{
                        color:
                          projectStore.currentProject?.font_color || 'inherit',
                      }"
                    >
                      <h3
                        :style="{
                          color:
                            projectStore.currentProject?.font_color ||
                            'inherit',
                        }"
                      >
                        Data tools used:
                      </h3>
                      <ul>
                        <li
                          v-for="(tech, index) in projectStore.currentProject
                            .technology"
                          :key="index"
                        >
                          <i class="ri-compass-4-fill"></i>
                          <span
                            class="text"
                            :style="{
                              color:
                                projectStore.currentProject?.font_color ||
                                'inherit',
                            }"
                          >
                            {{ tech }}
                          </span>
                        </li>
                      </ul>
                      <!-- <ul class="project-sidebar-list-item">
                        <li class="project-sidebar-single-box">
                          <h6
                            class="title-text"
                            :style="{
                              color:
                                projectStore.currentProject?.font_color ||
                                'inherit',
                            }"
                          >
                            Project Name:
                          </h6>
                          <span
                            class="text"
                            :style="{
                              color:
                                projectStore.currentProject?.font_color ||
                                'inherit',
                            }"
                            >{{ projectStore.currentProject.name }}</span
                          >
                        </li>

                        <li class="project-sidebar-single-box">
                          <h6
                            class="title-text"
                            :style="{
                              color:
                                projectStore.currentProject?.font_color ||
                                'inherit',
                            }"
                          >
                            Technologies used:
                          </h6>
                          <span
                            class="text"
                            :style="{
                              color:
                                projectStore.currentProject?.font_color ||
                                'inherit',
                            }"
                          >
                            {{ projectStore.currentProject.technology }}
                          </span>
                        </li>
                        <li class="project-sidebar-single-box">
                          <h6
                            class="title-text"
                            :style="{
                              color:
                                projectStore.currentProject?.font_color ||
                                'inherit',
                            }"
                          >
                            Preview Website:
                          </h6>
                          <span
                            class="text"
                            :style="{
                              color:
                                projectStore.currentProject?.font_color ||
                                'inherit',
                            }"
                          >
                            <a
                              :href="projectStore.currentProject.link"
                              target="_blank"
                              :style="{
                                color:
                                  projectStore.currentProject?.font_color ||
                                  'inherit',
                              }"
                              >{{ projectStore.currentProject.link }}</a
                            >
                          </span>
                        </li>
                        <li
                          class="project-sidebar-single-box"
                          v-if="projectStore.currentProject.githubLink"
                        >
                          <h6
                            class="title-text"
                            :style="{
                              color:
                                projectStore.currentProject?.font_color ||
                                'inherit',
                            }"
                          >
                            Github Link:
                          </h6>
                          <span
                            class="text"
                            :style="{
                              color:
                                projectStore.currentProject?.font_color ||
                                'inherit',
                            }"
                          >
                            <a
                              :href="projectStore.currentProject.githubLink"
                              target="_blank"
                              :style="{
                                color:
                                  projectStore.currentProject?.font_color ||
                                  'inherit',
                              }"
                              >{{ projectStore.currentProject.githubLink }}</a
                            >
                          </span>
                        </li>
                      </ul> -->
                      <!-- <div class="project_toggle_section">
                        <NuxtLink
                          v-if="previousProject"
                          :to="`/projects/${previousProject.id}`"
                          class="project_nav_button prev"
                        >
                          <span class="project_nav_arrow">←</span>
                          <span class="project_nav_text">Previous</span>
                        </NuxtLink>
                        <span v-else class="project_nav_button prev disabled">
                          <span class="project_nav_arrow">←</span>
                          <span class="project_nav_text">Previous</span>
                        </span>

                        <NuxtLink
                          v-if="nextProject"
                          :to="`/projects/${nextProject.id}`"
                          class="project_nav_button next"
                        >
                          <span class="project_nav_text">Next</span>
                          <span class="project_nav_arrow">→</span>
                        </NuxtLink>
                        <span v-else class="project_nav_button next disabled">
                          <span class="project_nav_text">Next</span>
                          <span class="project_nav_arrow">→</span>
                        </span>
                      </div> -->
                    </div>
                  </div>
                </div>
              </div>
              <!-- </div> -->
              <div
                class="project-hero-image"
                v-if="projectStore.currentProject.fullPage"
              >
                <img :src="projectStore.currentProject.fullPage" alt="" />
              </div>
              <div
                class="project_code_section"
                v-if="
                  !projectStore.currentProject.fullPage &&
                  projectStore.currentProject.github
                "
              >
                <div class="container">
                  <div class="row">
                    <div class="col-12">
                      <div class="project_code_section_content">
                        <pre><code class="language-sql">{{ projectStore.currentProject.github }}</code></pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="project_toggle_section">
                <NuxtLink
                  v-if="previousProject"
                  :to="`/projects/${previousProject.id}`"
                  class="project_nav_button prev"
                >
                  <span class="project_nav_arrow">←</span>
                  <span class="project_nav_text">Previous</span>
                </NuxtLink>
                <span v-else class="project_nav_button prev disabled">
                  <span class="project_nav_arrow">←</span>
                  <span class="project_nav_text">Previous</span>
                </span>

                <NuxtLink
                  v-if="nextProject"
                  :to="`/projects/${nextProject.id}`"
                  class="project_nav_button next"
                >
                  <span class="project_nav_text">Next</span>
                  <span class="project_nav_arrow">→</span>
                </NuxtLink>
                <span v-else class="project_nav_button next disabled">
                  <span class="project_nav_text">Next</span>
                  <span class="project_nav_arrow">→</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span class="spinner" v-else-if="projectStore.isProjectLoading"
      ><Spinner
    /></span>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { marked } from "marked";

const route = useRoute();
const { id } = route.params;
const projectStore = useProjectStore();

// Reactive state for background image fade-in
const bgImageLoaded = ref(false);

// Configure marked for safe rendering
marked.setOptions({
  breaks: true, // Convert line breaks to <br>
  gfm: true, // GitHub Flavored Markdown
});

// Lightweight HTML sanitizer for Airtable rich text
const sanitizeHtml = (raw) => {
  if (!raw) return "";

  // Try to parse as markdown (marked.parse handles plain text gracefully)
  // Check for common markdown patterns to avoid unnecessary parsing
  const hasMarkdownSyntax =
    /(?:#{1,6}\s|[\*\-\+]\s|`{1,3}|\[.*\]\(.*\)|!\[.*\]\(.*\)|>\s|\*\*|__|~~)/.test(
      raw
    );

  let htmlContent = raw;
  // If it looks like markdown or doesn't contain HTML tags, try parsing as markdown
  if (hasMarkdownSyntax || !/<[^>]+>/.test(raw)) {
    try {
      htmlContent = marked.parse(raw);
    } catch (error) {
      console.error("Error parsing markdown:", error);
      // Fallback to plain text if markdown parsing fails
      htmlContent = raw;
    }
  }

  const isLikelyHtml = /<[^>]+>/.test(htmlContent);

  // Convert plain text to paragraphs and line breaks
  const textToParagraphs = (text) => {
    const norm = String(text).replace(/\r\n?/g, "\n").trim();
    if (!norm) return "";
    const blocks = norm.split(/\n{2,}/);
    const html = blocks
      .map((block) => `<p>${block.replace(/\n/g, "<br/>")}</p>`)
      .join("");
    return html;
  };

  // SSR-safe path: only generate safe markup from plain text; strip tags if htmlContent contained HTML
  if (typeof window === "undefined") {
    if (isLikelyHtml) {
      return String(htmlContent).replace(/<[^>]*>/g, "");
    }
    return textToParagraphs(htmlContent);
  }

  const allowedTags = new Set([
    "p",
    "br",
    "strong",
    "em",
    "b",
    "i",
    "u",
    "s",
    "span",
    "ul",
    "ol",
    "li",
    "blockquote",
    "code",
    "pre",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "a",
    "img",
  ]);
  const allowedAttrsByTag = {
    a: new Set(["href", "target", "rel"]),
    img: new Set(["src", "alt", "title"]),
    code: new Set(["class"]),
    default: new Set(["class"]),
  };

  // If no HTML tags present, wrap into <p> blocks with <br/> for single newlines
  const input = isLikelyHtml
    ? String(htmlContent)
    : textToParagraphs(String(htmlContent));

  const container = document.createElement("div");
  container.innerHTML = input;

  const cleanNode = (node) => {
    // Remove disallowed nodes entirely
    const disallowed = [
      "script",
      "style",
      "iframe",
      "object",
      "embed",
      "link",
      "meta",
      "form",
      "input",
      "button",
    ];
    if (node.nodeType === 1) {
      const tag = node.tagName.toLowerCase();
      if (disallowed.includes(tag)) {
        node.remove();
        return;
      }
      if (!allowedTags.has(tag)) {
        // unwrap unknown tags (keep children)
        const parent = node.parentNode;
        if (parent) {
          while (node.firstChild) parent.insertBefore(node.firstChild, node);
          parent.removeChild(node);
        } else {
          // If no parent, just remove children and skip (safety)
          while (node.firstChild) node.removeChild(node.firstChild);
        }
        return;
      }

      // Scrub attributes
      [...node.attributes].forEach((attr) => {
        const name = attr.name.toLowerCase();
        const value = attr.value || "";
        const allowed = (
          allowedAttrsByTag[tag] || allowedAttrsByTag.default
        ).has(name);

        // Remove any event handlers and javascript: urls
        const isEvent = name.startsWith("on");
        const isJsHref = name === "href" && /^\s*javascript:/i.test(value);
        if (!allowed || isEvent || isJsHref) {
          node.removeAttribute(name);
        }
      });

      // Ensure external links are safe
      if (tag === "a") {
        const target = node.getAttribute("target");
        if (target === "_blank") {
          node.setAttribute("rel", "noopener noreferrer");
        }
      }
    }

    // Recurse
    let child = node.firstChild;
    while (child) {
      const next = child.nextSibling;
      cleanNode(child);
      child = next;
    }
  };

  // Clean only the container's children to avoid touching the root holder
  Array.from(container.childNodes).forEach((child) => cleanNode(child));
  return container.innerHTML;
};

const safeDescription = computed(() =>
  sanitizeHtml(projectStore.currentProject?.description || "")
);

// Compute next and previous projects
const nextProject = computed(() => {
  if (!projectStore.currentProject || !projectStore.projects.length) {
    return null;
  }
  const currentIndex = projectStore.projects.findIndex(
    (p) => p.id === projectStore.currentProject.id
  );
  if (
    currentIndex === -1 ||
    currentIndex === projectStore.projects.length - 1
  ) {
    return null;
  }
  return projectStore.projects[currentIndex + 1];
});

const previousProject = computed(() => {
  if (!projectStore.currentProject || !projectStore.projects.length) {
    return null;
  }
  const currentIndex = projectStore.projects.findIndex(
    (p) => p.id === projectStore.currentProject.id
  );
  if (currentIndex === -1 || currentIndex === 0) {
    return null;
  }
  return projectStore.projects[currentIndex - 1];
});

// Handle background image load event
const onBgImageLoad = () => {
  bgImageLoaded.value = true;
};

// Watch for project changes to reset fade-in state
watch(
  () => projectStore.currentProject,
  () => {
    bgImageLoaded.value = false;
  }
);

// Watch for route changes to re-initialize project
watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      await projectStore.initializeProject(newId);
      bgImageLoaded.value = false;
      highlightCode();
    }
  }
);

// Watch for project changes to highlight code
watch(
  () => projectStore.currentProject,
  () => {
    highlightCode();
  }
);

// Function to highlight SQL code
const highlightCode = () => {
  if (process.client && window.Prism) {
    nextTick(() => {
      const codeElement = document.querySelector(
        ".project_code_section_content code"
      );
      if (codeElement) {
        window.Prism.highlightElement(codeElement);
      }
    });
  }
};

// Initialize the project data
onMounted(async () => {
  await projectStore.initializeProject(id);
  // Reset fade-in state when navigating to new project
  bgImageLoaded.value = false;
  // Highlight code after mount
  highlightCode();
});

definePageMeta({
  layout: "project",
});
</script>

<style scoped>
/* .spinner{
    position: absolute;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
} */
.main {
  margin-top: 1.5rem;
}
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.section {
  padding: 0;
}

.col-12 {
  flex: 0 0 auto;
  width: 100%;
}

.title {
  margin-bottom: 1rem;
}

/* Project layout styles */
.project-layout {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 100px;
}

.project-details {
  flex: 1;
  min-width: 0; /* Prevents flex item from overflowing */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  /* background: rgba(var(--container-color), 0.2); */
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 10px 10px 10px rgba(46, 54, 68, 0.03);
  border: 1px solid transparent;
  background-clip: padding-box;
  padding: 60px 20px;
  opacity: 0;
  transform: translateY(30px);
  animation: easeInDetails 0.8s ease-out 0.1s forwards;
}

.project-hero-image {
  position: sticky;
  /* top: 100px; */
  flex: 0 0 400px;
  /* height: 500px; */
  overflow-y: auto;
  /* border: 2px solid var(--body-color); */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 10px 10px 10px rgba(46, 54, 68, 0.03);
  border: 1px solid transparent;
  background-clip: padding-box;
  border-radius: 10px;
  margin: 0;
  scrollbar-width: thin;
  scrollbar-color: v-bind(
      "projectStore.currentProject?.bg_color || projectStore.defaultBgColor"
    )
    white;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease-out 0.3s forwards;
}

.project-hero-image::-webkit-scrollbar {
  width: 8px;
}

.project-hero-image::-webkit-scrollbar-track {
  background: white;
  border-radius: 4px;
}

.project-hero-image::-webkit-scrollbar-thumb {
  background-color: v-bind(
    "projectStore.currentProject?.bg_color || projectStore.defaultBgColor"
  );
  border-radius: 4px;
}

.project-hero-image::-webkit-scrollbar-thumb:hover {
  background-color: v-bind(
    "projectStore.currentProject?.bg_color || projectStore.defaultBgColor"
  );
  opacity: 0.8;
}

.project-hero-image img {
  width: 100%;
  height: auto;
  min-height: 100%;
  object-fit: contain;
}

.project-description h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-color);
  font-family: var(--title-font);
  letter-spacing: 1px;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.project-description h3 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
  font-family: var(--title-font);
  letter-spacing: 1px;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.bg__image,
.bg__blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
}

.bg__image {
  object-fit: cover;
  object-position: center;
  transition: opacity 0.8s ease-out;
  opacity: 0;
}

.bg__image.fade-in {
  opacity: 1;
}

.bg__blur {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  /* background-color: rgba(0, 0, 0, 0.5);
  z-index: 1; */
}

.pos-relative {
  position: relative;
}

.row > * {
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  /* padding-right: 1.5rem;
    padding-left: 1.5rem; */
  margin-top: 0;
}

.section-tag {
  font-size: 18px;
  font-weight: 300;
  position: relative;
  display: inline-block;
  padding-left: 27px;
}

.section-tag::before {
  position: absolute;
  content: "||";
  top: 0;
  left: 0;
}

.default-content-style p {
  margin: 25px 0;
}

.sub-title {
  font-size: 30px;
  font-weight: 600;
  margin-top: 60px;
  margin-bottom: 30px;
}

/* .project-sidebar {
  background-color: var(--container-color);
  background: #252734;
  padding: 60px 40px 75px 40px;
  margin-top: 60px;
} */

.project-sidebar .title {
  font-size: 30px;
  color: var(--text-color);
  font-weight: 600;
  margin-bottom: 45px;
}

.project-sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.project-sidebar ul li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.project-sidebar ul li i {
  font-size: 1.2rem;
  color: v-bind(
    "projectStore.currentProject?.bg_color || projectStore.defaultBgColor"
  );
  flex-shrink: 0;
}

.project-sidebar .project-sidebar-single-box {
  padding: 25px 30px 25px 30px;
  border: 1px solid
    v-bind(
      "projectStore.currentProject?.bg_color || projectStore.defaultBgColor"
    );
  background: v-bind(
    "projectStore.currentProject?.bg_color || projectStore.defaultBgColor"
  );
  margin-bottom: 10px;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
  border-radius: 10px;
  min-width: 0;
  overflow: hidden;
}

.project-sidebar-list-item {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.project-sidebar .project-sidebar-single-box .title-text {
  font-size: 1.2rem;
  color: var(--text-color);
  /* color: rgb(26, 115, 232); */
  font-weight: var(--font-semi-bold);
  font-family: var(--title-font);
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.project-sidebar-single-box span {
  color: #fff;
  word-wrap: break-word;
  overflow-wrap: anywhere;
  word-break: break-word;
  max-width: 100%;
  display: block;
}

.project-sidebar-single-box span a {
  color: #fff;
  word-wrap: break-word;
  overflow-wrap: anywhere;
  word-break: break-word;
  max-width: 100%;
}

/* For medium devices */
@media screen and (max-width: 576px) {
  .project-sidebar .project-sidebar-single-box {
    padding: 25px 10px 25px 10px;
  }

  .project-sidebar {
    padding: 60px 30px 75px 30px;
  }
}

/* Responsive design for project layout */
@media screen and (max-width: 1024px) {
  .project-layout {
    flex-direction: column;
  }

  .project-hero-image {
    display: none;
  }
}

/**** Large Devices ****/
@media screen and (min-width: 1200px) {
  .project-hero-image {
    /* height: 850px; */
  }
}

.project-navigation-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding: 20px 0;
  border-bottom: 1px solid var(--body-color);
}

.nav-logo-center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.nav-logo-link {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.nav-logo-link:hover {
  transform: scale(1.1);
}

.nav-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.project-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
  padding: 30px 0;
  border-top: 1px solid var(--body-color);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: rgb(26, 115, 232);
}

.nav-link.disabled {
  color: var(--text-color-light);
  cursor: not-allowed;
  opacity: 0.5;
  pointer-events: none;
}

.nav-link.disabled:hover {
  color: var(--text-color-light);
}

.nav-link .arrow {
  font-size: 20px;
}

.nav-link .text {
  font-size: 16px;
}

@media screen and (max-width: 576px) {
  .project-navigation-top,
  .project-navigation {
    flex-direction: column;
    gap: 20px;
  }

  .nav-logo-center {
    order: -1; /* Move logo to top on mobile */
    margin-bottom: 10px;
  }

  .nav-logo {
    width: 35px;
    height: 35px;
  }

  .nav-link {
    justify-content: center;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes easeInDetails {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Project toggle section navigation */
.project_toggle_section {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid
    v-bind(
      "projectStore.currentProject?.bg_color || projectStore.defaultBgColor"
    );
}

.project_nav_button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 1px solid
    v-bind(
      "projectStore.currentProject?.bg_color || projectStore.defaultBgColor"
    );
  background: v-bind(
    "projectStore.currentProject?.bg_color || projectStore.defaultBgColor"
  );
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.project_nav_button:hover:not(.disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  opacity: 0.9;
}

.project_nav_button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.project_nav_arrow {
  font-size: 18px;
  font-weight: bold;
}

.project_nav_text {
  font-size: 14px;
}

@media screen and (max-width: 576px) {
  .project_toggle_section {
    flex-direction: column;
  }

  .project_nav_button {
    width: 100%;
    justify-content: center;
  }
}

/* Project code section styling */
.project_code_section {
  padding: 40px 0;
}

.project_code_section_content {
  width: 100%;
}

.project_code_section_content pre {
  margin: 0;
  padding: 20px;
  background: #2d2d2d;
  border-radius: 8px;
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.project_code_section_content code {
  font-family: "Courier New", Courier, monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #f8f8f2;
  display: block;
  white-space: pre;
  overflow-x: auto;
}

.project_code_section_content code.language-sql {
  color: #f8f8f2;
}

/* Prism syntax highlighting overrides */
.project_code_section_content .token.keyword {
  color: #c678dd;
}

.project_code_section_content .token.string {
  color: #98c379;
}

.project_code_section_content .token.function {
  color: #61afef;
}

.project_code_section_content .token.comment {
  color: #5c6370;
  font-style: italic;
}

.project_code_section_content .token.number {
  color: #d19a66;
}

.project_code_section_content .token.operator {
  color: #56b6c2;
}

@media screen and (max-width: 768px) {
  .project_code_section_content pre {
    padding: 15px;
  }

  .project_code_section_content code {
    font-size: 12px;
  }
}
</style>
