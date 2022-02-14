import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../redux/actions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./preview.css"

export default function Prev() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prev = useSelector((state) => state.thumbnail);
  const isLoading = useSelector((state) => state.loading);

  const edit = () => {
    navigate("/edit");
  };

/*eslint-disable*/
  useEffect(() => {
    if (prev.path.length > 0) {
      dispatch(setLoading(false));
    }
  }, [prev]);
  /*eslint-enable*/


  return (
    <div className="prevContainer">
      {prev.path.length === 0 && isLoading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : prev.path.length === 0 ? (
        <div>No hay imagenes</div>
      ) : (
        <div className="edit">
          <h2>Your file was uploaded sucessfully</h2>
          <h3 className="URL">URL: <a className="link" href={prev.path} rel="noreferrer" target="_blank">{prev.path}</a></h3>
          <button onClick={() => edit()} className="ov-btn-slide-close" id="from-center">Continue</button>
        </div>
      )}
    </div>
  );
}
