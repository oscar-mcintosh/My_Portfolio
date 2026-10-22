// Pure helpers for the portfolio gallery. No Nuxt/Vue imports so they can be
// unit tested with `node --test`.

export const ALL_DISCIPLINES = 'all';

export const DISCIPLINES = [
  { id: ALL_DISCIPLINES, label: 'All Projects' },
  { id: 'data-analytics', label: 'Data Analytics' },
  { id: 'web-development', label: 'Web Development' },
];

// Keywords used to infer a discipline from free-form Firestore categories
// (e.g. "Data Analysis", "SQL", "Web Development"). An explicit `discipline`
// field on the project always wins.
const DISCIPLINE_KEYWORDS = {
  'data-analytics': ['data', 'analy', 'sql', 'python', 'snowflake', 'tableau', 'power bi', 'excel', 'dashboard'],
  'web-development': ['web', 'front', 'vue', 'nuxt', 'wordpress', 'webflow', 'shopify', 'javascript'],
};

const isKnownDiscipline = (value) =>
  DISCIPLINES.some((d) => d.id === value && d.id !== ALL_DISCIPLINES);

const toList = (value) => (Array.isArray(value) ? value.flat() : [value]);

export function normalizeDiscipline(value) {
  const candidate = Array.isArray(value) ? value[0] : value;
  return isKnownDiscipline(candidate) ? candidate : ALL_DISCIPLINES;
}

export function getDisciplineLabel(id) {
  return DISCIPLINES.find((d) => d.id === id)?.label ?? '';
}

export function getProjectDiscipline(project) {
  if (isKnownDiscipline(project?.discipline)) return project.discipline;

  for (const category of toList(project?.category)) {
    if (typeof category !== 'string') continue;
    const normalized = category.toLowerCase();
    const match = Object.keys(DISCIPLINE_KEYWORDS).find((id) =>
      DISCIPLINE_KEYWORDS[id].some((keyword) => normalized.includes(keyword))
    );
    if (match) return match;
  }
  return null;
}

export function dedupeProjectsById(projects = []) {
  const seen = new Set();
  return projects.filter((project) => {
    if (!project?.id || seen.has(project.id)) return false;
    seen.add(project.id);
    return true;
  });
}

export function filterProjectsByDiscipline(projects, discipline) {
  if (discipline === ALL_DISCIPLINES) return projects;
  return projects.filter((project) => getProjectDiscipline(project) === discipline);
}

export function countProjectsByDiscipline(projects) {
  const counts = Object.fromEntries(DISCIPLINES.map((d) => [d.id, 0]));
  counts[ALL_DISCIPLINES] = projects.length;
  for (const project of projects) {
    const discipline = getProjectDiscipline(project);
    if (discipline) counts[discipline] += 1;
  }
  return counts;
}

// Technologies are sometimes stored as a single comma-separated string.
export function getProjectTechnologies(project) {
  const names = toList(project?.technology)
    .filter((item) => typeof item === 'string')
    .flatMap((item) => item.split(','))
    .map((item) => item.trim())
    .filter(Boolean);
  return [...new Set(names)];
}

export function getProjectPath(project) {
  return `/projects/${encodeURIComponent(project.id)}`;
}

export function isSafeExternalUrl(url) {
  if (typeof url !== 'string') return false;
  try {
    const { protocol } = new URL(url);
    return protocol === 'https:' || protocol === 'http:';
  } catch {
    return false;
  }
}
