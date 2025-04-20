import { useState, useCallback } from "react";
import axios from "./axios";
import { User } from "../types";

const useUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all users
  const fetchAllUsers = useCallback(async (): Promise<any> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("/admin/users");
      console.log("Response from fetchAllUsers:", response);
      return response.data.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch users";
      setError(errorMessage);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch user by ID
  const fetchUserById = useCallback(
    async (userId: string): Promise<User | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/admin/users/${userId}`);
        return response.data.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch user";
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Create new user
  const createUser = useCallback(
    async (userData: Partial<User>): Promise<User | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.post("/admin/users", userData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create user";
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Update user
  const updateUser = useCallback(
    async (userId: string, userData: Partial<User>): Promise<User | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.put(`/admin/users/${userId}`, userData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update user";
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Delete user
  const deleteUser = useCallback(async (userId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.delete(`/admin/users/${userId}`);
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete user";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Change user role
  const changeUserRole = useCallback(
    async (userId: string, role: string): Promise<User | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.patch(
          `/admin/users/${userId}/role`,
          { role },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data.data;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to change user role";
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    fetchAllUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
    changeUserRole,
  };
};

export default useUser;
