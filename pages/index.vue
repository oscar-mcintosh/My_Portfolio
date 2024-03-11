<template>
    <main class="main">
        <!--==================== HOME ====================-->

        <section class="home section" id="home">
            <div class="container">
                <div class="home__container grid">
                    <div class="home__info">
                        <div class="home__info-content">
                            <p class="home__title-1">Frontend</p>

                            <h1 class="home__title home__title-1">Web</h1>
                            <h1 class="home__title home__title-1">Developer</h1>
                            <p class="home__title-1">Webflow Professional</p>
                        </div>
                    </div>

                    <div class="home__data grid">
                        <div class="home__blob">
                            <div class="home__perfil">
                                <img src="~/assets/images/portfolio_pic.webp" alt="picture of man staring" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="home__social-wrap">
                    <div class="image-half-round-shape"></div>
                    <ul class="home__social">
                        <li class="home__social-link">
                            <a href="www.linkedin.com/in/oscar-mcintosh" target="_blank">
                                <i class="ri-linkedin-box-line"></i>
                            </a>
                        </li>
                        
                        <li class="wave-btn">
                            <div class="ripple"><i class="ri-arrow-down-s-line"></i></div>

                        </li>
                        <li class="home__social-link">
                            <a href="https://github.com/oscar-mcintosh" target="_blank">
                                <i class="ri-github-line"></i>
                            </a>
                        </li>


                    </ul>
                </div>
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
                        Hello! My name is Oscar McIntosh. I'm a Freelance and Contract Frontend Web Developer based in the heart of Lincoln, Nebraska, and passion for crafting beautiful and functional websites. With six years of hands-on experience under my belt, I've honed my skills in HTML, CSS, JavaScript, and Vue.js.
                    </p>
                    <p class="about__description">
                        My specialization lies in Webflow, where I bring creativity and precision together to bring concepts to life. From sleek designs to seamless user experiences, I thrive on turning visions into reality, pixel by pixel.
                    </p>
                    <p class="about__description">
                        Beyond coding, I'm well-versed in the intricacies of SEO, leveraging tools like Google Analytics and Tag Manager to optimize website performance and drive organic traffic. I believe in the power of data-driven decisions, ensuring that every aspect of a project is strategically crafted for success.
                    </p>
                    <p class="about__description">
                        In every project I undertake, my goal is simple: to create web experiences that not only meet but exceed expectations. Whether it's a personal blog or a corporate website, I approach each task with enthusiasm, attention to detail, and a commitment to excellence.
                    </p>
                    <p class="about__description">
                        Let's collaborate and transform your digital presence into something truly extraordinary.
                    </p>
                    <a href="#contact" class="button">Contact Me</a>
                </div>
            </div>
         </section>

        <!--==================== SKILLS ====================-->
        <section class="skills section" id="skills">
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
            <span class="section__subtitle"></span>
            <div class="projects__container container grid section__border">
                <article v-for="(project, idx) in projectStore.projects"
                        :key="idx">
                    <ProjectCard :project="project" />
                </article>
            </div>
        </section>

        <!--==================== CONTACT ====================-->
         <section class="contact section" id="contact">
            <h2 class="section__title">Contact Me</h2>
            <!-- <span class="section__subtitle">Get in touch</span> -->
            <ContactForm/>
         </section>



    </main>
</template>

<script setup>
    import { useProjectStore } from '/stores/projectStore';
    import gsap from 'gsap'; 
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    gsap.registerPlugin(ScrollTrigger);
    const { $posthog } = useNuxtApp()
    if ($posthog) {
        const posthog = $posthog()
        posthog.capture('<event_name>')
    }
    const projectStore = useProjectStore();

    const getProject =  projectStore.getProject();

    useHead({
        title: 'TwoFortyTwo | Home',
        meta: [
            { name: 'description', 
            content: 'Experienced, Webflow, Frontend, Web Developer in Lincoln, Nebraska, crafting engaging online experiences. Transforming designs into seamless, responsive websites. Let\'s bring your digital vision to life! Contact me for expert frontend website development.'
            }
        ],
        meta: [
            { name: 'keywords', 
            content: 'Webflow, Frontend, Web Developer, Lincoln, Nebraska.'
            }
        ]

    })
const main = ref();
let ctx;

onMounted(() => {
  const fadeInElements = () => {
    // const image = document.querySelector('.home__perfil'); 
    const text = document.querySelectorAll('.home__title-1'); // Select the text element
    

    gsap.from(text, {
      duration: 2,
      ease: "power4.out",
      y: 65,
      stagger: 0.2,
      delay: 0.3 // Adding a slight delay for a staggered effect
    });
  };


  fadeInElements(); // Trigger the fading in of elements

});

</script>

<style scoped>
article{
    margin-bottom: 30px;
}
.home__perfil{
    animation: fadeIn 1s ease-in-out
}

.home__title-1{
    animation: fade 1s ease-in-out
}

@keyframes fadeIn{
    0%{
        opacity: 0;
    }
}

@keyframes fade{
    0%{
        opacity: 0;
    }
    50%{
        opacity: 0;
    }
    /* 75%{
        opacity: 0;
    } */
    100%{
        opacity: 1;
    }
}

</style>