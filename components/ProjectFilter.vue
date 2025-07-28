<template>
  <div>
    <div class="projects-gallery-filter-nav container">
      <button
        v-for="category in uniqueCategories"
        :key="category"
        :class="['btn btn-outline-secondary', { active: activeCategory === category }]"
        @click="filterProjects(category)"
      >
        {{ category }}
      </button>
    </div>

    <div class="projects__container container grid section__border">
      <article
        data-animate="fadeup"
        v-for="(project, index) in filteredProjects"
        :key="index"
        class="col-md-6 filter-item project"
        
      >
        <NuxtLink v-if="!isExternalRoute(getProjectRoute(project))" :to="getProjectRoute(project)" class="projects__link">
            <img :src="project.image" :alt="project.name" class="projects__img"> 
        </NuxtLink>
        <a v-else :href="getProjectRoute(project)" target="_blank" class="projects__link">
            <img :src="project.image" :alt="project.name" class="projects__img"> 
        </a>
        <h3 class="projects__title">{{ project.name }}</h3>

          <div class="project__info">
            <NuxtLink v-if="!isExternalRoute(getProjectRoute(project))" :to="getProjectRoute(project)" class="link" :style="{ borderBottomColor: project.project_color }">

            </NuxtLink>
            <a v-else :href="getProjectRoute(project)" target="_blank" class="link" :style="{ borderBottomColor: project.project_color }">

            </a>
            <!-- <p class="projects__subtitle">{{ project.subtitle }}</p> -->

            <NuxtLink v-if="!isExternalRoute(getProjectRoute(project))" :to="getProjectRoute(project)" class="link" :style="{ borderBottomColor: project.project_color }">
                View Project
            </NuxtLink>
            <a v-else :href="getProjectRoute(project)" target="_blank" class="link" :style="{ borderBottomColor: project.project_color }">
                View Project
            </a>
        </div>


        <!-- <ProjectCard :project="project" data-animate="fadeup"/> -->
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useProjectStore } from '/stores/projectStore';

const projectStore = useProjectStore();
const activeCategory = ref('All');

const uniqueCategories = computed(() => {
  const categories = new Set();
  projectStore.projects.forEach(project => {
    if (Array.isArray(project.category)) {
      project.category.forEach(cat => categories.add(cat));
    } else {
      categories.add(project.category);
    }
  });
  return ['All', ...categories];
});

// Function to determine the correct route for a project
const getProjectRoute = (project) => {
  // Debug logging to understand the structure
  console.log('Project:', project.name);
  console.log('Project category:', project.category);
  console.log('Project link:', project.link);
  
  // Check if the project has categories and if any of them are 'sql' or 'python'
  const categories = Array.isArray(project.category) ? project.category : [project.category];
  console.log('Categories array:', categories);
  
  // Flatten the categories array in case it contains nested arrays
  const flattenedCategories = categories.flat();
  console.log('Flattened categories:', flattenedCategories);
  
  const hasSqlOrPython = flattenedCategories.some(cat => 
    cat && (cat.toLowerCase() === 'sql' || cat.toLowerCase() === 'python')
  );
  
  console.log('Has SQL or Python:', hasSqlOrPython);
  
  // If category is sql or python and project has a link, use the external link
  if (hasSqlOrPython && project.link) {
    console.log('Using external link:', project.link);
    return project.link;
  }
  
  // Otherwise, use the internal project route
  console.log('Using internal route:', `/projects/${project.id}`);
  return `/projects/${project.id}`;
};

// Function to check if a route is external
const isExternalRoute = (route) => {
  return route && (route.startsWith('http://') || route.startsWith('https://'));
};

const filterProjects = (category) => {
  activeCategory.value = category;
};
const filteredProjects = computed(() => {
  const activeCategoryValue = activeCategory.value;
  if (activeCategoryValue === 'All') {
    return projectStore.projects;
  } else {
    return projectStore.projects.filter(project => {
      if (Array.isArray(project.category)) {
        return project.category.includes(activeCategoryValue);
      } else {
        return project.category === activeCategoryValue;
      }
    });
  }
});

const isFiltered = (project) => {
  const activeCategoryValue = activeCategory.value;
  if (activeCategoryValue === 'All') {
    return false;
  } else {
    if (Array.isArray(project.category)) {
      return project.category.includes(activeCategoryValue);
    } else {
      return project.category === activeCategoryValue;
    }
  }
};
</script>


<style scoped>
  .project img{
    /* width: 100%; */
    height: 100%;
    border-radius: 10px;
    /* object-fit: cover; */
  }
    .projects-gallery-filter-nav {
        display: flex;
        justify-content: center;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 10px;
    }


    .btn-outline-secondary.active{
        color: #fff;
        background-color: var(--text-color-light);
        border-color: var(--text-color-light);
    }

    .btn {
        display: inline-block;
        font-weight: 400;
        line-height: 1.5;
        color: var(--text-color);
        text-align: center;
        text-decoration: none;
        vertical-align: middle;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        background-color: transparent;
        border: 1px solid transparent;
        padding: .375rem .75rem;
        font-size: 1rem;
        border-radius: .25rem;
        box-shadow: none !important;
        outline: 0 !important;

        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    }

    .btn-outline-secondary {
        padding: 12.5px 35px;
        border-radius: 30px;
        border-color: var(--text-color);
    }

    .btn-outline-secondary:active {
        color: #fff;
        background-color: #6c757d;
        border-color: #6c757d;
    }
    .transition {
    transition: opacity 0.4s ease-in-out;
    opacity: 1;
    }

/* Slowly fade out filtered items */
.filter-item:not(.transition) {
  transition: opacity 0.3s ease-in-out;
  opacity: 1;
}
    .filter-item {
        opacity: 1;
        transition: opacity 0.3s ease;
        margin-top: 50px;
          /* animation: filter 2s ease-in; */
    }

    @keyframes filter {
        0%{
            opacity: 0
        }

        50%{
            opacity: 0;
        }

        100%{
            opacity: 1;
        }
    }

@media screen and (min-width: 600px) {

  .projects-gallery-filter-nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 3rem;
    gap: 10px;
}

@media  screen and (min-width: 1200px) {
    .grid{
    grid-auto-flow: dense;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
    /* grid-auto-rows: 300px auto auto; */
    container-type: inline-size;

    /* width: 100%;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem; */
  }
    .project{
      display: flex;
      flex-direction: column;
      align-items: center;
    /* display: grid; */
    /* grid-row: span 3; */
    /* grid-template-rows: subgrid; */
    gap: 1rem;
    /* overflow: hidden; */
  }


}

}

</style>