'use client'

import { useState, useEffect, Suspense } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Form validation schema
const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  message: z.string().optional(),
  gdprConsent: z.boolean().refine(val => val === true, {
    message: 'You must consent to the privacy policy to continue',
  }),
  captcha: z.string().min(1, 'Please complete the captcha'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

// Simple captcha component
function SimpleCaptcha({
  onCaptchaChange,
  error,
}: {
  onCaptchaChange: (value: string) => void
  error?: string
}) {
  const [captchaQuestion, setCaptchaQuestion] = useState<{
    num1: number
    num2: number
    answer: number
  } | null>(null)
  const [userAnswer, setUserAnswer] = useState('')
  const [, setIsClient] = useState(false)

  // Initialize captcha only on client side to avoid hydration mismatch
  useEffect(() => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptchaQuestion({ num1, num2, answer: num1 + num2 })
    setIsClient(true)
  }, [])

  const handleAnswerChange = (value: string) => {
    setUserAnswer(value)
    if (captchaQuestion) {
      const isCorrect = parseInt(value) === captchaQuestion.answer
      onCaptchaChange(isCorrect ? 'correct' : '')
    }
  }

  const refreshCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptchaQuestion({ num1, num2, answer: num1 + num2 })
    setUserAnswer('')
    onCaptchaChange('')
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="captcha">Security Check *</Label>
      <div className="flex items-center gap-3">
        <div className="rounded-md border bg-gray-100 p-3 dark:bg-gray-800">
          <span className="font-mono text-lg">
            {captchaQuestion
              ? `${captchaQuestion.num1} + ${captchaQuestion.num2} = ?`
              : 'Loading...'}
          </span>
        </div>
        <Input
          id="captcha"
          type="number"
          placeholder="Answer"
          value={userAnswer}
          onChange={e => handleAnswerChange(e.target.value)}
          className="w-24"
          disabled={!captchaQuestion}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={refreshCaptcha}
          disabled={!captchaQuestion}
        >
          Refresh
        </Button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}

// Main page component with Suspense wrapper
export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 dark:bg-gray-900">
          <div className="text-lg">Loading...</div>
        </div>
      }
    >
      <ContactForm />
    </Suspense>
  )
}

// Contact form component that uses useSearchParams
function ContactForm() {
  const searchParams = useSearchParams()
  const messageParam = searchParams.get('message')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      message: messageParam || '',
    },
  })

  // Set the message field value when component mounts if messageParam exists
  useEffect(() => {
    if (messageParam) {
      setValue('message', messageParam)
    }
  }, [messageParam, setValue])

  const onSubmit = async (data: ContactFormData) => {
    // For now, just log the data - no actual submission
    console.log('Form submitted:', data)
    alert('Form submitted successfully! (This is just a demo - no data was actually sent)')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Contact Us</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Get in touch with our team. We&apos;d love to hear from you.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* First Name */}
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                type="text"
                {...register('firstName')}
                className="mt-1"
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                type="text"
                {...register('lastName')}
                className="mt-1"
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className="mt-1"
                placeholder="Enter your email address"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                className="mt-1"
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                {...register('message')}
                rows={4}
                className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 mt-1 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                placeholder="Enter your message (optional)"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
              )}
            </div>

            {/* Captcha */}
            <SimpleCaptcha
              onCaptchaChange={value => setValue('captcha', value)}
              error={errors.captcha?.message}
            />

            {/* GDPR Consent */}
            <div className="flex items-start space-x-3">
              <input
                id="gdprConsent"
                type="checkbox"
                {...register('gdprConsent')}
                className="text-primary focus:ring-primary mt-1 h-4 w-4 rounded border-gray-300 focus:ring-2"
              />
              <div className="flex-1">
                <Label htmlFor="gdprConsent" className="text-sm">
                  GDPR Agreement *
                </Label>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  I consent to the storage of my information as detailed in the{' '}
                  <a
                    href="/privacy-policy"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linked privacy policy
                  </a>
                </p>
                {errors.gdprConsent && (
                  <p className="mt-1 text-sm text-red-600">{errors.gdprConsent.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
