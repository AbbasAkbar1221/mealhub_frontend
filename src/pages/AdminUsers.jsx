import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUsers } from "../slices/authSlice";
import { Trash2, UserCog, Users, Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { notifyError, notifySuccess } from "../App";

const AdminUsers = () => {
  const [loading, setLoading] = useState(true);
  const [roleOptions] = useState(["Customer", "Merchant", "Admin"]);
  const [selectedRole, setSelectedRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLoading, setFilterLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingRoles, setLoadingRoles] = useState({});
  const [changingRole, setChangingRole] = useState(null);
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      setFilterLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${VITE_BACKEND_URL}/user`, {
          params: { role: selectedRole, search: searchQuery, page, limit: 6 },
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUsers(response.data.users));
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      } finally {
        setFilterLoading(false);
      }
    };

    fetchUsers();
    return () => dispatch(setUsers([]));
  }, [selectedRole, searchQuery, page]);

  const handleDelete = async (id) => {
    try {
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("token");
      await axios.delete(`${VITE_BACKEND_URL}/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setUsers(users.filter((user) => user._id !== id)));
      notifySuccess("User deleted successfully");
    } catch (error) {
      console.error(error.message);
      notifyError("Failed to delete user");
    }
  };

  const handleRoleChange = async (id, newRole) => {
    setChangingRole(id);
    setLoadingRoles((prev) => ({ ...prev, [id]: true }));
    try {
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("token");
      await axios.patch(
        `${VITE_BACKEND_URL}/user/${id}`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedUsers = users.map((user) =>
        user._id === id ? { ...user, role: newRole } : user
      );
      dispatch(setUsers(updatedUsers));
      notifySuccess("User role updated successfully");
    } catch (error) {
      console.error(error.message);
      notifyError("Failed to update user role");
    } finally {
      setLoadingRoles((prev) => ({ ...prev, [id]: false }));
      setChangingRole(null);
    }
  };

  const handleRoles = (newRole) => {
    setFilterLoading(true);
    setSelectedRole(newRole);
    setPage(1); 
  };
  const handlePagination = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-neutral-900 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-neutral-900 py-12 px-6 relative">
      {filterLoading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h3 className="text-amber-500 font-serif italic text-2xl mb-2">
            Administration
          </h3>
          <h2 className="text-4xl font-bold text-white mb-8 flex items-center justify-center gap-4">
            <Users className="w-10 h-10" />
            User Management
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-3 py-2 bg-neutral-800 text-white border border-neutral-700 rounded-sm focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="bg-neutral-800 text-white border border-neutral-700 rounded-sm px-3 py-2 focus:outline-none focus:border-amber-500 transition-colors"
            value={selectedRole}
            onChange={(e) => handleRoles(e.target.value)}
          >
            <option value="" className="text-center">
              All
            </option>
            {roleOptions.map((role) => (
              <option className="text-center" key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {users.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={user._id}
                className="bg-black p-6 rounded-sm hover:bg-neutral-800 transition-colors"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {user.name}
                    </h3>
                    <p className="text-neutral-400">{user.email}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <UserCog className="w-5 h-5 text-amber-500" />
                    <div className="relative flex-1">
                      <select
                        className="w-full bg-neutral-800 text-white border border-neutral-700 rounded-sm px-3 py-2 focus:outline-none focus:border-amber-500 transition-colors"
                        value={user.role}
                        disabled={loadingRoles[user._id] || (changingRole && changingRole !== user._id)}
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                      >
                        {roleOptions.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                      {loadingRoles[user._id] && (
                        <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-amber-500" />
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="w-full flex items-center justify-center gap-2 bg-red-600/10 hover:bg-red-600/20 text-red-500 py-2 rounded-sm transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete User
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={() => handlePagination(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-neutral-800 text-white rounded-l-sm hover:bg-neutral-700 transition-colors"
          >
            Prev
          </button>
          <span className="px-4 py-2 text-white">{`Page ${page} of ${totalPages}`}</span>
          <button
            onClick={() => handlePagination(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-neutral-800 text-white rounded-r-sm hover:bg-neutral-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
