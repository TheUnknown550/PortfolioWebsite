# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS featuring a dynamic roadmap, project showcase, and honors & awards gallery.

## Features

- 🌟 **Modern Design**: Clean, responsive design with light/dark theme toggle
- 📱 **Mobile-First**: Fully responsive across all device sizes
- 🛣️ **Interactive Roadmap**: Timeline view of career milestones with filtering and modal details
- 💼 **Project Showcase**: Sortable project gallery with detailed descriptions and skills
- 🏆 **Honors & Awards**: Gallery with image lightbox and sorting capabilities
- 🎨 **Smooth Animations**: Page transitions and loading skeletons for better UX
- ♿ **Accessible**: Keyboard navigation and screen reader friendly
- 🚀 **Performance**: Optimized loading with lazy images and efficient rendering

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4.1
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Modals**: React Modal
- **Icons**: Heroicons (via SVG)

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TheUnknown550/PortfolioWebsite.git
cd PortfolioWebsite
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Data Configuration

All content is stored in `public/data.json`. Update this file to customize:

- Personal information and bio
- Education details
- Skills (hard, soft, languages)
- Projects and experiences
- Honors and awards
- Roadmap events

### Data Structure

```json
{
  "profile": {
    "name": "Your Name",
    "bio": "Your bio description",
    "education": [...],
    "skills": {
      "hard": [...],
      "soft": [...],
      "languages": [...]
    },
    "projects": [...],
    "honors": [...]
  },
  "roadmap": [...]
}
```

## Deployment

### Building for Production

1. Build the project:
```bash
npm run build
```

2. The build output will be in the `dist/` directory.

### Deploy to Ubuntu Server

After building, deploy to your Ubuntu server using these commands:

```bash
# Remove old files
sudo rm -rf /var/www/mattcosh/*

# Copy new build files
sudo cp -r dist/* /var/www/mattcosh/

# Restart web server (if needed)
sudo systemctl reload nginx
```

> **Note**: Replace `/var/www/mattcosh/` with your actual web server directory path.

### Alternative Deployment Options

- **Netlify**: Connect your GitHub repo for automatic deployments
- **Vercel**: Push to deploy with zero configuration
- **GitHub Pages**: Use GitHub Actions for automated deployment

## Customization

### Theme Colors

The website uses a sky blue color scheme. To customize colors, update the Tailwind classes in components:

- Primary: `sky-400`, `sky-500`, `sky-700`
- Dark mode: `sky-200`, `sky-300`, `sky-900`

### Adding New Sections

1. Create a new component in `src/`
2. Add routing in `src/App.tsx`
3. Update navigation in the header
4. Add data structure to `public/data.json`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Portfolio**: [Your Website URL]
- **GitHub**: [@TheUnknown550](https://github.com/TheUnknown550)
- **Email**: [Your Email]

---

Built with ❤️ using React and TypeScript
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
