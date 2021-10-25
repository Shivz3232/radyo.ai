import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link';

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
          <Link href={e.url ? e.url : '#'} key={i}>
            <a style={{ textDecoration: 'none', color: 'inherit' }}>
              <div
                style={{ maxHeight: '24rem' }}
                className="flex flex-1 w-full h-full items-center justify-center"
              >
                <img src={e.img} alt="carousel" />
              </div>
            </a>
          </Link>
        );
      })}
    </Carousel>
  );
}
