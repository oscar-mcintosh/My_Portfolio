<template>
<div data-animate="fadeup">
    <NuxtLink :to="`/projects/${project.id}`" class="projects__link">
        <img :src="project.image" :alt="project.name" class="projects__img"> 
        <!-- <i class="ri-arrow-right-circle-line projects__icon"></i> -->
    </NuxtLink>

    <div class="project__info">
        <NuxtLink :to="`/projects/${project.id}`" class="link">

            <h3 class="projects__title">{{ project.name }}</h3>
        </NuxtLink>
        <p class="projects__subtitle">{{ project.subtitle }}</p>

        <NuxtLink :to="`/projects/${project.id}`" class="link">
            View
        </NuxtLink>
    </div>

    <!-- <span class="projects__subtitle">{{ project.subtitle }}</span> -->
</div>
</template>

<script setup>
    import gsap from 'gsap'; 
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    const { project } = defineProps(['project']);

gsap.registerPlugin(ScrollTrigger);

const items = ref([]);

// const main = ref();
// let ctx;
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  const animatedElements = document.querySelectorAll('[data-animate="fadeup"]');
  items.value = Array.from(animatedElements);

  items.value.forEach((element) => {
    gsap.timeline({
      scrollTrigger: {
        stagger: 0.2,
        trigger: element,
        start: 'top 100%',
        end: 'center 20%',
        ease: 'none',
        toggleActions: 'play none none reverse',
      },
    }).fromTo(element, 0.7, { autoAlpha: 0, y: 100 }, { autoAlpha: 1, y: 0 });
  });
});


</script>

<style >
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