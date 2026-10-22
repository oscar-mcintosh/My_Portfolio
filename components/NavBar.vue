<template>
    <!-- <header class="header" id="header"> -->
        <nav ref="navRef" class="nav container" :class="{ 'hidden': isScrolling }">
            <NuxtLink to="/" class="nav__logo animate">
            <span class="link__name">Home</span>
            </NuxtLink>
            <div :class="{ 'show-menu': isNavMenuVisible }" class="nav__menu" id="nav-menu">
                <ul  class="nav__list grid">
                    <li class="nav__item" @click="closeNavMenu">
                    <NuxtLink to="#about" class="nav__link animate">
                        <i class="ri-home-5-line"></i>About
                    </NuxtLink>
                    </li>
                    <li class="nav__item experience" @click="closeNavMenu">
                    <NuxtLink to="#experience" class="nav__link animate">
                        <i class="ri-trophy-line"></i>Experience
                    </NuxtLink>
                    </li>
                    <!-- <li class="nav__item experience2" @click="closeNavMenu">
                    <NuxtLink to="#experience2" class="nav__link animate">
                        <i class="ri-trophy-line"></i>Experience
                    </NuxtLink>
                    </li> -->

                    <li class="nav__item" @click="closeNavMenu">
                    <NuxtLink to="#portfolio" class="nav__link animate">
                        <i class="ri-gallery-line"></i>Projects
                    </NuxtLink>
                    </li>
                    <li class="nav__item" @click="closeNavMenu">
                    <NuxtLink to="#contact" class="nav__link animate">
                        <i class="ri-chat-3-line"></i>Contact
                    </NuxtLink>
                    </li>
                    <li class="nav__item" @click="closeNavMenu">
                        <NuxtLink to="https://github.com/oscar-mcintosh" target="_blank" class="nav__link animate">
                            <i class="ri-github-line"></i>Github
                        </NuxtLink>
                    </li>

                </ul>
                <div  @click="closeNavMenu" class="nav__close" id="nav-close">
                    <i class="ri-close-line"></i>
                </div>
            </div>
            <div class="nav__buttons">

                 <ColorToggle />

                <div @click="openNavMenu" class="nav__toggle" id="nav-toggle">
                    <i class="ri-menu-line"></i>
                </div>
            </div>
        </nav>
    <!-- </header>   -->
</template>

<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import gsap from 'gsap';
    import { INTRO, prefersReducedMotion } from '~/composables/useIntroTiming';


    const isNavMenuVisible = ref(false);

    const openNavMenu = () => {
        isNavMenuVisible.value = true;
    };

    const closeNavMenu = () => {
        isNavMenuVisible.value = false;
    };
    const isScrolling = ref(false);
        let scrollTimeout = null;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);

      isScrolling.value = true;

      scrollTimeout = setTimeout(() => {
        isScrolling.value = false;
      }, 500);
    };

    const navRef = ref(null);
    let ctx;

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);

      // Scoped to this nav so other `.animate` elements on the page aren't affected
      ctx = gsap.context(() => {
        if (prefersReducedMotion()) {
          gsap.set('.animate', { autoAlpha: 1 });
          return;
        }
        gsap.fromTo('.animate',
          { y: -100, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: INTRO.duration,
            ease: INTRO.ease,
            stagger: INTRO.stagger,
            delay: INTRO.delay
          }
        );
      }, navRef.value);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
      ctx?.revert();
    });

</script>

<style scoped>
    .hidden {
    transform: translateY(-100%);
    display: none;
    }

/* Hidden until GSAP reveals it, so the pre-rendered HTML doesn't flash before the intro */
.animate{
    visibility: hidden;
}

@media (prefers-reduced-motion: reduce){
    .animate{
        visibility: visible;
    }
}

</style>