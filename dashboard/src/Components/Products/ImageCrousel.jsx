import React, { useState } from "react";
import { Button, Center, Stack } from "@chakra-ui/react";
import { AiFillFastForward, AiFillBackward } from "react-icons/ai";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
    <div className="image-carousel">
      <div className="carousel-image-container">
      <img
        src={images[currentIndex]}
        alt="Product Preview"
        className="carousel-image"
      />
      </div>
          </div>
      <Center>
        <Stack direction="row" spacing={4} p={2}>
          <Button
            leftIcon={<AiFillBackward />}
            colorScheme="black"
            variant="outline"
            onClick={prevImage}
          ></Button>
          <Button
            rightIcon={<AiFillFastForward />}
            colorScheme="black"
            variant="outline"
            onClick={nextImage}
          ></Button>
        </Stack>
      </Center>
      </>
  );
};

export default ImageCarousel;
