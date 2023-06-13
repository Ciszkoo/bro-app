import { useOidc, useOidcAccessToken } from "@axa-fr/react-oidc";

const Home = () => {
  const { logout } = useOidc();

  const handleLogout = () => logout("/");

  const { accessToken, accessTokenPayload } = useOidcAccessToken();

  const handleLogToken = () => {
    console.log(accessToken);
    console.log(accessTokenPayload);
  };

  return (
    <>
      <h1>Welcome Bro!</h1>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
      <button type="button" onClick={handleLogToken}>
        CLICK ME
      </button>
    </>
  );
};

export default Home;
