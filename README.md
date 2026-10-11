# Personal Website

A modern, professional personal website built with Next.js, React, and plain CSS. Deployable to GitHub Pages as a static export.

## Features

- **Responsive Design**: Works beautifully on all devices
- **Professional Styling**: Glassmorphism UI, smooth animations, and CSS-variable themes
- **Sections**: About, Skills, Projects, and Contact
- **Easy Customization**: Centralized data file for easy updates
- **GitHub Pages Ready**: Configured for static export and deployment

## Getting Started

### Prerequisites

- Node.js 20+ and npm installed

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
   - Edit `src/data/personalInfo.js` with your personal information
   - Add/replace visual assets in `public/`
   - Configure EmailJS values in `.env.local` using `.env.example` as the template
   - Set `NEXT_PUBLIC_BASE_PATH` when deploying to a custom subpath, if needed

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### Update Personal Information

Edit `src/data/personalInfo.js` to update:
- Your name, title, email, phone, location
- Bio and about sections
- Skills list
- Projects portfolio
- Social media links
- About subsection cards and carousel images

### Configure EmailJS

Create `.env.local` for local development:

```bash
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN=your_admin_template_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_AUTO=your_auto_reply_template_id
```

For GitHub Pages, add these values as repository secrets:
`NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`, `NEXT_PUBLIC_EMAILJS_SERVICE_ID`,
`NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN`, and `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_AUTO`.
The workflow injects them into the static build.

Configure the **To Email** and **Reply To** fields inside both EmailJS templates as well. See [EMAILJS_SETUP.md](EMAILJS_SETUP.md) for the exact recipient values and the contact form's delivery-status behaviour.

For this portfolio's current EmailJS templates, the owner-notification ID is `template_grhlujf` and the visitor-acknowledgement ID is `template_psfmd3n`. Keep the GitHub Actions secrets aligned with that mapping.

### Base Path

`next.config.js` computes `basePath` and `assetPrefix` from `NEXT_PUBLIC_BASE_PATH`. In production it defaults to `/Naveen-Portfolio`, which matches this repository's GitHub Pages URL.

## Deployment to GitHub Pages

1. Push your code to GitHub
2. The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically build and deploy to the `gh-pages` branch
3. Go to your repository Settings > Pages
4. Set the source to GitHub Actions
5. Your site will be available at `https://yourusername.github.io/your-repo-name/`

### Manual Build

1. Build the project:
```bash
npm run build
```

2. The static files will be in the `out/` directory

## Testing

Run the Playwright suite after starting the app locally:

```bash
npm run dev
npm run test:e2e:ci
```

If port `3000` is already in use, start Next.js on another port and point the tests at it:

```bash
npm run dev -- -p 3001
$env:E2E_BASE_URL='http://localhost:3001'; npm run test:e2e:ci
```

## Project Structure

```
personal-website/
├── public/              # Static assets (images, resume)
├── src/
│   ├── app/            # Next.js app directory
│   ├── components/     # React components
│   ├── data/           # Centralized portfolio data
│   ├── hooks/          # Shared browser hooks
│   └── lib/            # Asset/theme utilities
├── .github/
│   └── workflows/      # GitHub Actions
└── next.config.js      # Next.js configuration
```

## Technologies Used

- **Next.js 16**: React framework
- **React 19**: UI library
- **TypeScript**: Type checking support
- **React Icons**: Icon library
- **Plain CSS**: Global variables plus component CSS files
- **EmailJS**: Client-side contact form delivery
- **Playwright**: End-to-end tests

## License

This project is open source and available under the MIT License.
