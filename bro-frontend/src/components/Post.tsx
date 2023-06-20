import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { PostProps } from "../types/types";
import { useState } from "react";
import axios from "axios";

const Post = (props: PostProps) => {
  const [deleting, setDeleting] = useState<boolean>(false);
  const [approving, setApproving] = useState<boolean>(false);
  const { accessToken, accessTokenPayload } = useOidcAccessToken();

  const time = new Date(props.createdAt);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedString = time.toLocaleDateString("en-US", options);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:3000/posts/${props._id["$oid"]}`, {
        headers: { Authorization: "Bearer " + accessToken },
      });
      await props.handleRefreshPosts();
    } catch (error) {
      setDeleting(false);
      console.error(error);
    }
  };

  const handleApprove = async () => {
    setApproving(true);
    try {
      await axios.patch(
        `http://localhost:3000/posts/approve/${props._id["$oid"]}`,
        {},
        {
          headers: { Authorization: "Bearer " + accessToken },
        }
      );
      await props.handleRefreshPosts();
    } catch (error) {
      setApproving(false);
      console.log(error);
    }
  };

  return (
    <div key={props._id["$oid"]} className="py-4 flex flex-col gap-2">
      <div className="flex justify-between">
        <h2 className="font-semibold">{props.title}</h2>
        <div className="flex gap-2 items-center">
          {props.adminView &&
            props.status === "pending" &&
            accessTokenPayload &&
            accessTokenPayload.resource_access.bro_backend.roles.includes(
              "admin-user"
            ) && (
              <button
                className="text-xs"
                type="button"
                disabled={approving}
                onClick={handleApprove}
              >
                APPROVE
              </button>
            )}
          {props.adminView &&
            accessTokenPayload &&
            accessTokenPayload.resource_access.bro_backend.roles.includes(
              "admin-user"
            ) && (
              <button
                className="text-xs"
                type="button"
                disabled={deleting}
                onClick={handleDelete}
              >
                DELETE
              </button>
            )}
          <p className="text-xs">{formattedString}</p>
        </div>
      </div>
      <p>{props.content}</p>
    </div>
  );
};

export default Post;
