import React from "react";
import { useSelector } from "react-redux";
import { Star, Award, User } from "lucide-react";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.currentUser);

  const getRoleIcon = (role) => {
    switch (role) {
      case "Admin":
        return <Star className="w-4 h-4" />;
      case "Merchant":
        return <Award className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleStyles = (role) => {
    switch (role) {
      case "Admin":
        return "bg-red-500/20 text-red-500 border border-red-500/20";
      case "Merchant":
        return "bg-amber-500/20 text-amber-500 border border-amber-500/20";
      default:
        return "bg-emerald-500/20 text-emerald-500 border border-emerald-500/20";
    }
  };

   const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-amber-500 font-serif italic text-2xl mb-2">
            Welcome to
          </h2>
          <h1 className="text-4xl font-bold text-white mb-4">
            YOUR PROFILE
          </h1>
        </div>

        <div className="bg-neutral-900 rounded-lg p-8">
          <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                {user?.name?.charAt(0).toUpperCase() || "G"}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center">
                {getRoleIcon(user?.role)}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-2">
                {user?.name || "Guest User"}
              </h2>
              
              <p className="text-neutral-400 mb-4">
                {user?.email || "Email not available"}
              </p>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getRoleStyles(user?.role)}`}>
                  {getRoleIcon(user?.role)}
                  <span className="font-medium">{user?.role || "Customer"}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-neutral-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black p-6 rounded-lg">
                <h3 className="text-amber-500 font-semibold mb-2">Account Status</h3>
                <p className="text-white">Active Member</p>
              </div>
              <div className="bg-black p-6 rounded-lg">
                <h3 className="text-amber-500 font-semibold mb-2">Member Since</h3>
                <p className="text-white">{formatDate(user?.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;