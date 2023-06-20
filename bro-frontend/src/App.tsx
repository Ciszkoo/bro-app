import { useOidc } from "@axa-fr/react-oidc";
import PostForm from "./components/PostForm";
import Posts from "./components/Posts";
import { useState } from "react";
import PendingPosts from "./components/PendingPosts";
import { PostType } from "./types/types";
import RightPanel from "./components/RightPanel";

const App = () => {
  const [postType, setPostType] = useState<PostType>("approved");
  const [adminView, setAdminView] = useState<boolean>(false);

  const { isAuthenticated } = useOidc();

  const handlePostsTypePending = () => setPostType("pending");
  const handlePostsTypeApproved = () => setPostType("approved");
  const handleAdminViewChange = () => setAdminView(!adminView);

  return (
    <>
      <div className="rounded-md shadow-2xl basis-2/3 bg-sky-200 mt-16 mb-16 mr-8 ml-16 flex flex-col">
        {isAuthenticated && <PostForm />}
        {postType === "approved" && <Posts adminView={adminView} />}
        {postType === "pending" && <PendingPosts adminView={adminView} />}
      </div>
      <div className="rounded-md shadow-2xl basis-1/3 bg-sky-200 mt-16 mb-16 mr-16 ml-8 flex flex-col">
        <RightPanel
          handlePostsTypeApproved={handlePostsTypeApproved}
          handlePostsTypePending={handlePostsTypePending}
          adminView={adminView}
          handleAdminViewChange={handleAdminViewChange}
        />
      </div>
    </>
  );
};

export default App;
