import React from 'react';
import NavButton from './NavButton';
import { useHistory } from 'react-router-dom';

const imageInfolStyle = {
  color: '#F0F0F0',
  background: '#303030',
  textAlign: 'center'
};

const imageInfoVerticalStyle = {
  display: 'block',
  width: '360px',
  height: '100%'
};

const imageInfoHorizontalStyle = {
  display: 'flex',
  width: '100%',
  height: '200px'
};

const buttonAreaVerticalStyle = {
  display: 'flex',
  width: '100%',
  height: '10%'
};

const textAreaVerticalStyle = {
  padding: '60% 0 0 0',
  height: '80%'
};

const textAreaHorizontalStyle = {
  width: '60%',
  height: '124px'
};

const titleStyle = {
  padding: '16px 0 4px',
  fontFamily: "Arial",
  fontStyle: 'italic',
  fontSize: '1.4em'
};

const locationStyle = {
  padding: '2px 0 0',
  fontFamily: "Arial",
  fontSize: '0.8em',
  fontWeight: 'bold'
};

const dateStyle = {
  padding: '2px 0 0',
  fontFamily: "Arial",
  fontSize: '0.8em'
};

const commentStyle = {
  padding: '20px 20px 0',
  fontFamily: "Arial",
  fontSize: '0.8em'
};

const buttonBoxVerticalStyle = {
  width: '33%',
  height: '100%'
};

const buttonBoxHorizontalStyle = {
  position: 'relative',
  width: '10%'
};

const ImageInfo = (props) => {
  // Get the 'image' object with the relevent image info
  const image = props.image;
  const index = props.index;
  const thumbIndices = props.thumbIndices;
  const history = useHistory();

  const prevClick = (index > 0) ? () => {
    history.push({pathname: 'image', state: {folder: props.folder, index: index - 1, thumbIndices: props.thumbIndices}});
  } : null;

  const nextClick = (index < thumbIndices.length - 1) ? () => {
    history.push({pathname: 'image', state: {folder: props.folder, index: index + 1, thumbIndices: props.thumbIndices}});
  } : null;

  const backClick = () => {
    history.push({pathname: props.folder, state: {folder: props.folder, index: props.index, thumbIndices: props.thumbIndices}});
  }
  
  if (props.vertical) {
    return (
      <div style={Object.assign({...imageInfolStyle}, imageInfoVerticalStyle)}>
        <div style={buttonAreaVerticalStyle}>
          <div style={buttonBoxVerticalStyle} >
            <NavButton text='<' onClick={prevClick} ></NavButton>
          </div>
          <div style={buttonBoxVerticalStyle}>
            <NavButton text='<<' onClick={backClick} ></NavButton>
          </div>
          <div style={buttonBoxVerticalStyle}>
            <NavButton text='>' onClick={nextClick} ></NavButton>
          </div>
        </div>
        <div style={textAreaVerticalStyle}>
          <div style={titleStyle}>{image.title}</div>
          <div style={locationStyle}>{image.location}</div>
          <div style={dateStyle}>{image.date}</div>
          <div style={commentStyle} dangerouslySetInnerHTML={{__html: image.comment}}></div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={Object.assign({...imageInfolStyle}, imageInfoHorizontalStyle)}>
        <div style={buttonBoxHorizontalStyle} >
          <NavButton text='<' onClick={prevClick} ></NavButton>
        </div>
        <div style={buttonBoxHorizontalStyle}>
          <NavButton text='<<' onClick={backClick} ></NavButton>
        </div>
        <div style={textAreaHorizontalStyle}>
          <div style={titleStyle}>{image.title}</div>
          <div style={locationStyle}>{image.location}</div>
          <div style={dateStyle}>{image.date}</div>
          <div style={commentStyle} dangerouslySetInnerHTML={{__html: image.comment}}></div>
        </div>
        <div style={buttonBoxHorizontalStyle}>
        </div>
        <div style={buttonBoxHorizontalStyle}>
          <NavButton text='>' onClick={nextClick} ></NavButton>
        </div>
      </div>
    );
  }
};

export default ImageInfo;
  