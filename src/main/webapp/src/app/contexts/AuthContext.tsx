import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Role, ROLE_PERMISSIONS, Permission } from "../types/permissions";

interface User {
  id: string;
  username: string;
  name: string;
  role: Role;
  branch?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, password: string, name: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  isAuthenticated: boolean;
  hasPermission: (module: string, action: keyof Omit<Permission, 'module'>) => boolean;
  canAccessModule: (module: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo
const MOCK_USERS = [
  { id: "1", username: "admin", password: "admin123", name: "본사관리자", role: "본사관리자" as Role, branch: "본사" },
  { id: "2", username: "manager1", password: "manager123", name: "김지점장", role: "지점장" as Role, branch: "강남지점" },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const foundUser = MOCK_USERS.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        username: foundUser.username,
        name: foundUser.name,
        role: foundUser.role,
        branch: foundUser.branch,
      };
      setUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const register = async (username: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if username already exists
    const existingUser = MOCK_USERS.find(u => u.username === username);
    if (existingUser) {
      return false;
    }

    // Create new user
    const newUser = {
      id: String(MOCK_USERS.length + 1),
      username,
      name,
      role: "지점장" as Role,
      branch: "강남지점",
    };

    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    MOCK_USERS.push({ ...newUser, password });
    return true;
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!user) return false;

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    return true;
  };

  const hasPermission = (module: string, action: keyof Omit<Permission, 'module'>): boolean => {
    if (!user) return false;
    
    const rolePermissions = ROLE_PERMISSIONS[user.role];
    const modulePermission = rolePermissions.find(p => p.module === module);
    
    return modulePermission ? modulePermission[action] : false;
  };

  const canAccessModule = (module: string): boolean => {
    return hasPermission(module, 'canView');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateProfile,
        isAuthenticated: !!user,
        hasPermission,
        canAccessModule,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}