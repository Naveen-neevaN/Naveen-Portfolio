# Customization Guide

This guide will help you customize your personal website with your own information.

## Quick Start

1. **Update Personal Information**
   - Edit `src/data/personalInfo.ts`
   - Replace all placeholder values with your actual information

2. **Update Repository Name**
   - Edit `next.config.js`
   - Change `basePath` and `assetPrefix` to match your GitHub repository name
   - Example: If your repo is `github.com/username/my-website`, use `/my-website`

3. **Add Your Resume**
   - Place your resume PDF file in the `public/` folder as `resume.pdf`

4. **Customize Content**
   - Update bio, about section, skills, and projects in `src/data/personalInfo.ts`
   - Modify component styles in `src/components/*.css` if needed

## Contact Form Setup

The contact form currently simulates form submission. To make it functional, you have several options:

### Option 1: Formspree (Recommended for beginners)
1. Sign up at https://formspree.io
2. Create a new form and get your form endpoint
3. Update `src/components/Contact.tsx` to send POST request to your Formspree endpoint

### Option 2: EmailJS
1. Sign up at https://www.emailjs.com
2. Set up email service
3. Update `src/components/Contact.tsx` to use EmailJS SDK

### Option 3: Custom Backend API
1. Create your own API endpoint
2. Update the `handleSubmit` function in `src/components/Contact.tsx`

## Deployment

### GitHub Pages Setup

1. **Update basePath in next.config.js**
   ```javascript
   basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
   assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
   ```

2. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Source: GitHub Actions
   - The workflow will automatically deploy on push to main branch

4. **Your site will be live at:**
   `https://yourusername.github.io/your-repo-name/`

## Styling Customization

### Colors
Edit CSS variables in `src/app/globals.css`:
- `--primary-color`: Main brand color
- `--text-primary`: Main text color
- `--bg-primary`: Background color

### Fonts
Update the `font-family` in `src/app/globals.css` to use your preferred fonts.

## Adding New Sections

1. Create a new component in `src/components/`
2. Add it to `src/app/page.tsx`
3. Add navigation link in `src/components/Header.tsx`

## Need Help?

- Check the README.md for general information
- Review Next.js documentation: https://nextjs.org/docs
- GitHub Pages documentation: https://docs.github.com/en/pages

