import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import DialogBox from "components/dialog/dialog";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { config } from "../../../../../../config";
import {
  getProdectItems,
  postProdectItems,
} from "../../../../../../network/prodectItems/prodectItems";
import FileInput from "../../home/components/file/file";
import Card from "./card/card";
import style from "./style.module.css";
export default function CoffeeItems() {
  const [oldId, setOldId] = useState([]);
  const [prodectItem, setProdectItem] = useState([]);
  const [removeImage, setRemoveImage] = useState([]);
  const [activeToast, setActiveToast] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [index, setIndex] = useState(null);
  const [edtingData, setEdtingData] = useState(null);
  useEffect(() => {
    getProdectItems({ isCoffee: true }, (result) => {
      if (result?.data) {
        setOldId(result?.data?.data);
        setProdectItem(result?.data?.data);
      }
    });
  }, []);
  return (
    <div className={style.main}>
      <DialogBox offCenter marginTop={`10px`} activeToast={activeToast}>
        <div className={style.toast}>
          <Card
            prodectItems={edtingData}
            index={index}
            editMode={editMode}
            onClose={() => {
              setActiveToast(false);
              setEdtingData(null);
            }}
            onAdd={(item) => {
              setActiveToast(false);
              if (item.index != null) {
                const fullItems = prodectItem?.map((element, indexOfItem) => {
                  if (indexOfItem == item.index) {
                    return item.element;
                  }
                  return element;
                });
                setProdectItem(fullItems);
              } else {
                if (
                  item?.aiDescription &&
                  item?.description &&
                  item?.header &&
                  item?.imageItems?.length != 0 &&
                  item?.mainImage &&
                  item?.price &&
                  item?.quantity
                ) {
                  setProdectItem([...prodectItem, { ...item }]);
                  setActiveToast(false);
                  setIndex(null);
                }
              }
            }}
          />
        </div>
      </DialogBox>
      <h5>Prodects</h5>
      <div className={style.prodects}>
        {prodectItem.map((element, indexx2) => {
          return (
            <div key={indexx2} className={style.items}>
              <div className={style.editBox}>
                <div
                  className={style.editButton}
                  onClick={() => {
                    setActiveToast(true);
                    setEditMode(true);
                    setIndex(indexx2);
                    setEdtingData(element);
                  }}
                >
                  Edit
                </div>
              </div>
              <FileInput
                crossShow
                onClear={(id) => {
                  const removeItems = prodectItem?.filter((element2, index2) => {
                    if (element2._id == element._id) {
                      let imageItems = element2?.imageItems?.map((element, index) => {
                        if (element?.webUrl) {
                          return element;
                        }
                        return null;
                      });
                      imageItems = imageItems.filter((element, index) => element != null);
                      setRemoveImage([...removeImage, ...imageItems]);
                    }
                    return element2._id != element._id;
                  });
                  setProdectItem(removeItems);
                }}
                fullWidth
                id={Date.now() + uuid()}
                onFile={(file) => {
                  const newItems = prodectItem?.map((element2, index2) => {
                    if (index2 == indexx2) {
                      return {
                        ...element2,
                        mainImage: { fullFile: file.fullFile },
                        prevId: element2.prevId ? element2.prevId : element2._id,
                        _id: uuid(),
                      };
                    }
                    return element2;
                  });
                  setProdectItem(newItems);
                }}
                fileUrl={
                  element.mainImage?.fullFile
                    ? URL.createObjectURL(element?.mainImage?.fullFile)
                    : element.mainImage?.webUrl
                    ? `${config.HOST_NAME}${element?.mainImage?.path}${element?.mainImage?.webUrl}`
                    : null
                }
              />
              <div className={style.alternative}>
                {element?.imageItems?.map((element, index) => {
                  return (
                    <div className={style.item} key={index}>
                      <FileInput
                        crossHide
                        id={Date.now() + uuid()}
                        fullWidth
                        fullheight
                        onClear={(id) => {
                          const newprodectItemn = prodectItem.map((element2, index2) => {
                            if (indexx2 == index2) {
                              const imageitems = element2?.imageItems?.filter((ele, ind) => {
                                if (ele.webUrl && index == ind) {
                                  setRemoveImage([...removeImage, { ...ele }]);
                                }
                                return index != ind;
                              });
                              return {
                                ...element2,
                                imageItems: imageitems,
                                prevId: element2.prevId ? element2.prevId : element2._id,
                                _id: uuid(),
                              };
                            }
                            return element2;
                          });
                          setProdectItem(newprodectItemn);
                        }}
                        fileUrl={
                          element.fullFile
                            ? URL.createObjectURL(element.fullFile)
                            : `${config.HOST_NAME}${element.path}${element.webUrl}`
                        }
                      />
                    </div>
                  );
                })}
              </div>
              <div className={style.inputBox}>
                <TextField
                  className={style.input}
                  placeholder="name"
                  onChange={() => {}}
                  value={element.header}
                />
              </div>
              <div className={style.inputBox}>
                <TextField
                  className={style.input}
                  multiline
                  rows={6}
                  value={element.description}
                  placeholder="description"
                  onChange={() => {}}
                />
              </div>
              <div className={style.inputBox}>
                <TextField
                  className={style.input}
                  multiline
                  rows={6}
                  value={element.aiDescription}
                  placeholder="AI description"
                  onChange={() => {}}
                />
              </div>
              <div className={style.inputBox}>
                <TextField
                  className={style.input}
                  placeholder="price"
                  value={element.price}
                  type="number"
                  onChange={() => {}}
                />
              </div>
              <div className={style.inputBox}>
                <TextField
                  className={style.input}
                  placeholder="quantity"
                  value={element.quantity}
                  type="number"
                  onChange={() => {}}
                />
              </div>
              <div className={style.inputBox}>
                <TextField
                  className={style.input}
                  placeholder="discount"
                  value={element.discount ?? 0}
                  type="number"
                  onChange={() => {}}
                />
              </div>
              <div className={style.checkinput}>
                <Checkbox checked={element.heroDisplay} value={element.heroDisplay} />
                <div className={style.checkText}>Hero Display</div>
              </div>
            </div>
          );
        })}
        <div
          className={style.addButton}
          onClick={() => {
            setActiveToast(true);
            setEditMode(false);
            setEdtingData(null);
          }}
        >
          +
        </div>
      </div>
      <div className={style.buttonBox}>
        <div
          className={style.button}
          onClick={() => {
            postProdectItems(
              { isCoffee: true, prodectItem, oldId, removeImage },
              ({ res, newData }) => {
                if (res?.data) {
                  const newItems = prodectItem.filter((elementx, indexx) => {
                    const find = newData.find((x, y) => x._id == elementx._id);
                    if (find) {
                      return false;
                    }
                    return true;
                  });
                  setProdectItem([...newItems, ...res?.data?.data]);
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
