# ShortIQ - Your Faceless Content Empire

ShortIQ is a premium, AI-powered video generation platform designed to help content creators build and scale faceless channel empires with ease. From automated scripting to high-performance rendering and direct social publishing, ShortIQ provides everything you need to dominate the short-form content landscape.

## 🚀 Key Features

- **Automated AI Scripting**: Generate viral-ready scripts tailored for TikTok, Reels, and Shorts.
- **High-Performance Rendering**: Fast, reliable video generation powered by high-end infrastructure.
- **Premium Design System**: A sleek, modern dashboard with glassmorphism and smooth micro-animations.
- **Full Mobile Responsiveness**: Seamless experience across all devices with a specialized mobile sidebar and adaptive grids.
- **Integrated Billing**: Simple, tiered subscription plans ($0, $7, $10) managed via Clerk & Stripe.
- **Direct Social Publishing**: Connect your YouTube, TikTok, and Instagram accounts to publish directly from the dashboard.
- **Guided Onboarding**: Comprehensive in-app guide to help you master every feature.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org) (App Router, Turbopack)
- **Styling**: Vanilla CSS with Tailwind-inspired utilities
- **Authentication**: [Clerk](https://clerk.com)
- **Database**: Supabase
- **Rendering**: Custom rendering pipeline with Creatomate integration
- **Workflow**: Inngest for robust background processing
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📱 Mobile-First Experience

ShortIQ has been meticulously optimized for mobile. Whether you're tracking your latest series or initiating a new generation on the go, the interface remains intuitive and fast:
- **Slide-over Sidebar**: Easy navigation on small screens.
- **Adaptive Grids**: Content stacks perfectly on mobile viewports.
- **Touch-Optimized Interaction**: Elements are sized for easy tapping.

## 📈 Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
   Create a `.env.local` file with your Clerk, Supabase, and Creatomate credentials.
4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📜 Maintenance Scripts

- `npm run inngest:dev`: Start the Inngest Dev Server locally for background task debugging.
- `npx tsc --noEmit`: Run type checks across the codebase.

---

Built with ❤️ for Content Creators.
