import React from "react";
import AddPostForm from "./screens/AddPostForm";
import PostsList from "./screens/PostsList";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import SinglePost from "./screens/SinglePost";
import EditPostForm from "./screens/EditPostForm";
import UsersList from "./screens/UsersList";
import UserPage from "./screens/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePost />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

        {/* catch all ::: replace 404 component if you want */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
