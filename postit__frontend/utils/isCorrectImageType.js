const acceptedImageTypes = {
  jpeg: "image/jpeg",
  png: "image/png",
  svg: "image/svg",
  gif: "image/gif",
  jpg: "image/jpg",
  tiff: "image/tiff",
};

export const isCorrectImageType = (file) => {
  const fileFormat = file.name.split(".").at(-1);
  return acceptedImageTypes[fileFormat] === file.type;
};
