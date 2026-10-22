# Firebase Setup Instructions

## Step 1: Re-authenticate with Firebase
Run this command in your terminal:
```bash
firebase login
```

## Step 2: Find Your Project ID
After logging in, run:
```bash
firebase hosting:sites:list
```

This will show you all your hosting sites and their associated project IDs. Look for the site `oscar-mcintosh-c5f0` and note its project ID.

## Step 3: Update .firebaserc
Once you know the correct project ID, update the `.firebaserc` file:
```json
{
  "projects": {
    "default": "YOUR_PROJECT_ID_HERE"
  }
}
```

## Step 4: Deploy
```bash
npm run generate
firebase deploy --only hosting
```

## Alternative: Re-initialize Firebase
If you're unsure, you can re-initialize:
```bash
firebase init hosting
```
Then select:
- Use an existing project
- Select the project that contains `oscar-mcintosh-c5f0`
- Public directory: `.output/public` (or `public` if you prefer)
- Configure as single-page app: Yes
