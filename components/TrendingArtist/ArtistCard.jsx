import React from 'react';
import Link from 'next/link';

const ArtistCard = ({uid, id, avatar, name }) => {
  return (
    <div
      id={id}
      className="mx-4 p-0 flex flex-col items-center justify-start space-between transition delay-75 hover:scale-105"
    >
      <div className="min-w-max  border rounded-full">
        <Link href={`/creator/${uid}`}>
          <a style={{ textDecoration: 'none', color: 'inherit' }}>
            <img className="rounded-full h-24 w-24" src={avatar} alt="artist" />
          </a>
        </Link>
      </div>
      <Link href={`/creator/${uid}`}>
        <a style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="mt-2 text-center mobile:text-sm">{name}</div>
        </a>
      </Link>
    </div>
  );
};

export default ArtistCard;
