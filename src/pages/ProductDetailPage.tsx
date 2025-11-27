import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProductDetailQuery } from '../providers/QueryProvider'

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)

const ProductDetailPage = () => {
  const { id } = useParams()

  const { data: product, isLoading, isError, error } = useProductDetailQuery(id)

  if (isLoading) {
    return (
      <div className="rounded-3xl bg-white p-6 text-sm text-slate-500 shadow-md">
        Loading product details…
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl bg-white px-4 shadow-md">
        <p className="text-2xl font-semibold text-slate-900">Product not found</p>
        {isError && <p className="mt-2 text-sm text-red-600">{(error as Error).message}</p>}
        <Link to="/products" className="mt-4 text-sm font-semibold text-orange-500">
          Back to Product List
        </Link>
      </div>
    )
  }

  return (
    <>
      <header className="mb-4 flex items-center justify-between rounded-3xl bg-white px-6 py-4 shadow-md">
        <div className="flex items-center gap-8">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Product Detail</h1>
            <p className="text-xs text-slate-400">
              Home {'>'} Fitness &amp; Sports {'>'} Cardio &amp; Strengthening {'>'} Treadmills
            </p>
          </div>
        </div>
        <Link to="/products" className="text-sm font-semibold text-slate-600">
          Back to list
        </Link>
      </header>

      <main className="grid gap-6 rounded-3xl bg-white p-6 shadow-md lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <section className="space-y-6 border-r border-slate-100 pr-4">
          <div className="flex flex-col items-center gap-4">
            <img
              src={product.image}
              alt={product.title}
              className="h-72 w-full max-w-md rounded-3xl object-cover shadow-sm"
            />
            {product.subImages && product.subImages.length > 0 && (
              <div className="flex gap-3">
                {product.subImages.map((subImage, index) => (
                  <img
                    key={index}
                    src={subImage}
                    alt={`${product.title} - View ${index + 1}`}
                    className="h-16 w-20 rounded-xl border border-slate-200 object-cover"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 space-y-6 text-sm text-slate-700">
            {product.whatsInTheBox && product.whatsInTheBox.length > 0 && (
              <div>
                <h2 className="mb-2 text-base font-semibold text-slate-900">What&apos;s in the Box?</h2>
                <ul className="list-disc space-y-1 pl-5">
                  {product.whatsInTheBox.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div>
                <h2 className="mb-2 text-base font-semibold text-slate-900">Product Specification</h2>
                <div className="grid gap-y-1 text-xs md:grid-cols-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <React.Fragment key={key}>
                      <span className="text-slate-500">{key}</span>
                      <span className="font-medium text-slate-800">{value}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">{product.brand}</p>
            <h2 className="mt-1 text-base font-semibold text-slate-900">{product.title}</h2>
            <p className="mt-2 text-xs text-slate-500">Fitzdo Sponsored</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Special price</p>
            <p className="text-2xl font-semibold text-slate-900">{formatCurrency(product.price)}</p>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
              {product.mrp !== undefined && (
                <span className="line-through">{formatCurrency(product.mrp)}</span>
              )}
              {product.discount !== undefined && (
                <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-700">
                  {product.discount}% off
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-emerald-700">FREE delivery by Tomorrow 10pm</p>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <div>
              <p className="mb-1 text-xs font-semibold text-slate-700">Colour</p>
              <div className="flex flex-wrap gap-2">
                {['Ashy Slate', 'Gunmetal', 'Midnight'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="rounded-full border border-slate-300 px-3 py-1 text-[11px] hover:border-slate-900"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold text-slate-700">Size</p>
              <div className="flex flex-wrap gap-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    type="button"
                    className="h-7 w-7 rounded border border-slate-300 text-[11px] hover:border-slate-900"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full rounded-md border border-slate-900 bg-slate-900 py-2 text-sm font-semibold text-white">
              Add to Cart
            </button>
            <button className="w-full rounded-md border border-slate-900 bg-white py-2 text-sm font-semibold text-slate-900">
              Buy Now
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
            <p className="font-semibold text-slate-800">Offers &amp; Discounts</p>
            <p className="mt-1">
              Flat ₹{product.fitzdoDiscount} off with Fitzdo Reward Discount on select bank credit cards. T&amp;C apply.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default ProductDetailPage
