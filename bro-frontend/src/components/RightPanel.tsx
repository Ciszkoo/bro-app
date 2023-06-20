import { useOidc, useOidcAccessToken } from "@axa-fr/react-oidc";

interface RightPanelProps {
  handlePostsTypePending: () => void;
  handlePostsTypeApproved: () => void;
  adminView: boolean;
  handleAdminViewChange: () => void;
}

const RightPanel = (props: RightPanelProps) => {
  const { login, logout, isAuthenticated } = useOidc();
  const { accessTokenPayload } = useOidcAccessToken();

  const handleLogin = () => {
    login("/");
  };

  const handleLogout = () => logout("/");

  return (
    <>
      {!isAuthenticated && (
        <button
          className="bg-sky-400 py-4 px-20 self-center m-auto rounded-md shadow-md active:bg-sky-500 active:shadow-inner"
          type="button"
          onClick={handleLogin}
        >
          Login
        </button>
      )}
      {isAuthenticated && (
        <>
          <div className="self-center m-auto flex flex-col gap-5">
            <div className="py-4 px-10 text-2xl break-words">
              {accessTokenPayload.given_name} {accessTokenPayload.family_name}!
              Bro!
            </div>
            <button
              className="bg-sky-400 py-4 px-20 rounded-md shadow-md active:bg-sky-500 active:shadow-inner hover:bg-sky-300"
              type="button"
              onClick={props.handlePostsTypeApproved}
            >
              Approved posts
            </button>
            <button
              className="bg-sky-400 py-4 px-20 rounded-md shadow-md active:bg-sky-500 active:shadow-inner hover:bg-sky-300"
              type="button"
              onClick={props.handlePostsTypePending}
            >
              Pending posts
            </button>
            <button
              className="bg-sky-500 py-4 px-20 rounded-md shadow-md active:bg-sky-600 active:shadow-inner hover:bg-sky-400"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
            {accessTokenPayload &&
              accessTokenPayload.resource_access.bro_backend.roles.includes(
                "admin-user"
              ) && (
                <>
                  {!props.adminView && (
                    <button
                      className="bg-sky-600 self-end p-2 rounded-md shadow-md active:bg-sky-700 active:shadow-inner hover:bg-sky-500"
                      onClick={props.handleAdminViewChange}
                    >
                      Toggle admin view
                    </button>
                  )}
                  {props.adminView && (
                    <button
                      className="bg-sky-600 self-end p-2 rounded-md shadow-md active:bg-sky-700 active:shadow-inner hover:bg-sky-500"
                      onClick={props.handleAdminViewChange}
                    >
                      Close admin view
                    </button>
                  )}
                </>
              )}
          </div>
        </>
      )}
    </>
  );
};

export default RightPanel;
