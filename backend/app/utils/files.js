const FileType = require("file-type");

const validImages = ["image/png", "image/jpg", "image/jpeg"];
const validAudios = ["audio/wav", "audio/mpeg"];

const validateImage = async (fileBase64) => {
  return await validateFile(fileBase64, validImages);
};

const validateAudio = async (fileBase64) => {
  return await validateFile(fileBase64, validAudios);
};

const validateFile = async (fileBase64, formatValid) => {
  const buf = Buffer.from(fileBase64, "base64");
  const mimetype = await FileType.fromBuffer(buf);

  return mimetype && formatValid.includes(mimetype.mime);
};

module.exports = {
  validateImage,
  validateAudio,
};
