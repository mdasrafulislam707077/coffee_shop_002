import { TextField } from "@mui/material";
import { getBlogInfo, postHeroContext } from "network/blog/blog";
import { useEffect, useState } from "react";
import SimpleHeroImage from "../components/simpleHeroImage/simpleHeroImage";
import FileInput from "../home/components/file/file";
import style from "./style.module.css";
export default function Blog() {
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
  const [blogItem, setBlogItem] = useState([]);
  useEffect(() => {
    getBlogInfo((res) => {
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
      <div className={style.blogItemsBox}>
        {blogItem.map((element, index) => {
          return (
            <div className={style.blogItems} key={index}>
              <FileInput
                id={Date.now() + index}
                onClear={(id) => {
                  if (id) {
                    const newItems = blogItem.map((element2, index2) => {
                      if (index == index2) {
                        return {
                          ...element2,
                          image: {},
                        };
                      }
                      return element2;
                    });
                    setBlogItem(newItems);
                  } else {
                    const newItems = blogItem.filter((element2, index2) => {
                      return index != index2;
                    });
                    setBlogItem(newItems);
                  }
                }}
                crossShow
                fullWidth
                onFile={(file) => {
                  const newItems = blogItem.map((element2, index2) => {
                    if (index == index2) {
                      return {
                        ...element2,
                        image: {
                          fullFile: file.fullFile,
                        },
                      };
                    }
                    return element2;
                  });
                  setBlogItem(newItems);
                }}
                fileUrl={
                  element.image?.fullFile
                    ? URL.createObjectURL(element?.image?.fullFile)
                    : element.image?.webUrl
                    ? `${element.image.host}${element.image.path}${element.image?.webUrl}`
                    : null
                }
              />
              <div className={style.header}>
                <TextField
                  className={style.inputText}
                  placeholder="name"
                  value={element.name}
                  onChange={(e) => {
                    const newItems = blogItem.map((element2, index2) => {
                      if (index2 == index) {
                        return {
                          ...element2,
                          name: e.target.value,
                        };
                      }
                      return element2;
                    });
                    setBlogItem(newItems);
                  }}
                />
              </div>
              <div className={style.des}>
                <TextField
                  className={style.inputText}
                  multiline
                  rows={6}
                  placeholder="description"
                  value={element.description}
                  onChange={(e) => {
                    const newItems = blogItem.map((element2, index2) => {
                      if (index2 == index) {
                        return {
                          ...element2,
                          description: e.target.value,
                        };
                      }
                      return element2;
                    });
                    setBlogItem(newItems);
                  }}
                />
              </div>
            </div>
          );
        })}
        <div className={`${style.blogItems} ${style.blank}`}>
          <div
            className={style.add}
            onClick={() => {
              const numb = Date.now();
              setBlogItem([
                ...blogItem,
                {
                  image: {},
                  name: "",
                  description: "",
                  like: [],
                  dislike: [],
                  comment: [],
                  date: numb,
                },
              ]);
            }}
          >
            +
          </div>
        </div>
      </div>
      <div className={style.buttonBox}>
        <div className={style.button} role="button">
          Save
        </div>
      </div>
    </div>
  );
}
