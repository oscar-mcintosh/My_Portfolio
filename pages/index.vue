<template>
    <main class="main">
        <section class="home section" id="home">
            <div class="home__container container grid section__border">
                <div class="home__data grid">
                    <h1 class="home__title">
                        <!-- Oscar McIntosh<br> -->
                       <span class="home__title-1">Frontend</span> <span class="home__title-2">Developer</span>
                    </h1>
                    <div class="home__blob grid">
                        <div class="home__perfil">
                            <img src="~/assets/images/portfolio_pic.webp" alt="picture of man staring" />
                        </div>
                    </div>
                    <ul class="home__social">
                        <a href="https://www.linkedin.com/in/oscar-mcintosh/" target="_blank" class="home__social-link">
                                    <span class="link__name">Linkedin</span>
                            <i class="ri-linkedin-box-line"></i>
                        </a>
                        <a href="https://github.com/oscar-mcintosh" target="_blank" class="home__social-link">
                                    <span class="link__name">Github</span>
                            <i class="ri-github-line"></i>
                        </a>
                    </ul>
                </div>
                <div class="home__info">

                </div>
            </div>
        </section>

        <!--==================== EXPERIENCE ====================-->
        <section class="skills section" id="skills">
            <h2 class="section__title">Experience</h2>
            <span class="section__subtitle"></span>

            <div class="skills__container container grid section__border">

                <div class="skills__content">
                    <h3 class="skills__title">
                        <i class="ri-braces-line"></i>Frontend Developer
                    </h3>
                    <div class="skills__info">
                        <div class="skills__data">
                            <div class="skills__blob">
                                <img src="~/assets/images/html-1.svg" alt="skills image">
                            </div>
                            <h3 class="skills__name">HTML</h3>
                            <span class="skills__subtitle"></span>
                        </div>
                        <div class="skills__data">
                            <div class="skills__blob">
                                <img src="~/assets/images/css-3.svg" alt="skills image">
                            </div>
                            <h3 class="skills__name">CSS</h3>
                            <span class="skills__subtitle"></span>
                        </div>
                        <div class="skills__data">
                            <div class="skills__blob">
                                <img src="~/assets/images/logo-javascript.svg" alt="skills image">
                            </div>
                            <h3 class="skills__name">Javascript</h3>
                            <span class="skills__subtitle"></span>
                        </div>
                        <div class="skills__data">
                            <div class="skills__blob">
                                <img src="~/assets/images/vue-9.svg" alt="skills image">
                            </div>
                            <h3 class="skills__name">Vue JS</h3>
                            <span class="skills__subtitle"></span>
                        </div>

                    </div>
                </div>

                <div class="skills__content">
                    <h3 class="skills__title">
                        <i class="ri-database-2-line"></i>CMS' and other tools
                    </h3>
                    <div class="skills__info">
                        <div class="skills__data">
                            <div class="skills__blob">
                                <img src="~/assets/images/git-icon.svg" alt="skills image">
                            </div>
                            <h3 class="skills__name">GIT</h3>
                            <span class="skills__subtitle"></span>
                        </div>
                        <div class="skills__data">
                            <div class="skills__blob">
                                <img src="~/assets/images/wordpress-icon-1.svg" alt="skills image">
                            </div>
                            <h3 class="skills__name">Wordpress</h3>
                            <span class="skills__subtitle"></span>
                        </div>
                        <div class="skills__data">
                            <div class="skills__blob">
                                <img src="~/assets/images/webflow-icon.svg" alt="skills image">
                            </div>
                            <h3 class="skills__name">Webflow</h3>
                            <span class="skills__subtitle"></span>
                        </div>

                    </div>
                </div>

            </div>
        </section>

        <!--==================== PROJECTS ====================-->
        <section class="projects section" id="projects">
            <h2 class="section__title">Projects</h2>
            <span class="section__subtitle">Most recent work</span>
            <div class="container section__border">
                <div class="projects__container grid">
                    <div class="projects__content" v-for="(project, idx) in projectStore.projects"
                            :key="idx">
                    <ProjectCard :project="project" />
                    </div>
                    <!-- <span v-else><Spinner /> Loading...</span> -->
                </div>

            </div>
        </section>

    </main>
</template>

<script setup>
    import { useProjectStore } from '/stores/projectStore';

    const projectStore = useProjectStore();

    const getProject =  projectStore.getProject();

    useHead({
        title: 'My portfolio | Home',
        meta: [
            { name: 'description', content: 'Frontend Webdeveloper in Lincoln Nebraska'}
        ]
    })

</script>

<style scoped>

</style>