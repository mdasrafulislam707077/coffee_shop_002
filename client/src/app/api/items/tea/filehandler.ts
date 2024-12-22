import { Buffer, File } from "buffer";
import { writeFileSync } from "fs";
import pth from "path";
export async function fileUploader({
  data,
  filepath,
  dir = "image001",
  filePath = "content",
}) {
  const mainPath = pth.join(filepath, filePath, dir);
  const parsedata = JSON.parse(data.get("data"));
  const allFiles = [];
  const dataList = [];
  for (const element of data) {
    if (element[0].includes("file")) {
      allFiles.push(element);
    }
  }
  for (const item of parsedata) {
    const prodectData = { ...item, prevId: null };
    prodectData["imageItems"] = [];
    const files = allFiles.filter((element, index) =>
      element[0].includes(item._id)
    );
    for (const fileItems of files) {
      let stringFile = null;
      let fileInfo = null;
      try {
        stringFile = JSON.parse(fileItems[1]);
      } catch (error) {}
      if (stringFile) {
        fileInfo = stringFile;
      } else {
        fileInfo = await fileUploadhandler(
          fileItems[1],
          mainPath,
          filePath,
          dir
        );
      }
      if (!fileInfo) {
        return null;
      }
      if (fileItems[0].includes("main")) {
        prodectData["mainImage"] = fileInfo;
      } else {
        prodectData["imageItems"] = [...prodectData["imageItems"], fileInfo];
      }
    }
    dataList.push(prodectData);
  }

  return dataList;
}

async function fileUploadhandler(
  singleItem,
  mainPath,
  filePath,
  dir,
  filesTypes = ["image/png", "image/jpg", "image/jpeg"]
) {
  const file: File = singleItem as File;
  if (!filesTypes.includes(file.type)) {
    return null;
  }
  const filextName = pth.extname(file.name);
  const onlyFileName = file.name.replace(filextName, "");
  const newFilename = onlyFileName + Date.now() + filextName;
  const arrayByte = await file.arrayBuffer();
  writeFileSync(pth.join(mainPath, newFilename), Buffer.from(arrayByte));
  return {
    webUrl: newFilename,
    host: process.env.PUBLIC_URL,
    path: `${filePath}/${dir}/`,
  };
}
