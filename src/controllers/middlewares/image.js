import { imageService } from "../../services/core";

const avatarUpload = async (req, res, next) => {
  const { avatar } = req.body;

  if (avatar) {
    const imagesDB = await imageService.uploadImages([avatar]);
    if (!imagesDB || imagesDB.length !== 1) {
      return res.status(500).json({
        status: 500,
        err: "Internal server error",
      });
    }
    req.body.avatar = imagesDB[0].url;
  }
  next();
};

const imagesUpload = async (req, res, next) => {
  const { images } = req.body;

  if (images && images.length > 0) {
    const imagesDB = await imageService.uploadImages(images);
    if (!imagesDB) {
      return res.status(500).json({
        status: 500,
        err: "Internal server error",
      });
    }
    req.body.images = imagesDB.map((imageDB) => {
      return imageDB.url;
    });
  }
  next();
};

module.exports = {
  avatarUpload,
  imagesUpload,
};
