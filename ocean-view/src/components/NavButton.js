import React, { useState } from 'react';

const NavButton = (props) => {
  const [hover, setHover] = useState(false);

  const buttonWrapperStyle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const buttonStyle = {
    fontFamily: 'Arial',
    fontSize: '2em',
    padding: '15px 30px',
    border: '0',
    borderRadius: '5px',
    outline: '0',
    color: '#F0F0F0',
    background: '#303030'
  };
    
  const mouseEnter = () => { setHover(true); };
  const mouseLeave = () => { setHover(false); };

  const getStyle = () => { 
    // If there is no onClick hander, set the color to a 'disabled' color
    if (props.onClick === null) {
      return (Object.assign({...buttonStyle}, {color: '#707070'}));
    }
    // Apply a lighter background color if the mouse is hovering over the button
    return (hover ? Object.assign({...buttonStyle}, {background: '#505050'}) : buttonStyle);
  };

  return (
    <div style={buttonWrapperStyle}>
      <button style={getStyle()} onClick={props.onClick} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} >{props.text}</button>
    </div>
  )
}

export default NavButton;
