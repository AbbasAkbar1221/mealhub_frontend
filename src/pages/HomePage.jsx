import React from "react";
import banner from "../assets/Black White Simple Opening Banner.png";
import meal from "../assets/meal.jpg";
import profile from "../assets/profile and order.jpg";
import security from "../assets/security.jpg";
import admin from "../assets/admin.jpg";
import merchant from "../assets/merchant.jpg";
import customer from "../assets/customer.jpg";

const HomePage = () => {
  return (
    <div className="bg-black text-white font-sans">
      <div className="relative w-full h-screen">
        <img
          src={banner}
          alt="MealHub Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-4 py-12 max-w-screen-xl mx-auto">
        {/* Meal Ordering System */}
        <section className="mb-16 grid md:grid-cols-2 gap-8">
          <div className="relative bg-gray-600 flex items-center justify-center rounded-lg shadow-lg">
            <img
                src={meal}
                alt="meal image"
                className="w-full h-full object-cover"
              />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold mb-4">
              Meal Ordering System
            </h2>
            <p className="mb-4">
              <strong>Browse Counters: </strong>
              View different counters available in the cafeteria with options to
              filter and sort.
            </p>
            <p>
              <strong>Search Dishes: </strong>
              Find dishes from any counter and filter by preferences,
              availability, and pricing.
            </p>
          </div>
        </section>

        <section className="mb-16 grid md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold mb-4">
              User Profiles and Preferences
            </h2>
            <p className="mb-4">
              <strong>Personalized Profiles: </strong>
              View your order history, manage dietary preferences, and mark your
              favorite dishes.
            </p>
            <p>
              <strong>One-Click Reordering: </strong>
              Quickly reorder your favorite dishes with just one click from your
              profile.
            </p>
          </div>
          <div className="relative bg-gray-600 flex items-center justify-center rounded-lg shadow-lg">
            <img
                src={profile}
                alt="profile image"
                className="w-full h-full object-cover"
              />
          </div>
        </section>

        <section className="mb-16 grid md:grid-cols-2 gap-8">
          <div className="relative bg-gray-600 flex items-center justify-center rounded-lg shadow-lg">
            <img
                src={security}
                alt="security image"
                className="w-full h-full object-cover"
              />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold mb-4">
              Authentication and User Security
            </h2>
            <p className="mb-4">
              <strong>Secure Authentication: </strong>
              JWT ensures secure authentication, allowing users to securely log
              in and access their accounts.
            </p>
            <p>
              <strong>Password Hashing: </strong>
              Bcrypt hashes passwords to ensure user data is protected during
              authentication.
            </p>
          </div>
        </section>

        <section className="mb-16 grid md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold mb-4">Admin Role Features</h2>
            <p className="mb-4">
              <strong>Manage Counters: </strong>
              Admins can add and manage counters, granting Merchant users access
              to specific counters.
            </p>
            <p>
              <strong>Manage Users: </strong>
              Admins can manage user roles, ensuring that each user has the
              correct permissions.
            </p>
          </div>
          <div className="relative bg-gray-600 flex items-center justify-center rounded-lg shadow-lg">
            <img
                src={admin}
                alt="admin image"
                className="w-full h-full object-cover"
              />
          </div>
        </section>

        {/* Customer Features */}
        <section className="mb-16 grid md:grid-cols-2 gap-8">
          <div className="relative bg-gray-600 flex items-center justify-center rounded-lg shadow-lg">
            <img
                src={customer}
                alt="customer image"
                className="w-full h-full object-cover"
              />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold mb-4">
              Customer Role Features
            </h2>
            <p className="mb-4">
              <strong>Browse Counters and Dishes: </strong>
              Customers can explore available counters and browse the dishes
              offered by each counter.
            </p>
            <p>
              <strong>Add to Cart: </strong>
              Customers can add dishes to their cart, view their cart, and
              proceed to checkout.
            </p>
          </div>
        </section>

        {/* Merchant Features */}
        <section className="mb-16 grid md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold mb-4">
              Merchant Role Features
            </h2>
            <p className="mb-4">
              <strong>Manage Counter and Dishes: </strong>
              Merchants can manage details of their counters and update the
              availability of dishes.
            </p>
            <p>
              <strong>Order Management: </strong>
              Merchants can view pending orders and update their statuses
              (Pending, Preparing, Ready, Picked).
            </p>
          </div>
          <div className="relative bg-gray-600 flex items-center justify-center rounded-lg shadow-lg">
            <img
                src={merchant}
                alt="merchant image"
                className="w-full h-full object-cover"
              />
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
