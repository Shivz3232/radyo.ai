import React from 'react';
import { Carousel } from 'react-responsive-carousel';

export default function CustomCarousel({ images }) {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      stopOnHover
      emulateTouch
      showThumbs={false}
      showStatus={false}
    >
      {images.map((e, i) => {
        return (
          <div
            key={i}
            className="max-h-80 flex flex-1 w-full h-full items-center justify-center"
          >
            <img src={e} alt="carousel" />
            
          </div>
        );
      })}
    </Carousel>
  );
}
