import { Navigate } from "react-router-dom";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

export type User = {
  name: string;
  email: string;
  token: string;
};

type AuthSession = User | null;

type AuthContextValue = {
  session: AuthSession;
  user: User | null;
  persistSession: (next: User) => void;
  logout: () => void;
};

const SESSION_KEY = "ecom-demo-session";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const readSession = (): AuthSession => {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AuthSession>(() => readSession());

  const persistSession = useCallback((next: User) => {
    setSession(next);
    localStorage.setItem(SESSION_KEY, JSON.stringify(next));
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  const value = useMemo(
    () => ({
      session,
      user: session,
      persistSession,
      logout,
    }),
    [session, persistSession, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { session } = useAuth();
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
