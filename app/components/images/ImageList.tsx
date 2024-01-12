import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { UnorderedList, Image, Flex, IconButton, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CustomModal from "../customModal";

export const ImageListComponent = ({ images, onChange, setCellImage }) => {
  // State to store the image sources
  const [imageSources, setImageSources] = useState<any>([]);

  useEffect(() => {
    // Process each image in noteData.images
    const processImages = async () => {
      const sources = await Promise.all(
        images.map(async (i: string) => {
          const img = JSON.parse(i);

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
  }, [images]);

  return (
    <UnorderedList
      maxHeight="20rem"
      overflowY="scroll"
      padding="2rem 1rem"
      display={"flex"}
      gap={"2rem"}
    >
      {imageSources.map((src: any) => (
        <Flex key={src} justifyContent={"space-between"}>
          {" "}
          <Box maxWidth={"50%"}>
            {" "}
            <CustomModal
              content={<Image src={src} />}
              size={"full"}
              title={""}
              button={<Image src={src} />}
            />{" "}
          </Box>
          {onChange && (
            <IconButton
              onClick={() => {
                setCellImage
                  ? setCellImage(src)
                  : onChange({
                      target: {
                        name: "images",
                        value: [...images].filter((img) => {
                          let file = JSON.parse(img).file;
                          if (file) {
                            return src !== file;
                          } else {
                            let url = JSON.parse(img).url;
                            return src !== url;
                          }
                        }),
                      },
                    });
              }}
              size={"sm"}
              aria-label="remove"
              icon={setCellImage ? <AddIcon /> : <DeleteIcon />}
            />
          )}
        </Flex>
      ))}
    </UnorderedList>
  );
};
