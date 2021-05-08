import React from 'react';
import ImageInfo from './ImageInfo';
import RingLoader from "react-spinners/RingLoader";
import { useLocation } from 'react-router-dom';

const containerVerticalStyle = {
  height: '100vh',
  display: 'flex'
};

const containerStyle = {
  border: '0',
  background: '#303030'
};

const imageVerticalStyle = {
  height: '100%',
  width: 'auto'
};

const imageHorizontalStyle = {
  width: '100%',
  height: 'auto'
};

const loaderStyle = {
  position: 'absolute',
  left: '100px',
  top: '100px'
};

const findImage = (galleries, folder, index, thumbIndices) => {
  for (const gallery of galleries) {
    if (gallery.folder === folder) {
      if (index > thumbIndices.length) {
        console.log('Failed request for item ' + index + ' of gallery with ' + gallery.catalog.length + 'items');
        return null;
      }
      if (thumbIndices[index] > gallery.catalog.length) {
        console.log('Failed request for item ' + index + ' of catalog with ' + gallery.catalog.length + 'items');
        return null;
      }
      return gallery.catalog[thumbIndices[index]];
    }
  }
  return null;
}

const ImageView = (props) => {
  // The folder and index are URL parameters
  const location = useLocation();
  if ((location.state === null) || (location.state === undefined)) {
    return (' ');
  }
  const folder = location.state.folder;
  const index = location.state.index;
  const thumbIndices = location.state.thumbIndices;

  // Get the image from the proper gallery
  const image = findImage(props.galleries, folder, index, thumbIndices);
  if ((image === null) || (image === undefined)) {
    return (
      <div style={loaderStyle}>
        <RingLoader color={'#1A5276'} size={240} />
      </div>    );
  }

  const imageUrl = image.src;
  const altText = image.title;

  if (image.width <= image.height) {
    return (
      <div style={Object.assign({...containerStyle}, containerVerticalStyle)}>
        <ImageInfo image={image} folder={folder} index={index} thumbIndices={thumbIndices} vertical={true} />
        <img style={imageVerticalStyle} src={imageUrl} alt={altText} />
      </div>
    );
  } else {
    return (
      <div style={containerStyle}>
        <img style={imageHorizontalStyle} src={imageUrl} alt={altText} />
        <ImageInfo image={image} folder={folder} index={index} thumbIndices={thumbIndices} vertical={false} />
      </div>
    );
  }
}

export default ImageView;
