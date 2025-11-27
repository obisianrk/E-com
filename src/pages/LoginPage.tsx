import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLoginMutation, type AuthSession } from '../providers/QueryProvider'

const LoginPage = () => {
  const navigate = useNavigate()
  const { persistSession } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginMutation = useLoginMutation()

  const handleSuccess = (session: AuthSession) => { 
    persistSession(session);
    navigate('/products');
  };
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    loginMutation.mutate(
      { email, password },
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
          <h1 className="pt-6 text-2xl font-semibold">Login to your Account</h1>
        </div>

        <div className="mt-12 w-full max-w-lg text-left">
          {loginMutation.isError && (
            <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {(loginMutation.error as Error).message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
              Enter Your Password <span className="text-red-500">*</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter Your Password"
                minLength={6}
                required
                className="w-full border border-slate-400 px-4 py-3 text-base text-slate-800 outline-none transition focus:border-slate-900"
              />
            </label>
            <div className="pt-2">
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="inline-flex w-32 items-center justify-center border border-slate-900 bg-slate-900 px-4 py-2 text-base font-semibold tracking-wide text-white transition hover:bg-black disabled:opacity-50"
              >
                {loginMutation.isPending ? 'Signing in...' : 'Login'}
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-slate-500">
            Need an account?{' '}
            <Link to="/signup" className="font-semibold text-slate-900">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default LoginPage

