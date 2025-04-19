// UsersList.tsx
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { User } from "../types/index";
import { Badge } from "../components/ui/badge";
import { Search } from "lucide-react";

// Create a custom hook for user management
const useUsers = () => {
  // In a real application, these would be API calls
  const fetchAllUsers = async (): Promise<User[]> => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            email: "john@example.com",
            name: "John Doe",
            role: "USER",
          },
          {
            id: "2",
            email: "jane@example.com",
            name: "Jane Smith",
            role: "USER",
          },
          {
            id: "3",
            email: "admin@example.com",
            name: "Admin User",
            role: "ADMIN",
          },
          {
            id: "4",
            email: "guest@example.com",
            name: "Guest User",
            role: "USER",
          },
          {
            id: "5",
            email: "support@example.com",
            name: "Support Team",
            role: "ADMIN",
          },
        ]);
      }, 500);
    });
  };

  const deleteUser = async (id: string): Promise<void> => {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`User with ID ${id} deleted`);
        resolve();
      }, 300);
    });
  };

  return { fetchAllUsers, deleteUser };
};

interface UsersListProps {
  onUserSelected?: (user: User) => void;
}

const UsersList: React.FC<UsersListProps> = ({ onUserSelected }) => {
  const { fetchAllUsers, deleteUser } = useUsers();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setIsLoading(true);
        const userData = await fetchAllUsers();
        setUsers(userData);
        setFilteredUsers(userData);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    // Filter users based on search term
    const filtered = users.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Users</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-8 w-[250px]"
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableCaption>List of all registered users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[300px]">Email</TableHead>
              <TableHead className="w-[100px]">Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Loading users...
                </TableCell>
              </TableRow>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.name || "N/A"}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.role === "ADMIN" ? "destructive" : "default"
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUserSelected && onUserSelected(user)}
                      >
                        View
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersList;
