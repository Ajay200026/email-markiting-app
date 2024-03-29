import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signupMode, setSignupMode] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleSignupMode = () => {
    setSignupMode(!signupMode);
  };
  const handleFormSubmit = async () => {
    const errors = {};

    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    if (signupMode && password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (signupMode && !name) {
      errors.name = "Name is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      if (signupMode) {
        // Signup logic
        await axios.post("http://localhost:5000/signup", {
          email,
          password,
          name,
        });
        // For demonstration purposes, just toggle to login mode
        setSignupMode(false);
      } else {
        // Login logic
        const response = await axios.post("http://localhost:5000/login", {
          email,
          password,
        });

        // Check if response object and 'data' property are defined
        if (response && response.data) {
          document.cookie = `token=${response.data.token}; Secure; HttpOnly`;
          navigate("/home");
        } else {
          console.error("Unexpected response format:", response);
          setErrors({
            general: "Unexpected response format. Authentication failed.",
          });
        }
      }

      // Reset form and errors
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
      setErrors({});
    } catch (error) {
      console.error(error.response?.data || error.message);
      setErrors({ general: "Authentication failed" });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Container with Image */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url('/2995663.jpg')` }}
      >
        {/* You can adjust the background image and styles accordingly */}
      </div>

      {/* Right Container with Form */}
      <div className="w-full md:w-1/2 p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/logo-2.png"
            alt="Logo"
            className="w-16 h-16 rounded-full"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-2 border-b ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:border-blue-500`}
            placeholder="Your Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border-b ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-blue-500`}
              placeholder="Your Password"
            />
            <span className="absolute right-0 top-0 mt-2 mr-2">
              {showPassword ? (
                <FaEyeSlash
                  className="h-6 w-6 text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaEye
                  className="h-6 w-6 text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Conditional Rendering for Signup */}
        {signupMode && (
          /* Additional inputs for Signup */
          <>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full p-2 border-b ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:border-blue-500`}
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full p-2 border-b ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:border-blue-500`}
                  placeholder="Confirm Password"
                />
                <span className="absolute right-0 top-0 mt-2 mr-2">
                  {showPassword ? (
                    <FaEyeSlash
                      className="h-6 w-6 text-gray-500 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaEye
                      className="h-6 w-6 text-gray-500 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </>
        )}

        {/* Login/Signup Button */}
        <button
          className="bg-blue-500 text-white p-2 rounded-full w-full"
          onClick={handleFormSubmit}
        >
          {signupMode ? "Sign Up" : "Log In"}
        </button>

        {/* Conditional Rendering for Forget Password/Signup Link */}
        {!signupMode ? (
          <div className="mt-4 text-center">
            <a href="#" className="text-blue-500">
              Forgot your password?
            </a>
          </div>
        ) : (
          <div className="mt-4 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={toggleSignupMode}
            >
              Login
            </span>
          </div>
        )}

        {/* Conditional Rendering for "OR" text and Social Logins */}
        {!signupMode && (
          <div className="flex items-center mt-4">
            <div className="border-b w-full border-gray-300"></div>
            <div className="mx-4 text-gray-500">OR</div>
            <div className="border-b w-full border-gray-300"></div>
          </div>
        )}

        {/* Social Logins */}
        {!signupMode && (
          <div className="flex justify-center mt-4 space-x-4">
            <button className="text-blue-500">Google</button>
            <button className="text-blue-500">Facebook</button>
            <button className="text-blue-500">Twitter</button>
          </div>
        )}

        {/* Signup Link */}
        {!signupMode && (
          <div className="mt-4 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={toggleSignupMode}
            >
              Sign Up
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
