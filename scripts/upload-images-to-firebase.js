// scripts/upload-images-to-firebase.js
// Upload images from URLs to Firebase Storage and update Firestore
// Run with: node scripts/upload-images-to-firebase.js

import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { config } from 'dotenv';
import https from 'https';
import http from 'http';

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
const storage = getStorage(app);
const db = getFirestore(app);

// Helper function to download image from URL
const downloadImage = (url) => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
};

// Helper function to get file extension from URL
const getFileExtension = (url) => {
  const match = url.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i);
  return match ? match[1].toLowerCase() : 'jpg';
};

// Upload image to Firebase Storage
const uploadToFirebase = async (imageBuffer, projectId, imageType) => {
  try {
    const extension = 'jpg'; // Default, could be detected from buffer
    const fileName = `projects/${projectId}/${imageType}.${extension}`;
    const storageRef = ref(storage, fileName);
    
    console.log(`  📤 Uploading ${imageType}...`);
    
    // Upload the image
    const metadata = {
      contentType: `image/${extension}`,
    };
    
    await uploadBytes(storageRef, imageBuffer, metadata);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    console.log(`  ✅ Uploaded ${imageType}`);
    
    return downloadURL;
  } catch (error) {
    console.error(`  ❌ Failed to upload ${imageType}:`, error.message);
    return null;
  }
};

async function migrateImagesToFirebase() {
  try {
    console.log('🚀 Starting image migration to Firebase Storage...\n');

    // Get all projects from Firestore
    const projectsCollection = collection(db, 'projects');
    const querySnapshot = await getDocs(projectsCollection);

    if (querySnapshot.empty) {
      console.log('❌ No projects found in Firestore. Run migration first!');
      process.exit(1);
    }

    console.log(`📊 Found ${querySnapshot.size} projects to process\n`);

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (const docSnapshot of querySnapshot.docs) {
      const projectId = docSnapshot.id;
      const project = docSnapshot.data();
      
      console.log(`\n🔄 Processing: ${project.name || projectId}`);

      const updates = {};
      let hasUpdates = false;

      // Process hero image
      if (project.image && project.image.startsWith('http')) {
        console.log(`  📥 Downloading hero image...`);
        try {
          const imageBuffer = await downloadImage(project.image);
          const firebaseURL = await uploadToFirebase(imageBuffer, projectId, 'hero');
          
          if (firebaseURL) {
            updates.image = firebaseURL;
            hasUpdates = true;
          }
        } catch (error) {
          console.error(`  ❌ Failed to migrate hero image:`, error.message);
          errorCount++;
        }
      } else {
        console.log(`  ⏭️  No external hero image to migrate`);
      }

      // Process full page image
      if (project.fullPage && project.fullPage.startsWith('http')) {
        console.log(`  📥 Downloading full page image...`);
        try {
          const imageBuffer = await downloadImage(project.fullPage);
          const firebaseURL = await uploadToFirebase(imageBuffer, projectId, 'fullpage');
          
          if (firebaseURL) {
            updates.fullPage = firebaseURL;
            hasUpdates = true;
          }
        } catch (error) {
          console.error(`  ❌ Failed to migrate full page image:`, error.message);
          errorCount++;
        }
      } else {
        console.log(`  ⏭️  No external full page image to migrate`);
      }

      // Update Firestore document if we have new URLs
      if (hasUpdates) {
        try {
          const docRef = doc(db, 'projects', projectId);
          updates.updatedAt = new Date().toISOString();
          await updateDoc(docRef, updates);
          console.log(`  ✅ Updated Firestore with new URLs`);
          successCount++;
        } catch (error) {
          console.error(`  ❌ Failed to update Firestore:`, error.message);
          errorCount++;
        }
      } else {
        console.log(`  ⏭️  No updates needed`);
        skipCount++;
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('🎉 Migration completed!');
    console.log('='.repeat(50));
    console.log(`✅ Successfully migrated: ${successCount} projects`);
    console.log(`⏭️  Skipped: ${skipCount} projects`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log('\n📱 Check Firebase Console:');
    console.log('   Storage: https://console.firebase.google.com/project/twofortytwo-16fb2/storage');
    console.log('   Firestore: https://console.firebase.google.com/project/twofortytwo-16fb2/firestore');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateImagesToFirebase();
