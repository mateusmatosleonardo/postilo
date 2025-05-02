"use client";

import { useState } from "react";
import Image from "next/image";
import Label from "./Label";

export default function ImagePreview() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setSelectedImage(file);
      };

      reader.readAsDataURL(file);
    }
  }

  return (
    <div>
      {imagePreview && (
        <div className="flex justify-center mb-2">
          <Image
            src={imagePreview}
            alt="Preview"
            className="w-36 h-36 rounded-full object-cover"
            width={144}
            height={144}
          />
        </div>
      )}
      <Label text="Selecione uma imagem" htmlFor="image" />
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-2 text-sm border border-zinc-300 placeholder:text-ring-500 focus:ring-0 focus:outline-none rounded"
      />
      {selectedImage && (
        <div className="mt-2 text-sm text-gray-500">
          <input type="hidden" name="image" value={selectedImage.name} />
        </div>
      )}
    </div>
  );
}
