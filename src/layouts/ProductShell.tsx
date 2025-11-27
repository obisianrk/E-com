import { ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'

type ProductShellProps = {
  children: ReactNode
}

const ProductShell = ({ children }: ProductShellProps) => {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 md:px-8">
      <div className="flex w-full gap-6">
        <aside className="hidden w-56 rounded-3xl bg-white p-6 shadow-md lg:block">
          <p className="text-2xl font-bold tracking-wide text-orange-500">FITZDO</p>
        </aside>

        <main className="w-full flex-1 space-y-6">
          {children}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:text-red-500"
            >
              Log out
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProductShell


