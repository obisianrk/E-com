import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, RequireAuth, useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AllProductsPage from './pages/AllProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductShell from './layouts/ProductShell'

const DefaultRoute = () => {
  const { user } = useAuth()
  return <Navigate to={user ? '/products' : '/login'} replace />
}

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<DefaultRoute />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/products"
        element={
          <RequireAuth>
          <ProductShell>
            <AllProductsPage />
          </ProductShell>
          </RequireAuth>
        }
      />
      <Route
        path="/products/:id"
        element={
         <RequireAuth>
          <ProductShell>
            <ProductDetailPage />
          </ProductShell>
        </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </AuthProvider>
)

export default App

