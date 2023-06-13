import { useOidc } from "@axa-fr/react-oidc";
import "./App.css";
import Home from "./components/Home";

const App = () => {
  const { login, isAuthenticated } = useOidc();

  const handleLogin = () => {
    login("/");
  };

  return (
    <>
      {!isAuthenticated && (
        <>
          <h1>Bro</h1>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </>
      )}
      {isAuthenticated && <Home />}
    </>
  );
};

export default App;
