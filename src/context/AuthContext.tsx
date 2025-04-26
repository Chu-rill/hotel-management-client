import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

// 1. Define your user type structure
export interface AuthUser {
  id: string;
  userName: string;
  email: string;
  role: any;
  // Add more fields if your user object has more properties
}

// 2. Define the shape of the context value
interface AuthContextType {
  authUser: AuthUser | null;
  setAuthUser: Dispatch<SetStateAction<AuthUser | null>>;
}

// 3. Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Custom hook to consume the context safely
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

// 5. Props for the provider
interface AuthProviderProps {
  children: ReactNode;
}

// 6. Context Provider component
export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  // Initialize from localStorage with null fallback
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Persist to localStorage when user changes
  useEffect(() => {
    if (authUser) {
      localStorage.setItem("user", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [authUser]);

  const contextValue: AuthContextType = {
    authUser,
    setAuthUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
