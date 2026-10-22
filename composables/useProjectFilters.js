import { computed, toValue } from 'vue';
import {
  ALL_DISCIPLINES,
  DISCIPLINES,
  countProjectsByDiscipline,
  dedupeProjectsById,
  filterProjectsByDiscipline,
  normalizeDiscipline,
} from '~/utils/project-utils';

// Discipline filtering for the portfolio gallery. The active filter lives in
// the URL (?discipline=...) so it can be deep linked and works with back/forward.
export function useProjectFilters(projects) {
  const route = useRoute();
  const router = useRouter();

  const activeDiscipline = computed(() => normalizeDiscipline(route.query.discipline));
  const uniqueProjects = computed(() => dedupeProjectsById(toValue(projects)));
  const counts = computed(() => countProjectsByDiscipline(uniqueProjects.value));

  const filters = computed(() =>
    DISCIPLINES.map((discipline) => ({ ...discipline, count: counts.value[discipline.id] }))
  );

  const filteredProjects = computed(() =>
    filterProjectsByDiscipline(uniqueProjects.value, activeDiscipline.value)
  );

  function setDiscipline(id) {
    const next = normalizeDiscipline(id);
    if (next === activeDiscipline.value) return;

    const query = { ...route.query };
    if (next === ALL_DISCIPLINES) delete query.discipline;
    else query.discipline = next;

    // Keep the gallery in view; the router scrolls to the hash on same-page navigation.
    router.push({ query, hash: '#portfolio' });
  }

  return { activeDiscipline, filters, filteredProjects, setDiscipline };
}
