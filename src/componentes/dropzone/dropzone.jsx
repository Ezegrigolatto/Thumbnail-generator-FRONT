import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FiUpload } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import "./dropzone.css";

import {
  sendVideo,
  sendImage,
  setLoading,
  resetState,
} from "../../redux/actions";

export default function Dropzone() {
  const navigate = useNavigate();
  const { user, isLoading, logout, isAuthenticated } = useAuth0();
  function Previews() {
    const dispatch = useDispatch();

    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/*, video/*",
      noKeyboard: true,
      multiple: false,
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

    const thumbs = () => {
      if (files[0]?.preview.length > 0) {
        const prev = files[0];
        if (prev?.type.includes("image")) {
          const data = new FormData();
          data.append("file", prev);
          dispatch(sendImage({ data: data, file: prev.name }));
          setFiles([]);
          dispatch(setLoading(true));
          navigate("/preview");
        } else {
          const data = new FormData();
          data.append("file", prev);
          dispatch(sendVideo(data));
          setFiles([]);
          dispatch(setLoading(true));
          navigate("/preview");
        }
      }
    };

    /*eslint-disable */
    useEffect(() => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    useEffect(() => {
      dispatch(setLoading(false));
      dispatch(resetState());
    }, []);
    /*eslint-enable */

    return (
      <section>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drop your file here or click to select</p>
          <FiUpload />
        </div>
        <aside>{thumbs()}</aside>
      </section>
    );
  }

  /*eslint-disable */
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
  /*eslint-enable */

  return (
    <div className="container">
      <div className="logoutButton">
        <BiLogOut />
        <button className="btnL" onClick={() => logout()}>
          Logout
        </button>
      </div>
      <div className="dropzoneBox">
        <h1>Welcome to Thumbnail Generator App</h1>
        <div>{Previews()}</div>
        <h2>How it works?</h2>
        <p>- Upload your file (video .mp4 or image .jpg/.png).</p>
        <p>- If you upload an image, you can edit it.</p>
        <p>
          - If you upload a video, the app processes the video and return one
          image, after that, you can edit the image returned.{" "}
        </p>
      </div>
    </div>
  );
}
