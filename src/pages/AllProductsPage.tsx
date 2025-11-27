import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProductsQuery } from '../providers/QueryProvider'

const AllProductsPage = () => {
  const { user } = useAuth()
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput)
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchInput])

  const { data: products, isLoading, isError, error } = useProductsQuery(debouncedSearch || undefined)

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white px-6 py-4 shadow-md">
        <h1 className="text-xl font-semibold text-slate-900">Product List</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products..."
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-600">{user?.name ?? 'Tony Stark Jr.'}</p>
                <p className="text-xs text-slate-400">Super-Admin</p>
              </div>
              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                {(user?.name ?? 'TS').charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="rounded-3xl bg-white p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            {debouncedSearch ? (
              <>
                <p className="text-sm uppercase tracking-[0.35em] text-orange-500">Results for</p>
                <h2 className="text-2xl font-semibold text-slate-900">&ldquo;{debouncedSearch}&rdquo;</h2>
              </>
            ) : (
              <>
                <p className="text-sm uppercase tracking-[0.35em] text-orange-500">All</p>
                <h2 className="text-2xl font-semibold text-slate-900">Products</h2>
              </>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">
              {products ? `${products.length} Results` : '0 Results'}
            </p>
          </div>
        </div>

        {isLoading && <p className="mt-8 text-sm text-slate-500">Loading products…</p>}
        {isError && (
          <p className="mt-8 text-sm text-red-600">
            {(error as Error).message ?? 'Failed to load products.'}
          </p>
        )}

        {!isLoading && !isError && products && (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {products.map((item) => (
            <Link
              key={item.id}
              to={`/products/${item.id}`}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-lg"
            >
              <img src={item.image} alt={item.title} className="h-40 w-full rounded-xl object-cover" />
              <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">{item.badge}</p>
              <p className="text-sm font-semibold text-slate-900">{item.brand}</p>
              <h3 className="mt-1 text-sm text-slate-700">{item.title}</h3>
              {item.rating !== undefined && item.reviews !== undefined && (
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                  <span className="text-yellow-500">★</span>
                  <span>{item.rating.toFixed(1)}</span>
                  <span>({item.reviews.toLocaleString()})</span>
                  {item.discount !== undefined && (
                    <span className="text-blue-500 font-semibold">{item.discount}%</span>
                  )}
                </div>
              )}
              <p className="mt-2 text-lg font-semibold text-slate-900">₹{item.price.toLocaleString()}</p>
              {item.mrp !== undefined && (
                <p className="text-xs text-slate-400">M.R.P. ₹{item.mrp.toLocaleString()}</p>
              )}
              <p className="mt-2 text-xs text-emerald-600 font-semibold">FREE delivery by Tomorrow 10pm</p>
            </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export default AllProductsPage
