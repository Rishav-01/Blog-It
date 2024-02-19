import React, { useContext, useEffect, useState } from "react";
import HomePosts from "../components/HomePosts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import axios from "axios";
import { URL } from "../url";
import { useLocation, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [noSearchResults, setNoSearchResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  // console.log(user);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search);
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
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] px-8 md:px-[200px]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noSearchResults ? (
          posts.map((post, index) => (
            <>
              <Link to={user ? `/posts/post/${post._id}` : "/login"}>
                <HomePosts key={index} post={post} />
              </Link>
            </>
          ))
        ) : (
          <h3 className="text-center font-bold mt-10">No Posts Available</h3>
        )}
        {/* <HomePosts />
        <HomePosts />
        <HomePosts /> */}
      </div>
      <Footer />
    </>
  );
};

export default Home;
