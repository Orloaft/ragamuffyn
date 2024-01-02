import { UnorderedList, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const ImageListComponent = ({ noteData }) => {
  // State to store the image sources
  const [imageSources, setImageSources] = useState<any>([]);

  useEffect(() => {
    // Process each image in noteData.images
    const processImages = async () => {
      const sources = await Promise.all(
        noteData.images.map(async (i: string) => {
          const img = JSON.parse(i);
          console.log(img);
          if (img.file !== null) {
            // If there's a file, read it and return the data URL
            return img.file;
          } else {
            // If there's no file, use the URL
            return img.url;
          }
        })
      );

      setImageSources(sources);
    };

    processImages();
  }, [noteData.images]);

  return (
    <UnorderedList>
      {imageSources.map((src) => (
        <Image key={uuidv4()} src={src} />
      ))}
    </UnorderedList>
  );
};
