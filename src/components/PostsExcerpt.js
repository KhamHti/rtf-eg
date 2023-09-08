import React from "react";
import PostUsers from "./PostUsers";
import TimeAgo from "./TimeAgo";
import ReactionsButton from "./ReactionsButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "../redux/features/posts/postsSlice";

const PostsExcerpt = ({ postId }) => {
  const post = useSelector(state => selectPostById(state, postId));

  return (
    <article>
      <h2>{post.title}</h2>
      <p className="excerpt">{post.body.substring(0, 55)}...</p>
      <p className="postCredit">
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostUsers userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionsButton post={post} />
    </article>
  );
};

export default PostsExcerpt;
