import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { HiBars3 } from "react-icons/hi2";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-xl font-extrabold">
        <Link to={"/"}>Blog It</Link>
      </h1>

      {path === "/" && (
        <div className="flex justify-center items-center space-x-0">
          <p
            onClick={() => navigate(prompt ? `?search=${prompt}` : "/")}
            className="cursor-pointer"
          >
            <IoIosSearch />
          </p>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-none px-3 py-1"
            placeholder="Search a post"
            type="text"
          />
        </div>
      )}

      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3>
            <Link to={"/create"}>Create a Post</Link>
          </h3>
        ) : (
          <h3>
            <Link to={"/login"}>Login</Link>
          </h3>
        )}
        <h3>
          {user ? (
            <>
              {menu && <Menu />}
              <h3 onClick={showMenu}>
                <p className="cursor-pointer relative">
                  <HiBars3 />
                </p>
              </h3>
            </>
          ) : (
            <h3>
              <Link to={"/register"}>Register</Link>
            </h3>
          )}
        </h3>
      </div>
      <div onClick={showMenu} className="md:hidden ">
        <p className="cursor-pointer relative">
          <HiBars3 />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
