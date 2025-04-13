import axios from "./axios";
import { User } from "../types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

const AuthService = {
  login: async (credentials: LoginCredentials) => {
    const response = await axios.post("users/login", credentials);
    if (response.data.token) {
      localStorage.setItem("hotel_token", response.data.token);
      localStorage.setItem("hotel_user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  signup: async (userData: SignupData) => {
    const response = await axios.post("users/register", userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("hotel_token");
    localStorage.removeItem("hotel_user");
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem("hotel_user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  isAdmin: (): boolean => {
    const user = AuthService.getCurrentUser();
    return user?.isAdmin || false;
  },
};

export default AuthService;
