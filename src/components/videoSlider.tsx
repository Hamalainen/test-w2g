import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { nextVideo } from '../api/socketApi';

interface SliderProps {
  searchResults: searchResult[];
}

const VideoSlider: React.FC<SliderProps> = ({ searchResults }) => {
  const scrollContainer = useRef<HTMLDivElement>(null);

  const handleScrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleScrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  const playNext = (videoId: any) => {
    nextVideo(videoId);
  };

  return (
    <div style={firstDivStyle}>
      <div style={secondDivStyle} ref={scrollContainer} className="scrollbar-hide">
        {searchResults.map((result, index) => (
          <div key={index} onClick={() => {playNext(result.id)}} style={thirdDivStyle}>
            <img
              src={result.snippet.thumbnails.medium.url}
              alt={result.snippet.title}
              style={imageStyle}
            />
            <p style={pStyle}>{result.snippet.title}</p>
          </div>
        ))}
      </div>
      <div style={iconRightContainerStyle} onClick={handleScrollRight} className="bg-customPinkOpacity03 hover:bg-customPinkOpacity05">
        <FontAwesomeIcon icon={faArrowRight} style={iconStyle} />
      </div>
      <div style={iconLeftContainerStyle} onClick={handleScrollLeft} className="bg-customPinkOpacity03 hover:bg-customPinkOpacity05">
        <FontAwesomeIcon icon={faArrowLeft} style={iconStyle} />
      </div>
    </div>
  );
};

const firstDivStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: '800px'
};

const secondDivStyle: React.CSSProperties = {
  display: 'flex',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
  padding: '20px',
  background: 'black',
  borderRadius: '10px',
  position: 'relative',
  width: '100%'
};

const thirdDivStyle: React.CSSProperties = {
  display: 'inline-block',
  width: '300px',
  marginRight: '10px',
  cursor: 'pointer'
};

const iconContainerBaseStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0, 
  bottom: 0, 
  display: 'flex',
  alignItems: 'center', 
  justifyContent: 'center', 
  cursor: 'pointer',
  zIndex: 1,
  width: '5%'
};

const iconRightContainerStyle: React.CSSProperties = {
  ...iconContainerBaseStyle,
  right: '0px',
  borderRadius: '0px 10px 10px 0px'
};

const iconLeftContainerStyle: React.CSSProperties = {
  ...iconContainerBaseStyle,
  left: '0px', 
  borderRadius: '10px 0px 0px 10px'
};

const iconStyle: React.CSSProperties = {
  color: 'white',
  fontSize: '28px'
};

const pStyle: React.CSSProperties = {
  color: 'white',
  textAlign: 'center',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
};

const imageStyle: React.CSSProperties = {
  width: '300px',
  height: '150px',
  borderRadius: '10px',
  border: '1px solid #c76c6c'
};

export default VideoSlider;
