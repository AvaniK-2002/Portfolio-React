# Vercel Deployment Guide

## Issues Fixed

The blank screen issue on Vercel was caused by several configuration problems:

### 1. Base Path Configuration
- **Problem**: App was configured for GitHub Pages subdirectory (`/Portfolio-React/`)
- **Solution**: Changed to relative paths (`./`) for Vercel compatibility

### 2. Router Basename
- **Problem**: BrowserRouter had `basename="/Portfolio-React"` 
- **Solution**: Removed basename for root deployment on Vercel

### 3. Loader Timeout Conflicts
- **Problem**: Conflicting timeout values (1.5s vs 2s) prevented loader from disappearing
- **Solution**: Synchronized timeouts and reduced to 1.2s for faster loading

### 4. Missing Vercel Configuration
- **Problem**: No specific Vercel routing configuration
- **Solution**: Added `vercel.json` for proper SPA routing

## Deployment Steps

### 1. Push Changes to Git
```bash
git add .
git commit -m "Fix Vercel deployment configuration"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your `Portfolio-React` repository
5. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./project` (since your project is in the project folder)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Environment Variables (if needed)
If you're using EmailJS functionality, add these environment variables in Vercel dashboard:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID` 
- `VITE_EMAILJS_PUBLIC_KEY`

### 4. Deploy
Click "Deploy" and wait for the build to complete.

## Alternative: Manual Vercel CLI
If you prefer using Vercel CLI:
```bash
npm install -g vercel
cd project
vercel
```

## Troubleshooting
If you still see a blank screen:
1. Check browser console for JavaScript errors
2. Verify all imports are correct
3. Ensure all dependencies are properly installed
4. Check if the build completed without errors in Vercel dashboard

## Files Modified
- `vite.config.js` - Changed base path to relative
- `src/main.jsx` - Removed BrowserRouter basename
- `src/App.jsx` - Reduced loader timeout
- `src/components/Loader.jsx` - Reduced loader timeout
- `vercel.json` - Added for SPA routing
- `.vercelignore` - Added to exclude unnecessary files