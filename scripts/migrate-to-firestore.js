// scripts/migrate-to-firestore.js
// One-time script to migrate data from Airtable to Firestore
// Run with: node scripts/migrate-to-firestore.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { config } from 'dotenv';

// Load environment variables
config();

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const defaultBgColor = '#1a73e8';

// Helper function to sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch with retry logic for 429 errors
async function fetchWithRetry(url, options, maxRetries = 5) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt + 1}/${maxRetries}...`);
      const response = await fetch(url, options);

      if (response.status === 429) {
        // Rate limited - wait before retrying
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter 
          ? parseInt(retryAfter, 10) * 1000 
          : Math.min(2000 * Math.pow(2, attempt), 30000); // Exponential backoff, max 30s
        
        console.log(`⏳ Rate limited (429). Waiting ${waitTime}ms before retry...`);
        await sleep(waitTime);
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw error;
      }
      const waitTime = Math.min(2000 * Math.pow(2, attempt), 10000);
      console.log(`⚠️ Request failed: ${error.message}. Retrying in ${waitTime}ms...`);
      await sleep(waitTime);
    }
  }
  throw new Error('Max retries exceeded');
}

async function migrateFromAirtable() {
  try {
    console.log('🚀 Starting migration from Airtable to Firestore...\n');

    // Fetch from Airtable
    const apiKey = process.env.API_KEY;
    const apiUrl = process.env.API_URL;

    if (!apiKey || !apiUrl) {
      throw new Error('Missing API_KEY or API_URL in environment variables');
    }

    const headers = new Headers({
      'Authorization': `Bearer ${apiKey}`,
    });

    console.log('📥 Fetching data from Airtable (with retry logic)...');
    console.log('⏰ This may take a while if you\'re hitting rate limits...\n');
    
    const response = await fetchWithRetry(apiUrl, { headers });

    const data = await response.json();
    console.log(`✅ Fetched ${data.records.length} projects from Airtable\n`);

    // Transform and upload to Firestore
    const projectsCollection = collection(db, 'projects');

    for (const record of data.records) {
      const project = {
        airtableId: record.id, // Keep original ID for reference
        name: record.fields.Name,
        image: record.fields.heroImage?.[0]?.url || null,
        link: record.fields.demoLink || null,
        status: record.fields.status || 'active',
        fullPage: record.fields.fullPage?.[0]?.url || null,
        subtitle: record.fields.subtitle || '',
        category: [record.fields.categories] || [],
        project_color: record.fields.bg_color || defaultBgColor,
        order: record.fields.order || 999,
        description: record.fields.description || '',
        technology: record.fields.technology || '',
        github: record.fields.githubLink || null,
        font_color: record.fields.font_color || '#000000',
        bg_color: record.fields.bg_color || defaultBgColor,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Use Airtable ID as Firestore document ID (or generate new one)
      const docRef = doc(projectsCollection, record.id);
      await setDoc(docRef, project);
      
      console.log(`✅ Migrated: ${project.name} (Order: ${project.order})`);
    }

    console.log('\n🎉 Migration completed successfully!');
    console.log(`📊 Total projects migrated: ${data.records.length}`);
    console.log('\n🔥 Check your Firestore console to verify the data.');
    console.log('   Go to: https://console.firebase.google.com/');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateFromAirtable();
