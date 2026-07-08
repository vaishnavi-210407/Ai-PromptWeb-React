import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("autoverse_user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const signup = ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem("autoverse_users") || "[]");
    const exists = users.find((u) => u.email === email);
    if (exists) throw new Error("An account with this email already exists.");

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("autoverse_users", JSON.stringify(users));

    const sessionUser = { name, email };
    localStorage.setItem("autoverse_user", JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  const login = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("autoverse_users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid email or password.");

    const sessionUser = { name: found.name, email: found.email };
    localStorage.setItem("autoverse_user", JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  const resetPassword = ({ email, newPassword }) => {
    const users = JSON.parse(localStorage.getItem("autoverse_users") || "[]");
    const idx = users.findIndex((u) => u.email === email);
    if (idx === -1) throw new Error("No account found with this email.");

    users[idx].password = newPassword;
    localStorage.setItem("autoverse_users", JSON.stringify(users));
  };

  const logout = () => {
    localStorage.removeItem("autoverse_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);