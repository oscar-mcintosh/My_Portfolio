<template>
    <!-- <div class="projects__content"> -->
        <div class="item">
            <NuxtLink :to="`/projects/${project.id}`">
                                    <!-- <div class="project-hero-image" :style="{ 
                            backgroundImage: `url(${project.image})`, 
                            backgroundSize: 'cover', 
                            backgroundRepeat: 'no-repeat', 
                            backgroundPosition: 'top' 
                        }">
                        </div> -->


                <img :src="project.image" :alt="project.name" class="projects__img"> 
                <div class="projects__bottom">
                    <!-- <h3 :style="{ color: project.status === 'Completed' ? 'var(--title-color)' : '' }">{{ project.status }}</h3> -->
                    <h4 class="projects__title">{{ project.name }}</h4>
                    <span class="skills__subtitle">{{ project.subtitle }}</span>
                    <span class="projects__subtitle">
                        View <i class="ri-arrow-right-line"></i>
                    </span>
                </div>
            </NuxtLink>

        </div>
    <!-- </div> -->

</template>

<script setup>
const { project } = defineProps(['project'])


</script>

<style >
.projects__content{
    /* width: 320px; */
}
.project-hero-image{
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.projects__content .item{
    /* margin: 10px; */
    /* margin: 10px; */
    background: #333;
    position: relative;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    /* margin-bottom: 100px; */
    /* height: 100%; */
}

.projects__content .item a{
    overflow: hidden;
}

.projects__content .item a img{
    display: block;
    position: relative;
    /* height: 100% !important; */
    width: 100% !important;
    object-position: top;
    object-fit: cover;
}
.projects__content figure{
    border-radius: 5px;
    /* height: 200px; */
}

.projects__img{
    /* height: 100%; */
    object-fit: cover;
}

.projects__bottom{
    padding: 20px;
}
.projects__content h3{
    color: rgb(26,115,232);
    /* color: red; */
}.projects__title{
    color: var(--title-color);
    letter-spacing: 1px;
    font-weight: 500;
}

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