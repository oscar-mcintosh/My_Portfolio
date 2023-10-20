<template>
        <div class="nav__buttons">
          <i @click="toggleTheme" class="ri-moon-line change-theme" id="theme-button"></i>
        </div>

</template>

<script setup>
    import { ref, onMounted } from 'vue';

    const toggleTheme = () => {
        if (process.client) {
                document.body.classList.toggle(darkTheme);
                themeButton.classList.toggle(iconTheme);

                localStorage.setItem('selected-theme', getCurrentTheme());
                localStorage.setItem('selected-icon', getCurrentIcon());
            }
        };

        const darkTheme = 'dark-theme';
        const iconTheme = 'ri-sun-line';

        const selectedTheme = process.client ? localStorage.getItem('selected-theme') : null;
        const selectedIcon = process.client ? localStorage.getItem('selected-icon') : null;

        const getCurrentTheme = () => process.client ? (document.body.classList.contains(darkTheme) ? 'dark' : 'light') : '';
        const getCurrentIcon = () => process.client ? (themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line') : '';

        let themeButton;



        onMounted(() => {
            if (process.client) {
                themeButton = document.getElementById('theme-button');
                
                if (selectedTheme) {
                document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
                themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
                }
            }

        });



</script>

<style lang="scss" scoped>

</style>