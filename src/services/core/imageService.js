import { cloudinaryService } from "../utils";
import { Image } from "../../db/models";

const uploadImages = async (base64Images) => {
  const data = await cloudinaryService.uploadImages(base64Images);
  const images = data.map((d) => {
    return {
      url: d.secure_url,
    };
  });

  const imagesDB = await Promise.all(
    images.map(async (image) => {
      const imageDB = new Image(image);
      await imageDB.save();
      return imageDB;
    })
  );
  return imagesDB;
};

module.exports = {
  uploadImages,
};
