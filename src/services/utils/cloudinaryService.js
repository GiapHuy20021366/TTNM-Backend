import cloudinary from "../../config/cloudinary";

const uploadImages = async (base64Images) => {
  const resData = await Promise.all(
    base64Images.map(async (img) => {
      const res = await cloudinary.uploader
        .upload(img, {
          public_id: `${Date.now()}`,
        })
        .catch((err) => {
          console.log(err);
        });
      return {
        ...res,
        base64: img,
      };
    })
  );
  return resData;
};

module.exports = { uploadImages };
