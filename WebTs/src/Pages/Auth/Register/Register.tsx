import React, { useState } from "react";
import plant from "../../../assets/Img/Auth/Register.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ReactCardFlip from "react-card-flip";
import { registerService } from "../../../services/AuthService";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  // Handles form submission for Phase 1
  const handlePhase1Submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsFlipped(true); // Flip the card to Phase 2
  };

  // Handles form submission for Phase 2
  const handlePhase2Submit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = await registerService({ name, email, password, address, phone });
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate(data.role === "user" ? "/home" : "/Admin");
      } else {
        throw new Error("Invalid registration response");
      }
    } catch (error: any) {
      setError("Registration failed. Please check your information.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="card-container flex lg:w-1/2 sm:w-3/4">
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
          {/* Phase 1 - Front Face */}
          <div className="card-face front flex flex-col justify-center items-center p-8 bg-white shadow-lg rounded-lg">
            <h2
              className="font-bold text-4xl mb-6"
              style={{ fontFamily: "Inconsolata" }}
            >
              Create Account - Phase 1
            </h2>
            {error && <p className="text-red-500">{error}</p>}
            <form
              onSubmit={handlePhase1Submit}
              className="w-full flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-2xl">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="border border-black p-2 rounded-2xl text-center"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-2xl">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="border border-black p-2 rounded-2xl text-center"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col gap-2 relative">
                <label htmlFor="password" className="text-2xl">
                  Password:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    className="w-full border border-black p-2 rounded-2xl text-center"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute p-0 inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
              </div>
              <p className="text-end">
                you have already an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Log in
                </Link>
              </p>
              <div className="flex justify-end ">
                <button
                  className="border border-black shadow-xl p-2 rounded-2xl w-1/2 relative overflow-hidden hover:scale-110 duration-1000 hover:bg-blue-700 hover:text-white hover:border-white hover:border-2 hover:shadow-xl"
                  type="submit"
                >
                  Next
                </button>
              </div>
            </form>
          </div>

          {/* Phase 2 - Back Face */}
          <div className="card-face back flex flex-col justify-center items-center p-8 bg-white shadow-lg rounded-lg">
            <h2
              className="font-bold text-4xl mb-6"
              style={{ fontFamily: "Inconsolata" }}
            >
              Create Account - Phase 2
            </h2>
            {error && <p className="text-red-500">{error}</p>}
            <form
              onSubmit={handlePhase2Submit}
              className="w-full flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="address" className="text-2xl">
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  required
                  className="border border-black p-2 rounded-2xl text-center"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-2xl">
                  Phone:
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="border border-black p-2 rounded-2xl text-center"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="gender" className="text-2xl">
                  Gender:
                </label>
                <select
                  id="gender"
                  className="border border-black p-2 rounded-2xl text-center"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex justify-center gap-5 mt-2 w-full">
                <button
                  type="button"
                  className="border border-black shadow-xl p-2 rounded-2xl w-1/3 relative overflow-hidden hover:scale-110 duration-1000 hover:bg-gray-700 hover:text-white hover:border-white hover:border-2 hover:shadow-xl"
                  onClick={() => setIsFlipped(false)}
                >
                  Back
                </button>
                <button
                  className="border border-black shadow-xl p-2 rounded-2xl w-1/3 relative overflow-hidden hover:scale-110 duration-1000 hover:bg-blue-700 hover:text-white hover:border-white hover:border-2 hover:shadow-xl"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </ReactCardFlip>
        <div className="w-1/2">
          <img
            src={plant}
            alt="Plant"
            className="w-full h-full object-cover rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
