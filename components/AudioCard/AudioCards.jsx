import { useRef } from 'react';
import AudioCard, { capitalizeFirstLetter } from './AudioCard';

const AudioCards = ({ cardItems, categoryName, playAudio }) => {
  const audioCards = useRef();

  return (
    <section className="audio-cards-section">
      <div className="audio-cards-outer-container">
        <h2 className="heading">{capitalizeFirstLetter(categoryName)}</h2>
        {cardItems && cardItems.length ? (
          <div ref={audioCards} className="audio-cards-container">
            {cardItems.map(cardItemData => {
              return (
                <AudioCard
                  playAudio={playAudio}
                  key={cardItemData._id}
                  cardItemData={cardItemData}
                />
              );
            })}
          </div>
        ) : (
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <strong>No match found</strong>
          </p>
        )}
      </div>
    </section>
  );
};

export default AudioCards;
