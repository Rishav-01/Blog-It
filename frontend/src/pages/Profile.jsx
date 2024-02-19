import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { user, setUser } = useContext(UserContext);
  const params = useParams().id;
  const navigate = useNavigate();
  const [updated, setUpdated] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${URL}/api/users/${params}`);
      setUsername(res.data.username);
      setEmail(res.data.email);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [params]);

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        `${URL}/api/users/${params}`,
        {
          username,
          email,
        },
        { withCredentials: true }
      );
      setUpdated(true);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      await axios.delete(`${URL}/api/users/${params}`, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/user/${params}`);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [params]);

  return (
    <div>
      <Navbar />
      <div className="px-8 min-h-[65vh] md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
          <h1 className="text-xl font-bold mb-4">Your Posts: </h1>
          {posts.map((post, index) => (
            <ProfilePosts key={index} post={post} />
          ))}
          {/* <ProfilePosts />
          <ProfilePosts />
          <ProfilePosts /> */}
        </div>

        <div className="md:sticky md:top-12 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
          <div className="flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="outline-none px-4 py-2 text-gray-500"
              type="text"
              placeholder="Your username"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none px-4 py-2 text-gray-500"
              type="email"
              placeholder="Your email"
            />
            {/* <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none px-4 py-2 text-gray-500"
              type="password"
              placeholder="Your password"
            /> */}

            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUserUpdate}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-300"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-300"
              >
                Delete
              </button>
            </div>
            {updated && (
              <h3 className="text-green-400 text-sm text-center mt-4">
                User Updated Successfully !
              </h3>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
