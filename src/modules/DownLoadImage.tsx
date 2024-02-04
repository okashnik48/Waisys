import React, { useState } from "react";


import { useDispatch } from "react-redux";
import { SetFieldNewDish } from "../store/slices/admin";

const FileUploader = () => {
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();
  const fileReader = new FileReader();

const dispatch = useDispatch()

  fileReader.onloadend = () => {
    const img = new Image();
    img.src = fileReader.result;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const targetWidth = 640;
      const targetHeight = 480;
      let width = img.width;
      let height = img.height;
      if (width > height) {
        if (width > targetWidth) {
          height *= targetWidth / width;
          width = targetWidth;
        }
      } else {
        if (height > targetHeight) {
          width *= targetHeight / height;
          height = targetHeight;
        }
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      const resizedDataURL = canvas.toDataURL("image/jpeg");
      setImageURL(resizedDataURL);
      dispatch(SetFieldNewDish({ value: resizedDataURL, fieldname: "image"}))
    };
  };

  const handleOnChange = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      setImage(file);
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <form className="file-uploader bg-gray-200 p-4 rounded-lg shadow-md">
      <label htmlFor="file-loader-button" className="cursor-pointer block text-center mb-4">
        <input id="file-loader-button" type="file" className="hidden" onChange={handleOnChange} />
        <div className="bg-blue-500 text-white py-2 px-4 rounded-full">Upload File</div>
      </label>
      <img
        src={imageURL ? imageURL : "no_photo.jpg"}
        className="file-uploader__preview w-full h-auto rounded-lg mb-4"
        alt="Preview"
      />
      <div className="file-uploader__file-name text-center">{image ? image.name : ""}</div>
    </form>
  );
};

export default FileUploader;