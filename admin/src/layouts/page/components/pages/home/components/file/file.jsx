import { forwardRef, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import style from "./style.module.css";

// eslint-disable-next-line react/prop-types
function FileInputRef(
  // eslint-disable-next-line react/prop-types, prettier/prettier
  {
    // eslint-disable-next-line prettier/prettier, react/prop-types
    fileUrl, fullWidth = false, onFile, onClear, id, fullheight = false, crossShow = false, crossHide = false,
  },
  ref
) {
  const imageRef = useCreateRef();

  const [fullFile, setFullFile] = useState();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFullFile(file);

    if (file) {
      if (onFile) {
        if (ref) {
          ref.current.value = null;
        } else {
          imageRef.current.value = null;
        }

        onFile({
          fullFile: file,
          id: uuidv4(),
        });
      }
    }
  };

  return (
    <div
      className={`${style.fileInput} ${fullWidth ? style.fileInputFull : style.fileInput300px} ${
        fullheight ? style.fullHeight : ""
      }`}
    >
      {!crossHide ? (
        <>
          {fileUrl ? (
            <div
              className={style.cross}
              onClick={() => {
                if (onClear) {
                  onClear(id);
                }
              }}
            >
              +
            </div>
          ) : fileUrl || crossShow ? (
            <>
              <div
                className={style.cross}
                onClick={() => {
                  if (crossShow) {
                    if (onClear) {
                      onClear();
                    }
                  } else {
                    if (onClear) {
                      onClear(id);
                    }
                  }
                }}
              >
                +
              </div>
              <label htmlFor={`file-${id ?? Date.now}`}>
                <div className={style.addImage}>+</div>
                <input
                  ref={ref ?? imageRef}
                  type="file"
                  name=""
                  id={`file-${id ?? ""}`}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </label>
            </>
          ) : (
            <label htmlFor={`file-${id ?? ""}`}>
              <div className={style.addImage}>+</div>
              <input
                ref={ref ?? imageRef}
                type="file"
                name=""
                id={`file-${id ?? ""}`}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
          )}
        </>
      ) : null}

      {fileUrl ? <img src={fileUrl} alt="image" /> : null}
    </div>
  );
}

function useCreateRef() {
  const imageRef = useRef();
  return imageRef;
}

const FileInput = forwardRef(FileInputRef);
export default FileInput;
