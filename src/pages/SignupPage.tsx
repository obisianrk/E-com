import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useRegisterMutation } from '../providers/QueryProvider'

const SignupPage = () => {
  const navigate = useNavigate()
  const { persistSession } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signupMutation = useRegisterMutation()

  const handleSuccess = (session: Parameters<typeof persistSession>[0]) => {
    persistSession(session)
    navigate('/products')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    signupMutation.mutate(
      { name, email, password },
      {
        onSuccess: handleSuccess,
      }
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-100 bg-white shadow-md shadow-slate-200/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-2xl font-bold tracking-wide text-slate-900">FITZDO</p>
            <p className="text-xs tracking-[0.35em] text-slate-500">BUSINESS</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <span role="img" aria-label="flag">
                🇮🇳
              </span>
              IN
            </span>
            <span>EN</span>
            <span className="flex items-center gap-1">
              Fitzdo is Secure <span className="text-base">🔒</span>
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl flex-col items-center justify-center px-6 py-12 text-slate-900 text-center">
        <div className="space-y-2">
          <p className="text-3xl font-black tracking-wide">FITZDO</p>
          <p className="font-[cursive] text-3xl text-slate-600">Circle</p>
          <h1 className="pt-6 text-2xl font-semibold">Create your Account</h1>
        </div>

        <div className="mt-12 w-full max-w-lg text-left">
          {signupMutation.isError && (
            <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {(signupMutation.error as Error).message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block space-y-2 text-sm font-medium text-slate-700">
              Full Name <span className="text-red-500">*</span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter Your Full Name"
                minLength={2}
                required
                className="w-full border border-slate-400 px-4 py-3 text-base text-slate-800 outline-none transition focus:border-slate-900"
              />
            </label>
            <label className="block space-y-2 text-sm font-medium text-slate-700">
              Email - ID <span className="text-red-500">*</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter Your Email - ID"
                required
                className="w-full border border-slate-400 px-4 py-3 text-base text-slate-800 outline-none transition focus:border-slate-900"
              />
            </label>
            <label className="block space-y-2 text-sm font-medium text-slate-700">
              Create Password <span className="text-red-500">*</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a password"
                minLength={6}
                required
                className="w-full border border-slate-400 px-4 py-3 text-base text-slate-800 outline-none transition focus:border-slate-900"
              />
            </label>
            <div className="pt-2">
              <button
                type="submit"
                disabled={signupMutation.isPending}
                className="inline-flex w-40 items-center justify-center border border-slate-900 bg-slate-900 px-4 py-2 text-base font-semibold tracking-wide text-white transition hover:bg-black disabled:opacity-50"
              >
                {signupMutation.isPending ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-slate-900">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default SignupPage

