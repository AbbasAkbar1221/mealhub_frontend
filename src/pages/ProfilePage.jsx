// import React from "react";
// import { useSelector } from "react-redux";
// import { Avatar } from "@mui/material";

// const ProfilePage = () => {
//   const user = useSelector((state) => state.auth.currentUser);

//   return (
//     <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-3xl mt-10 dark:bg-gray-900 dark:text-white backdrop-blur-lg border border-gray-200 dark:border-gray-800">
      
//       <div className="flex items-center gap-6 border-b pb-6 dark:border-gray-700">
        
//         <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg">
//           <Avatar
//             sx={{
//               width: "100%",
//               height: "100%",
//               fontSize: "2rem",
//               background: "linear-gradient(135deg, #00b4d8, #0077b6)",
//               color: "#fff",
//             }}
//           >
//             {user?.name?.charAt(0).toUpperCase()}
//           </Avatar>
//         </div>

//         <div>
//           <h2 className="text-3xl font-bold tracking-wide">{user?.name || "Guest User"}</h2>
//           <p className="text-gray-500 dark:text-gray-400">{user?.email || "Email not available"}</p>

//           <span
//             className={`px-4 py-1 text-sm rounded-full font-semibold inline-block mt-3 shadow-md ${
//               user?.role === "Admin"
//                 ? "bg-red-500 text-white"
//                 : user?.role === "Merchant"
//                 ? "bg-blue-500 text-white"
//                 : "bg-green-500 text-white"
//             }`}
//           >
//             {user?.role || "Customer"}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React from "react";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.currentUser);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-12 dark:bg-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 backdrop-blur-md">
      
      <div className="flex items-center gap-6 border-b pb-6 border-gray-300 dark:border-gray-700">
        
        <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-md border border-gray-400 dark:border-gray-600">
          <Avatar
            sx={{
              width: "100%",
              height: "100%",
              fontSize: "2.5rem",
              background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
              color: "#fff",
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </div>

        <div>
          <h2 className="text-3xl font-semibold tracking-wide text-gray-900 dark:text-white">
            {user?.name || "Guest User"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {user?.email || "Email not available"}
          </p>

          <span
            className={`px-4 py-1 text-sm rounded-full font-medium inline-block mt-3 shadow-md transition-all duration-300 ${
              user?.role === "Admin"
                ? "bg-red-600 text-white"
                : user?.role === "Merchant"
                ? "bg-blue-600 text-white"
                : "bg-green-600 text-white"
            }`}
          >
            {user?.role || "Customer"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
