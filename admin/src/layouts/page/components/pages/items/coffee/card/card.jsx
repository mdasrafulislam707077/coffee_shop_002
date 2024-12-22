import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { config } from "../../../../../../../config";
import FileInput from "../../../home/components/file/file";
import style from "./style.module.css";

// eslint-disable-next-line react/prop-types
export default function Card({ prodectItems, onAdd, onClose, editMode, index }) {
  const [element, setCardItem] = useState(
    prodectItems ?? {
      _id: uuid(),
      header: "",
      description: "",
      price: 0,
      quantity: 0,
      mainImage: null,
      imageItems: [],
      aiDescription: "",
      prevId: null,
      heroDisplay: false,
      discount: 0,
    }
  );
  return (
    <div className={style.main}>
      <div className={style.homeHero}>
        <FileInput
          crossShow
          fullWidth
          id={Date.now() + uuid()}
          onFile={(file) => {
            setCardItem({
              ...element,
              mainImage: { fullFile: file.fullFile },
              prevId: element.prevId ? element.prevId : element._id,
              _id: uuid(),
            });
          }}
          fileUrl={
            element.mainImage?.fullFile
              ? URL.createObjectURL(element?.mainImage?.fullFile)
              : element.mainImage?.webUrl
              ? `${config.HOST_NAME}${element?.mainImage?.path}${element?.mainImage?.webUrl}`
              : null
          }
          onClear={(id) => {
            if (id) {
              setCardItem({
                ...element,
                mainImage: {},
              });
            } else {
              if (onClose) {
                onClose();
              }
            }
          }}
        />
      </div>
      <div className={style.alternative}>
        {element?.imageItems?.map((elementx, index) => {
          return (
            <div className={style.item} key={index}>
              <FileInput
                id={Date.now() + uuid()}
                fullWidth
                fullheight
                onClear={() => {
                  const files = element?.imageItems?.filter((element2, index2) => {
                    return index2 != index;
                  });
                  setCardItem({
                    ...element,
                    imageItems: files ?? [],
                    prevId: element.prevId ? element.prevId : element._id,
                    _id: uuid(),
                  });
                }}
                fileUrl={
                  elementx.fullFile
                    ? URL.createObjectURL(elementx.fullFile)
                    : `${config.HOST_NAME}${elementx.path}${elementx.webUrl}`
                }
              />
            </div>
          );
        })}
        <div className={`${style.item} ${style.itemAdd}`}>
          <FileInput
            fullWidth
            fullheight
            id={uuid()}
            onFile={(file) => {
              setCardItem({
                ...element,
                imageItems: [...element.imageItems, { fullFile: file.fullFile }],
                prevId: element.prevId ? element.prevId : element._id,
                _id: uuid(),
              });
            }}
          />
        </div>
      </div>
      <div className={style.inputBox}>
        <TextField
          className={style.input}
          placeholder="name"
          value={element.header}
          onChange={(e) => {
            setCardItem({ ...element, header: e.target.value, _id: uuid() });
          }}
        />
      </div>
      <div className={style.inputBox}>
        <TextField
          className={style.input}
          multiline
          rows={6}
          value={element.description}
          placeholder="description"
          onChange={(e) => {
            setCardItem({ ...element, description: e.target.value, _id: uuid() });
          }}
        />
      </div>
      <div className={style.inputBox}>
        <TextField
          className={style.input}
          multiline
          rows={6}
          value={element.aiDescription}
          placeholder="AI description"
          onChange={(e) => {
            setCardItem({ ...element, aiDescription: e.target.value, _id: uuid() });
          }}
        />
      </div>
      <div className={style.inputBox}>
        <TextField
          className={style.input}
          placeholder="price"
          value={element.price ?? 0}
          type="number"
          onChange={(e) => {
            if (e.target.value < 0) {
              setCardItem({ ...element, price: 0, _id: uuid() });
            } else {
              setCardItem({ ...element, price: e.target.value, _id: uuid() });
            }
          }}
        />
      </div>
      <div className={style.inputBox}>
        <TextField
          className={style.input}
          placeholder="quantity"
          value={element.quantity ?? 0}
          type="number"
          onChange={(e) => {
            if (e.target.value < 0) {
              setCardItem({ ...element, quantity: 0, _id: uuid() });
            } else {
              setCardItem({ ...element, quantity: e.target.value, _id: uuid() });
            }
          }}
        />
      </div>
      <div className={style.inputBox}>
        <TextField
          className={style.input}
          placeholder="discount"
          value={!element.discount ? 0 : element.discount}
          type="number"
          onChange={(e) => {
            if (e.target.value < 0) {
              setCardItem({ ...element, discount: 0, _id: uuid() });
            } else {
              setCardItem({ ...element, discount: e.target.value, _id: uuid() });
            }
          }}
        />
      </div>
      <div className={style.checkinput}>
        <Checkbox
          checked={element.heroDisplay}
          value={element.heroDisplay}
          onChange={(e) => {
            if (e.target.value === "true") {
              setCardItem({ ...element, heroDisplay: false, _id: uuid() });
            } else {
              setCardItem({ ...element, heroDisplay: true, _id: uuid() });
            }
          }}
        />
        <div className={style.checkText}>Hero Display</div>
      </div>
      <div className={style.buttonBox}>
        <div
          className={style.button}
          onClick={() => {
            if (onAdd) {
              if (editMode) {
                onAdd({
                  index,
                  element: {
                    ...element,
                    discount: element.discount ?? 0,
                  },
                });
              } else {
                onAdd({
                  ...element,
                  discount: element.discount ?? 0,
                });
              }
            }
          }}
        >
          Submit
        </div>
      </div>
    </div>
  );
}
