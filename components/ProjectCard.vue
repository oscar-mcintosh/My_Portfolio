<template>
    <div class="projects__content">
        <div class="item">
            <NuxtLink :to="`/projects/${project.id}`">
                <img :src="project.fullPage" :alt="project.name" class="projects__img"> 
                <div>
                    <h3 :style="{ color: project.status === 'Completed' ? 'var(--title-color)' : '' }">{{ project.status }}</h3>
                    <h1 class="projects__title">{{ project.name }}</h1>
                    <span class="projects__subtitle">
                        View <i class="ri-arrow-right-line"></i>
                    </span>
                </div>
            </NuxtLink>

        </div>
    </div>

</template>

<script setup>
const { project } = defineProps(['project'])


</script>

<style >
.projects__content{
    width: 320px;
}

.projects__content .item{
    margin: 10px;
    margin: 10px;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    height: 350px;
    margin-bottom: 100px;
}

.projects__content .item a{
    overflow: hidden;
}

.projects__content .item a img{
    display: block;
    position: relative;
    height: 100% !important;
    width: 100% !important;
    object-position: top;
    object-fit: cover;
}
.projects__content figure{
    border-radius: 5px;
    /* height: 200px; */
}

/* .projects__img{
    height: 100%;
} */
.projects__content h3{
    color: red;
}

.projects__subtitle{
    display: flex;
    align-items: center;
}

</style>