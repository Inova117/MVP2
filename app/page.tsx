import Link from 'next/link'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    title: 'Easy Scheduling',
    description: 'Book appointments in just a few clicks with our intuitive interface.',
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    title: 'Secure & Private',
    description: 'Your data is protected with enterprise-grade security and encryption.',
  },
  {
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: 'Real-time Updates',
    description: 'Get instant notifications about your appointments and changes.',
  },
]

function Navbar() {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 p-2">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Booking Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/backend" className="hidden text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors sm:block">
              Backend Docs
            </Link>
            <Link href="/login"><Button variant="ghost">Login</Button></Link>
            <Link href="/register"><Button>Get Started</Button></Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          Book Appointments
          <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            with Ease
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Connect with professionals instantly. Manage your schedule effortlessly.
          Built with enterprise-grade security and modern technology.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/register">
            <Button size="lg">
              Get Started Free
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </Link>
          <Link href="/login"><Button size="lg" variant="outline">View Demo</Button></Link>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Everything you need</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Powerful features to manage appointments efficiently</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BackendShowcase() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Built with Enterprise-Grade Technology</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Complete backend implementation with security, scalability, and performance in mind</p>
        <Link href="/backend" className="mt-8 inline-block">
          <Button size="lg" variant="outline">
            View Backend Documentation
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Button>
        </Link>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Ready to get started?</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Join thousands of professionals and clients managing appointments efficiently</p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/register"><Button size="lg">Create Free Account</Button></Link>
          <Link href="/login"><Button size="lg" variant="outline">Sign In</Button></Link>
        </div>
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">Demo credentials available on login page</p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">© 2024 Booking Platform. Built with Next.js, TypeScript, and Tailwind CSS.</p>
      </div>
    </footer>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-white dark:from-gray-950 dark:via-sky-950 dark:to-gray-950">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <BackendShowcase />
      <CTASection />
      <Footer />
    </div>
  )
}
