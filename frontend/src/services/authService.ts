const API_URL =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_local_API_URL; // backend URL (remote/local)

const authService = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      const options: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include", // ensures cookies are sent with request
        mode: "cors",
      };
      const response = await fetch(`${API_URL}/login`, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }
      return await response.json();
    } catch (error) {
      console.error("Login error: ", error);
      throw error;
    }
  },

  register: async (credentials: {
    email: string;
    username: string;
    password: string;
  }) => {
    try {
      const options: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
        mode: "cors",
      };
      const response = await fetch(`${API_URL}/register`, options);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }
      return await response.json();
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await fetch(`${API_URL}/current-user`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Not authenticated, ", errorData.error);
        return null; //not logged in
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching current user: ", error);
      return null;
    }
  },
};

export default authService;
