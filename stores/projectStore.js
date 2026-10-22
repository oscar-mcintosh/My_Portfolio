import { defineStore } from 'pinia';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [],
    currentProject: null,
    isProjectLoading: false,
    defaultBgColor: '#1a73e8',
    lastFetchTime: null,
    isFetching: false,
    cacheExpiry: 5 * 60 * 1000, // 5 minutes cache
  }),
  actions: {
    // Load projects from localStorage
    loadFromCache() {
      if (process.client) {
        try {
          const cached = localStorage.getItem('firestore_projects');
          const timestamp = localStorage.getItem('firestore_projects_timestamp');

          if (cached && timestamp) {
            const age = Date.now() - parseInt(timestamp, 10);
            // Use cached data if less than cache expiry time
            if (age < this.cacheExpiry) {
              this.projects = JSON.parse(cached);
              this.lastFetchTime = parseInt(timestamp, 10);
              console.log('✅ Loaded projects from cache');
              return true;
            }
          }
        } catch (error) {
          console.warn('Failed to load from cache:', error);
        }
      }
      return false;
    },

    // Save projects to localStorage
    saveToCache() {
      if (process.client) {
        try {
          localStorage.setItem('firestore_projects', JSON.stringify(this.projects));
          localStorage.setItem('firestore_projects_timestamp', Date.now().toString());
          console.log('💾 Projects saved to cache');
        } catch (error) {
          console.warn('Failed to save to cache:', error);
        }
      }
    },

    async getProject(forceRefresh = false) {
      // Prevent multiple simultaneous fetches
      if (this.isFetching) {
        console.log('⏸️ Fetch already in progress, skipping...');
        return;
      }

      // Check if we have valid cached data
      if (!forceRefresh && this.projects.length > 0) {
        const timeSinceLastFetch = Date.now() - (this.lastFetchTime || 0);
        if (timeSinceLastFetch < this.cacheExpiry) {
          console.log('✅ Using existing project data (still fresh)');
          return;
        }
      }

      // Try loading from localStorage first
      if (!forceRefresh && this.loadFromCache()) {
        return;
      }

      this.isFetching = true;

      try {
        console.log('🔥 Fetching projects from Firestore...');

        // Get Firestore instance from the plugin
        const { $firestore } = useNuxtApp();

        if (!$firestore) {
          throw new Error('Firestore is not initialized');
        }

        // Create a query to get all projects
        const projectsCollection = collection($firestore, 'projects');

        let querySnapshot;
        try {
          // Try to query with orderBy first
          const q = query(projectsCollection, orderBy('order', 'asc'));
          querySnapshot = await getDocs(q);
        } catch (orderError) {
          // If orderBy fails (index not created), fetch without ordering
          console.warn('⚠️ Firestore index for "order" field not found. Fetching without ordering...');
          console.log('💡 Tip: Create an index in Firebase Console for better performance');
          querySnapshot = await getDocs(projectsCollection);
        }

        const defaultBg = this.defaultBgColor;
        const listOfProjects = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          listOfProjects.push({
            id: doc.id, // Use Firestore document ID
            name: data.name || '',
            image: data.image || null,
            imageAlt: data.imageAlt || '',
            discipline: data.discipline || null,
            link: data.link || null,
            status: data.status || 'active',
            fullPage: data.fullPage || null,
            subtitle: data.subtitle || '',
            category: Array.isArray(data.category) ? data.category : [data.category],
            project_color: data.project_color || data.bg_color || defaultBg,
            order: data.order || 999,
            description: data.description || '',
            technology: Array.isArray(data.technology) ? data.technology : (data.technology ? [data.technology] : []),
            github: data.github || null,
            font_color: data.font_color || '#000000',
            bg_color: data.bg_color || defaultBg,
            bg_image: data.bg_image || ''
          });
        });

        // Sort by order field in JavaScript if Firestore query didn't order
        listOfProjects.sort((a, b) => a.order - b.order);

        console.log(`✅ Successfully fetched ${listOfProjects.length} projects from Firestore`);
        console.log('📋 Projects:', listOfProjects.map(p => ({ name: p.name, order: p.order })));

        this.projects = listOfProjects;
        this.lastFetchTime = Date.now();

        // Save to localStorage
        this.saveToCache();

      } catch (error) {
        console.error('❌ Error fetching data from Firestore:', error);

        // If fetch fails, try to use cached data even if expired
        if (this.projects.length === 0) {
          console.log('⚠️ Attempting to load expired cache...');
          this.loadFromCache();
        }

        throw error;
      } finally {
        this.isFetching = false;
      }
    },
    async initializeProject(projectId) {
      this.isProjectLoading = true;
      this.currentProject = null;

      try {
        // Ensure projects are loaded first
        if (this.projects.length === 0) {
          await this.getProject();
        }

        // Find the project by id
        const project = this.projects.find(p => p.id === projectId);

        if (project) {
          this.currentProject = project;
        } else {
          console.error(`Project with id ${projectId} not found`);
        }
      } catch (error) {
        console.error('Error initializing project:', error);
      } finally {
        this.isProjectLoading = false;
      }
    },
  },
});

