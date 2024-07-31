import React, { useState } from "react";
import plant from "../../../assets/Img/Auth/Register.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { loginService } from "../../../services/AuthService";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const data = await loginService(email, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate(data.role === "user" ? "/home" : "/Admin/Dashboard");
      } else {
        throw new Error("Invalid login response");
      }
    } catch (error: any) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex lg:w-1/2 sm:w-3/4 justify-between  bg-white shadow-lg rounded-lg">
        <div className="w-1/2 flex flex-col justify-center items-center p-8">
          <h2
            className="font-bold text-4xl mb-6"
            style={{ fontFamily: "Inconsolata" }}
          >
            Welcome Again
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-2xl">
                Email:
              </label>
              <input
                type="text"
                required
                id="username or email"
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
                {" "}
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  className=" w-full border border-black p-2 rounded-2xl text-center "
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
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register here
              </Link>
            </p>
            <div className="flex justify-end">
              <button
                className="border border-black shadow-xl p-2 rounded-2xl w-1/2 relative overflow-hidden hover:scale-110 duration-1000 hover:bg-blue-700 hover:text-white hover:border-white hover:border-2 hover:shadow-xl"
                type="submit"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
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

export default Login;
