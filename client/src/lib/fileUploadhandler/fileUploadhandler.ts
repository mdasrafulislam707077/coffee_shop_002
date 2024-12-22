import { File } from "buffer";
import { writeFileSync } from "fs";
import pth from "path";
import { deleteFile } from "../operation/delete/delete";

export default async function FileUploader({
  data,
  filesTypes = ["image/png", "image/jpg", "image/jpeg"],
  filepath = "content",
  dir = "image001",
  checkOnlyFile = false,
  backStap = "../../../../../",
  targetPath,
}) {
  const filePath = targetPath??pth.join(__dirname, backStap, "public", filepath, dir);

  let filecount = 1;
  const fileItems = [];
  const fileErros = [];
  const texterror = [];
  if (data.get("removeImage")) {
    for (const iterator of JSON.parse(data.get("removeImage"))) {
      try {
        await deleteFile(pth.join(filePath, iterator.webUrl));
      } catch (error) {}
    }
  } else {
  }

  for (const iterator of data) {
    if (iterator[0].includes("file-")) {
      const file: File = data.get(`file-${filecount}`) as File;
      let stringFile = null;

      try {
        stringFile = JSON.parse(data.get(`file-${filecount}`));
      } catch (error) {}
      if (filesTypes.includes(file.type)) {
        const filextName = pth.extname(file.name);
        const onlyFileName = file.name.replace(filextName, "");
        const newFilename = onlyFileName + Date.now() + filextName;
        const arrayByte = await file.arrayBuffer();

        writeFileSync(pth.join(filePath, newFilename), Buffer.from(arrayByte));
        fileItems.push({
          webUrl: newFilename,
          host: process.env.PUBLIC_URL,
          path: `${filepath}/${dir}/`,
        });
      } else if (
        iterator[0].includes("file-") &&
        stringFile != null &&
        stringFile.webUrl
      ) {
        fileItems.push(stringFile);
      } else {
        fileErros.push({
          name: file.name,
          msg: `only ${filesTypes.join(",")} file type allow`,
        });
      }

      filecount++;
    }
  }
  if (!checkOnlyFile) {
    if (data.get("header")) {
    } else {
      texterror.push({
        type: "title",
        msg: "header required",
      });
    }
    if (data.get("title")) {
    } else {
      texterror.push({
        type: "title",
        msg: "title required",
      });
    }
    if (data.get("description")) {
    } else {
      texterror.push({
        type: "title",
        msg: "description required",
      });
    }
  }
  return {
    fileItems,
    fileErros,
    texterror,
    header: data.get("header"),
    title: data.get("title"),
    description: data.get("description"),
  };
}
