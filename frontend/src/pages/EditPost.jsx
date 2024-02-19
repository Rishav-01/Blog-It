import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const EditPost = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setCategories(res.data.categories);
      setFile(res.data.photo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const addCategory = () => {
    let updatedCategories = [...categories];
    updatedCategories.push(category);
    setCategory("");
    setCategories(updatedCategories);
  };

  const deleteCategory = (index) => {
    let updatedCategories = [];
    for (let i = 0; i < index; i++) updatedCategories.push(categories[i]);
    for (let i = index + 1; i < categories.length; i++)
      updatedCategories.push(categories[i]);
    setCategories(updatedCategories);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      file,
      categories,
      username: user.username,
      userId: user._id,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      // console.log(data);

      // image upload
      try {
        const imgUpload = await axios.post(`${URL}/api/uploads`, data);
        // console.log(imgUpload.data);
      } catch (error) {
        console.log(error);
      }
    }

    // post upload
    try {
      const res = await axios.put(`${URL}/api/posts/${postId}`, post, {
        withCredentials: true,
      });
      // console.log(res.data);
      navigate(`/posts/post/${res.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl">Update your post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none"
          />
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="px-4 py-2 outline-none"
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 outline-none"
                placeholder="Enter post category"
                type="text"
                name=""
                id=""
              />
              <div
                onClick={addCategory}
                className="bg-black text-white px-4 py-2 font-semibold cursor-pointer"
              >
                Add
              </div>
            </div>

            {/* categories  */}
            <div className="flex px-4 mt-3">
              {categories?.map((category, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{category}</p>
                  <p
                    onClick={() => deleteCategory(index)}
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>

          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="px-4 py-2 outline-none"
            placeholder="Enter post description"
            name=""
            id=""
            cols="30"
            rows="15"
          ></textarea>
          <button
            onClick={handleUpdate}
            className="bg-black w-full md:w-[20%] mx-auto font-semibold px-4 py-2 md:text-xl text-lg text-white"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditPost;
