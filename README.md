# Creo Portal

> A comprehensive online design services management platform that streamlines the entire design project lifecycle from initial inquiry to final delivery.

## 🎨 Overview

Creo Portal is a full-featured web application designed to connect clients with talented designers while providing robust project management capabilities. The platform facilitates seamless collaboration between clients, designers, and administrators, ensuring smooth project execution from start to finish.

## ✨ Features

### For Clients
- **Easy Project Submission**: Intuitive multi-step form for submitting design requests
- **Designer Selection**: Browse and select from a curated list of designers based on portfolio and expertise
- **Project Tracking**: Real-time dashboard to monitor project progress
- **File Management**: Secure upload and download of project assets
- **Communication Hub**: Direct messaging with assigned designers

### For Designers
- **Portfolio Management**: Showcase work samples and maintain professional profiles
- **Project Dashboard**: View assigned projects and deadlines
- **Submission Review**: Access detailed project briefs and requirements
- **Time Tracking**: Monitor project timelines and deliverables
- **Performance Analytics**: Track completed projects and client satisfaction

### For Administrators
- **User Management**: Complete control over user accounts and permissions
- **Project Assignment**: Allocate projects to designers based on expertise and availability
- **Status Tracking**: Monitor all active projects across the platform
- **Analytics Dashboard**: Comprehensive statistics on platform usage and performance
- **Designer Management**: Onboard, evaluate, and manage designer profiles

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library for building interactive interfaces
- **TypeScript** - Type-safe JavaScript for robust development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Data fetching and state management

### Backend & Infrastructure
- **Supabase** - Backend-as-a-Service for authentication, database, and real-time features
  - PostgreSQL database
  - Row Level Security (RLS)
  - Real-time subscriptions
  - File storage for project assets

### Additional Libraries
- **Cloudflare Turnstile** - Bot protection and security
- **Shadcn/UI** - Accessible and customizable UI components
- **Bun** - Fast JavaScript runtime and package manager

## 📁 Project Structure

```
creo-portal/
├── public/                    # Static assets
├── src/
│   ├── components/           # React components
│   │   ├── auth/            # Authentication components
│   │   ├── dashboard/       # Dashboard components
│   │   │   ├── submissions/ # Submission management
│   │   │   └── ...         # Role-specific dashboards
│   │   ├── home/           # Landing page components
│   │   ├── project-form/   # Multi-step project form
│   │   │   ├── designer-selection/
│   │   │   ├── fields/
│   │   │   └── style-selection/
│   │   └── ui/             # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   │   ├── mutations/      # Data mutation hooks
│   │   └── queries/        # Data fetching hooks
│   ├── integrations/       # Third-party integrations
│   │   └── supabase/       # Supabase client and types
│   ├── lib/                # Utility libraries
│   ├── pages/              # Page components
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Helper functions
└── supabase/               # Supabase configuration and migrations
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+ or Bun runtime
- Supabase account
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/creo-portal.git
   cd creo-portal
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_TURNSTILE_SITE_KEY=your_turnstile_site_key
   ```

4. **Database Setup**
   ```bash
   # Run Supabase migrations
   supabase db push
   ```

5. **Start Development Server**
   ```bash
   bun dev
   # or
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 📝 Available Scripts

```bash
# Development
bun dev              # Start development server
bun build            # Build for production
bun preview          # Preview production build

# Testing
bun test             # Run tests
bun lint             # Run ESLint

# Database
bun db:migrate       # Run database migrations
bun db:seed          # Seed database with sample data
```

## 🔑 User Roles

### Client
- Submit design requests
- Track project progress
- Communicate with designers
- Download deliverables

### Designer
- Manage portfolio
- Accept/decline projects
- Upload deliverables
- Update project status

### Administrator
- Full system access
- User management
- Project oversight
- Platform configuration

## 🌐 Key Pages

- `/` - Landing page with service information
- `/login` - User authentication
- `/register` - New user registration
- `/dashboard` - Role-based dashboard
- `/start-project` - New project submission form
- `/about` - About the platform
- `/contact` - Contact information
- `/shop` - Browse design services
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/cookies` - Cookie policy

## 🔒 Security Features

- **Authentication**: Secure JWT-based authentication via Supabase
- **Authorization**: Role-based access control (RBAC)
- **Data Protection**: Row Level Security (RLS) policies
- **Bot Protection**: Cloudflare Turnstile integration
- **File Security**: Secure file upload with validation
- **HTTPS**: Enforced secure connections

## 📄 License

This project is proprietary software. All rights reserved.


## 🚦 Development Status

🟢 **Active Development** - Regular updates and new features being added

---