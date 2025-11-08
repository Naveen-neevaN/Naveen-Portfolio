# Personal Website

A modern, professional personal website built with Next.js, React, and TypeScript. Deployable to GitHub Pages.

## Features

- **Responsive Design**: Works beautifully on all devices
- **Professional Styling**: Clean, modern design with smooth animations
- **Sections**: About, Skills, Projects, and Contact
- **Easy Customization**: Centralized data file for easy updates
- **GitHub Pages Ready**: Configured for static export and deployment

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn installed

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd personal-website
```

2. Install dependencies:
```bash
npm install
```

3. Customize your information:
   - Edit `src/data/personalInfo.ts` with your personal information
   - Add your resume PDF to `public/resume.pdf`
   - Update `next.config.js` with your repository name (if different from 'personal-website')

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### Update Personal Information

Edit `src/data/personalInfo.ts` to update:
- Your name, title, email, phone, location
- Bio and about sections
- Skills list
- Projects portfolio
- Social media links

### Update Repository Name in Config

If your GitHub repository has a different name, update `next.config.js`:

```javascript
basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
```

### Add Resume

Place your resume PDF file in the `public/` directory as `resume.pdf`.

## Deployment to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

1. Push your code to GitHub
2. The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically build and deploy to the `gh-pages` branch
3. Go to your repository Settings > Pages
4. Set the source to `gh-pages` branch
5. Your site will be available at `https://yourusername.github.io/your-repo-name/`

### Option 2: Manual Deployment

1. Build the project:
```bash
npm run build
```

2. The static files will be in the `out/` directory
3. Push the `out/` directory contents to the `gh-pages` branch:
```bash
npm run deploy
```

Or manually:
```bash
git subtree push --prefix out origin gh-pages
```

## Project Structure

```
personal-website/
├── public/              # Static assets (images, resume)
├── src/
│   ├── app/            # Next.js app directory
│   ├── components/     # React components
│   └── data/           # Data files
├── .github/
│   └── workflows/      # GitHub Actions
└── next.config.js      # Next.js configuration
```

## Technologies Used

- **Next.js 14**: React framework
- **TypeScript**: Type safety
- **React Icons**: Icon library
- **CSS Modules**: Component styling

## License

This project is open source and available under the MIT License.

