import axios from "axios";
import React, { useContext } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";

const Comment = ({ comment }) => {
  const { user } = useContext(UserContext);

  const handleDeleteComment = async () => {
    try {
      await axios.delete(`${URL}/api/comments/${comment._id}`, {
        withCredentials: true,
      });
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-500">{comment.author}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p className="text-gray-500 text-sm">
            {new Date(comment.updatedAt).toLocaleString("en-US", {
              dateStyle: "full",
              timeStyle: "short",
              hour12: false,
            })}
          </p>
          {user?._id === comment?.userId && (
            <div className="flex items-center justify-center space-x-2">
              <p className="cursor-pointer" onClick={handleDeleteComment}>
                <MdOutlineDelete />
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="px-4 mt-2">{comment.comment}</p>
    </div>
  );
};

export default Comment;
