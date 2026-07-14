# Djamel Eddine Khelifaoui — Portfolio

A modern, highly-polished, and fully responsive single-page developer portfolio. Built to showcase professional experience, projects, skills, and academic research with a focus on premium UI design and user experience.

---

## ✨ Features

- **Premium Aesthetics:** Clean, modern design featuring glassmorphism, subtle gradients, and sophisticated micro-animations.
- **Dynamic Theming:** Production-ready Light & Dark mode support. Adapts automatically to the user's OS preference (`prefers-color-scheme`) with persistent `localStorage` and FOIUC (Flash of Unstyled Content) prevention.
- **Interactive SVG Illustration:** Features a custom typewriter-animated software engineering illustration that perfectly synchronizes with the current theme.
- **Responsive Architecture:** Fully responsive layout with an elegant sliding mobile navigation drawer built with Framer Motion.
- **Modular Sections:** Organized into logical, easily customizable components (Hero, About, Experience, Research, Projects, Skills, Education, Achievements, and Contact).
- **SEO Optimized:** Semantic HTML structure with proper meta tags for search engines and social sharing.

## 🛠️ Tech Stack

This project is built using modern web development standards and tools:

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Components:** Radix UI primitives & Custom UI components
- **Language:** TypeScript

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/djamel-eddine-kh/portfolio.git
   cd portfolio/portfolio-standalone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```
   The application will be available at `http://localhost:5173`.

### Building for Production

To create an optimized production build:
```bash
npm run build
# or
pnpm build
# or
yarn build
```
You can preview the built application locally using:
```bash
npm run preview
```

## 📁 Project Structure

The codebase is organized to promote modularity and ease of maintenance:

```text
portfolio-standalone/
├── public/                  # Static assets (images, interactive SVGs, etc.)
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── sections/        # Individual portfolio sections (Hero, About, etc.)
│   │   ├── ui/              # Base UI components (buttons, dialogs, etc.)
│   │   ├── Navbar.tsx       # Main navigation header
│   │   ├── ThemeToggle.tsx  # Light/Dark mode toggle
│   │   └── ThemeProvider.tsx# React context for theme state management
│   ├── App.tsx              # Root application component defining the layout
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global stylesheets and Tailwind configurations
├── index.html               # HTML template (includes FOIUC prevention script)
├── package.json             # Project metadata and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

## 🎨 Customization

Updating the portfolio content is straightforward. All section data is located within `src/components/sections/`. 

- To update your **work history**, edit `Experience.tsx`.
- To showcase new **projects**, modify the array in `Projects.tsx`.
- To update your **contact information**, adjust `Contact.tsx`.
- To tweak the **theme colors**, modify the CSS variables in `src/index.css`.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE). Feel free to use it as inspiration for your own portfolio!

---

*Designed & Built by [Djamel Eddine Khelifaoui](https://github.com/djamel-eddine-kh).*
