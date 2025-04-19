// UserDetail.tsx
import React from "react";
import { User } from "../types/index";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { CalendarDays, Mail, User as UserIcon } from "lucide-react";

interface UserDetailProps {
  user: User;
}

const UserDetail: React.FC<UserDetailProps> = ({ user }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="h-5 w-5" />
          User Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-1">
          <h3 className="text-xl font-semibold">{user.name || "No Name"}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <Mail className="mr-1 h-4 w-4" />
            {user.email}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Role:</span>
          <Badge variant={user.role === "ADMIN" ? "destructive" : "default"}>
            {user.role}
          </Badge>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarDays className="mr-1 h-4 w-4" />
            <span>User ID: {user.id}</span>
          </div>
        </div>

        {/* You can add more user details here as needed */}
      </CardContent>
    </Card>
  );
};

export default UserDetail;
