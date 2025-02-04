import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/contexts";
import authService from "../services/authService"; // API authentication services

interface User {
  _id: string;
  email: string;
  username: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); //add loading state to stop redirecting while fetching user status
  const navigate = useNavigate();

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      if (user) {
        return navigate("/"); // already logged in
      }
      try {
        const userData = await authService.login(credentials);
        setUser(userData.user);
        setIsAuthenticated(true);
        navigate("/");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Error(error?.message || "Invalid credentials");
      }
    },
    [navigate, user]
  );

  const logout = useCallback(async () => {
    if (!user) {
      navigate("/"); //already logged out
    }
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error?.message || "Logout failed.");
    }
  }, [navigate, user]);

  const register = useCallback(
    async (userData: { email: string; username: string; password: string }) => {
      if (user) {
        return navigate("/"); // already logged in
      }
      try {
        const newUser = await authService.register(userData);
        setUser(newUser.user);
        setIsAuthenticated(true);
        navigate("/");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        throw new Error(
          error?.message || "Registration failed. Please try again."
        );
      }
    },
    [navigate, user]
  );

  useEffect(() => {
    const checkAuthStatus = async () => {
      const userData = await authService.getCurrentUser(); //fetch user session info
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false); //user status
    };

    setIsLoading(true); //start loading the user's status
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
