<template>
    <main class="main">
        <!--==================== HOME ====================-->

        <section ref="homeRef" class="home section" id="home">
            <div class="container">
                <div class="home__container grid">
                    <div class="home__info">
                        <div class="home__info-content">
                            <p class="home__title-1">Data Analyst</p>

                            <h1 data-text="Oscar" class="home__title home__title-1">Oscar</h1>
                            <h1 data-text="McIntosh" class="home__title home__title-1">McIntosh</h1>
                            <p class="home__title-1">SQL & Snowflake Specialist</p>
                        </div>
                    </div>

                    <div class="home__data grid">
                        <div class="home__blob">
                            <div class="home__perfil">
                                <img src="~/assets/images/twofourtwo_hero.webp" alt="picture of man staring" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="home__social-wrap">
                    <div class="image-half-round-shape"></div>
                    <ul class="home__social">
                        <li class="home__social-link">
                            <a href="https://www.linkedin.com/in/oscar-mcintosh" target="_blank" rel="noopener noreferrer">
                                <i class="ri-linkedin-box-line"></i>
                            </a>
                        </li>
                        
                        <li class="wave-btn">
                            <div class="ripple"><i class="ri-arrow-down-s-line"></i></div>

                        </li>
                        <li class="home__social-link">
                            <a  href="https://github.com/oscar-mcintosh" target="_blank">
                                <i class="ri-github-line"></i>
                            </a>
                        </li>


                    </ul>
                </div> -->
            </div>

        </section>


         <!--==================== ABOUT ====================-->
         <section class="about section" id="about">
            <div class="about__container container grid section__border">
                <div class="about__data">
                    <h2 class="section__title">
                        About <span>Me</span>
                        <span class="section__subtitle"></span>
                    </h2>
                    <p class="about__description">
                        Hello! My name is Oscar McIntosh. I'm a Data Analyst based in Lincoln, Nebraska, with a passion for transforming complex data into actionable insights. With two years of hands-on experience, I specialize in working with large datasets, writing complex SQL queries, and leveraging Snowflake to extract meaningful patterns and drive data-driven decision-making.
                    </p>
                    <p class="about__description">
                        My expertise lies in analyzing vast amounts of data to uncover trends, identify opportunities, and solve complex business problems. I thrive on the challenge of writing efficient SQL queries that can handle millions of records, ensuring optimal performance and accuracy in data extraction and analysis.
                    </p>
                    <p class="about__description">
                        I have extensive experience with Snowflake, where I design and optimize data warehouses, create scalable data pipelines, and perform advanced analytics. My work involves transforming raw data into structured, meaningful insights that help organizations make informed strategic decisions.
                    </p>
                    <p class="about__description">
                        In every project I undertake, my goal is to deliver clear, accurate, and actionable insights from complex data. Whether it's building comprehensive reports or, creating data visualizations, I approach each task with meticulous attention to detail and a commitment to excellence.
                    </p>
                    <div class="custom-link">
                        <NuxtLink to="/resume" class="button">
                            <b>VIEW RESUME</b>
                        </NuxtLink>
                        <button @click="downloadResume" class="button download-button">
                            <b>DOWNLOAD RESUME</b>
                        </button>
                    </div>

                </div>
            </div>
         </section>

        <!--==================== SKILLS ====================-->
        <!-- <section class="skills section" id="skills">
            <h2 class="section__title">Skills</h2>
            <span class="section__subtitle"></span>

            <div class="skills__container container grid section__border">

                <div class="skills__content" data-animate="fadeup">
                    <h3 class="skills__title">
                        <i class="ri-braces-line"></i>Frontend Developer
                    </h3>
                    <div class="skills__info">
                        <div class="skills__data">
                            <div class="skills__blob">
                                <img src="~/assets/images/html-1.svg" alt="skills image">
                            </div>
                            <h3 class="skills__name">HTML</h3>
                            <span class="projects__subtitle">Five years</span>
                        </div>
                        <div class="skills__data">
                            <div class="skills__blob">
                                <img src="~/assets/images/css-3.svg" alt="skills image">
                            </div>
                            <h3 class="skills__name">CSS</h3>
                            <span class="projects__subtitle">Five years</span>
                        </div>
                        <div class="skills__data">
                            <div class="skills__blob">
                                <img src="~/assets/images/logo-javascript.svg" alt="skills image">
                            </div>
                            <h3 class="skills__name">Javascript</h3>
                            <span class="projects__subtitle">Five years</span>
                        </div>
                        <div class="skills__data">
                            <div class="skills__blob">
                                <img src="~/assets/images/vue-9.svg" alt="skills image">
                            </div>
                            <h3 class="skills__name">Vue JS</h3>
                            <span class="projects__subtitle">Five years</span>
                        </div>

                    </div>
                </div>

                <div class="skills__content" data-animate="fadeup">
                    <h3 class="skills__title">
                        <i class="ri-database-2-line"></i>CMS' and other tools
                    </h3>
                    <div class="skills__info">
                        <div class="skills__data">
                            <div class="skills__blob">
                                <img src="~/assets/images/git-icon.svg" alt="skills image">
                            </div>
                            <h3 class="skills__name">GIT</h3>
                            <span class="projects__subtitle">Three years</span>
                        </div>
                        <div class="skills__data">
                            <div class="skills__blob">
                                <img src="~/assets/images/wordpress-icon-1.svg" alt="skills image">
                            </div>
                            <h3 class="skills__name">Wordpress</h3>
                            <span class="projects__subtitle">Four years</span>
                        </div>
                        <div class="skills__data">
                            <div class="skills__blob">
                                <img src="~/assets/images/webflow-icon.svg" alt="skills image">
                            </div>
                            <h3 class="skills__name">Webflow</h3>
                            <span class="projects__subtitle">Five years</span>
                        </div>

                    </div>
                </div>

            </div>
        </section> -->

            <!--==================== SKILLS2 UI FOR LARGER SCREENS ====================-->
        <!-- <section class="skills2 section" id="skills">
            <h2 class="section__title">Skills</h2>
            <span class="section__subtitle"></span>

            <div class=" container flex section__border">
                <div class="skills__content" data-animate="fadeup">
                    <h3 class="skills__title">
                        <i class="ri-braces-line"></i>Frontend Developer
                    </h3>
                    <div class="skills__info2 p-t">
                        <div class="skills__data2">
                            <div class="skills__data p-l">
                                <h3 class="skills__name">HTML</h3>
                                <span class="projects__subtitle">Five years</span>
                            </div>
                            <div class="skills__blob2 s1">
                                <img src="~/assets/images/html-1.svg" alt="skills image">
                            </div>
                        </div>
                        <div class="skills__data2">
                            <div class="skills__data">
                                <h3 class="skills__name">CSS</h3>
                                <span class="projects__subtitle">Five years</span>
                            </div>
                            <div class="skills__blob2 s2">
                                <img src="~/assets/images/css-3.svg" alt="skills image">
                            </div>
                        </div>
                        <div class="skills__data2">
                            <div class="skills__data">
                                <h3 class="skills__name">Javascript</h3>
                                <span class="projects__subtitle">Five years</span>
                            </div>
                            <div class="skills__blob2 s3">
                                <img src="~/assets/images/logo-javascript.svg" alt="skills image">
                            </div>
                        </div>
                        <div class="skills__data2">
                            <div class="skills__data p-l">
                                <h3 class="skills__name">Vue JS</h3>
                                <span class="projects__subtitle">Five years</span>
                            </div>
                            <div class="skills__blob2 s4">
                                <img src="~/assets/images/vue-9.svg" alt="skills image">
                            </div>
                        </div>

                    </div>
                </div>
                    <div class="skills__blob-large">
                        <div class="skills__blob-inset">
                            <div class="skills__blob-inset-img">
                                <img src="~/assets/images/logo2.svg" alt="242 logo">
                            </div>
                        </div>
                    </div>

                <div class="skills__content" data-animate="fadeup">
                    <h3 class="skills__title">
                        <i class="ri-database-2-line"></i>CMS' and other tools
                    </h3>
                    <div class="skills__info2 p-t">
                        <div class="skills__data2">
                            <div class="skills__blob2 s5">
                                <img src="~/assets/images/git-icon.svg" alt="skills image">
                            </div>
                            <div class="skills__data p-r">
                                <h3 class="skills__name">GIT</h3>
                                <span class="projects__subtitle">Three years</span>
                            </div>

                        </div>
                        <div class="skills__data2">
                            <div class="skills__blob2 s6">
                                <img src="~/assets/images/wordpress-icon-1.svg" alt="skills image">
                            </div>
                            <div class="skills__data p-l">
                                <h3 class="skills__name">Wordpress</h3>
                                <span class="projects__subtitle">Four years</span>
                            </div>
                        </div>
                        <div class="skills__data2 p-r">
                            <div class="skills__blob2 s7">
                                <img src="~/assets/images/webflow-icon.svg" alt="skills image">
                            </div>
                            <div class="skills__data p-l">
                                <h3 class="skills__name">Webflow</h3>
                                <span class="projects__subtitle">Five years</span>
                            </div>
                        </div>

                        <div class="skills__data2 p-r">
                            <div class="skills__blob2 s8">
                                <img src="~/assets/images/google-search-ads.svg" alt="skills image">
                            </div>
                            <div class="skills__data">
                                <h3 class="skills__name">SEO</h3>
                                <span class="projects__subtitle">Five years</span>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </section> -->

        <!--==================== PROJECTS ====================-->
        <!-- <section class="projects section" id="projects">
            <h2 class="section__title">Projects</h2>
            <span class="section__subtitle"></span>
            <div class="projects__container container grid section__border">
                <article class="project" v-for="(project, idx) in projectStore.projects"
                        :key="idx">
                    <ProjectCard :project="project" />
                </article>
            </div>
        </section> -->

        <PortfolioGallery />

        <!--==================== CONTACT ====================-->
         <section class="contact section" id="contact">
            <h2 class="section__title">Contact Me</h2>
            <!-- <span class="section__subtitle">Get in touch</span> -->
            <ContactForm/>
         </section>

    </main>
</template>

<script setup>
    import gsap from 'gsap'; 
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import { INTRO, prefersReducedMotion } from '~/composables/useIntroTiming';

    gsap.registerPlugin(ScrollTrigger);
    const { $posthog } = useNuxtApp()
    if ($posthog) {
        const posthog = $posthog()
        posthog.capture('<event_name>')
    }

    useHead({
        title: 'Oscar McIntosh | Data Analyst',
        meta: [
            { name: 'description', 
            content: 'Experienced Data Analyst in Lincoln, Nebraska, specializing in SQL queries, Snowflake, and large dataset analysis. Transforming complex data into actionable insights. Contact me for expert data analysis and business intelligence solutions.'
            },
            { name: 'keywords', 
            content: 'Data Analyst, SQL, Snowflake, Data Analysis, Business Intelligence, Lincoln, Nebraska.'
            }
        ]

    })
const homeRef = ref(null);
let ctx;

onMounted(() => {
  ctx = gsap.context(() => {
    const fillTitles = () =>
      homeRef.value?.querySelectorAll('.home__title').forEach(el => el.classList.add('is-filled'));

    if (prefersReducedMotion()) {
      gsap.set(['.home__title-1', '.home__perfil'], { autoAlpha: 1 });
      fillTitles();
      return;
    }

    // Same start, duration, ease and stagger as the NavBar links
    gsap.fromTo('.home__title-1',
      { y: 65, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: INTRO.duration,
        ease: INTRO.ease,
        stagger: INTRO.stagger,
        delay: INTRO.delay,
        onComplete: fillTitles
      }
    );

    gsap.fromTo('.home__perfil',
      { autoAlpha: 0 },
      {
        autoAlpha: 1.4,
        duration: INTRO.imageDuration,
        ease: 'power2.out',
        delay: INTRO.delay
      }
    );
  }, homeRef.value);
});

onBeforeUnmount(() => {
  ctx?.revert();
});

</script>

<style scoped>
article{
    margin-bottom: 30px;
}
/* Hidden until GSAP reveals them, so the pre-rendered HTML doesn't flash before the intro */
.home__perfil,
.home__title-1{
    visibility: hidden;
}

@media (prefers-reduced-motion: reduce){
    .home__perfil,
    .home__title-1{
        visibility: visible;
    }
}

</style>