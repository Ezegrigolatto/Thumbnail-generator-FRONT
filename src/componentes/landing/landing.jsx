import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css";
export default function Landing() {
  const navigate = useNavigate();
  const { loginWithRedirect, user } = useAuth0();

  useEffect(() => {
    if (user?.email) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div className="landing">
      <div className="landingContainer">
        <h1>Thumbnail-generator-App</h1>
        <button
          onClick={() => loginWithRedirect()}
          className="ov-btn-slide-close"
        >
          {" "}
          Login{" "}
        </button>
      </div>
    </div>
  );
}
