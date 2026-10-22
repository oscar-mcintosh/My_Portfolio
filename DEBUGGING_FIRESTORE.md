# 🔍 Debugging Firestore Projects Display

## ✅ Changes Made

### 1. **Updated `components/ProjectFilter.vue`**
- ✅ Added `onMounted` hook to fetch projects from Firestore
- ✅ Added loading state with spinner
- ✅ Added "no projects" message if collection is empty
- ✅ Better error handling

### 2. **Updated `stores/projectStore.js`**
- ✅ Better error handling for Firestore queries
- ✅ Fallback if Firestore index doesn't exist
- ✅ Client-side sorting as backup
- ✅ Enhanced logging for debugging

---

## 🔍 Debugging Steps

### Step 1: Open Browser Console

Press `F12` and look for these console messages:

#### ✅ **Success Messages (What You Should See):**
```
🔍 ProjectFilter: Fetching projects...
🔥 Fetching projects from Firestore...
✅ Successfully fetched X projects from Firestore
📋 Projects: [array of projects]
💾 Projects saved to cache
📊 Projects loaded: X
```

#### ❌ **Error Messages (What to Look For):**

**1. "Firestore is not initialized"**
```
❌ Error fetching data from Firestore: Error: Firestore is not initialized
```
**Solution:** Check that Firebase plugin is loaded correctly.

**2. "Missing or insufficient permissions"**
```
FirebaseError: Missing or insufficient permissions
```
**Solution:** Update Firestore security rules (see below).

**3. "Collection doesn't exist"**
```
✅ Successfully fetched 0 projects from Firestore
```
**Solution:** Your Firestore collection is empty. Need to migrate data.

---

## 🔥 Check Firestore Console

### 1. Go to Firebase Console
Visit: https://console.firebase.google.com/

### 2. Select Your Project
Click on: `twofortytwo-16fb2`

### 3. Go to Firestore Database
Left sidebar → **Firestore Database**

### 4. Check the `projects` Collection

**What you should see:**
```
Firestore Database
└── projects (collection)
    ├── recABC123 (document)
    │   ├── name: "Project Name"
    │   ├── image: "https://..."
    │   ├── order: 1
    │   └── ... more fields
    ├── recDEF456 (document)
    └── ... more documents
```

**If you see:**
- ✅ **Collection exists with documents** → Good! Check security rules
- ❌ **No `projects` collection** → Need to run migration
- ❌ **Empty `projects` collection** → Need to add data

---

## 🔒 Firestore Security Rules

### Check Current Rules

1. In Firebase Console → Firestore → **Rules** tab
2. You should see something like this:

**Correct Rules (Public Read):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{project} {
      allow read: if true;  // Anyone can read
      allow write: if false; // No public writes
    }
  }
}
```

### If Rules Are Wrong

**Update to:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{project} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

Click **Publish** after editing.

---

## 📊 If Collection is Empty - Migrate Data

### Option A: Browser Console Export (Recommended)

1. Open your Airtable base
2. Press `F12` → Console
3. Run this (replace with YOUR credentials):

```javascript
const apiKey = 'YOUR_AIRTABLE_KEY';
const baseId = 'YOUR_BASE_ID';
const tableName = 'YOUR_TABLE_NAME';

fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
  headers: { 'Authorization': `Bearer ${apiKey}` }
})
  .then(res => res.json())
  .then(data => {
    console.log('Data fetched:', data);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'airtable-export.json';
    a.click();
  });
```

4. Save as: `scripts/airtable-export.json`
5. Run: `npm run migrate:json`

### Option B: Manual Entry (Few Projects)

1. Edit `scripts/migrate-manual.js`
2. Add your projects
3. Run: `npm run migrate:manual`

### Option C: Retry Automatic Migration

Wait 60 seconds, then:
```bash
npm run migrate
```

---

## 🧪 Test Projects Display

### 1. Clear Cache
```javascript
// In browser console:
localStorage.clear();
```

### 2. Refresh Page
Press `Ctrl+Shift+R` (hard refresh)

### 3. Check Console
Should see:
```
🔍 ProjectFilter: Fetching projects...
🔥 Fetching projects from Firestore...
✅ Successfully fetched X projects from Firestore
📊 Projects loaded: X
```

### 4. Check Page
- ✅ Projects should appear
- ✅ Category filters should work
- ✅ Can click on projects

---

## 🔧 Common Issues & Fixes

### Issue 1: Blank Page with Loading Spinner Forever

**Cause:** Firestore not loading or permissions issue

**Fix:**
1. Check browser console for errors
2. Verify Firebase config in `.env`
3. Check Firestore security rules

### Issue 2: "No projects found" Message

**Cause:** Firestore collection is empty

**Fix:** Run migration (see above)

### Issue 3: Projects Load but Images Don't Show

**Cause:** Image URLs are broken or null

**Fix:**
1. Check Firestore documents have valid `image` field URLs
2. Update documents with correct image URLs

### Issue 4: Some Projects Missing

**Cause:** Projects might be filtered out

**Fix:**
1. Click "All" category button
2. Check `status` field in Firestore (should be "active")
3. Check console logs for what was fetched

---

## 📝 Manual Firestore Document Check

In Firestore Console, click on any document and verify it has:

**Required Fields:**
- ✅ `name` (string)
- ✅ `image` (string URL)
- ✅ `order` (number)

**Optional Fields:**
- `link`, `status`, `fullPage`, `subtitle`, `category`, `description`, `technology`, `github`, `font_color`, `bg_color`

**Example Document:**
```json
{
  "name": "SQL Data Analysis Project",
  "image": "https://example.com/image.jpg",
  "order": 1,
  "status": "active",
  "category": ["Data Analysis"],
  "link": "https://project-demo.com",
  "description": "Project description here",
  "technology": "SQL, Snowflake, Python",
  "bg_color": "#1a73e8",
  "font_color": "#000000"
}
```

---

## 🎯 Quick Checklist

- [ ] Firestore Database is enabled
- [ ] `projects` collection exists
- [ ] Collection has documents
- [ ] Security rules allow public read
- [ ] `.env` file has correct Firebase credentials
- [ ] Browser console shows no errors
- [ ] Page refreshed after changes
- [ ] Cache cleared

---

## 🆘 Still Not Working?

### Check These Console Logs:

1. **On page load:**
```
🔍 ProjectFilter: Fetching projects...
```
If missing: Component not mounting properly.

2. **During fetch:**
```
🔥 Fetching projects from Firestore...
```
If missing: Store method not being called.

3. **After fetch:**
```
✅ Successfully fetched X projects from Firestore
```
If X is 0: Collection is empty or permissions issue.

4. **Final count:**
```
📊 Projects loaded: X
```
If missing: Error occurred during fetch.

### Share Console Output

If still having issues, share the complete console output from page load.

---

## ✨ Next Steps After Projects Display

Once projects are showing:

1. **Test navigation:** Click on projects to view details
2. **Test filtering:** Click category buttons
3. **Test responsiveness:** Resize browser window
4. **Deploy:** Build and deploy to Firebase hosting

```bash
npm run deploy
```
