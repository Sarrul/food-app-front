"use client";
import { useState } from "react";
import { X, Image } from "lucide-react";

const UPLOAD_PRESET = "food-app";
const CLOUD_NAME = "dzkjbbs03";

const ImageUploader = ({ value, onChange, onUploadingChange }) => {
  const [preview, setPreview] = useState(value);
  const [isUploading, setIsUploading] = useState(false);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (err) {
      console.error("cloudinary failed", err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setIsUploading(true);
      onUploadingChange?.(true);
      const url = await uploadToCloudinary(file);
      if (url) {
        setPreview(url);
        onChange(url);
      }
    } catch (err) {
      console.error("failed to upload image", err.message);
    } finally {
      setIsUploading(false);
      onUploadingChange?.(false);
    }
  };

  const removeImage = () => {
    setPreview("");
    onChange("");
  };

  return (
    <label className="flex flex-col relative items-center justify-center h-36 w-full border-2 border-dashed border-[#2563EB]/20 bg-[#2563EB]/5 rounded-md cursor-pointer ">
      {preview ? (
        <>
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              removeImage();
            }}
            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center">
            <Image strokeWidth={2} className="w-4 h-4" />
          </div>
          <p>Click to upload image</p>
        </div>
      )}
      {isUploading && (
        <div className="absolute inset-0 rounded-md bg-white/80 flex items-center justify-center text-sm font-medium text-[#2563EB]">
          Uploading image...
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={isUploading}
        className="hidden"
      />
    </label>
  );
};
export default ImageUploader;
