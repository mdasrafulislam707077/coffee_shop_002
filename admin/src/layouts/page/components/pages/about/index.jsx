import { TextField } from "@mui/material";
import { getAboutInfo, postHeroContext } from "network/about/about";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { config } from "../../../../../config";
import SimpleHeroImage from "../components/simpleHeroImage/simpleHeroImage";
import FileInput from "../home/components/file/file";
import { postCshItems } from "./../../../../../network/about/OurSpecialChefs";
import style from "./style.module.css";
export default function AboutUs() {
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
  const [oldChfsId, setOldChfsId] = useState([]);
  const [ourPopulerChfs, setOurPopulerChfs] = useState([]);
  const [removeImageChfsList, setRemoveImageChfsList] = useState([]);

  const [oldWaitersId, setOldWaitersId] = useState([]);
  const [ourWaiters, setOurWaiters] = useState([]);
  const [removeImageWaitersList, setRemoveImageWaitersList] = useState([]);

  useEffect(() => {
    getAboutInfo((res) => {
      setOurWaiters(res?.ORW);
      setOldWaitersId(res?.ORW);
      setOurPopulerChfs(res?.OSC);
      setOldChfsId(res?.OSC);
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
    <div className={`${style.main}`}>
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
      <h5>{"Our Special Chef's"}</h5>
      <div className={style.cardBox}>
        {ourPopulerChfs.map((element, index) => {
          return (
            <div className={style.item} key={index}>
              <div className={style.profile}>
                <FileInput
                  id={Date.now() + uuid()}
                  fileUrl={
                    element.mainImage.fullFile
                      ? URL.createObjectURL(element?.mainImage?.fullFile)
                      : element?.mainImage?.webUrl
                      ? `${config.HOST_NAME}${element?.mainImage?.path}${element?.mainImage?.webUrl}`
                      : null
                  }
                  crossShow
                  fullWidth
                  fullheight
                  onClear={(id) => {
                    if (id) {
                      const newItems = ourPopulerChfs.map((element2, index2) => {
                        if (index2 == index) {
                          if (element2?.mainImage?.webUrl) {
                            setRemoveImageChfsList([
                              ...removeImageChfsList,
                              { ...element2.mainImage },
                            ]);
                          }
                          return {
                            ...element2,
                            mainImage: {},
                            prevId: element2.prevId ? element2.prevId : element2._id,
                            _id: uuid(),
                          };
                        }
                        return {
                          ...element2,
                        };
                      });
                      setOurPopulerChfs(newItems);
                    } else {
                      const newItems = ourPopulerChfs.filter((element2, index2) => {
                        return index2 != index;
                      });
                      if (element.imageItems[0]) {
                        setRemoveImageChfsList([
                          ...removeImageChfsList,
                          { ...element.imageItems[0] },
                        ]);
                      }
                      setOurPopulerChfs(newItems);
                    }
                  }}
                  onFile={(file) => {
                    const newItems = ourPopulerChfs.map((element2, index2) => {
                      if (index2 == index) {
                        return {
                          ...element2,
                          mainImage: { fullFile: file.fullFile },
                        };
                      }
                      return {
                        ...element2,
                      };
                    });
                    setOurPopulerChfs(newItems);
                  }}
                />
              </div>
              <div className={style.des}>
                <div className={style.input}>
                  <TextField
                    placeholder="title"
                    className={style.textInput}
                    value={element.title}
                    onChange={(e) => {
                      const newItems = ourPopulerChfs.map((element2, index2) => {
                        if (index2 == index) {
                          return {
                            ...element2,
                            title: e.target.value,
                            prevId: element2.prevId ? element2.prevId : element2._id,
                            _id: uuid(),
                          };
                        }
                        return {
                          ...element2,
                        };
                      });
                      setOurPopulerChfs(newItems);
                    }}
                  />
                </div>
                <div className={style.input}>
                  <TextField
                    placeholder="description"
                    className={style.textInput}
                    multiline
                    rows={7}
                    value={element.description}
                    onChange={(e) => {
                      const newItems = ourPopulerChfs.map((element2, index2) => {
                        if (index2 == index) {
                          return {
                            ...element2,
                            description: e.target.value,
                            prevId: element2.prevId ? element2.prevId : element2._id,
                            _id: uuid(),
                          };
                        }
                        return {
                          ...element2,
                        };
                      });
                      setOurPopulerChfs(newItems);
                    }}
                  />
                </div>
              </div>
              <div className={style.sign}>
                <FileInput
                  id={Date.now() + uuid() + "file" + index}
                  fullWidth
                  fullheight
                  fileUrl={
                    !element.imageItems[0]
                      ? null
                      : element.imageItems[0].fullFile
                      ? URL.createObjectURL(element?.imageItems[0]?.fullFile)
                      : element?.imageItems[0]?.webUrl
                      ? `${config.HOST_NAME}${element?.imageItems[0]?.path}${element?.imageItems[0]?.webUrl}`
                      : null
                  }
                  onClear={(id) => {
                    if (id) {
                      const newItems = ourPopulerChfs.map((element2, index2) => {
                        if (index2 == index) {
                          if (element2?.mainImage?.webUrl) {
                            setRemoveImageChfsList([
                              ...removeImageChfsList,
                              { ...element2.imageItems[0] },
                            ]);
                          }
                          return {
                            ...element2,
                            imageItems: [],
                            prevId: element2.prevId ? element2.prevId : element2._id,
                            _id: uuid(),
                          };
                        }
                        return {
                          ...element2,
                        };
                      });
                      setOurPopulerChfs(newItems);
                    } else {
                      const newItems = ourPopulerChfs.filter((element2, index2) => {
                        return index2 != index;
                      });
                      setOurPopulerChfs(newItems);
                    }
                  }}
                  onFile={(file) => {
                    const newItems = ourPopulerChfs.map((element2, index2) => {
                      if (index2 == index) {
                        return {
                          ...element2,
                          imageItems: [{ fullFile: file.fullFile }],
                        };
                      }
                      return {
                        ...element2,
                      };
                    });
                    setOurPopulerChfs(newItems);
                  }}
                />
              </div>
              <div className={style.media}>
                <div className={style.item}>
                  <div className={style.icon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="37.819"
                      height="37.82"
                      viewBox="0 0 39.819 37.82"
                    >
                      <path
                        id="Path_130"
                        data-name="Path 130"
                        d="M18.91,3.152A15.758,15.758,0,1,1,3.152,18.91,15.776,15.776,0,0,1,18.91,3.152ZM18.91,0a18.91,18.91,0,1,0,18.91,18.91A18.911,18.911,0,0,0,18.91,0ZM15.758,15.758H12.606V18.91h3.152v9.455h4.727V18.91h2.868l.284-3.152H20.486V14.445c0-.753.151-1.051.879-1.051h2.272V9.455H19.849c-2.833,0-4.091,1.248-4.091,3.637v2.666Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className={style.textInput}>
                    {" "}
                    <TextField
                      placeholder="facebook"
                      value={element.fb}
                      onChange={(e) => {
                        const newItems = ourPopulerChfs.map((element2, index2) => {
                          if (index2 == index) {
                            return {
                              ...element2,
                              fb: e.target.value,
                              prevId: element2.prevId ? element2.prevId : element2._id,
                              _id: uuid(),
                            };
                          }
                          return {
                            ...element2,
                          };
                        });
                        setOurPopulerChfs(newItems);
                      }}
                    />
                  </div>
                </div>

                <div className={style.item}>
                  <div className={style.icon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="37.819"
                      height="37.819"
                      viewBox="0 0 39.819 37.819"
                    >
                      <path
                        id="Path_131"
                        data-name="Path 131"
                        d="M18.91,3.152A15.758,15.758,0,1,1,3.152,18.91,15.776,15.776,0,0,1,18.91,3.152ZM18.91,0a18.91,18.91,0,1,0,18.91,18.91A18.911,18.911,0,0,0,18.91,0Zm0,11.16c2.524,0,2.824.009,3.821.055,2.564.117,3.758,1.332,3.876,3.875.044,1,.054,1.3.054,3.82s-.009,2.824-.054,3.82c-.118,2.542-1.311,3.76-3.876,3.876-1,.044-1.3.055-3.821.055s-2.824-.009-3.82-.055c-2.569-.118-3.758-1.338-3.877-3.876-.044-1-.055-1.3-.055-3.82s.011-2.824.055-3.82c.117-2.545,1.311-3.76,3.877-3.876C16.086,11.168,16.385,11.16,18.91,11.16Zm0-1.705c-2.569,0-2.888.011-3.9.058-3.435.158-5.342,2.063-5.5,5.5-.046,1.01-.057,1.332-.057,3.9s.011,2.89.057,3.9c.158,3.434,2.064,5.342,5.5,5.5,1.01.046,1.33.057,3.9.057s2.89-.011,3.9-.057c3.429-.158,5.344-2.063,5.5-5.5.046-1.009.057-1.33.057-3.9s-.011-2.888-.057-3.9c-.154-3.431-2.063-5.342-5.5-5.5-1.01-.047-1.332-.058-3.9-.058Zm0,4.6a4.855,4.855,0,1,0,4.855,4.855A4.855,4.855,0,0,0,18.91,14.055Zm0,8.007a3.152,3.152,0,1,1,3.153-3.152A3.151,3.151,0,0,1,18.91,22.061Zm5.046-9.332a1.135,1.135,0,1,0,1.136,1.135A1.135,1.135,0,0,0,23.956,12.729Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className={style.textInput}>
                    {" "}
                    <TextField
                      placeholder="instagram"
                      value={element.in}
                      onChange={(e) => {
                        const newItems = ourPopulerChfs.map((element2, index2) => {
                          if (index2 == index) {
                            return {
                              ...element2,
                              in: e.target.value,
                              prevId: element2.prevId ? element2.prevId : element2._id,
                              _id: uuid(),
                            };
                          }
                          return {
                            ...element2,
                          };
                        });
                        setOurPopulerChfs(newItems);
                      }}
                    />
                  </div>
                </div>

                <div className={style.item}>
                  <div className={style.icon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="37.819"
                      height="37.819"
                      viewBox="0 0 39.819 37.819"
                    >
                      <path
                        id="Path_132"
                        data-name="Path 132"
                        d="M18.91,3.152A15.758,15.758,0,1,1,3.152,18.91,15.776,15.776,0,0,1,18.91,3.152ZM18.91,0a18.91,18.91,0,1,0,18.91,18.91A18.911,18.911,0,0,0,18.91,0ZM15.758,12.606a1.576,1.576,0,1,1-1.576-1.588A1.581,1.581,0,0,1,15.758,12.606Zm0,3.152H12.606v9.455h3.152Zm4.727,0H17.334v9.455h3.152V20.7c0-2.714,3.155-2.964,3.155,0v4.508h3.148V19.92c0-5.175-4.929-4.986-6.3-2.439V15.758Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className={style.textInput}>
                    {" "}
                    <TextField
                      placeholder="Linkedin"
                      value={element.lin}
                      onChange={(e) => {
                        const newItems = ourPopulerChfs.map((element2, index2) => {
                          if (index2 == index) {
                            return {
                              ...element2,
                              lin: e.target.value,
                              prevId: element2.prevId ? element2.prevId : element2._id,
                              _id: uuid(),
                            };
                          }
                          return {
                            ...element2,
                          };
                        });
                        setOurPopulerChfs(newItems);
                      }}
                    />
                  </div>
                </div>

                <div className={style.item}>
                  <div className={style.icon}>
                    <svg
                      id="x-social-media-round-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="37.819"
                      height="37.82"
                      viewBox="0 0 39.819 37.82"
                    >
                      <path
                        id="Path_133"
                        data-name="Path 133"
                        d="M13.91-5A18.91,18.91,0,1,1-5,13.91,18.931,18.931,0,0,1,13.91-5Zm0,34.71a15.8,15.8,0,1,0-15.8-15.8A15.818,15.818,0,0,0,13.91,29.71Z"
                        transform="translate(5 5)"
                        fill="black"
                      />
                      <path
                        id="Path_134"
                        data-name="Path 134"
                        d="M160.715,157.549h2.654l-5.8,6.628,6.822,9.019h-5.342l-4.184-5.47-4.787,5.47h-2.656l6.2-7.089-6.544-8.558h5.477l3.782,5Zm-.932,14.058h1.471l-9.494-12.553h-1.578Z"
                        transform="translate(-136.828 -146.463)"
                        fill="black"
                      />
                      <path
                        id="Path_134_-_Outline"
                        data-name="Path 134 - Outline"
                        d="M141.011,154.549h6.558l2.628,3.474,3.039-3.474h4.429l-5.415,6.19,6.062,8.014h-6.436l-2.947-3.853-3.372,3.853h-4.43l5.734-6.554Z"
                        transform="translate(-130.757 -142.741)"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className={style.textInput}>
                    <TextField
                      placeholder="x"
                      value={element.SX}
                      onChange={(e) => {
                        const newItems = ourPopulerChfs.map((element2, index2) => {
                          if (index2 == index) {
                            return {
                              ...element2,
                              SX: e.target.value,
                              prevId: element2.prevId ? element2.prevId : element2._id,
                              _id: uuid(),
                            };
                          }
                          return {
                            ...element2,
                          };
                        });
                        setOurPopulerChfs(newItems);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div
          className={style.addButton}
          onClick={() => {
            setOurPopulerChfs([
              ...ourPopulerChfs,
              {
                _id: uuid(),
                imageItems: [],
                mainImage: {},
                title: "",
                description: "",
                fb: "",
                SX: "",
                in: "",
                lin: "",
              },
            ]);
          }}
        >
          +
        </div>
      </div>
      <div className={style.buttonBox}>
        <div
          className={style.button}
          role="button"
          onClick={() => {
            postCshItems(
              {
                oldChfsId,
                ourPopulerChfs,
                removeImageChfsList,
              },
              ({ res, newData }) => {
                if (res?.data) {
                  const newItems = ourPopulerChfs.filter((elementx, indexx) => {
                    const find = newData.find((x, y) => x._id == elementx._id);
                    if (find) {
                      return false;
                    }
                    return true;
                  });
                  setOurPopulerChfs([...newItems, ...res?.data?.data]);
                }
              }
            );
          }}
        >
          Save
        </div>
      </div>

      <h5>{"Our Responsivle waiter's"}</h5>
      <div className={style.cardBox}>
        {ourWaiters.map((element, index) => {
          return (
            <div className={style.item} key={index}>
              <div className={style.profile}>
                <FileInput
                  id={Date.now() + uuid()}
                  fullWidth
                  fullheight
                  crossShow
                  fileUrl={
                    element?.mainImage?.fullFile
                      ? URL.createObjectURL(element?.mainImage?.fullFile)
                      : element?.mainImage?.webUrl
                      ? `${config.HOST_NAME}${element?.mainImage?.path}${element?.mainImage?.webUrl}`
                      : null
                  }
                  onClear={(id) => {
                    if (id) {
                      const newItems = ourWaiters.map((element2, index2) => {
                        if (index2 == index) {
                          if (element2?.mainImage?.webUrl) {
                            setRemoveImageWaitersList([
                              ...removeImageWaitersList,
                              { ...element2.mainImage },
                            ]);
                          }
                          return {
                            ...element2,
                            mainImage: {},
                            prevId: element2.prevId ? element2.prevId : element2._id,
                            _id: uuid(),
                          };
                        }
                        return {
                          ...element2,
                        };
                      });
                      setOurWaiters(newItems);
                    } else {
                      const newItems = ourWaiters.filter((element2, index2) => {
                        return index2 != index;
                      });
                      if (element.imageItems[0]) {
                        setRemoveImageWaitersList([
                          ...removeImageWaitersList,
                          { ...element.imageItems[0] },
                        ]);
                      }
                      setOurWaiters(newItems);
                    }
                  }}
                  onFile={(file) => {
                    console.log(file);
                    const newItems = ourWaiters.map((element2, index2) => {
                      if (index2 == index) {
                        return {
                          ...element2,
                          mainImage: { fullFile: file.fullFile },
                        };
                      }
                      return {
                        ...element2,
                      };
                    });
                    setOurWaiters(newItems);
                  }}
                />
              </div>
              <div className={style.des}>
                <div className={style.input}>
                  <TextField
                    placeholder="title"
                    className={style.textInput}
                    value={element.title}
                    onChange={(e) => {
                      const newItems = ourWaiters.map((element2, index2) => {
                        if (index2 == index) {
                          return {
                            ...element2,
                            title: e.target.value,
                            prevId: element2.prevId ? element2.prevId : element2._id,
                            _id: uuid(),
                          };
                        }
                        return {
                          ...element2,
                        };
                      });
                      setOurWaiters(newItems);
                    }}
                  />
                </div>
                <div className={style.input}>
                  <TextField
                    placeholder="description"
                    className={style.textInput}
                    multiline
                    rows={7}
                    value={element.description}
                    onChange={(e) => {
                      const newItems = ourWaiters.map((element2, index2) => {
                        if (index2 == index) {
                          return {
                            ...element2,
                            description: e.target.value,
                            prevId: element2.prevId ? element2.prevId : element2._id,
                            _id: uuid(),
                          };
                        }
                        return {
                          ...element2,
                        };
                      });
                      setOurWaiters(newItems);
                    }}
                  />
                </div>
              </div>

              <div className={style.media}>
                <div className={style.item}>
                  <div className={style.icon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="37.819"
                      height="37.82"
                      viewBox="0 0 39.819 37.82"
                    >
                      <path
                        id="Path_130"
                        data-name="Path 130"
                        d="M18.91,3.152A15.758,15.758,0,1,1,3.152,18.91,15.776,15.776,0,0,1,18.91,3.152ZM18.91,0a18.91,18.91,0,1,0,18.91,18.91A18.911,18.911,0,0,0,18.91,0ZM15.758,15.758H12.606V18.91h3.152v9.455h4.727V18.91h2.868l.284-3.152H20.486V14.445c0-.753.151-1.051.879-1.051h2.272V9.455H19.849c-2.833,0-4.091,1.248-4.091,3.637v2.666Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className={style.textInput}>
                    {" "}
                    <TextField
                      placeholder="facebook"
                      value={element.fb}
                      onChange={(e) => {
                        const newItems = ourWaiters.map((element2, index2) => {
                          if (index2 == index) {
                            return {
                              ...element2,
                              fb: e.target.value,
                              prevId: element2.prevId ? element2.prevId : element2._id,
                              _id: uuid(),
                            };
                          }
                          return {
                            ...element2,
                          };
                        });

                        setOurWaiters(newItems);
                      }}
                    />
                  </div>
                </div>

                <div className={style.item}>
                  <div className={style.icon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="37.819"
                      height="37.819"
                      viewBox="0 0 39.819 37.819"
                    >
                      <path
                        id="Path_131"
                        data-name="Path 131"
                        d="M18.91,3.152A15.758,15.758,0,1,1,3.152,18.91,15.776,15.776,0,0,1,18.91,3.152ZM18.91,0a18.91,18.91,0,1,0,18.91,18.91A18.911,18.911,0,0,0,18.91,0Zm0,11.16c2.524,0,2.824.009,3.821.055,2.564.117,3.758,1.332,3.876,3.875.044,1,.054,1.3.054,3.82s-.009,2.824-.054,3.82c-.118,2.542-1.311,3.76-3.876,3.876-1,.044-1.3.055-3.821.055s-2.824-.009-3.82-.055c-2.569-.118-3.758-1.338-3.877-3.876-.044-1-.055-1.3-.055-3.82s.011-2.824.055-3.82c.117-2.545,1.311-3.76,3.877-3.876C16.086,11.168,16.385,11.16,18.91,11.16Zm0-1.705c-2.569,0-2.888.011-3.9.058-3.435.158-5.342,2.063-5.5,5.5-.046,1.01-.057,1.332-.057,3.9s.011,2.89.057,3.9c.158,3.434,2.064,5.342,5.5,5.5,1.01.046,1.33.057,3.9.057s2.89-.011,3.9-.057c3.429-.158,5.344-2.063,5.5-5.5.046-1.009.057-1.33.057-3.9s-.011-2.888-.057-3.9c-.154-3.431-2.063-5.342-5.5-5.5-1.01-.047-1.332-.058-3.9-.058Zm0,4.6a4.855,4.855,0,1,0,4.855,4.855A4.855,4.855,0,0,0,18.91,14.055Zm0,8.007a3.152,3.152,0,1,1,3.153-3.152A3.151,3.151,0,0,1,18.91,22.061Zm5.046-9.332a1.135,1.135,0,1,0,1.136,1.135A1.135,1.135,0,0,0,23.956,12.729Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className={style.textInput}>
                    {" "}
                    <TextField
                      placeholder="instagram"
                      value={element.in}
                      onChange={(e) => {
                        const newItems = ourWaiters.map((element2, index2) => {
                          if (index2 == index) {
                            return {
                              ...element2,
                              in: e.target.value,
                              prevId: element2.prevId ? element2.prevId : element2._id,
                              _id: uuid(),
                            };
                          }
                          return {
                            ...element2,
                          };
                        });
                        setOurWaiters(newItems);
                      }}
                    />
                  </div>
                </div>

                <div className={style.item}>
                  <div className={style.icon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="37.819"
                      height="37.819"
                      viewBox="0 0 39.819 37.819"
                    >
                      <path
                        id="Path_132"
                        data-name="Path 132"
                        d="M18.91,3.152A15.758,15.758,0,1,1,3.152,18.91,15.776,15.776,0,0,1,18.91,3.152ZM18.91,0a18.91,18.91,0,1,0,18.91,18.91A18.911,18.911,0,0,0,18.91,0ZM15.758,12.606a1.576,1.576,0,1,1-1.576-1.588A1.581,1.581,0,0,1,15.758,12.606Zm0,3.152H12.606v9.455h3.152Zm4.727,0H17.334v9.455h3.152V20.7c0-2.714,3.155-2.964,3.155,0v4.508h3.148V19.92c0-5.175-4.929-4.986-6.3-2.439V15.758Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className={style.textInput}>
                    {" "}
                    <TextField
                      placeholder="Linkedin"
                      value={element.lin}
                      onChange={(e) => {
                        const newItems = ourWaiters.map((element2, index2) => {
                          if (index2 == index) {
                            return {
                              ...element2,
                              lin: e.target.value,
                              prevId: element2.prevId ? element2.prevId : element2._id,
                              _id: uuid(),
                            };
                          }
                          return {
                            ...element2,
                          };
                        });
                        setOurWaiters(newItems);
                      }}
                    />
                  </div>
                </div>

                <div className={style.item}>
                  <div className={style.icon}>
                    <svg
                      id="x-social-media-round-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="37.819"
                      height="37.82"
                      viewBox="0 0 39.819 37.82"
                    >
                      <path
                        id="Path_133"
                        data-name="Path 133"
                        d="M13.91-5A18.91,18.91,0,1,1-5,13.91,18.931,18.931,0,0,1,13.91-5Zm0,34.71a15.8,15.8,0,1,0-15.8-15.8A15.818,15.818,0,0,0,13.91,29.71Z"
                        transform="translate(5 5)"
                        fill="black"
                      />
                      <path
                        id="Path_134"
                        data-name="Path 134"
                        d="M160.715,157.549h2.654l-5.8,6.628,6.822,9.019h-5.342l-4.184-5.47-4.787,5.47h-2.656l6.2-7.089-6.544-8.558h5.477l3.782,5Zm-.932,14.058h1.471l-9.494-12.553h-1.578Z"
                        transform="translate(-136.828 -146.463)"
                        fill="black"
                      />
                      <path
                        id="Path_134_-_Outline"
                        data-name="Path 134 - Outline"
                        d="M141.011,154.549h6.558l2.628,3.474,3.039-3.474h4.429l-5.415,6.19,6.062,8.014h-6.436l-2.947-3.853-3.372,3.853h-4.43l5.734-6.554Z"
                        transform="translate(-130.757 -142.741)"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className={style.textInput}>
                    <TextField
                      placeholder="x"
                      value={element.SX}
                      onChange={(e) => {
                        const newItems = ourWaiters.map((element2, index2) => {
                          if (index2 == index) {
                            return {
                              ...element2,
                              SX: e.target.value,
                              prevId: element2.prevId ? element2.prevId : element2._id,
                              _id: uuid(),
                            };
                          }
                          return {
                            ...element2,
                          };
                        });
                        setOurWaiters(newItems);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div
          className={style.addButton}
          onClick={() => {
            setOurWaiters([
              ...ourWaiters,
              {
                _id: uuid(),
                imageItems: [],
                mainImage: {},
                title: "",
                description: "",
                fb: "",
                SX: "",
                in: "",
                lin: "",
              },
            ]);
          }}
        >
          +
        </div>
      </div>
      <div className={style.buttonBox}>
        <div
          className={style.button}
          role="button"
          onClick={() => {
            postCshItems(
              {
                oldChfsId: oldWaitersId,
                ourPopulerChfs: ourWaiters,
                removeImageChfsList: removeImageWaitersList,
                cshf: true,
              },
              ({ res, newData }) => {
                if (res?.data) {
                  const newItems = ourWaiters.filter((elementx, indexx) => {
                    const find = newData.find((x, y) => x._id == elementx._id);
                    if (find) {
                      return false;
                    }
                    return true;
                  });

                  setOurWaiters([...newItems, ...res?.data?.data]);
                }
              }
            );
          }}
        >
          Save
        </div>
      </div>
    </div>
  );
}
