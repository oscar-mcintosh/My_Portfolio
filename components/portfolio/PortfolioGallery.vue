<template>
  <section id="portfolio" class="portfolio section" aria-labelledby="portfolio-title">
    <div class="container">
      <header class="portfolio__header">
        <p class="portfolio__eyebrow">Selected work</p>
        <h2 id="portfolio-title" class="portfolio__title">Portfolio</h2>
        <p class="portfolio__intro">
          Data analytics and web development projects, each with a case study covering the
          problem, the approach, and the result.
        </p>
      </header>

      <div v-if="isLoading" class="portfolio__status" role="status">
        <span class="portfolio__spinner" aria-hidden="true"></span>
        Loading projects&hellip;
      </div>

      <div v-else-if="loadError && !projectStore.projects.length" class="portfolio__status" role="alert">
        <p>Projects couldn't be loaded right now.</p>
        <button type="button" class="portfolio__retry" @click="loadProjects(true)">Try again</button>
      </div>

      <p v-else-if="!projectStore.projects.length" class="portfolio__status">
        No projects published yet.
      </p>

      <template v-else>
        <PortfolioFilters :filters="filters" :active="activeDiscipline" @change="setDiscipline" />

        <p class="visually-hidden" aria-live="polite">{{ resultsAnnouncement }}</p>

        <TransitionGroup
          v-if="filteredProjects.length"
          tag="ul"
          name="work"
          class="portfolio__grid"
          role="list"
        >
          <li v-for="(project, index) in filteredProjects" :key="project.id">
            <PortfolioProjectCard :project="project" :priority="index < PRIORITY_IMAGES" />
          </li>
        </TransitionGroup>

        <div v-else class="portfolio__status">
          <p>No {{ activeLabel }} projects yet.</p>
          <button type="button" class="portfolio__retry" @click="setDiscipline(ALL_DISCIPLINES)">
            Show all projects
          </button>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useProjectStore } from '~/stores/projectStore';
import { useProjectFilters } from '~/composables/useProjectFilters';
import { ALL_DISCIPLINES, getDisciplineLabel } from '~/utils/project-utils';

// First visible row loads eagerly; the rest lazy-load.
const PRIORITY_IMAGES = 2;

const projectStore = useProjectStore();
const isPending = ref(true);
const loadError = ref(null);

const isLoading = computed(() => isPending.value || projectStore.isFetching);

const { activeDiscipline, filters, filteredProjects, setDiscipline } = useProjectFilters(
  () => projectStore.projects
);

const activeLabel = computed(() => getDisciplineLabel(activeDiscipline.value));

const resultsAnnouncement = computed(() => {
  const count = filteredProjects.value.length;
  const noun = count === 1 ? 'project' : 'projects';
  return activeDiscipline.value === ALL_DISCIPLINES
    ? `Showing all ${count} ${noun}`
    : `Showing ${count} ${activeLabel.value} ${noun}`;
});

async function loadProjects(forceRefresh = false) {
  isPending.value = true;
  loadError.value = null;
  try {
    await projectStore.getProject(forceRefresh);
  } catch (error) {
    loadError.value = error;
  } finally {
    isPending.value = false;
  }
}

// Projects come from Firestore on the client only (see stores/projectStore.js).
onMounted(() => loadProjects());
</script>

<style scoped>
.portfolio {
  scroll-margin-top: var(--header-height);
}

.portfolio__header {
  display: grid;
  gap: var(--space-xs);
  max-width: 40rem;
  margin-bottom: var(--space-l);
}

.portfolio__eyebrow {
  color: var(--text-color);
  font-family: var(--body-font);
  font-size: var(--smaller-font-size);
  font-weight: var(--font-medium);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.portfolio__title {
  font-size: var(--biggest-font-size);
  font-weight: var(--font-semi-bold);
  line-height: 1.1;
}

.portfolio__intro {
  color: var(--text-color);
}

.portfolio__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
  gap: var(--space-xl) var(--space-l);
  margin-top: var(--space-l);
}

/* Fixed three columns on large screens; smaller screens keep the fluid 1–2 column layout. */
@media screen and (min-width: 1024px) {
  .portfolio__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: var(--space-m);
  }
}

.portfolio__status {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-s);
  min-height: 18rem;
  margin-top: var(--space-l);
  color: var(--text-color);
  text-align: center;
}

.portfolio__spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid var(--container-color);
  border-top-color: var(--title-color);
  border-radius: 50%;
  animation: portfolio-spin 0.9s linear infinite;
}

.portfolio__retry {
  min-height: 2.75rem;
  padding: var(--space-xs) var(--space-m);
  border: 1px solid var(--title-color);
  border-radius: var(--radius-pill);
  background-color: transparent;
  color: var(--title-color);
  font-size: var(--small-font-size);
}

.portfolio__retry:focus-visible {
  outline: 2px solid var(--title-color);
  outline-offset: 3px;
}

.work-enter-active {
  transition: opacity var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.work-enter-from {
  opacity: 0;
  transform: translateY(0.75rem);
}

@keyframes portfolio-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .work-enter-active {
    transition: none;
  }

  .portfolio__spinner {
    animation-duration: 3s;
  }
}
</style>
