# 🔥 Firestore Migration Guide

This guide will help you migrate your project data from Airtable to Firebase Firestore to avoid rate limiting issues.

## 📋 Prerequisites

- ✅ Firebase project configured (already done!)
- ✅ Firestore enabled in Firebase Console
- ✅ Environment variables set up

## 🚀 Step-by-Step Migration

### Step 1: Enable Firestore in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `twofortytwo-16fb2`
3. Click on **Firestore Database** in the left sidebar
4. If not already enabled, click **Create Database**
5. Choose **Start in production mode** (or test mode for development)
6. Select your preferred location (closest to your users)

### Step 2: Install Dependencies

```bash
npm install
```

This will install `dotenv` package needed for the migration script.

### Step 3: Verify Your Environment Variables

Make sure your `.env` file contains:

```env
# Airtable (for migration)
API_KEY=your_airtable_api_key
API_URL=your_airtable_api_url

# Firebase
FIREBASE_API_KEY=AIzaSyBxpFhxfwAFzwxRx0xA2lomY2NRugufUrY
FIREBASE_AUTH_DOMAIN=twofortytwo-16fb2.firebaseapp.com
FIREBASE_DATABASE_URL=https://twofortytwo-16fb2-default-rtdb.firebaseio.com
FIREBASE_PROJECT_ID=twofortytwo-16fb2
FIREBASE_STORAGE_BUCKET=twofortytwo-16fb2.appspot.com
FIREBASE_MESSAGING_SENDER_ID=119815109429
FIREBASE_APP_ID=1:119815109429:web:e05faa089f27677b0eea7c
```

### Step 4: Run the Migration Script

```bash
npm run migrate
```

This will:
- ✅ Fetch all projects from Airtable
- ✅ Transform the data structure
- ✅ Upload to Firestore `projects` collection
- ✅ Keep the original Airtable IDs for reference

**Expected Output:**
```
🚀 Starting migration from Airtable to Firestore...

📥 Fetching data from Airtable...
✅ Fetched 5 projects from Airtable

✅ Migrated: Project Name 1 (Order: 1)
✅ Migrated: Project Name 2 (Order: 2)
...

🎉 Migration completed successfully!
📊 Total projects migrated: 5

🔥 Check your Firestore console to verify the data.
```

### Step 5: Verify Data in Firestore

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Navigate to **Firestore Database**
3. You should see a `projects` collection
4. Click on it to view all your project documents

### Step 6: Test the Updated Application

```bash
npm run dev
```

Visit `http://localhost:3000` and verify:
- ✅ Projects load correctly
- ✅ No 429 errors in console
- ✅ Project details pages work
- ✅ Data matches your Airtable data

## 🔧 Firestore Collection Structure

**Collection:** `projects`

**Document Structure:**
```javascript
{
  // Original Airtable ID (for reference)
  airtableId: "recXXXXXXXXXXXXXX",
  
  // Project data
  name: "Project Name",
  image: "https://example.com/hero-image.jpg",
  link: "https://project-demo.com",
  status: "active",
  fullPage: "https://example.com/full-page.jpg",
  subtitle: "Project subtitle",
  category: ["Web Development"],
  project_color: "#1a73e8",
  order: 1,
  description: "Project description in markdown",
  technology: "Vue.js, Nuxt.js, Firebase",
  github: "https://github.com/username/repo",
  font_color: "#000000",
  bg_color: "#1a73e8",
  
  // Metadata
  createdAt: "2024-01-24T00:00:00.000Z",
  updatedAt: "2024-01-24T00:00:00.000Z"
}
```

## ✨ Benefits of Firestore

### ✅ No Rate Limiting
- Firestore has generous free tier quotas
- 50,000 reads per day (free tier)
- 20,000 writes per day (free tier)

### ✅ Real-time Updates (Optional)
- Can enable real-time listeners in the future
- Instant updates across all clients

### ✅ Offline Support
- Data persists even offline
- Automatic synchronization when back online

### ✅ Better Performance
- Fast reads with indexing
- Global CDN distribution
- No third-party API latency

## 📝 Updating Data

### Manual Updates via Firebase Console
1. Go to Firestore Database
2. Navigate to `projects` collection
3. Click on a document
4. Edit fields directly
5. Save

### Programmatic Updates
You can create admin scripts similar to the migration script to bulk update data.

## 🔄 Future Updates

If you need to add new projects or update existing ones:

### Option 1: Firebase Console (Easy)
- Use the web interface to add/edit documents

### Option 2: Admin Script (Bulk operations)
- Create scripts similar to `migrate-to-firestore.js`
- Useful for bulk updates

### Option 3: Admin Panel (Recommended for frequent updates)
- Build a simple admin panel in your app
- Add authentication
- CRUD operations for projects

## 🧹 Clean Up (Optional)

After successful migration and testing:

1. You can remove Airtable-related environment variables:
   - `API_KEY`
   - `API_URL`

2. Archive the migration script (don't delete, keep for reference)

## 🆘 Troubleshooting

### "Firestore is not initialized"
- Make sure your app is running in client mode
- Check that Firebase plugin is loaded

### "Permission denied"
- Update Firestore security rules
- Go to: Firebase Console > Firestore > Rules

**Development Rules (Insecure - for testing only):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{project} {
      allow read: if true;  // Anyone can read
      allow write: if false; // No one can write (manage via console/scripts)
    }
  }
}
```

**Production Rules (Recommended):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{project} {
      allow read: if true;  // Public read access
      allow write: if request.auth != null && request.auth.token.admin == true; // Only admins can write
    }
  }
}
```

### Migration fails with 429 error
- The migration script only runs once
- If it fails midway, you can safely re-run it
- Documents with same ID will be overwritten

## 📊 Monitoring

Keep an eye on your Firestore usage:
1. Firebase Console > Usage and billing
2. Monitor read/write operations
3. Set up budget alerts if needed

## 🎉 Done!

Your portfolio now uses Firestore instead of Airtable:
- ✅ No more rate limiting errors
- ✅ Faster performance
- ✅ Better caching
- ✅ Offline support
- ✅ Free tier is generous

If you have any issues, check the console logs for detailed error messages.
