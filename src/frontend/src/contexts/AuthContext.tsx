import { createContext, useContext, useEffect, useState } from "react";
import { triggerTimerReset } from "./ReadingTimerContext";

interface StoredUser {
  username: string;
  passwordHash: string;
  email?: string;
  preferredLanguage?: string;
}

export interface CurrentUser {
  username: string;
  email?: string;
  preferredLanguage?: string;
  adminPlan?: string;
}

interface AuthContextValue {
  currentUser: CurrentUser | null;
  register: (
    username: string,
    password: string,
    email?: string,
  ) => { success: boolean; error?: string };
  login: (
    username: string,
    password: string,
  ) => { success: boolean; error?: string };
  logout: () => void;
  updatePreferredLanguage: (lang: string) => void;
  updatePassword: (
    oldPassword: string,
    newPassword: string,
  ) => { success: boolean; error?: string };
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  register: () => ({ success: false }),
  login: () => ({ success: false }),
  logout: () => {},
  updatePreferredLanguage: () => {},
  updatePassword: () => ({ success: false }),
  isLoggedIn: false,
});

const USERS_KEY = "cryptai-users";
export const SESSION_KEY = "cryptai-session";

const ADMIN_PASSWORD = "123456789";
// Admin usernames → plan IDs (new naming)
const ADMIN_USERS: Record<string, string> = {
  adminuncreamed: "uncreamed",
  admincreamed: "creamed",
  adminextracreamed: "extracreamed",
  admincreamy: "creamy",
};

// All admin usernames (including notregistred)
export const ALL_ADMIN_USERNAMES = [
  ...Object.keys(ADMIN_USERS),
  "adminnotregistred",
];

function getUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function hashPassword(password: string): string {
  return btoa(password);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(() => {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      return session ? JSON.parse(session) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
    // Notify LanguageContext that session changed (same-tab event)
    window.dispatchEvent(new CustomEvent("cryptai-session-change"));
  }, [currentUser]);

  const register = (
    username: string,
    password: string,
    email?: string,
  ): { success: boolean; error?: string } => {
    const users = getUsers();
    if (
      users.find((u) => u.username.toLowerCase() === username.toLowerCase())
    ) {
      return { success: false, error: "username_taken" };
    }
    const newUser: StoredUser = {
      username,
      passwordHash: hashPassword(password),
      email,
    };
    saveUsers([...users, newUser]);
    setCurrentUser({ username, email });
    return { success: true };
  };

  const login = (
    username: string,
    password: string,
  ): { success: boolean; error?: string } => {
    const lowerUsername = username.toLowerCase();

    // adminnotregistred: reset timer, do NOT log in (simulate unregistered view)
    if (lowerUsername === "adminnotregistred" && password === ADMIN_PASSWORD) {
      triggerTimerReset();
      setCurrentUser(null);
      return { success: true };
    }

    // Admin bypass
    if (
      ADMIN_USERS[lowerUsername] !== undefined &&
      password === ADMIN_PASSWORD
    ) {
      const adminPlan = ADMIN_USERS[lowerUsername];
      setCurrentUser({ username: lowerUsername, adminPlan });
      return { success: true };
    }

    const users = getUsers();
    const user = users.find((u) => u.username.toLowerCase() === lowerUsername);
    if (!user || user.passwordHash !== hashPassword(password)) {
      return { success: false, error: "invalid_credentials" };
    }
    setCurrentUser({
      username: user.username,
      email: user.email,
      preferredLanguage: user.preferredLanguage,
    });
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updatePreferredLanguage = (lang: string) => {
    if (!currentUser) return;
    const users = getUsers();
    const idx = users.findIndex((u) => u.username === currentUser.username);
    if (idx !== -1) {
      users[idx].preferredLanguage = lang;
      saveUsers(users);
    }
    setCurrentUser((prev) =>
      prev ? { ...prev, preferredLanguage: lang } : prev,
    );
  };

  const updatePassword = (
    oldPassword: string,
    newPassword: string,
  ): { success: boolean; error?: string } => {
    if (!currentUser) return { success: false, error: "invalid_credentials" };
    const users = getUsers();
    const idx = users.findIndex((u) => u.username === currentUser.username);
    if (idx === -1 || users[idx].passwordHash !== hashPassword(oldPassword)) {
      return { success: false, error: "invalid_credentials" };
    }
    users[idx].passwordHash = hashPassword(newPassword);
    saveUsers(users);
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
        updatePreferredLanguage,
        updatePassword,
        isLoggedIn: !!currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
