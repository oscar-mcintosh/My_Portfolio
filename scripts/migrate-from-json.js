// scripts/migrate-from-json.js
// Migration script using exported JSON from Airtable
// Run with: node scripts/migrate-from-json.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

async function migrateFromJSON() {
  try {
    console.log('🚀 Starting migration from JSON to Firestore...\n');

    // Read the JSON file
    const jsonPath = join(__dirname, 'airtable-export.json');
    console.log(`📂 Reading file: ${jsonPath}`);
    
    const fileContent = readFileSync(jsonPath, 'utf8');
    const data = JSON.parse(fileContent);

    if (!data.records || !Array.isArray(data.records)) {
      throw new Error('Invalid JSON format. Expected { records: [...] }');
    }

    console.log(`✅ Loaded ${data.records.length} projects from JSON file\n`);

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

      // Use Airtable ID as Firestore document ID
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
    
    if (error.code === 'ENOENT') {
      console.log('\n📝 To use this script:');
      console.log('1. Go to your Airtable base');
      console.log('2. Export your data as JSON');
      console.log('3. Save it as: scripts/airtable-export.json');
      console.log('4. Run: npm run migrate:json');
    }
    
    process.exit(1);
  }
}

// Run migration
migrateFromJSON();
