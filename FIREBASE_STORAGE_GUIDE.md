# 🖼️ Firebase Storage Guide for Images

You have **two options** for storing project images:

---

## ✅ **Option 1: Keep URLs from Airtable** (Quick & Easy)

If your images are already hosted on Airtable (or another service), just store the **URLs** in Firestore.

### What to do:
**Nothing!** Just make sure your Firestore documents have URLs like:

```javascript
{
  name: "Project Name",
  image: "https://dl.airtable.com/.attachments/abc123/hero.jpg",
  fullPage: "https://dl.airtable.com/.attachments/xyz789/full.jpg"
}
```

### When to use:
- ✅ You want the quickest solution
- ✅ Your images are already hosted and accessible
- ✅ You don't plan to delete your Airtable base
- ✅ You're okay with external dependencies

---

## 🔥 **Option 2: Migrate to Firebase Storage** (Recommended)

Upload your images to Firebase Storage for full control and better performance.

### Benefits:
- ✅ **All in Firebase** - no external dependencies
- ✅ **Better performance** - Firebase CDN is fast
- ✅ **More reliable** - won't break if you delete Airtable
- ✅ **Organized storage** - all your project assets in one place
- ✅ **Free tier generous** - 5GB storage, 1GB/day downloads

---

## 🚀 Setting Up Firebase Storage (Option 2)

### Step 1: Enable Firebase Storage

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `twofortytwo-16fb2`
3. Click **Storage** in the left sidebar
4. Click **Get Started**
5. Choose **Start in production mode** (we'll set rules after)
6. Select your location (same as Firestore for consistency)
7. Click **Done**

### Step 2: Set Storage Security Rules

In Firebase Console → Storage → Rules tab:

**Development Rules (Open - for testing only):**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{projectId}/{imageName} {
      allow read: if true;  // Anyone can read
      allow write: if false; // No public writes
    }
  }
}
```

**Production Rules (Recommended):**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{projectId}/{imageName} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users
    }
  }
}
```

Click **Publish** to save.

### Step 3: Update Firebase Plugin (Add Storage)

Edit `plugins/firebase.client.js`:

```javascript
// plugins/firebase.client.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage'; // Add this line
import { firebaseConfig } from '~/firebase.config';

export default defineNuxtPlugin((nuxtApp) => {
  const app = initializeApp(firebaseConfig);
  
  const db = getFirestore(app);
  const realtimeDb = getDatabase(app);
  const storage = getStorage(app); // Add this line

  return {
    provide: {
      firebase: app,
      firestore: db,
      realtimeDb: realtimeDb,
      storage: storage // Add this line
    }
  };
});
```

### Step 4: Run the Migration Script

This script will:
1. Download images from current URLs (Airtable)
2. Upload them to Firebase Storage
3. Update Firestore with new Firebase URLs

```bash
# Install if needed
npm install

# Run the image migration
npm run migrate:images
```

**What happens:**
```
🚀 Starting image migration to Firebase Storage...

📊 Found 5 projects to process

🔄 Processing: SQL Analysis Dashboard
  📥 Downloading hero image...
  📤 Uploading hero...
  ✅ Uploaded hero
  📥 Downloading full page image...
  📤 Uploading fullpage...
  ✅ Uploaded fullpage
  ✅ Updated Firestore with new URLs

...

🎉 Migration completed!
✅ Successfully migrated: 5 projects
```

### Step 5: Verify in Firebase Console

1. Go to **Storage** in Firebase Console
2. You should see a folder structure like:
```
storage/
└── projects/
    ├── project-id-1/
    │   ├── hero.jpg
    │   └── fullpage.jpg
    ├── project-id-2/
    │   ├── hero.jpg
    │   └── fullpage.jpg
    └── ...
```

3. Check **Firestore** → `projects` collection
4. Document URLs should now be:
```javascript
{
  image: "https://firebasestorage.googleapis.com/v0/b/twofortytwo-16fb2.appspot.com/o/projects%2Fproject-id%2Fhero.jpg?alt=media&token=...",
  fullPage: "https://firebasestorage.googleapis.com/v0/b/twofortytwo-16fb2.appspot.com/o/projects%2Fproject-id%2Ffullpage.jpg?alt=media&token=..."
}
```

---

## 📦 Package.json Update

Add the migration script to your `package.json`:

```json
{
  "scripts": {
    "migrate:images": "node scripts/upload-images-to-firebase.js"
  }
}
```

---

## 🎨 Manual Image Upload (Small Number of Projects)

If you have just a few projects, you can upload manually:

### Using Firebase Console:

1. Go to Storage in Firebase Console
2. Create folder: `projects/project-id-1/`
3. Click **Upload file**
4. Upload your images
5. Click on uploaded image → Copy download URL
6. Update Firestore document with the URL

### Using a Script:

Create a composable for uploading:

```javascript
// composables/useImageUpload.js
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

export const useImageUpload = () => {
  const { $storage } = useNuxtApp();

  const uploadProjectImage = async (file, projectId, imageType) => {
    try {
      const fileName = `projects/${projectId}/${imageType}.jpg`;
      const fileRef = storageRef($storage, fileName);
      
      const snapshot = await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  };

  return { uploadProjectImage };
};
```

---

## 🔄 Comparison

| Feature | Option 1 (URLs) | Option 2 (Firebase) |
|---------|----------------|---------------------|
| Setup Time | ⚡ Instant | ⏱️ 15 minutes |
| Performance | 🟡 Depends on host | 🟢 Fast (Firebase CDN) |
| Cost | 💰 Airtable plan | 🆓 Free (5GB) |
| Control | ❌ External | ✅ Full control |
| Reliability | 🟡 Depends on host | 🟢 Google infrastructure |
| Migration Effort | ✅ None | 🔧 One-time script |
| Can delete Airtable | ❌ No | ✅ Yes |

---

## 💡 Recommendations

### Use **Option 1** (Keep URLs) if:
- You want to get your site working ASAP
- Your images are already working fine
- You don't mind keeping Airtable around
- You're testing/prototyping

### Use **Option 2** (Firebase Storage) if:
- You want a production-ready solution
- You want to fully migrate off Airtable
- You want better performance
- You want full control over your assets
- You're building for the long term

---

## 🆘 Troubleshooting

### Images not downloading in migration script

**Error:** `Failed to download: 403`
- Airtable URLs might be protected
- Export images manually first

**Solution:**
1. Download images from Airtable manually
2. Place in a folder: `temp-images/project-id/`
3. Use manual upload method

### Storage permission denied

**Error:** `Permission denied in Firebase Storage`

**Solution:** Check Storage rules allow public read:
```javascript
allow read: if true;
```

### Image URLs returning 404

**Cause:** Token expired or file deleted

**Solution:** Generate new download URLs:
```javascript
import { ref as storageRef, getDownloadURL } from 'firebase/storage';

const fileRef = storageRef(storage, 'projects/id/hero.jpg');
const newURL = await getDownloadURL(fileRef);
```

---

## 🎯 My Recommendation

**For your portfolio site, I recommend Option 2 (Firebase Storage):**

1. **Run once:** Migrate images with the script
2. **Full control:** All assets in Firebase
3. **Better performance:** Faster load times
4. **Future-proof:** Can delete Airtable entirely
5. **Free:** Well within Firebase free tier

The migration script handles everything automatically!

---

## 📝 Next Steps

1. **Decide:** Option 1 (URLs) or Option 2 (Firebase)?
2. **If Option 1:** Nothing to do! Your current URLs work.
3. **If Option 2:** 
   - Enable Firebase Storage
   - Run `npm run migrate:images`
   - Verify in Firebase Console
   - Test your site

Questions? Check the console output during migration for detailed logging!
