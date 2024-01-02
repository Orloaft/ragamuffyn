import { Button } from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import React, { useState } from "react";
import { ImageListComponent } from "./ImageList";

export interface ImageData {
  url: string;
  file: File | null | string;
}

export default function ImageUpload({ handleChange, images }: any) {
  const [imageData, setImageData] = useState<ImageData>({
    url: "",
    file: null,
  });
  const [preview, setPreview] = useState<string>("");
  const handleSave = (e: any) => {
    e.preventDefault();
    // Convert the image data to JSON and save it
    handleChange({
      target: {
        name: "images",
        value: [...images, JSON.stringify(imageData)],
      },
    });
  };
  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageData({ ...imageData, url });
    setPreview(url); // Set the preview to the URL
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        let fileString = reader.result as string;
        console.log("filestring", fileString);
        setImageData({ ...imageData, file: fileString });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {" "}
      <ImageListComponent images={images} onChange={handleChange} />
      <input
        type="text"
        placeholder="Enter image URL"
        value={imageData.url}
        onChange={handleUrlChange}
      />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <img src={preview} alt="Preview" style={{ maxHeight: "200px" }} />
      )}
      <Button onClick={handleSave}>Save Image Data</Button>
    </div>
  );
}
