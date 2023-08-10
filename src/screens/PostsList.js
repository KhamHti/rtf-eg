import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../redux/features/posts/postsSlice";
import PostsExcerpt from "../components/PostsExcerpt";

const PostsList = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  let content;
  if (status === "loading") {
    content = <p>loading...</p>;
  } else if (status === "success") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  // const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date));

  // const renderPosts = orderedPosts.map((post) => (
  //   <article key={post.id}>
  //     <h3>{post.title}</h3>
  //     <p>{post.content.substring(0, 100)}</p>
  //     <p className="postCredit">
  //       <PostUsers userId={post.userId} />
  //       <TimeAgo timestamp={post.date} />
  //     </p>
  //       <ReactionsButton post={post} />
  //   </article>
  // ));

  return <section>{content}</section>;
};

export default PostsList;
