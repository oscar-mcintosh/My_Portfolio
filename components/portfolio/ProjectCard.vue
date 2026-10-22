<template>
  <article class="work-card">
    <div class="work-card__media">
      <img
        v-if="project.image && !imageFailed"
        class="work-card__img"
        :src="project.image"
        :alt="project.imageAlt || `${project.name} project preview`"
        width="1200"
        height="900"
        :loading="priority ? 'eager' : 'lazy'"
        :fetchpriority="priority ? 'high' : 'auto'"
        decoding="async"
        @error="imageFailed = true"
      />
      <div v-else class="work-card__placeholder" aria-hidden="true"></div>
      <span class="work-card__overlay" aria-hidden="true">
        View Project <span class="work-card__arrow">&rarr;</span>
      </span>
    </div>

    <div class="work-card__body">
      <p v-if="disciplineLabel" class="work-card__eyebrow">{{ disciplineLabel }}</p>
      <h3 class="work-card__title">
        <NuxtLink :to="getProjectPath(project)" class="work-card__link">
          {{ project.name }}
        </NuxtLink>
      </h3>
      <!-- <p v-if="project.subtitle" class="work-card__summary">{{ project.subtitle }}</p> -->
      <!-- <ul v-if="technologies.length" class="work-card__tech" role="list" aria-label="Technologies">
        <li v-for="tech in technologies" :key="tech">{{ tech }}</li>
      </ul> -->
      <!-- <span class="work-card__cta" aria-hidden="true">
        View case study <span class="work-card__arrow">&rarr;</span>
      </span> -->
    </div>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue';
import {
  getDisciplineLabel,
  getProjectDiscipline,
  getProjectPath,
  getProjectTechnologies,
} from '~/utils/project-utils';

const MAX_TECHNOLOGIES = 4;

const props = defineProps({
  project: { type: Object, required: true },
  priority: { type: Boolean, default: false },
});

const imageFailed = ref(false);

const disciplineLabel = computed(() => getDisciplineLabel(getProjectDiscipline(props.project)));
const technologies = computed(() =>
  getProjectTechnologies(props.project).slice(0, MAX_TECHNOLOGIES)
);
</script>

<style scoped>
/* Animatable angle for the chasing border lines. */
@property --chase-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.work-card {
  /* Outer radius = inner (media) radius + padding, so the corners stay concentric. */
  --card-padding: var(--space-s);
  --card-radius: calc(var(--radius-m) + var(--card-padding));
  --card-border: color-mix(in srgb, var(--title-color) 14%, transparent);

  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
  padding: var(--card-padding);
  border: 1px solid var(--card-border);
  border-radius: var(--card-radius);
}

/* Two comet-like lines chasing each other around the border on hover.
   A rotating conic gradient is masked down to a 1.5px ring on the card edge. */
.work-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  padding: 1.5px;
  border-radius: inherit;
  background: conic-gradient(
    from var(--chase-angle),
    transparent 0deg,
    var(--button-color) 70deg,
    transparent 70deg 180deg,
    var(--button-color) 250deg,
    transparent 250deg
  );
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--duration-base) var(--ease-out);
}

.work-card:hover::before {
  opacity: 1;
  animation: work-card-chase 3s linear infinite;
}

@keyframes work-card-chase {
  to {
    --chase-angle: 360deg;
  }
}

.work-card__media {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: var(--radius-m);
  background-color: var(--container-color);
}

.work-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform var(--duration-slow) var(--ease-out),
    filter var(--duration-slow) var(--ease-out);
}

.work-card__placeholder {
  height: 100%;
}

/* "View case study" label revealed over the media on hover/keyboard focus. */
.work-card__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2xs);
  color: var(--title-color);
  font-family: var(--title-font);
  font-size: var(--h3-font-size);
  font-weight: var(--font-medium);
  opacity: 0;
  transform: translateY(0.5rem);
  transition: opacity var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.work-card:hover .work-card__overlay,
.work-card:has(.work-card__link:focus-visible) .work-card__overlay {
  opacity: 1;
  transform: none;
}

.work-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-2xs);
}

.work-card__eyebrow {
  color: var(--text-color);
  font-family: var(--body-font);
  font-size: var(--smaller-font-size);
  font-weight: var(--font-medium);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.work-card__title {
  font-size: var(--h2-font-size);
  line-height: 1.25;
  overflow-wrap: anywhere;
}

.work-card__link {
  color: var(--title-color);
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 1px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size var(--duration-base) var(--ease-out);
}

/* Stretch the title link over the whole card so the image is clickable too. */
.work-card__link::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--card-radius);
}

.work-card__link:focus-visible {
  outline: none;
}

.work-card__link:focus-visible::after {
  outline: 2px solid var(--title-color);
  outline-offset: 2px;
}

.work-card__summary {
  color: var(--text-color);
  font-size: var(--normal-font-size);
  letter-spacing: 0.01em;
}

.work-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2xs) var(--space-s);
  margin-top: var(--space-2xs);
  color: var(--text-color);
  font-size: var(--smaller-font-size);
}

.work-card__cta {
  margin-top: var(--space-xs);
  color: var(--title-color);
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
}

.work-card__arrow {
  display: inline-block;
  transition: transform var(--duration-base) var(--ease-out);
}

/* Slight scale hides the soft, transparent edges the blur creates. */
.work-card:hover .work-card__img {
  transform: scale(1.06);
  filter: blur(4px);
}

.work-card:hover .work-card__link,
.work-card__link:focus-visible {
  background-size: 100% 1px;
}

.work-card:hover .work-card__arrow {
  transform: translateX(0.25rem);
}

/* Narrower cards in the three-column layout get smaller type. */
@media screen and (min-width: 1024px) {
  .work-card__title {
    font-size: 1.25rem; /* 20px */
  }

  .work-card__summary {
    font-size: 1rem; /* 16px */
  }
}

@media (prefers-reduced-motion: reduce) {
  .work-card::before,
  .work-card__overlay,
  .work-card__img,
  .work-card__link,
  .work-card__arrow {
    transition: none;
  }

  .work-card:hover .work-card__img,
  .work-card:hover .work-card__arrow,
  .work-card__overlay {
    transform: none;
  }

  /* Without motion, show a solid highlighted border instead of the chase. */
  .work-card:hover::before {
    animation: none;
    opacity: 0;
  }

  .work-card:hover {
    border-color: var(--title-color);
  }
}
</style>
