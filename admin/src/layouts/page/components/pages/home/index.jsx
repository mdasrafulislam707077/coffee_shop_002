import { TextField } from "@mui/material";
import { postOurBranch } from "network/page/branch";
import { getHomeHeroContext, postHomeHeroContext } from "network/page/home";
import { postNewCoffeeItems } from "network/page/newCoffeeItem";
import { useEffect, useState } from "react";
import isEqual from "utility/isEql/isEql";
import { v4 as uuid } from "uuid";
import { config } from "../../../../../config";
import FileInput from "./components/file/file";
import style from "./style.module.css";

const textContextType = {
  ProdectName: "Prodect-Name",
  BigHeader: "Big-Header",
  Description: "Description",
  PointHeader: "Point-Header",
  PointDescription: "Point-Description",
  Point: "Point",
};
export default function Home(params) {
  const [heroImageContext, setHeroImageContext] = useState({
    image: [],
    header: "",
    title: "",
    description: "",
    buttonHide: false,
  });
  const [uploadedImage, setUploadedImage] = useState([]);
  const [branchImageMemo, setBranchImageMemo] = useState([]);
  const [populerBranch, setPopulerBranch] = useState([
    {
      id: "branch001",
      image: {},
      textContext: [],
    },
    {
      image: {},
      id: "branch002",

      textContext: [],
    },
    {
      image: {},
      id: "branch003",

      textContext: [],
    },
    {
      image: {},
      id: "branch004",

      textContext: [],
    },
    {
      image: {},
      id: "branch005",

      textContext: [],
    },
  ]);
  const [newCoffeeItem, setNewCoffeeItem] = useState([]);
  const [newCoffeeItemImageMemo, setNewCoffeeItemImageMemo] = useState([]);
  const setHomeHeroData = (res) => {
    setUploadedImage(res.data?.hero_context?.images);
    setHeroImageContext({
      header: res.data?.hero_context?.header,
      title: res.data?.hero_context?.title,
      description: res.data?.hero_context?.description,
      image: res.data?.hero_context?.images,
    });
  };
  function setBranchItemsFunc(data) {
    const newBranchDataImage = data?.map((element, index) => {
      return element.image;
    });
    const newBranchDataData = data?.map((element, index) => {
      return {
        ...element.text,
        image: element.image,
      };
    });
    setNewCoffeeItem(newBranchDataData);
    setNewCoffeeItemImageMemo(newBranchDataImage);
  }
  useEffect(() => {
    getHomeHeroContext((res) => {
      if (res.data) {
        const branchData = populerBranch.map((element, index) => {
          return {
            ...element,
            image: res.data?.ourBranch?.data[index].image,
            textContext: res.data?.ourBranch?.data[index].text,
          };
        });

        const newBranchDataData = res?.data?.newCoffeeItem?.data;
        setBranchItemsFunc(newBranchDataData);
        setPopulerBranch(branchData);
        setUploadedImage(res.data?.hero_context?.images);
        setHomeHeroData(res);
      }
    });
  }, []);
  const filterImage = () => {
    const removableImageFilter = [];
    uploadedImage.forEach((element, index) => {
      const findObj = heroImageContext?.image?.find((element2, index2) => {
        return isEqual(element, element2);
      });
      if (!findObj) {
        removableImageFilter.push(element);
      }
    });
    return removableImageFilter;
  };
  const updateHeroContent = () => {
    const remobleImage = filterImage();
    postHomeHeroContext(
      {
        heroImageContext,
        removeImage: remobleImage,
      },
      (res) => {
        setHomeHeroData(res);
      }
    );
  };
  return (
    <div className={`${style.main}   `}>
      <div className={`${style.content}`}>
        <h5>Hero-Image</h5>
        <div className={style.contextInput}>
          <div className={style.fileInputBox}>
            {heroImageContext?.image?.map((element, index) => {
              return (
                <FileInput
                  key={index}
                  id={element.id ?? element.webUrl}
                  fileUrl={
                    element.fullFile
                      ? URL.createObjectURL(element.fullFile)
                      : `${config.HOST_NAME}${element.path}${element.webUrl}`
                  }
                  onClear={(id) => {
                    const oldData = heroImageContext;
                    const updateImage = oldData.image.filter((element2, index) => {
                      if (element.webUrl) {
                        return element.webUrl != element2.webUrl;
                      } else {
                        return element.id != element2.id;
                      }
                    });
                    // console.log(updateImage);
                    setHeroImageContext({
                      ...oldData,
                      image: [...updateImage],
                    });
                  }}
                />
              );
            })}

            <FileInput
              onFile={(data) => {
                const oldData = heroImageContext;
                oldData.image.push(data);
                setHeroImageContext({
                  ...heroImageContext,
                });
              }}
            />
          </div>
          <div className={`${style.inputItems}`}>
            <div className={style.input}>
              <TextField
                placeholder="title"
                multiline
                value={heroImageContext.title}
                className={`${style.textinput}`}
                rows={5}
                onChange={(value) => {
                  setHeroImageContext({
                    ...heroImageContext,
                    title: value.target.value,
                  });
                }}
              />
            </div>
            <div className={style.input}>
              <TextField
                placeholder="header"
                multiline
                value={heroImageContext.header}
                className={`${style.textinput}`}
                rows={5}
                onChange={(value) => {
                  setHeroImageContext({
                    ...heroImageContext,
                    header: value.target.value,
                  });
                }}
              />
            </div>
            <div className={style.input}>
              <TextField
                value={heroImageContext.description}
                placeholder="description"
                multiline
                className={`${style.textinput}`}
                rows={5}
                onChange={(value) => {
                  setHeroImageContext({
                    ...heroImageContext,
                    description: value.target.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
        {!heroImageContext.buttonHide ? (
          <div className={style.buttonBox}>
            <div className={style.button} onClick={updateHeroContent}>
              Save
            </div>
          </div>
        ) : null}
      </div>
      {/**
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       */}
      <div className={`${style.content}`}>
        <h5>Our Populer Branch</h5>
        <div className={`${style.branchItems}`}>
          {populerBranch.map((element, index) => {
            const createId = element.id;
            return (
              <div key={index} className={style.branchItem}>
                <FileInput
                  id={createId}
                  fullWidth
                  fileUrl={
                    element.image?.fullFile?.fullFile
                      ? URL.createObjectURL(element?.image?.fullFile?.fullFile)
                      : element.image?.webUrl
                      ? `${element.image.host}${element.image.path}${element.image?.webUrl}`
                      : null
                  }
                  onClear={(id) => {
                    const items = populerBranch;
                    const newImageList = items.map((element2, index2) => {
                      if (id == element2.id) {
                        return { ...element2, image: {} };
                      }
                      return element2;
                    });
                    setPopulerBranch(newImageList);
                  }}
                  onFile={(file) => {
                    const allItems = populerBranch;
                    const newItems = allItems.map((element, index2) => {
                      if (index == index2) {
                        return {
                          ...element,
                          image: {
                            fullFile: file,
                          },
                          id: createId,
                        };
                      }
                      return { ...element };
                    });
                    setPopulerBranch(newItems);
                  }}
                />
                <div className={style.textContext}>
                  {element?.textContext?.map((textelement, textIndex) => {
                    return (
                      <TextFieldWithPoint
                        onDelete={() => {
                          const newItems = element?.textContext?.filter((element2, index2) => {
                            return index2 != index;
                          });
                          const newpopulerBranchItems = populerBranch.map((element, indexx) => {
                            if (indexx == index) {
                              return {
                                ...element,
                                textContext: newItems,
                              };
                            }
                            return element;
                          });
                          setPopulerBranch(newpopulerBranchItems);
                        }}
                        onArrow={({ up, down }) => {
                          if (up) {
                            if (textIndex != 0) {
                              const newItems = element?.textContext?.map((element2, index2) => {
                                if (index2 == textIndex - 1) {
                                  return element?.textContext[index2 + 1];
                                }
                                if (index2 == textIndex) {
                                  return element?.textContext[index2 - 1];
                                }
                                return element2;
                              });
                              const newpopulerBranchItems = populerBranch.map((element, indexx) => {
                                if (indexx == index) {
                                  return {
                                    ...element,
                                    textContext: newItems,
                                  };
                                }
                                return element;
                              });
                              setPopulerBranch(newpopulerBranchItems);
                            }
                          } else {
                            if (element?.textContext?.length - 1 != textIndex) {
                              if (element?.textContext?.length - 1 != textIndex) {
                                const newItems = element?.textContext?.map((element2, index2) => {
                                  if (index2 == textIndex + 1) {
                                    return element?.textContext[index2 - 1];
                                  }
                                  if (index2 == textIndex) {
                                    return element?.textContext[index2 + 1];
                                  }
                                  return element2;
                                });
                                const newpopulerBranchItems = populerBranch.map(
                                  (element, indexx) => {
                                    if (indexx == index) {
                                      return {
                                        ...element,
                                        textContext: newItems,
                                      };
                                    }
                                    return element;
                                  }
                                );
                                setPopulerBranch(newpopulerBranchItems);
                              }
                            }
                          }
                        }}
                        textType={textelement.type}
                        key={textIndex}
                        value={textelement.text}
                        onText={({ t, type }) => {
                          const olditems = populerBranch;
                          const newItems = olditems.map((element2, index2) => {
                            if (element2.id == createId) {
                              const textItems = element2.textContext.map((element3, index3) => {
                                if (element3.id == textelement.id) {
                                  return {
                                    ...element3,
                                    text: t,
                                    type: type,
                                  };
                                }
                                return element3;
                              });
                              return {
                                ...element2,
                                textContext: [...textItems],
                              };
                            }
                            return element2;
                          });
                          setPopulerBranch(newItems);
                        }}
                      />
                    );
                  })}

                  <div
                    onClick={() => {
                      const olditems = populerBranch;
                      const newItems = olditems.map((element2, index2) => {
                        if (element2.id == createId) {
                          return {
                            ...element2,
                            textContext: [
                              ...element2.textContext,
                              {
                                type: "Prodect-Name",
                                text: "",
                                id: uuid(),
                              },
                            ],
                          };
                        }
                        return element2;
                      });
                      setPopulerBranch(newItems);
                    }}
                    className={style.inputAdd}
                  >
                    +
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={style.buttonBox}>
          <div
            className={style.button}
            onClick={() => {
              postOurBranch({ populerBranch, memo: branchImageMemo }, (result) => {
                console.log(result);
              });
            }}
          >
            Save
          </div>
        </div>
      </div>
      {/**
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       *
       */}
      <div className={`${style.content}`}>
        <h5>Our New Coffee</h5>
        <div className={`${style.branchItems}`}>
          {newCoffeeItem.map((element, index) => {
            return (
              <div key={index} className={style.branchItem}>
                <FileInput
                  onClear={() => {
                    const newItems = newCoffeeItem.map((itemelement, itemindex) => {
                      if (itemelement.id == element.id) {
                        return {
                          ...itemelement,
                          image: {},
                        };
                      }
                      return itemelement;
                    });
                    setNewCoffeeItem(newItems);
                  }}
                  fileUrl={
                    element.image?.fullFile
                      ? URL.createObjectURL(element?.image?.fullFile)
                      : element.image?.webUrl
                      ? `${element.image.host}${element.image.path}${element.image?.webUrl}`
                      : null
                  }
                  id={Date.now() + index}
                  fullWidth
                  onFile={(file) => {
                    const newItems = newCoffeeItem.map((itemelement, itemindex) => {
                      if (itemelement.id == element.id) {
                        return {
                          ...itemelement,
                          image: file,
                        };
                      }
                      return itemelement;
                    });
                    setNewCoffeeItem(newItems);
                  }}
                />
                <div className={style.textContext}>
                  <TextFieldWithPoint
                    placeholder="name"
                    hideSeletor
                    hideArrowButton
                    hideCross
                    value={element.title}
                    onText={({ t }) => {
                      const newItems = newCoffeeItem.map((itemelement, itemindex) => {
                        if (itemelement.id == element.id) {
                          return {
                            ...itemelement,
                            title: t,
                          };
                        }
                        return itemelement;
                      });
                      setNewCoffeeItem(newItems);
                    }}
                  />
                  <TextFieldWithPoint
                    placeholder="description"
                    hideSeletor
                    hideArrowButton
                    hideCross
                    value={element.des}
                    onText={({ t }) => {
                      const newItems = newCoffeeItem.map((itemelement, itemindex) => {
                        if (itemelement.id == element.id) {
                          return {
                            ...itemelement,
                            des: t,
                          };
                        }
                        return itemelement;
                      });
                      setNewCoffeeItem(newItems);
                    }}
                  />
                  {element?.textItems?.map((textelement, textIndex) => {
                    return (
                      <TextFieldWithPoint
                        key={textIndex}
                        placeholder="Person-Name"
                        doubleInput
                        value={textelement.title}
                        value2={textelement.value}
                        onArrow={({ up }) => {
                          if (up) {
                            if (textIndex != 0) {
                              const newItems = element?.textItems?.map((element2, index2) => {
                                if (index2 == textIndex - 1) {
                                  return element?.textItems[index2 + 1];
                                }
                                if (index2 == textIndex) {
                                  return element?.textItems[index2 - 1];
                                }
                                return element2;
                              });
                              const newnewCoffeeItem = newCoffeeItem.map((element, indexx) => {
                                if (indexx == index) {
                                  return {
                                    ...element,
                                    textItems: newItems,
                                  };
                                }
                                return element;
                              });
                              setNewCoffeeItem(newnewCoffeeItem);
                            }
                          } else {
                            if (element?.textItems?.length - 1 != textIndex) {
                              if (element?.textItems?.length - 1 != textIndex) {
                                const newItems = element?.textItems?.map((element2, index2) => {
                                  if (index2 == textIndex + 1) {
                                    return element?.textItems[index2 - 1];
                                  }
                                  if (index2 == textIndex) {
                                    return element?.textItems[index2 + 1];
                                  }
                                  return element2;
                                });
                                const newnewCoffeeItem = newCoffeeItem.map((element, indexx) => {
                                  if (indexx == index) {
                                    return {
                                      ...element,
                                      textItems: newItems,
                                    };
                                  }
                                  return element;
                                });
                                setNewCoffeeItem(newnewCoffeeItem);
                              }
                            }
                          }
                        }}
                        onDelete={() => {
                          const allItems = newCoffeeItem.map((subelement, index2) => {
                            if (subelement.id == element.id) {
                              const alltextItems = subelement.textItems.filter(
                                (subelement3, index3) => {
                                  return subelement3.id != textelement.id;
                                }
                              );
                              return {
                                ...subelement,
                                textItems: alltextItems,
                              };
                            }
                            return element;
                          });
                          setNewCoffeeItem(allItems);
                        }}
                        onLable={({ t }) => {
                          const allItems = newCoffeeItem.map((subelement, index2) => {
                            if (subelement.id == element.id) {
                              const alltextItems = subelement.textItems.map(
                                (subelement3, index3) => {
                                  if (subelement3.id == textelement.id) {
                                    return {
                                      ...subelement3,
                                      title: t,
                                    };
                                  }
                                  return subelement3;
                                }
                              );
                              return {
                                ...subelement,
                                textItems: alltextItems,
                              };
                            }
                            return subelement;
                          });
                          setNewCoffeeItem(allItems);
                        }}
                        onKeyVal={({ t }) => {
                          const allItems = newCoffeeItem.map((subelement, index2) => {
                            if (subelement.id == element.id) {
                              const alltextItems = subelement.textItems.map(
                                (subelement3, index3) => {
                                  if (subelement3.id == textelement.id) {
                                    return {
                                      ...subelement3,
                                      value: t,
                                    };
                                  }
                                  return subelement3;
                                }
                              );
                              return {
                                ...subelement,
                                textItems: alltextItems,
                              };
                            }
                            return subelement;
                          });
                          setNewCoffeeItem(allItems);
                        }}
                      />
                    );
                  })}

                  <div
                    className={style.inputAdd}
                    onClick={() => {
                      const allItems = newCoffeeItem.map((itemelement, index) => {
                        if (itemelement.id == element.id) {
                          return {
                            ...itemelement,
                            textItems: [
                              ...itemelement.textItems,
                              { id: uuid(), title: "", value: "" },
                            ],
                          };
                        }
                        return itemelement;
                      });
                      setNewCoffeeItem(allItems);
                    }}
                  >
                    +
                  </div>
                </div>
              </div>
            );
          })}
          <div
            className={`${style.branchItem} ${style.blueprint}`}
            onClick={() => {
              setNewCoffeeItem([
                ...newCoffeeItem,
                {
                  id: uuid(),
                  textItems: [],
                  image: {},
                },
              ]);
            }}
          >
            <div className={style.addIcon}>+</div>
          </div>
        </div>
        <div className={style.buttonBox}>
          <div
            className={style.button}
            onClick={() => {
              postNewCoffeeItems({ newCoffeeItem, memo: newCoffeeItemImageMemo }, ({ data }) => {
                if (data) {
                  console.log(data?.data?.data);
                  setBranchItemsFunc(data?.data?.data);
                } else {
                  // asdasd
                }
              });
            }}
          >
            Save
          </div>
        </div>
      </div>

      <div className={`${style.content}`}>
        <h5>Client Review</h5>
        <div className={`${style.branchItems}`}>
          {[1, 1, 1, 1].map((element, index) => {
            return (
              <div key={index} className={style.branchItem}>
                <FileInput fullWidth />
                <div className={style.textContext}>
                  <div className={style.header}>Header</div>
                  <div className={style.des}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus sunt
                    similique assumenda voluptatibus laborum voluptate officiis dolore suscipit
                    exercitationem mollitia quo ex excepturi qui molestiae, dolores dicta, expedita
                    vel blanditiis! Eius exercitationem facere alias esse nam, dolor qui ex illo
                    fuga ipsum dolorem id nisi accusamus laboriosam eos quasi! Aliquam quo nostrum
                    neque quos officiis laborum explicabo odio pariatur illum!
                  </div>
                </div>
              </div>
            );
          })}
          <div className={`${style.branchItem} ${style.blueprint}`}>
            <div className={style.addIcon}>+</div>
          </div>
        </div>
      </div>

      <div className={`${style.content}`}>
        <h5>Our Popular Products</h5>
        <div className={style.offerProdect}></div>
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function TextFieldWithPoint({
  // eslint-disable-next-line react/prop-types
  hideSeletor = false,
  // eslint-disable-next-line react/prop-types
  hideArrowButton = false,
  // eslint-disable-next-line react/prop-types
  hideCross = false,
  // eslint-disable-next-line react/prop-types
  placeholder = "",
  // eslint-disable-next-line react/prop-types
  value = "",
  // eslint-disable-next-line react/prop-types
  onText,
  // eslint-disable-next-line react/prop-types
  textType = "Prodect-Name",
  // eslint-disable-next-line react/prop-types
  doubleInput = false,
  // eslint-disable-next-line react/prop-types
  onArrow,
  // eslint-disable-next-line react/prop-types
  onDelete,
  // eslint-disable-next-line react/prop-types
  onLable,
  // eslint-disable-next-line react/prop-types
  onKeyVal,
  // eslint-disable-next-line react/prop-types
  value2,
}) {
  return (
    <div className={style.textFieldBox}>
      <TextField
        value={value}
        placeholder={placeholder}
        multiline
        rows={5}
        style={{ width: "100%", marginTop: "5px" }}
        onChange={(element) => {
          if (onText && !onLable) {
            onText({
              t: element.target.value,
              type: textType,
            });
          } else {
            if (onLable) {
              onLable({
                t: element.target.value,
              });
            }
          }
        }}
      />
      {doubleInput ? (
        <TextField
          value={value2}
          placeholder={placeholder}
          multiline
          rows={5}
          style={{ width: "100%", marginTop: "5px", marginLeft: "5px" }}
          onChange={(element) => {
            if (onText && !onKeyVal) {
              onText({
                t: element.target.value,
                type: textType,
              });
            } else {
              if (onKeyVal) {
                onKeyVal({
                  t: element.target.value,
                });
              }
            }
          }}
        />
      ) : null}
      {!hideSeletor && !doubleInput ? (
        <div className={style.selector}>
          <select
            className={style.select}
            name=""
            id=""
            value={textType}
            onChange={(e) => {
              if (onText) {
                onText({
                  t: value,
                  type: e.target.value,
                });
              }
            }}
          >
            <option value="Prodect-Name">Prodect-Name</option>
            <option value="Big-Header">Big-Header</option>
            <option value="Description">Description</option>
            <option value="Point-Header">Point-Header</option>
            <option value="Point-Description">Point-Description</option>
            <option value="Point">Point</option>
          </select>
        </div>
      ) : null}
      {!hideArrowButton ? (
        <div className={style.arrowBox}>
          <div
            className={style.arrowItem}
            onClick={() => {
              if (onArrow) {
                onArrow({ up: true });
              }
            }}
          >
            <div className={style.arrow}></div>
          </div>
          <div
            className={style.arrowItem}
            onClick={() => {
              if (onArrow) {
                onArrow({ down: true });
              }
            }}
          >
            <div className={style.arrow}></div>
          </div>
        </div>
      ) : null}
      {!hideCross ? (
        <div
          className={style.cross}
          onClick={() => {
            if (onDelete) {
              onDelete();
            }
          }}
        >
          +
        </div>
      ) : null}
    </div>
  );
}
