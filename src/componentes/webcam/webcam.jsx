import Webcam from "react-webcam";
import { useRef, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { sendImage, setLoading } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import "./webcam.css";

export default function Webc() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState([]);

  const videoConstraints = {
    width: 1280,
    height: 780,
    facingMode: "user",
  };

  const WebcamCapture = () => {
    const webcamRef = useRef(null);
    const capture = useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setFile(imageSrc);
    }, [webcamRef]);
    return (
      <div className="webcamContainer">
        <Webcam
          id="webcam"
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        <button onClick={capture}>Capture photo</button>
      </div>
    );
  };

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", file);
    dispatch(sendImage({ data: data, file: "image" }));
    setFile([]);
    dispatch(setLoading(true));
    navigate("/preview");
  };

  return (
    <div>
      {WebcamCapture()}
      <img src={file} alt="" />
      <button onClick={uploadImage}> continue</button>
    </div>
  );
}
