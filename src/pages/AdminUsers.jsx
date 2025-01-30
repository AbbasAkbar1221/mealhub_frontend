import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../slices/authSlice";
import CircularProgress from "@mui/material/CircularProgress";

const AdminUsers = () => {
  const [loading, setLoading] = useState(true);
  const [roleOptions] = useState(["Customer", "Merchant", "Admin"]);
  const users = useSelector((state) => state.auth.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${VITE_BACKEND_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUsers(response.data));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchUsers();
    return () => dispatch(setUsers([]));
  }, []);

  const handleDelete = async (id) => {
    try {
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("token");
      await axios.delete(`${VITE_BACKEND_URL}/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setUsers(users.filter((user) => user._id !== id)));
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("token");
      await axios.patch(`${VITE_BACKEND_URL}/user/${id}`, { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedUsers = users.map((user) =>
        user._id === id ? { ...user, role: newRole } : user
      );
      dispatch(setUsers(updatedUsers));
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading)
    return (
      <div className="text-center h-[100vh] p-6 flex justify-center items-center">
        <CircularProgress size={50} color="inherit" className="text-black" />
      </div>
    );
  

  return (
    <div className="p-6">
      <h1 className="text-3xl text-center font-semibold text-gray-900 mb-6">
        Users
      </h1>
      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="user-card bg-white border border-gray-300 rounded-lg shadow-xl p-6 flex flex-col items-start space-y-4 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="user-details space-y-2">
                <p className="user-name text-lg font-medium text-gray-800">{user.name}</p>
                <p className="user-email text-sm text-gray-600">{user.email}</p>
              </div>
              <div className="role-actions w-full flex flex-col items-start space-y-4">
                <select
                  className="role-select w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <div className="flex w-full justify-between">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <span className="material-icons-outlined">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
