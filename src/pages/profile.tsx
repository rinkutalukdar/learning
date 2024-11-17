// src/pages/profile.tsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Layout from "../components/Layout";

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return <div>Please log in to view your profile.</div>;

  return (
    <Layout>
      <div className="container mx-auto p-6">
        {/* Profile Picture */}
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={user?.picture}
            alt={user?.name || "User's profile"}
            className="w-24 h-24 rounded-full border border-gray-300 shadow-sm"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-700">Bio</h3>
            <p className="text-gray-600">
              {user?.bio || "This is where the user's bio will be displayed. Update your bio in settings."}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700">Location</h3>
            <p className="text-gray-600">
              {user?.location || "Add your location in settings."}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700">Interests</h3>
            <p className="text-gray-600">
              {user?.interests || "List your interests to personalize your profile."}
            </p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-6">
          <button
            onClick={() => alert("Edit profile feature coming soon!")}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
