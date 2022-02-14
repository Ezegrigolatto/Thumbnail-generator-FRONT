import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import "./dropzone.css"

import {
  sendVideo,
  sendImage,
  setLoading,
  resetState,
} from "../../redux/actions";

export default function Dropzone() {
  const navigate = useNavigate();
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
          dispatch(sendImage({data:data, file:prev.name}));
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

    useEffect(() => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    /*eslint-disable */
    useEffect(() => {
      dispatch(setLoading(false));
      dispatch(resetState());
    },[])
    /*eslint-enable */

    return (
      <section >
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drop your file here or click to select</p> 
          <FiUpload/>
        </div>
        <aside>{thumbs()}</aside>
      </section>
    );
  }

  const webcam= () => {
    navigate("/webcam")
  }

  return <div className="container">
    <div className="dropzoneBox">
    <h1>Welcome to Thumbnail Generator App</h1>
    <div>{Previews()}</div>
    <h1>Or</h1>
    <button onClick={webcam}> Try with webcam</button>
    <h2>How it works?</h2>
    <p>- Upload your file (video .mp4 or image .jpg/.png).</p>
    <p>- If you upload an image, you can edit it.</p>
    <p>- If you upload a video, the app processes the video and return one image,
      after that, you can edit the image returned. </p>
    </div>
    </div>;
}
