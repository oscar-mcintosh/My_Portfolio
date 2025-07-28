<template>
    <div class="projects section  main">

            <div class="project-details-section section-gap-tb-165" v-if="project">
                <div class="project-details-box">
                    <div class="container">
                        <nav class="breadcrumb-nav">
                    <button 
                        @click="navigateToPreviousPage" 
                        :disabled="!getPreviousPageId(id)"
                        class="nav-btn prev-btn"
                        :class="{ 'disabled': !getPreviousPageId(id) }"
                    >
                        <span class="arrow">←</span>
                        Previous
                    </button>
                    <div class="breadcrumb-info">
                        <span class="current-position">{{ getCurrentPosition() }}</span>
                        <span class="separator">/</span>
                        <span class="total-projects">{{ projectStore.projects.length }}</span>
                    </div>
                    <button 
                        @click="navigateToNextPage" 
                        :disabled="!getNextPageId(id)"
                        class="nav-btn next-btn"
                        :class="{ 'disabled': !getNextPageId(id) }"
                    >
                        Next
                        <span class="arrow">→</span>
                    </button>
                </nav>

                    <div class="col-12">
                        <div class="project-hero-image">
                            <img :src="project.image" alt="">
                        </div>

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
                                                        <h6 class="title-text">Feature:</h6>
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
        const router = useRouter()
        const projectStore = useProjectStore()
        
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
            image: data.fields.fullPage?.[0]?.url || null,
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

        // Fetch all projects for navigation
        onMounted(async () => {
          if (projectStore.projects.length === 0) {
            await projectStore.getProject()
          }
        })

        definePageMeta({
            layout: "project"
        })

        // Define navigation logic
        const navigateToPreviousPage = () => {
          const previousPageId = getPreviousPageId(id)
          if (previousPageId) {
            router.push(`/projects/${previousPageId}`)
          } else {
            // Handle case when there's no previous page
            console.log('No previous page available')
          }
        }

        const navigateToNextPage = () => {
          const nextPageId = getNextPageId(id)
          if (nextPageId) {
            router.push(`/projects/${nextPageId}`)
          } else {
            // Handle case when there's no next page
            console.log('No next page available')
          }
        }

        // Function to get the index of a project ID in the projects array
        const getIndexById = (currentId) => {
          return projectStore.projects.findIndex(project => project.id === currentId);
        }

        // Functions to get previous and next page IDs
        const getPreviousPageId = (currentId) => {
          const currentIndex = getIndexById(currentId);
          if (currentIndex > 0) {
            return projectStore.projects[currentIndex - 1].id;
          } else {
            return null; // No previous page available
          }
        }

        const getNextPageId = (currentId) => {
          const currentIndex = getIndexById(currentId);
          if (currentIndex < projectStore.projects.length - 1 && currentIndex !== -1) {
            return projectStore.projects[currentIndex + 1].id;
          } else {
            return null; // No next page available
          }
        }

        // Function to get current position in the projects array
        const getCurrentPosition = () => {
          const currentIndex = getIndexById(id);
          return currentIndex !== -1 ? currentIndex + 1 : 0;
        }

</script>

<style scoped>

/* Breadcrumb Navigation Styles */
.breadcrumb-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--container-color);
  padding: 1rem 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #2a2c39;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--text-color);
  /* background: linear-gradient(135deg, rgb(26,115,232), #1a73e8); */
  color: var(--body-color);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.nav-btn:hover:not(.disabled) {
  background: linear-gradient(135deg, #1557b0, #1a73e8);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(26, 115, 232, 0.3);
}

.nav-btn.disabled {
  background: #4a4a4a;
  color: #888;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.nav-btn.disabled:hover {
  background: #4a4a4a;
  transform: none;
  box-shadow: none;
}

.arrow {
  font-size: 1.1rem;
  font-weight: bold;
}

.breadcrumb-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  font-weight: 500;
}

.current-position {
  color: rgb(26,115,232);
  font-weight: 700;
  font-size: 1.1rem;
}

.separator {
  color: #666;
  font-weight: 300;
}

.total-projects {
  color: #ccc;
  font-weight: 500;
}

/* Responsive design for breadcrumb */
@media screen and (max-width: 768px) {
  .breadcrumb-nav {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .nav-btn {
    width: 100%;
    justify-content: center;
  }
  
  .breadcrumb-info {
    order: -1;
  }
}

/* .spinner{
    position: absolute;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
} */
.main{
    margin-top: 1.5rem;
}
.row{
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
}

.section{
    padding: 0;
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
    overflow: hidden;
    border: 2px solid var(--body-color);
    border-radius: 10px;

    /* width: 100%;
    object-fit: contain; */
}

.project-hero-image img {
    width: 100%;
    height: 100%;
    /* object-fit: cover; */
}

.row>* {
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
    /* padding-right: 1.5rem;
    padding-left: 1.5rem; */
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

/**** Large Devices ****/
@media screen and (min-width: 1200px) {
    .project-hero-image {
        height: 600px;
    }
}


</style>