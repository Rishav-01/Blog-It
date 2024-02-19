import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import Loader from "../components/Loader";
import HomePosts from "../components/HomePosts";

const MyBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [noSearchResults, setNoSearchResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  // console.log(user);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + `/api/posts/user/${user._id}`);
      setPosts(res.data);
      res.data.length === 0
        ? setNoSearchResults(true)
        : setNoSearchResults(false);

      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh] px-8 md:px-[200px]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noSearchResults ? (
          posts.map((post, index) => (
            <>
              <Link
                key={index}
                to={user ? `/posts/post/${post._id}` : "/login"}
              >
                <HomePosts key={index} post={post} />
              </Link>
            </>
          ))
        ) : (
          <h3 className="text-center font-bold mt-10">No Posts Available</h3>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBlogs;
