# Artico Dental - Daily Deposit App

## Deployment Instructions

### Your Supabase is already set up! Here's what's left:

---

### STEP 1: Create a GitHub Repository

1. Go to **github.com** and sign in
2. Click the **"+"** button in the top right → **"New repository"**
3. Name it: `artico-deposits`
4. Make sure **"Public"** is selected (Vercel free tier requires public repos)
5. Click **"Create repository"**
6. You'll see a page with instructions — leave this tab open

---

### STEP 2: Upload these files to GitHub

**Option A: Upload via browser (easiest — no coding)**

1. On your new repo page, click **"uploading an existing file"** link
2. Drag ALL the files and folders from this project into the upload area:
   - `package.json`
   - `vite.config.js`
   - `index.html`
   - `src/` folder (contains `main.jsx`, `App.jsx`, `supabase.js`)
3. Click **"Commit changes"**

**Important:** Make sure the `src` folder structure is preserved. You should see:
```
artico-deposits/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    └── supabase.js
```

---

### STEP 3: Deploy on Vercel

1. Go to **vercel.com** and sign in (with GitHub)
2. Click **"Add New..."** → **"Project"**
3. You'll see your GitHub repos listed — find **"artico-deposits"** and click **"Import"**
4. Leave all settings as default (Vercel auto-detects Vite)
5. Click **"Deploy"**
6. Wait about 1-2 minutes for it to build
7. You'll get a URL like: `artico-deposits.vercel.app`

**That's it! Share that URL with your staff at all 4 offices.**

---

### Office PINs
- Artico Dental Mesquite: 5150
- Artico Dental Duncanville: 5116
- Artico Dental Dallas: 5231
- Fundamental Dental: 5243
- Owner/Reports: 311900

### Notes
- All data is stored in your Supabase database — shared across all offices
- PINs can be changed from the Owner → Settings tab
- The app works on phones, tablets, and desktops
- Free tier covers everything you need

### If you need help
Come back to Claude and say "I need help deploying the deposit app" — I have all the context from our conversation.
