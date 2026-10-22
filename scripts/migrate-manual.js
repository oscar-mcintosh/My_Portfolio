// scripts/migrate-manual.js
// Manual migration - edit the PROJECTS array below with your data
// Run with: node scripts/migrate-manual.js

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

// ============================================
// 📝 EDIT YOUR PROJECTS HERE
// ============================================
const PROJECTS = [

    {
        id: 'project-6',
        name: 'Example Project 2',
        image: 'https://example.com/image2.jpg',
        link: 'https://example2.com',
        status: 'active',
        fullPage: 'https://example.com/fullpage2.jpg',
        subtitle: 'Another cool project',
        category: ['Data Analysis'],
        order: 2,
        description: 'This is another example project.',
        technology: 'SQL, Snowflake, Python',
        github: null,
        font_color: '#ffffff',
        bg_color: '#34a853',
    }
    // Add more projects here...
];

async function migrateManual() {
    try {
        console.log('🚀 Starting manual migration to Firestore...\n');
        console.log(`📊 Found ${PROJECTS.length} projects to migrate\n`);

        if (PROJECTS.length === 1 && PROJECTS[0].name === 'Example Project 1') {
            console.log('⚠️  WARNING: You are using example data!');
            console.log('   Please edit scripts/migrate-manual.js and add your actual projects.\n');

            // Uncomment the line below to prevent migration with example data
            // process.exit(1);
        }

        const projectsCollection = collection(db, 'projects');

        for (const project of PROJECTS) {
            // Add metadata
            const projectData = {
                ...project,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            // Use the provided ID as Firestore document ID
            const docRef = doc(projectsCollection, project.id);
            await setDoc(docRef, projectData);

            console.log(`✅ Migrated: ${project.name} (Order: ${project.order})`);
        }

        console.log('\n🎉 Migration completed successfully!');
        console.log(`📊 Total projects migrated: ${PROJECTS.length}`);
        console.log('\n🔥 Check your Firestore console to verify the data.');
        console.log('   Go to: https://console.firebase.google.com/');

        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

// Run migration
migrateManual();
