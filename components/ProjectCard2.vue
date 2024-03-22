<template>
  <div class="project-box-single-item">
    <div class="img-box">
      <div class="bg-overlay"></div>
      <div class="image">
        <img :src="project.image" :alt="project.name" class="projects__img">
      </div>
    </div>
    <div class="content">
        <NuxtLink :to="`/projects/${project.id}`" class="link">

            <h3 class="projects__title"></h3>
        </NuxtLink>

      <!-- <h4 class="title"><a :href="`project-details.html?id=${project.id}`">{{ project.name }}</a></h4> -->

      <ul class="catagory-nav-item">
        <li v-for="(category, index) in project.category" :key="index"><a href="">{{ category }}</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const { project } = defineProps(['project']);
</script>

<style scoped>
.project-hero-image{
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.project__info h3{
    color: var(--title-color);
    font-size: var(--normal-font-size);
    /* color: rgb(26,115,232); */
}

.link:hover{
    color: rgb(26,115,232);

}

.project__info{
    display: inline-block;
}
</style>
