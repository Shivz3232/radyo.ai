import React from 'react';
import { Carousel } from 'react-responsive-carousel';

export default function HomeCarousel({ images }) {
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
            style={{ maxHeight: '24rem' }}
            className="flex flex-1 w-full h-full items-center justify-center"
          >
            <img src={e} alt="carousel" />
          </div>
        );
      })}
    </Carousel>
  );
}
