import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { openDefaultEditor } from "../pintura/pintura";
import "../pintura/pintura.css";
import "./editor.css";
import JsFileDownloader from "js-file-downloader";
import { ImHome3 } from "react-icons/im";

const editImage = (image, done) => {
  const imageFile = image.pintura ? image.pintura.file : image;
  const imageState = image.pintura ? image.pintura.data : {};

  const editor = openDefaultEditor({
    src: imageFile,
    imageState,
  });

  editor.on("close", () => {
    // the user cancelled editing the image
  });

  editor.on("process", ({ dest, imageState }) => {
    Object.assign(dest, {
      pintura: { file: imageFile, data: imageState },
    });
    done(dest);
  });
};

function Pint() {
  const path = useSelector((state) => state.thumbnail.path);
  const [files, setFiles] = useState([]);
  useEffect(() => {
    setFiles([path]);
  }, [path]);

  const thumbs = files.map((file, index) => (
    <div key={file.name}>
      <button
        className="ov-btn-slide-close"
        onClick={() =>
          editImage(file, (output) => {
            const updatedFiles = [...files];

            // replace original image with new image
            updatedFiles[index] = output;

            // revoke preview URL for old image
            if (file.preview) URL.revokeObjectURL(file.preview);

            // set new preview URL
            Object.assign(output, {
              preview: URL.createObjectURL(output),
            });

            // update view
            setFiles(updatedFiles);
          })
        }
      >
        Edit
      </button>
    </div>
  ));

  const download = () => {
    new JsFileDownloader({
      url: files[0]?.preview ? files[0].preview : path,
      nameCallback: function (name) {
        return name + ".jpg";
      },
    });
  };

  useEffect(
    () => () => {
      // Make sure to revoke the Object URL to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="editorContainer">
      <a className="homeButton" href={`/`}>
        {" "}
        <ImHome3 /> Homepage
      </a>
      {files[0]?.preview ? (
        <img className="finalFile" src={files[0].preview} alt="preview"></img>
      ) : (
        <img className="finalFile" alt="preview" src={path}></img>
      )}
      <div className="buttons">
        <aside>{thumbs}</aside>
        <button className="ov-btn-slide-close" onClick={download}>
          Descargar
        </button>
      </div>
    </section>
  );
}

export default Pint;
