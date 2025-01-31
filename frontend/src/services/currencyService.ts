import { Currency } from "../constants/currencies";

const API_URL =
  import.meta.env.VITE_API_URL || import.meta.env.VITE_local_API_URL; // backend URL (remote/local)

const currencyService = {
  getAllCurrencies: async () => {
    try {
      const response = await fetch(`${API_URL}/currencies/`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch currencies");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching currencies: ", error);
      throw error;
    }
  },

  getCurrencyById: async (_id: string) => {
    try {
      const response = await fetch(`${API_URL}/currencies/${_id}`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch currency exchange");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching currency exchange by ID: ", error);
      throw error;
    }
  },

  createCurrency: async (currencyData: {
    from: Currency;
    to: Currency;
    rate: number;
  }) => {
    try {
      const options: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currencyData),
        credentials: "include",
        mode: "cors",
      };
      const response = await fetch(`${API_URL}/currencies/new`, options);

      if (!response.ok) {
        const errorData = await response.json(); //handle backend error message
        throw new Error(
          errorData.error || "Failed to create currency exchange"
        );
      }
    } catch (error) {
      console.error("Error creating currency exchange: ", error);
      throw error;
    }
  },

  updateCurrency: async (currencyData: {
    _id: string;
    from: Currency;
    to: Currency;
    rate: number;
  }) => {
    try {
      const options: RequestInit = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currencyData),
        credentials: "include",
        mode: "cors",
      };
      const response = await fetch(
        `${API_URL}/currencies/${currencyData._id}`,
        options
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update currency");
      }
    } catch (error) {
      console.error("Error updating currency: ", error);
      throw error;
    }
  },

  deleteCurrency: async (currencyData: {
    _id: string;
    from: Currency;
    to: Currency;
  }) => {
    try {
      const options: RequestInit = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currencyData),
        credentials: "include",
        mode: "cors",
      };
      const response = await fetch(
        `${API_URL}/currencies/${currencyData._id}`,
        options
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete currency");
      }
    } catch (error) {
      console.error("Error deleting currency: ", error);
      throw error;
    }
  },
};

export default currencyService;
