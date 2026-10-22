# 🔄 Migration Scripts

Three options to migrate your project data to Firebase Firestore, choose the one that works best for your situation:

---

## ⚡ Option 1: Direct from Airtable (Recommended if API works)

Fetches data directly from Airtable API with automatic retry logic for rate limiting.

### Usage:
```bash
npm run migrate
```

### Features:
- ✅ Automatic retry with exponential backoff
- ✅ Handles 429 rate limit errors
- ✅ Up to 5 retry attempts with increasing wait times
- ✅ Preserves original Airtable IDs

### When to use:
- When you can access Airtable API (even with rate limits)
- First-time setup
- Most convenient method

### Note:
- May take several minutes if hitting rate limits
- Will wait and retry automatically
- Safe to re-run if it fails midway

---

## 📄 Option 2: From Airtable JSON Export

Import data from a manually exported Airtable JSON file.

### Step 1: Export from Airtable

**Method A - Using Airtable API (in browser console):**

1. Open your Airtable base
2. Open browser DevTools (F12)
3. Go to Console tab
4. Run this code (replace with your details):

```javascript
const apiKey = 'YOUR_AIRTABLE_API_KEY';
const baseId = 'YOUR_BASE_ID';
const tableName = 'YOUR_TABLE_NAME';

fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
  headers: { 'Authorization': `Bearer ${apiKey}` }
})
  .then(res => res.json())
  .then(data => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'airtable-export.json';
    a.click();
  });
```

**Method B - Manual CSV to JSON conversion:**

1. In Airtable, click the dropdown menu next to your view name
2. Select "Download CSV"
3. Use an online CSV to JSON converter
4. Format it to match the example structure

### Step 2: Save the JSON file

Save your exported data as:
```
scripts/airtable-export.json
```

See `scripts/airtable-export-example.json` for the expected format.

### Step 3: Run migration

```bash
npm run migrate:json
```

### When to use:
- When Airtable API is completely blocked
- When you want to review/edit data before migration
- When you have a backup JSON file

---

## ✍️ Option 3: Manual Entry

Manually enter your projects directly in the script file.

### Step 1: Edit the script

Open `scripts/migrate-manual.js` and edit the `PROJECTS` array:

```javascript
const PROJECTS = [
  {
    id: 'unique-project-id-1',
    name: 'My Awesome Project',
    image: 'https://example.com/hero.jpg',
    link: 'https://project-demo.com',
    status: 'active',
    fullPage: 'https://example.com/fullpage.jpg',
    subtitle: 'Project subtitle',
    category: ['Web Development'],
    order: 1,
    description: 'Full description here...',
    technology: 'Vue.js, Nuxt.js, Firebase',
    github: 'https://github.com/user/repo',
    font_color: '#000000',
    bg_color: '#1a73e8',
  },
  // Add more projects...
];
```

### Step 2: Run migration

```bash
npm run migrate:manual
```

### When to use:
- Small number of projects (< 5)
- Quick testing
- No access to Airtable at all
- You're entering new data

---

## 📊 Expected Data Structure

### Firestore Collection: `projects`

Each document will have:

```javascript
{
  // Original Airtable ID (optional)
  airtableId: "recXXXXXX",
  
  // Required fields
  id: "unique-id",
  name: "Project Name",
  order: 1,
  
  // Optional fields
  image: "https://url-to-hero-image.jpg",
  link: "https://project-demo.com",
  status: "active",
  fullPage: "https://url-to-fullpage-screenshot.jpg",
  subtitle: "Brief description",
  category: ["Web Development"],
  description: "Full markdown/HTML description",
  technology: "Vue.js, Nuxt.js",
  github: "https://github.com/user/repo",
  
  // Colors
  font_color: "#000000",
  bg_color: "#1a73e8",
  project_color: "#1a73e8",
  
  // Metadata (auto-generated)
  createdAt: "2024-01-24T00:00:00.000Z",
  updatedAt: "2024-01-24T00:00:00.000Z"
}
```

---

## 🔧 Troubleshooting

### "Firestore is not initialized"
- Check your `.env` file has all Firebase variables
- Verify Firebase project ID is correct

### "API_KEY or API_URL is missing"
- For Option 1 only: Check your `.env` has Airtable credentials
- For Options 2 & 3: You don't need Airtable credentials

### "Permission denied" in Firestore
- Update Firestore security rules (see `firestore.rules`)
- Apply rules in Firebase Console → Firestore → Rules tab

### Migration creates duplicate data
- All scripts use document IDs, so re-running will overwrite, not duplicate
- Safe to re-run if migration fails midway

### Still getting 429 errors (Option 1)
- Wait 60 seconds before retrying
- Use Option 2 (JSON export) or Option 3 (manual) instead
- Consider upgrading your Airtable plan

---

## 🧹 After Migration

1. **Verify in Firebase Console:**
   - Go to: https://console.firebase.google.com/
   - Navigate to Firestore Database
   - Check the `projects` collection

2. **Test your app:**
   ```bash
   npm run dev
   ```

3. **Clear old cache:**
   - Open browser DevTools → Application → Local Storage
   - Delete keys starting with `airtable_` or `firestore_`
   - Refresh the page

4. **Optional cleanup:**
   - Can remove Airtable API keys from `.env`
   - Keep migration scripts for future reference

---

## 📝 Notes

- **Document IDs:** Scripts use Airtable IDs or custom IDs as Firestore document IDs
- **Re-runnable:** All scripts can be safely re-run (will overwrite existing data)
- **Idempotent:** Running multiple times produces the same result
- **Backup:** Consider exporting from Firestore periodically for backups

---

## 🆘 Need Help?

See the main migration guide: `../FIRESTORE_MIGRATION_GUIDE.md`
