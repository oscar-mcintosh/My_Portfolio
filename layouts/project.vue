<template>
    <div>
    <header class="header" id="header">

      <NavBar />
    </header>

        <main class="main">
            <slot />
        </main>
        <Footer />

    </div>
</template>

<script setup>

</script>

<style  scoped>
.header{
    width: 100%;
    position: relative;
    /* position: fixed;
    top: 0; */
    /* bottom: 2rem; */
    z-index: var(--z-fixed);
    box-shadow: 0 4px 20px hsla(207, 24%, 35%, .1);

}


</style>