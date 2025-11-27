import type { ReactNode } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query'

const API_BASE_URL = 'http://localhost:5000/api'

type AuthSession = {
  token: string
  name: string
  email: string
}

type LoginPayload = {
  email: string
  password: string
}

type RegisterPayload = {
  name: string
  email: string
  password: string
}

export type Product = {
  id: string
  title: string
  brand: string
  badge?: string
  description?: string
  fitzdoDiscount?: number
  rating?: number
  reviews?: number
  price: number
  mrp?: number
  discount?: number
  image?: string
  subImages?: string[]
  whatsInTheBox?: string[]
  specifications?: Record<string, string>
}

const jsonRequest = async <T,>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  if (!response.ok) {
    const message = await response.text().catch(() => '')
    throw new Error(message || 'Request failed')
  }

  return (await response.json()) as T
}

// Auth hooks
export const useLoginMutation = (): UseMutationResult<AuthSession, Error, LoginPayload> =>
  useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: (body) =>
      jsonRequest<AuthSession>('/users/login', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
  })

export const useRegisterMutation = (): UseMutationResult<AuthSession, Error, RegisterPayload> =>
  useMutation({
    mutationKey: ['auth', 'register'],
    mutationFn: (body) =>
      jsonRequest<AuthSession>('/users/register', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
  })

// Product hooks
export const useProductsQuery = (search?: string): UseQueryResult<Product[], Error> =>
  useQuery({
    queryKey: ['products', search],
    queryFn: () => {
      const url = search ? `/products?search=${encodeURIComponent(search)}` : '/products'
      return jsonRequest<Product[]>(url)
    },
  })

export const useProductDetailQuery = (id?: string): UseQueryResult<Product, Error> =>
  useQuery({
    queryKey: ['product', id],
    queryFn: () => jsonRequest<Product>(`/products/${id}`),
    enabled: !!id,
  })

// Provider
const queryClient = new QueryClient()

export const QueryProvider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

export type { AuthSession }


