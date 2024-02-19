import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import Comment from "../components/Comment";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { URL, IMAGE_FOLDER } from "../url";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState([]);
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  // console.log(post);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + `/api/posts/${postId}`);
      // console.log(res.data);
      setPost(res.data);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [postId]);

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(`${URL}/api/posts/${postId}`, {
        withCredentials: true,
      });
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(`${URL}/api/comments/post/${postId}`);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${URL}/api/comments/create`,
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      setComment("");
      fetchPostComments();
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {post.title}
            </h1>

            {user && user._id === post.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p
                  className="cursor-pointer"
                  onClick={() => navigate(`/edit/${postId}`)}
                >
                  <MdEdit />
                </p>
                <p className="cursor-pointer" onClick={handleDeletePost}>
                  <MdOutlineDelete />
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>{post.username}</p>
            <div className="flex space-x-2">
              <p>
                {new Date(post.updatedAt).toLocaleString("en-US", {
                  dateStyle: "full",
                  timeStyle: "short",
                  hour12: false,
                })}
              </p>
            </div>
          </div>
          <img
            className="w-full max-h-[80vh] mx-auto mt-8 object-contain"
            src={
              post.photo && post.photo[0] === "h"
                ? post.photo
                : IMAGE_FOLDER + post.photo
            }
            alt=""
          />
          <p className="mx-auto mt-8">{post.desc}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories: </p>
            <div className="flex justify-center items-center space-x-2">
              {post &&
                post.categories &&
                post.categories.map((category, index) => (
                  <div key={index} className="bg-gray-300 rounded-lg px-3 py-1">
                    {category}
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>

            {/* Comments */}
            {comments &&
              comments.map((comment, index) => (
                <Comment key={index} comment={comment} />
              ))}
            {/* <Comment />
            <Comment />
            <Comment /> */}
          </div>

          {/* Write a Comment  */}
          <div className="w-full flex flex-col mt-4 md:flex-row">
            <input
              // value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment.."
              type="text"
              className="md:w-[80%] outline-none px-4 mt-4 md:mt-0"
            />
            <button
              onClick={handleAddComment}
              className="bg-black text-sm text-white px-4 py-2 md:w-[20%] mt-4 md:mt-0"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default PostDetails;
