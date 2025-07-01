# Aurelius - AI Stoic Philosophy Mentor Platform

> Real-time Stoic guidance at your fingertips. Get personalized wisdom from ancient philosophy for modern challenges, 24/7.

**Aurelius** is a Next.js web application that provides AI-powered voice conversations with virtual Stoic philosophy mentors. Users can create custom mentors, engage in real-time philosophical discussions, and track their personal development journey through Stoic practices.

## ✨ Features

### 🧠 AI-Powered Voice Mentors
- **Real-time voice conversations** with AI mentors using VAPI (Voice AI Platform)
- **Custom mentor creation** with personalized voices, styles, and philosophical specialties
- **Animated visual feedback** with Lottie animations during conversations
- **Session recording and transcription** for review and reflection

### 📚 Stoic Philosophy Integration
- **25+ Stoic practices** including meditation, journaling, negative visualization, and virtue ethics
- **Core virtue focus** on Wisdom, Courage, Justice, and Temperance
- **24+ specialized areas** covering emotional mastery, life challenges, and daily practices
- **Historical context** with quotes and teachings from Marcus Aurelius, Epictetus, and Seneca

### 👤 Personal Development Tracking
- **Session history** with detailed practice logs and duration tracking
- **Custom mentor library** with user-created philosophical guides
- **Progress dashboard** showing completed lessons and created mentors
- **Practice filtering** and search functionality

### 🔐 Authentication & Data Management
- **Secure authentication** via Clerk with OAuth support
- **Real-time database** powered by Supabase with Row Level Security
- **User profiles** with personalized dashboards
- **Subscription tiers** for enhanced features and unlimited mentor creation

## 🛠 Tech Stack

### Frontend
- **Next.js 15.3.3** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Shadcn/ui** - Beautiful, reusable UI components

### Backend & Infrastructure
- **Supabase** - PostgreSQL database with real-time subscriptions
- **Clerk** - Authentication and user management
- **VAPI AI** - Voice AI platform for conversational interfaces
- **Sentry** - Error monitoring and performance tracking

### Development Tools
- **ESLint 9** - Code linting and quality
- **React Hook Form** - Form management with validation
- **Zod** - Schema validation
- **Lottie React** - Animation library

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account
- Clerk account  
- VAPI account

### Environment Variables
Create a `.env.local` file with the following variables:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# VAPI Voice AI
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token

# Sentry Error Monitoring (Optional)
SENTRY_DSN=your_sentry_dsn
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/aurelius.git
   cd aurelius
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or  
   pnpm install
   # or
   bun install
   ```

3. **Set up the database**
   - Create a new Supabase project
   - Set up the required database tables (see Database Schema section)
   - Configure Row Level Security (RLS) policies

4. **Configure authentication**
   - Set up Clerk application
   - Configure OAuth providers (optional)
   - Set up webhook endpoints for user management

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

### Core Tables

#### `mentors`
- `id` (uuid, primary key)
- `name` (text)
- `title` (text)
- `famous_quote` (text)
- `primary_virtue` (text)
- `secondary_virtues` (text[])
- `practices` (text[])
- `specialties` (text[])
- `voice` (text)
- `style` (text)
- `introduction` (text)
- `mentor_type` (enum: 'default', 'custom')
- `author` (text, foreign key to users)
- `created_at` (timestamp)

#### `session_history`
- `id` (uuid, primary key)
- `user_id` (text, foreign key to users)
- `mentor_id` (uuid, foreign key to mentors)
- `user_call_usage` (integer) - session duration in seconds
- `created_at` (timestamp)

#### `bookmarks` (*yet to be implemented*)
- `id` (uuid, primary key)
- `user_id` (text, foreign key to users)
- `mentor_id` (uuid, foreign key to mentors)
- `created_at` (timestamp)

## 🎯 Core Concepts

### Stoic Practices
- **Meditation** - Mindfulness and present-moment awareness
- **Journaling** - Daily reflection and self-examination
- **Negative Visualization** - Preparing for adversity through mental rehearsal
- **Dichotomy of Control** - Distinguishing between what you can and cannot control
- **Virtue Ethics** - Focusing on character development and moral excellence

### Four Cardinal Virtues
1. **Wisdom** (Sophia) - Knowledge, understanding, and good judgment
2. **Courage** (Andreia) - Bravery in facing challenges and doing what's right
3. **Justice** (Dikaiosyne) - Fairness, integrity, and concern for others
4. **Temperance** (Sophrosyne) - Self-control and moderation

### Mentor Specialties
- Emotional mastery (anger, anxiety, grief)
- Life challenges (adversity, mortality, success)
- Relationships and social dynamics
- Professional development and leadership
- Daily practices and habit formation

## 📱 Application Structure

### Pages
- `/` - Home dashboard with featured mentors and recent sessions
- `/mentors` - Browse all available mentors with filtering
- `/mentors/[id]` - Individual mentor conversation interface
- `/mentors/new` - Create custom mentor (premium feature)
- `/my-journey` - Personal dashboard with progress tracking
- `/sign-in` - Authentication page
- `/subscription` - Upgrade plans and billing

### Components
- `MentorComponent` - Voice conversation interface with VAPI integration
- `MentorForm` - Custom mentor creation with validation
- `MentorCard` - Mentor preview cards with specialties and ratings
- `MentorList` - Session history display with practice details
- `SearchInput` - Global search for mentors by name
- `PracticeFilter` - Filter mentors by Stoic practices

### Key Features
- **Voice AI Integration** - Real-time conversations with configurable voices
- **Session Management** - Timer controls, mute/unmute, and graceful disconnection
- **Progress Tracking** - Detailed analytics on practice frequency and duration
- **Custom Mentor Builder** - Full customization of AI personality and expertise

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build production application
npm run start        # Start production server
npm run lint         # Run ESLint code quality checks

# Type Checking
npx tsc --noEmit     # TypeScript compilation check
```

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
1. Build the application: `npm run build`
2. Configure your hosting platform
3. Set up environment variables
4. Deploy the `.next` folder

## 🔒 Security Features

- **Row Level Security** on all database tables
- **JWT-based authentication** via Clerk
- **CSRF protection** through Next.js security headers
- **Environment variable validation**
- **Error monitoring** with Sentry integration

## 🎨 Customization

### Styling
- **Tailwind CSS 4** with custom color palette inspired by ancient philosophy
- **Responsive design** with mobile-first approach
- **Dark mode support** (configurable)
- **Custom animations** for enhanced user experience

### Voice Configuration
- **Multiple voice options** - Male/Female with Wise/Conversational styles
- **Customizable speaking patterns** - Classical vs. Modern delivery
- **Voice cloning support** (enterprise feature)

## 📚 Learning Resources

### Stoic Philosophy
- [Stanford Encyclopedia of Philosophy - Stoicism](https://plato.stanford.edu/entries/stoicism/)
- [Internet Encyclopedia of Philosophy - Stoicism](https://iep.utm.edu/stoicism/)
- **Recommended Books**:
  - "Meditations" by Marcus Aurelius
  - "Discourses" by Epictetus  
  - "Letters" by Seneca

### Technical Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [VAPI Documentation](https://docs.vapi.ai)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain test coverage for critical features
- Use semantic commit messages
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Marcus Aurelius** - Inspiration from "Meditations"
- **Epictetus** - Foundational Stoic teachings
- **Seneca** - Practical philosophy applications
- **Modern Stoic Community** - Contemporary interpretations and practices


**Bug Reports**: [GitHub Issues](https://github.com/lawrence-dass/aurelius/issues)

---

*"You have power over your mind - not outside events. Realize this, and you will find strength."* - Marcus Aurelius
