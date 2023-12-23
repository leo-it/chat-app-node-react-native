import path from "path";

export function getFilePath(file) {
  const filePath = file.path;
  const fileSplit = filePath.split(path.sep)
  return `${fileSplit[1]}/${fileSplit[2]}`;
}
