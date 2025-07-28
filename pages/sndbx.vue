<template>

<section class="intro">
  <div class="container">
    <div class="row">
      <div class="col-12 wow fadeIn">
        <h6>SMOOTH INTERFACE INTERACTION</h6>
        <h2 data-text="Digital">Wireframe project User friendly interface </h2>
      </div>
      <!-- end col-12 -->
      <div class="col-lg-5 wow fadeIn">
        <h4>To create a powerful project once, 
          a bit of luck is enough.</h4>
      </div>
      <!-- end col-5 -->
      <div class="col-lg-7 wow fadeIn" data-wow-delay="0.10s">
        <p>Thanks to our experience and expertise, we were entrusted with the development of a new website for <u>Araxia</u>’s capital city, Riyadh, in collaboration with a well-recognized local agency.</p>
        <p>Design very few <strong>companies</strong> in the world have ventured on a project of such tremendous scope and complex</p>
        <div class="custom-link wow fadeIn"> <a href="#">
          <div class="lines"> <span></span> <span></span> </div>
          <!-- end lines --> 
          <b>READ TO LEARN</b></a> </div>
        <!-- end custom-link --> 
      </div>
      <!-- end col-7 --> 
    </div>
    <!-- end row --> 
  </div>
  <!-- end container --> 
</section>
<!-- end intro -->

<section class="services-content-block">
  <div class="video-bg">
    <video src="videos/video.mp4" muted loop autoplay></video>
  </div>
  <!-- end video-bg -->
  <div class="container">
    <div class="row">
      <div class="col-12 wow fadeIn">
        <h6>SMOOTH INTERFACE INTERACTION</h6>
        <h2>Creation of friendly web interface layout </h2>
      </div>
      <!-- end col-12 -->
      <div class="col-md-4 wow fadeIn" data-wow-delay="0s">
        <div class="content-box">
          <div class="left"><small>01</small><span></span></div>
          <!-- end left -->
          <div class="right">
            <h4>STRATEGY</h4>
            <p>Creativity for us something 
              personal.</p>
            <ul>
              <li>UX strategy</li>
              <li>Concept development</li>
              <li>Content strategy</li>
              <li>Online marketting </li>
              <li>User testing &amp; research</li>
            </ul>
          </div>
          <!-- end right --> 
        </div>
        <!-- end content-box --> 
      </div>
      <!-- end col-4 -->
      <div class="col-md-4 wow fadeIn" data-wow-delay="0.05s">
        <div class="content-box">
          <div class="left"><small>02</small><span></span></div>
          <!-- end left -->
          <div class="right">
            <h4>UI-UX LAYOUT</h4>
            <p>Creativity for us something 
              personal.</p>
            <ul>
              <li>User Interface</li>
              <li>Prototype development</li>
              <li>Content strategy</li>
              <li>Online research </li>
              <li>Layout wireframe</li>
            </ul>
          </div>
          <!-- end right --> 
        </div>
        <!-- end content-box --> 
      </div>
      <!-- end col-4 -->
      <div class="col-md-4 wow fadeIn" data-wow-delay="0.10s">
        <div class="content-box">
          <div class="left"><small>03</small><span></span></div>
          <!-- end left -->
          <div class="right">
            <h4>BACK-END DEV</h4>
            <p>Creativity for us something 
              personal.</p>
            <ul>
              <li>CMS Development</li>
              <li>Back-end Prototype</li>
              <li>Coding strategy</li>
              <li>Beta testing </li>
              <li>Page builder</li>
            </ul>
          </div>
          <!-- end right --> 
        </div>
        <!-- end content-box --> 
      </div>
      <!-- end col-4 --> 
    </div>
    <!-- end row --> 
  </div>
  <!-- end container --> 
</section>

<section class="works">
  <div class="container">
    <div class="row">
      <div class="col-12 wow fadeIn">
        <h6>SMOOTH INTERFACE INTERACTION</h6>
        <h2 data-text="Works">Our selected works and showcases</h2>
      </div>
      <!-- end col-12 -->
      <div class="col-12">
        <div v-for="project in projectStore.projects" 
             :key="project.id" 
             class="project-box wow fadeIn" 
             :data-bg="project.bg_color">
          <figure> 
            <a :href="project.image" data-fancybox>
              <img :src="project.image" :alt="project.name">
            </a>
          </figure>
          <div class="content-box">
            <div class="inner"> 
              <small>{{ project.subtitle }}</small>
              <h3><span>{{ project.name }}</span></h3>
              <div class="custom-link"> 
                <a :href="project.link">
                  <div class="lines"> <span></span> <span></span> </div>
                  <b>LEARN MORE</b>
                </a> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end row --> 
  </div>
  <!-- end container --> 
</section>
<!-- end works -->

<section class="work-with-us">
  <div class="container">
    <div class="row">
      <div class="col-12 wow fadeIn">
        <h6>START WORKING WITH US</h6>
        <h2 data-text="Hire us">So that's us. There's no other way to put it.</h2>
      </div>
      <!-- end col-12 -->
      <div class="col-lg-5 col-md-8 wow fadeIn">
        <h4>Do you have a project opportunity, or are you just a looking to get creative solutions?</h4>
        <div class="custom-link wow fadeIn"> <a href="#">
          <div class="lines"> <span></span> <span></span> </div>
          <!-- end lines --> 
          <b>GET STARTED</b></a> </div>
        <!-- end custom-link --> 
      </div>
      <!-- end col-5 --> 
    </div>
    <!-- end row --> 
  </div>
  <!-- end container --> 
</section>

</template>

<script setup>
import { useProjectStore } from '~/stores/projectStore';
import { onMounted } from 'vue';

const projectStore = useProjectStore();

onMounted(async () => {
  await projectStore.getProject();
});
</script>

<style lang="css" scoped>
header {
    transform: scale(1.5);
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    transition: all 0.5s ease;
    transition-duration: 700ms;
    -webkit-transition-duration: 700ms;
    transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    -webkit-transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  }
  header .left-side {
    width: 50%;
    height: 60px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-end;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateX(-50%) translateY(-50%) rotate(-90deg);
    margin-left: 30px;
    z-index: 3;
  }
  header .left-side ul {
    margin: 0 auto;
    padding: 0;
  }
  header .left-side ul li {
    display: inline-block;
    margin: 0 10px;
    padding: 0;
    list-style: none;
  }
  header .left-side ul li a {
    font-size: 14px;
    color: #fff;
    font-family: "Fjalla One", sans-serif;
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -ms-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
    padding-bottom: 6px;
    border-bottom: 2px solid transparent;
  }
  header .left-side ul li a:hover {
    padding-bottom: 1px;
    border-bottom: 2px solid #fff;
    text-decoration: none;
  }
  header .scroll-down {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 3;
  }
  header .scroll-down small {
    width: 98px;
    display: inline-block;
    transform: rotate(-90deg);
    margin-bottom: 50px;
    color: #fff;
    font-family: "Fjalla One", sans-serif;
  }
  header .scroll-down span {
    display: block;
    height: 50px;
    position: relative;
    transform: translateX(-1px);
  }
  header .scroll-down span::before {
    -webkit-animation: elasticus 1.2s cubic-bezier(1, 0, 0, 1) infinite;
    -moz-animation: elasticus 1.2s cubic-bezier(1, 0, 0, 1) infinite;
    -o-animation: elasticus 1.2s cubic-bezier(1, 0, 0, 1) infinite;
    animation: elasticus 1.2s cubic-bezier(1, 0, 0, 1) infinite;
  }
  header .scroll-down span::before {
    position: absolute;
    top: 0px;
    left: 50%;
    margin-left: -0.5px;
    width: 1px;
    height: 70px;
    background: #fff;
    content: "";
  }
  header .sound {
    position: absolute;
    right: 40px;
    bottom: 40px;
    z-index: 3;
  }
  header .sound span {
    float: left;
    color: #fff;
    font-size: 14px;
    margin-right: 10px;
    font-family: "Fjalla One", sans-serif;
  }
  header .sound .equalizer {
    float: left;
  }
  header .sound .equalizer .holder {
    width: 23px;
    height: 20px;
    position: relative;
  }

.row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
}

.col-12 {
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 100%;
}



@media (min-width: 992px) {
    .col-lg-5 {
        -ms-flex: 0 0 41.666667%;
        flex: 0 0 41.666667%;
        max-width: 41.666667%;
    }
}

@media (min-width: 768px) {
    .col-md-8 {
        -ms-flex: 0 0 66.666667%;
        flex: 0 0 66.666667%;
        max-width: 66.666667%;
    }

    .col-md-4 {
        -ms-flex: 0 0 33.333333%;
        flex: 0 0 33.333333%;
        max-width: 33.333333%;
    }
}

@media only screen and (max-width: 1199px), only screen and (max-device-width: 1199px) {
    .work-with-us h2 {
        padding-right: 0;
    }
}




</style>