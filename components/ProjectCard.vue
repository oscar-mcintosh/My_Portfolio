<template>
            <NuxtLink :to="`/projects/${project.id}`" class="projects__link">
                <img :src="project.image" :alt="project.name" class="projects__img"> 
                <i class="ri-arrow-right-circle-line projects__icon"></i>
            </NuxtLink>

            <h2 class="projects__title">{{ project.name }}</h2>
            <span class="projects__subtitle">{{ project.subtitle }}</span>

</template>

<script setup>
const { project } = defineProps(['project'])


</script>

<style >
.project-hero-image{
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.projects__content h3{
    color: rgb(26,115,232);
    /* color: red; */
}
/* .projects__title{
    color: var(--title-color);
    letter-spacing: 1px;
    font-weight: 500;
} */

.projects__subtitle{
    display: flex;
    align-items: center;
    color: var(--title-color);
    transition: color .3s;
    margin-top: 5px;
}

.projects__subtitle:hover{
    color: red;
}
</style>