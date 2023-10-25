<template>
    <div class="projects section  main">
            <!-- ...::: Start Breadcrumb Section :::... -->
            <!-- <div class="breadcrumb-section section-bg overflow-hidden pos-relative">
                <div class="breadcrumb-shape-top-left"></div>
                <div class="breadcrumb-shape-bottom-right"></div>
                <div class="breadcrumb-box">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="breadcrumb-content">
                                    <h2 class="title">Project Details</h2>
                                    <ul class="breadcrumb-link">
                                        <li><a href="service-list.html">Projects</a></li>
                                        <li class="active" aria-current="page">Project Details</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
            <!-- ...::: End Breadcrumb Section :::... -->

            <div class="project-details-section section-gap-tb-165" v-if="project">
                <div class="project-details-box">
                    <div class="col-12">
                                    <div class="project-hero-image">
                                        <img :src="project.image" alt="">
                                    </div>

                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <div class="project-content-section pos-relative">
                                    <!-- <div class="project-hero-image">
                                        <img :src="project.image" alt="">
                                    </div> -->

                                    <div class="row">
                                        <div class="col-lg-8">
                                            <div class="default-content-style pos-relative" >
                                                <h2 class="title">{{ project.name }}</h2>
                                                <p>{{ project.description }}</p>
                                            </div>
                                        </div>
                                        <div class="col-xl-3 col-lg-4 offset-xl-1">
                                            <div class="project-sidebar">
                                                <h3 class="title">Information</h3>
                                                <ul class="project-sidebar-list-item">
                                                    <li class="project-sidebar-single-box">
                                                        <h6 class="title-text">Project Name:</h6>
                                                        <span class="text">{{ project.name }}</span>
                                                    </li>
                                                    <li class="project-sidebar-single-box">
                                                        <h6 class="title-text">Preview Website:</h6>
                                                        <span class="text">
                                                            <a  :href="project.link" target="_blank">{{ project.link }}</a>
                                                        </span>
                                                    </li>
                                                    <li class="project-sidebar-single-box" v-if="project.github">
                                                        <h6 class="title-text">Github Link:</h6>
                                                        <span class="text">
                                                            <a  :href="project.github" target="_blank">{{ project.github }}</a>
                                                       </span>
                                                    </li>
                                                    <span v-else></span>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
            <span class="spinner" v-else><Spinner /></span>
    </div>

</template>

<script setup>
        const { id } = useRoute().params
        const { public: { apiKey, apiUrl } } = useRuntimeConfig();

        const headers = new Headers({
          'Authorization': `Bearer ${apiKey}`,
        });

        const config = { headers };

        const fetchData = async () => {
        try {
            const response = await fetch(apiUrl + id, config);
            const data = await response.json();
            console.log(data)
            const project = {
            id: data.id,
            name: data.fields.Name,
            image: data.fields.heroImage?.[0]?.url || null,
            link: data.fields.demoLink,
            github: data.fields.githubLink,
            description: data.fields.description,
            };
            return project;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null; 
        }
        };

        const project = ref(null); 
        fetchData().then((result) => {
        project.value = result;
        });


        definePageMeta({
            layout: "project"
        })

</script>

<style scoped>

/* .spinner{
    position: absolute;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
} */

.row{
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
}

.col-12 {
    flex: 0 0 auto;
    width: 100%;
}

.pos-relative {
    position: relative;
}

.project-hero-image {
    margin-bottom: 65px;
    width: 100%;
    height: 650px;
    /* object-fit: cover;
    object-position: bottom; */
    /* overflow: hidden; */
}

.project-hero-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
}

.row>* {
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    margin-top:0;
}

.section-tag {
    font-size: 18px;
    font-weight: 300;
    position: relative;
    display: inline-block;
    padding-left: 27px;
}

.section-tag::before {
    position: absolute;
    content: "||";
    top: 0;
    left: 0;
}

.default-content-style p {
    margin: 25px 0;
}

.sub-title {
    font-size: 30px;
    font-weight: 600;
    margin-top: 60px;
    margin-bottom: 30px;
}

.project-sidebar {
    background-color: var(--container-color);
    /* background: #252734; */
    padding: 60px 40px 75px 40px;
    margin-top: 60px;
}

.project-sidebar .title {
    font-size: 30px;
    color: #fff;
    font-weight: 600;
    margin-bottom: 45px;
}

.project-sidebar .project-sidebar-single-box {
    padding: 25px 30px 25px 30px;
    border: 1px solid #2a2c39;
    background: #2a2c39;
    margin-bottom: 10px;
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
}

.project-sidebar .project-sidebar-single-box .title-text {
    font-size: 1.15rem;
    color: rgb(26,115,232);
    font-weight: var(--font-semi-bold);
    letter-spacing: 1px;
    margin-bottom: 20px;
}

.project-sidebar-single-box span,
.project-sidebar-single-box span a {
    color: #fff;
}

/* For medium devices */
@media screen and (max-width: 576px) {
.project-sidebar .project-sidebar-single-box {
    padding: 25px 10px 25px 10px;
}

.project-sidebar {
    padding: 60px 30px 75px 30px;
}


}

</style>