import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { setLoading } from "../../redux/actions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImHome3 } from "react-icons/im";
import { BiLogOut } from "react-icons/bi";
import "./preview.css";

export default function Prev() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prev = useSelector((state) => state.thumbnail);
  const isLoad = useSelector((state) => state.loading);
  const { user, isLoading, logout, isAuthenticated } = useAuth0();

  const edit = () => {
    navigate("/edit");
  };

  /*eslint-disable*/
  useEffect(() => {
    if (prev.path.length > 0) {
      dispatch(setLoading(false));
    }
  }, [prev]);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/");
    }
  }, []);
  /*eslint-enable*/

  return (
    <div className="prevContainer">
      <a className="homeButton" href={`/home`}>
        {" "}
        <ImHome3 /> Homepage
      </a>
      <div className="logoutButton">
        <BiLogOut />
        <button onClick={() => logout()}>Logout</button>
      </div>
      {prev.path.length === 0 && isLoad ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : prev.path.length === 0 ? (
        <div>No hay imagenes</div>
      ) : (
        <div className="edit">
          <h2>Your file was uploaded sucessfully</h2>
          <h3 className="URL">
            URL:{" "}
            <a
              className="link"
              href={prev.path}
              rel="noreferrer"
              target="_blank"
            >
              {prev.path}
            </a>
          </h3>
          <button
            onClick={() => edit()}
            className="ov-btn-slide-close"
            id="from-center"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
