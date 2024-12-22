import style from "./style.module.css";

import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import FileInput from "../../home/components/file/file";
// eslint-disable-next-line react/prop-types
export default function SimpleHeroImage({
  // eslint-disable-next-line react/prop-types
  fullFile,
  // eslint-disable-next-line react/prop-types
  title,
  // eslint-disable-next-line react/prop-types
  description,
  // eslint-disable-next-line react/prop-types
  remoteUrl,
  // eslint-disable-next-line react/prop-types
  onFile,
  // eslint-disable-next-line react/prop-types
  onTitle,
  // eslint-disable-next-line react/prop-types
  onDes,
  // eslint-disable-next-line react/prop-types
  onClose,
  // eslint-disable-next-line react/prop-types
  onSubmit,
}) {
  const [heroImage, setHeroImage] = useState({
    fullFile: null,
    title: "",
    description: "",
    remoteUrl: null,
  });
  useEffect(() => {
    setHeroImage({
      fullFile: fullFile ?? null,
      title: title ?? "",
      description: description ?? "",
      remoteUrl: remoteUrl,
    });
  }, [fullFile, title, description, remoteUrl]);
  return (
    <div className={style.content}>
      <h5>Hero-Image</h5>
      <div className={style.pageContent}>
        <div>
          <FileInput
            fileUrl={
              heroImage.fullFile ? URL.createObjectURL(heroImage.fullFile) : heroImage.remoteUrl
            }
            fullWidth
            id={Date.now()}
            onClear={() => {
              if (onClose) {
                onClose();
              }
              setHeroImage({
                ...heroImage,
                fullFile: null,
              });
            }}
            onFile={(file) => {
              if (onFile) {
                onFile(file);
              }
              setHeroImage({
                ...heroImage,
                fullFile: file.fullFile,
              });
            }}
          />
        </div>
        <div>
          <TextField
            className={style.textinput}
            value={heroImage.title}
            placeholder="title"
            onChange={(e) => {
              if (onTitle) {
                onTitle(e.target.value);
              }
              setHeroImage({ ...heroImage, title: e.target.value });
            }}
          />
        </div>
        <div>
          <TextField
            className={style.textinput}
            value={heroImage.description}
            placeholder="description"
            onChange={(e) => {
              if (onDes) {
                onDes(e.target.value);
              }
              setHeroImage({ ...heroImage, description: e.target.value });
            }}
          />
        </div>
      </div>
      <div className={style.buttonBox}>
        <div
          className={style.button}
          role="button"
          onClick={() => {
            if (onSubmit) {
              onSubmit();
            }
          }}
        >
          Submit
        </div>
      </div>
    </div>
  );
}
