import React from "react";
import PostUsers from "./PostUsers";
import TimeAgo from "./TimeAgo";
import ReactionsButton from "./ReactionsButton";

const PostsExcerpt = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <PostUsers userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionsButton post={post} />
    </article>
  );
};

export default PostsExcerpt;
