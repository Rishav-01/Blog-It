import React, { useState } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", {
        username: username,
        email: email,
        password: password,
      });
      navigate("/login");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg font-extrabold md:text-xl">
          <Link to={"/"}>Blog It</Link>
        </h1>
        <h3>
          <Link to={"/login"}>Login</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Create your account</h1>

          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            name=""
            id=""
            placeholder="Enter your username"
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="text"
            placeholder="Enter your email"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="password"
            placeholder="Enter your password"
          />

          <button
            onClick={handleRegister}
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500"
          >
            Register
          </button>

          {error && (
            <h3 className="text-red-500 text-sm">Something went wrong</h3>
          )}

          <div className="flex justify-center items-center space-x-3">
            <p>Already have an account ?</p>
            <p className="text-gray-500 hover:text-black">
              <Link to={"/login"}>Log In</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
