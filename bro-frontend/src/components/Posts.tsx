import axios from "axios";
import { useEffect, useState } from "react";
import { PostI } from "../types/types";
import Post from "./Post";

interface PostsProps {
  adminView: boolean;
}

const Posts = (props: PostsProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<PostI[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(false);

  useEffect(() => {
    tryNext();
    fetchPosts();
  }, [currentPage]);

  const tryNext = async () => {
    try {
      const response = await axios.get<PostI[]>(
        `http://localhost:3000/posts/${currentPage + 1}`
      );
      if (response.data.length !== 0) {
        setHasNext(true);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get<PostI[]>(
        `http://localhost:3000/posts/${currentPage}`
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleNextPage = () => {
    if (hasNext) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <h1 className="mt-5 self-center font-bold">Posts:</h1>
      <div className="m-5 p-5 bg-sky-100 rounded-md shadow-md flex flex-col basis-full break-all overflow-auto">
        <div>
          {posts.map((post) => (
            <Post
              key={post._id["$oid"]}
              {...post}
              adminView={props.adminView}
              handleRefreshPosts={fetchPosts}
            />
          ))}
        </div>
      </div>
      <div className="self-center mb-5 font-bold flex gap-10">
        <button
          className={currentPage === 1 ? "text-gray-400" : "hover:underline"}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
          className={!hasNext ? "text-gray-400" : "hover:underline"}
          onClick={handleNextPage}
          disabled={!hasNext}
        >
          Next Page
        </button>
      </div>
    </>
  );
};

export default Posts;
