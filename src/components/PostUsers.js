import React from "react";
import { useSelector } from "react-redux";

const PostUsers = ({ userId }) => {
  const users = useSelector((state) => state.users);
  // console.log("users=>", users);

  const author = users.find((user) => user.id === userId);

  return <span>By : {author ? author.name : "unknown author"}</span>;
};

export default PostUsers;
