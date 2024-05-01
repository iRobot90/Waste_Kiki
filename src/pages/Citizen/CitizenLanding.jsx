import React from "react";
import { Link } from "react-router-dom";

export default function CitizenLanding() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-teal-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Waste-Kiki</h1>

        <h1 className="text-4xl font-bold mb-4">
          Welcome to Waste-Kiki There is nothing like <strong>away</strong>
          <br />
          When you throw something, it always ends up <strong>Somewhere</strong>
        </h1>
        <p className="text-lg mb-8">Book your pickup now!</p>
        <Link
          to="/pickup"
          className="bg-white text-teal-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-teal-800 hover:text-white transition duration-300"
        >
          Book Pickup
        </Link>
      </div>
    </div>
  );
}
