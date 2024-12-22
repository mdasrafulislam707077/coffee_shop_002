import { TextField } from "@mui/material";
import { getContactInfo, postHeroContext } from "network/contact/contact";
import { useEffect, useState } from "react";
import { postContactInfo } from "../../../../../network/contact/info";
import SimpleHeroImage from "../components/simpleHeroImage/simpleHeroImage";
import style from "./style.module.css";
export default function Contact() {
  const [heroImage, setHeroImage] = useState({
    fullFile: null,
    title: "",
    description: "",
    webUrl: null,
    host: "",
    path: "",
  });
  const [removeImage, setRemoveImage] = useState([]);
  const [oldImage, setOldImage] = useState(null);
  const [contectInfo, setContectInfo] = useState({
    mapLink: "",
    phoneList: [],
    mediaList: [],
    address: "",
  });
  useEffect(() => {
    getContactInfo((res) => {
      if (res.info[0]) {
        setContectInfo(res.info[0]);
      }
      setHeroImage({
        ...heroImage,
        title: res?.data?.title,
        description: res?.data?.description,
        webUrl: res?.data?.image[0].webUrl,
        host: res?.data?.image[0]?.host,
        path: res?.data?.image[0]?.path,
      });
      setOldImage(res?.data?.image[0]);
    });
  }, []);
  return (
    <div className={style.main}>
      <SimpleHeroImage
        onClose={() => {
          setHeroImage({
            ...heroImage,
            fullFile: null,
            webUrl: null,
          });
        }}
        onSubmit={() => {
          postHeroContext({ ...heroImage, oldImage: oldImage }, (res) => {
            setHeroImage({
              ...heroImage,
              title: res?.data?.data?.title,
              description: res?.data?.data?.description,
              webUrl: res?.data?.data?.image[0].webUrl,
              host: res?.data?.data?.image[0]?.host,
              path: res?.data?.data?.image[0]?.path,
            });
            setOldImage(res?.data?.data?.image[0]);
          });
        }}
        fullFile={heroImage?.fullFile}
        title={heroImage.title}
        description={heroImage.description}
        remoteUrl={
          heroImage.webUrl ? `${heroImage.host}${heroImage.path}${heroImage.webUrl}` : null
        }
        onTitle={(onTitle) => {
          setHeroImage({
            ...heroImage,
            title: onTitle,
          });
        }}
        onDes={(onDes) => {
          setHeroImage({
            ...heroImage,
            description: onDes,
          });
        }}
        onFile={(file) => {
          setHeroImage({
            ...heroImage,
            fullFile: file.fullFile,
          });
        }}
      />
      <div className={style.info}>
        <div className={style.item}>
          <h5 className={style.header}>Map-Link</h5>
          <TextField
            value={contectInfo.mapLink}
            onChange={(e) => {
              setContectInfo({ ...contectInfo, mapLink: e.target.value });
            }}
          />
        </div>
        <div className={style.item}>
          <h5 className={style.header}>Information</h5>

          <div className={style}>
            <div>
              <h6>Address</h6>
              <TextField
                className={style.inputTextTags}
                value={contectInfo.address}
                onChange={(e) => {
                  setContectInfo({ ...contectInfo, address: e.target.value });
                }}
              />
            </div>
            <div>
              <h6>Phone & Hot-Line</h6>
              <div className={style.inputItems}>
                {contectInfo.phoneList?.map((element, index) => {
                  return (
                    <div className={style.phoneinputBox} key={index}>
                      <TextField
                        className={style.inputTextTags}
                        value={element.text}
                        onChange={(e) => {
                          const newItems = contectInfo.phoneList?.map((element2, index2) => {
                            if (index2 == index) {
                              return {
                                ...element2,
                                text: e.target.value,
                              };
                            }
                            return element2;
                          });
                          setContectInfo({
                            ...contectInfo,
                            phoneList: newItems,
                          });
                        }}
                      />
                      <span
                        className={style.cross}
                        onClick={() => {
                          const newItems = contectInfo.phoneList?.filter((element2, index2) => {
                            return index2 != index;
                          });
                          setContectInfo({
                            ...contectInfo,
                            phoneList: newItems,
                          });
                        }}
                      >
                        +
                      </span>
                    </div>
                  );
                })}
                <button
                  className={style.add}
                  onClick={() => {
                    setContectInfo({
                      ...contectInfo,
                      phoneList: [...contectInfo.phoneList, { text: "" }],
                    });
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <h6>Email & Social Media</h6>
              <div className={style.inputItemss}>
                {contectInfo.mediaList?.map((element, index) => (
                  <div className={style.keyVal} key={index}>
                    <TextField
                      className={style.inputTextTags}
                      value={element.key}
                      onChange={(e) => {
                        const newItems = contectInfo?.mediaList?.map((element2, index2) => {
                          if (index == index2) {
                            return {
                              ...element2,
                              key: e.target.value,
                            };
                          }
                          return element2;
                        });
                        setContectInfo({
                          ...contectInfo,
                          mediaList: newItems,
                        });
                      }}
                    />
                    <TextField
                      className={style.inputTextTags}
                      value={element.value}
                      onChange={(e) => {
                        const newItems = contectInfo?.mediaList?.map((element2, index2) => {
                          if (index == index2) {
                            return {
                              ...element2,
                              value: e.target.value,
                            };
                          }
                          return element2;
                        });
                        setContectInfo({
                          ...contectInfo,
                          mediaList: newItems,
                        });
                      }}
                    />
                    <span
                      className={style.crossbar}
                      onClick={() => {
                        const newItems = contectInfo.mediaList?.filter((element2, index2) => {
                          return index2 != index;
                        });
                        setContectInfo({
                          ...contectInfo,
                          mediaList: newItems,
                        });
                      }}
                    >
                      +
                    </span>
                  </div>
                ))}

                <button
                  className={style.add}
                  onClick={() => {
                    setContectInfo({
                      ...contectInfo,
                      mediaList: [...contectInfo.mediaList, { key: "", value: "" }],
                    });
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={style.buttonBox}>
          <div
            className={style.button}
            role="button"
            onClick={() => {
              postContactInfo(contectInfo, (result) => {
                if (result.data) {
                  setContectInfo(result?.data?.data);
                }
              });
            }}
          >
            Save
          </div>
        </div>
      </div>
    </div>
  );
}
