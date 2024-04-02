import React, { useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

export default function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/citizen-landing"); // Use navigate function to redirect
    } catch (error) {
      setError("Failed to create a new account.");
      console.error("Error signing up:", error);
    }
  };
  
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-[400px] w-full mx-auto rounded-xl bg-white p-4"
      >
        <h2 className="text-4xl font-bold text-center py-6">Sign UP</h2>
        <div
          className="error-msg"
          style={{ marginTop: "0.2rem", marginLeft: "0.2rem" }}
        >
          {error && (
            <p
              className="error-text"
              style={{ color: "red", fontSize: "0.8rem", fontWeight: "1000" }}
            >
              {error}
            </p>
          )}
        </div>
        <div className="flex flex-col py-2">
          <label>Email</label>
          <input
            className="border p-2"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col py-2">
          <label>Password</label>
          <input
            className="border p-2"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="border w-full my-5 py-2 bg-teal-900 hover:bg-teal-800 text-white"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

