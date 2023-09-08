import React from "react";
import { useSelector } from "react-redux";
import PostsExcerpt from "../components/PostsExcerpt";
import {
  getPostsStatus,
  getPostsError,
  selectPostsByUser,
  selectPostIds,
  selectPostById,
  selectAllPosts
} from "../redux/features/posts/postsSlice";

const PostsList = () => {
  const orderedPostIds = useSelector(selectPostIds);
  const data = useSelector(selectPostsByUser);
  const postStatus = useSelector(getPostsStatus);
  const posts = useSelector(selectAllPosts);
  const error = useSelector(getPostsError);

  console.log(orderedPostIds);


  // let content;
  // if (postStatus === "loading") {
  //   content = <p>loading...</p>;
  // } else if (postStatus === "succeeded") {
  //   content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />);
  // } else if (postStatus === "failed") {
  //   content = <p>{error}</p>;
  // }

  // return (
  //     <section>
  //          {content}
  //     </section>
  // );

  let content;
    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <section>
            {content}
        </section>
    )
};

export default PostsList;
