"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { HabitGridLogo } from "@/components/HabitGridLogo"

export default function Privacy() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-2">
            <HabitGridLogo className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold">HabitGrid</h1>
          </div>
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Privacy Policy Content */}
        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Introduction</h2>
              <p>
                Welcome to HabitGrid. We respect your privacy and are committed to protecting your personal data.
                This privacy policy explains how we collect, use, and safeguard your information when you use our habit tracking service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Information We Collect</h2>
              <p className="mb-3">We collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-white">Account Information:</strong> When you sign up, we collect your email address
                  and authentication credentials (either directly or through Google OAuth).
                </li>
                <li>
                  <strong className="text-white">Habit Data:</strong> The habits you create, including habit names, emojis,
                  and creation dates.
                </li>
                <li>
                  <strong className="text-white">Check-in Data:</strong> Records of when you check in for each habit.
                </li>
                <li>
                  <strong className="text-white">Usage Data:</strong> Basic analytics about how you interact with the app
                  (collected automatically by our hosting provider).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">How We Use Your Information</h2>
              <p className="mb-3">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and maintain the HabitGrid service</li>
                <li>Track your habit progress and calculate statistics</li>
                <li>Authenticate your account and ensure security</li>
                <li>Send you important service updates (if necessary)</li>
                <li>Improve our service based on usage patterns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Data Storage and Security</h2>
              <p>
                Your data is stored securely using Supabase, a trusted database provider. We implement industry-standard
                security measures including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Encrypted data transmission (HTTPS)</li>
                <li>Row-level security (RLS) to ensure you can only access your own data</li>
                <li>Secure authentication through Supabase Auth</li>
                <li>Regular security updates and monitoring</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Third-Party Services</h2>
              <p className="mb-3">We use the following third-party services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-white">Supabase:</strong> Database and authentication provider
                </li>
                <li>
                  <strong className="text-white">Google OAuth:</strong> Optional sign-in method (if you choose to use it)
                </li>
                <li>
                  <strong className="text-white">Vercel:</strong> Web hosting and deployment
                </li>
              </ul>
              <p className="mt-3">
                These services have their own privacy policies governing how they handle your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Delete your habits and check-in data at any time</li>
                <li>Stop using the service at any time</li>
              </ul>
              <p className="mt-3 text-sm">
                Note: Account deletion functionality is coming soon. In the meantime, you can stop using
                the service and your data will remain private and secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Data Retention</h2>
              <p>
                We retain your data for as long as your account is active. Your data is stored securely
                and only accessible to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Cookies</h2>
              <p>
                We use essential cookies to maintain your session and keep you logged in. These cookies
                are necessary for the service to function and cannot be disabled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Children's Privacy</h2>
              <p>
                HabitGrid is not intended for children under 13 years of age. We do not knowingly collect
                personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by
                updating the "Last updated" date at the top of this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or how we handle your data,
                you can reach out through the feedback form on our website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
