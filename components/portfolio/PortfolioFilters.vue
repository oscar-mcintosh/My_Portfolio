<template>
  <nav class="portfolio-filters" aria-label="Filter projects by discipline">
    <ul class="portfolio-filters__list" role="list">
      <li v-for="filter in filters" :key="filter.id">
        <button
          type="button"
          class="portfolio-filters__button"
          :aria-pressed="filter.id === active"
          @click="emit('change', filter.id)"
        >
          <span class="portfolio-filters__label">{{ filter.label }}</span>
          <span class="portfolio-filters__count">
            {{ formatCount(filter.count) }}<span class="visually-hidden"> projects</span>
          </span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  filters: { type: Array, required: true },
  active: { type: String, required: true },
});

const emit = defineEmits(['change']);

const formatCount = (count) => String(count).padStart(2, '0');
</script>

<style scoped>
.portfolio-filters__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.portfolio-filters__button {
  display: inline-flex;
  align-items: baseline;
  gap: var(--space-2xs);
  min-height: 2.75rem;
  padding: var(--space-xs) var(--space-m);
  border: 1px solid var(--title-color);
  border-radius: var(--radius-pill);
  background-color: transparent;
  color: var(--title-color);
  font-family: var(--body-font);
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
  letter-spacing: 0.02em;
  transition: background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.portfolio-filters__button:hover {
  background-color: var(--container-color);
}

.portfolio-filters__button[aria-pressed='true'] {
  background-color: var(--title-color);
  color: var(--body-color);
}

.portfolio-filters__button:focus-visible {
  outline: 2px solid var(--title-color);
  outline-offset: 3px;
}

.portfolio-filters__count {
  font-size: var(--smaller-font-size);
  font-variant-numeric: tabular-nums;
}
</style>
