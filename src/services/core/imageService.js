import { cloudinaryService } from "../utils";
import { Image } from "../../db/models";
import md5 from "md5-hash";

const uploadImages = async (base64Images) => {
  const isImagesDB = [];
  const notImagesDB = [];
  // Find duplicate images on db
  await Promise.all(
    base64Images.map(async (image) => {
      const imageDB = await Image.findOne({ hash: md5(image) }).exec();
      if (imageDB) {
        isImagesDB.push(imageDB);
      } else {
        notImagesDB.push(image);
      }
    })
  );
  const data = await cloudinaryService.uploadImages(notImagesDB);
  const imagesUploaded = data.map((d) => {
    return {
      url: d.secure_url,
      hash: md5(d.base64),
    };
  });
  // Save them in to db
  const newImagesDB = await Promise.all(
    imagesUploaded.map(async (image) => {
      const imageDB = new Image(image);
      await imageDB.save();
      return imageDB;
    })
  );
  // Final result
  const result = isImagesDB.concat(newImagesDB);
  return result;
};

module.exports = {
  uploadImages,
};
