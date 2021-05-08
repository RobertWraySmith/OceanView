import React from 'react';

const aboutStyle = {
  color: '#080808',
  backgroundColor: '#D4E6F1',
  padding: '50px',
  minHeight: '500px',
  fontFamily: 'Calligraffitti',
  fontSize: '1.2em'
};

const paragraphStyle = {
  padding: '20px 0'
};


function About() {
  return (
    <div style={aboutStyle}>
      <p style={paragraphStyle}>
        <b>All images © 2021, Robert Wray Smith. All rights reserved.</b>
      </p>
      <p style={paragraphStyle}>
        <b>Home page photograph is of Pomponio State Beach, CA.</b>
      </p>
      <p style={paragraphStyle}>
        <b>Equipment:</b>
        <br />Canon EOS 7D Mark II
        <br />&nbsp;&nbsp;&nbsp;&nbsp;EF 100-400mm f4.5-5.6L IS +1.4 extender
        <br />Canon EOS 60D
        <br />&nbsp;&nbsp;&nbsp;&nbsp;EF 50mm f1.8 II
        <br />Canon PowerShot SX160 IS
        <br />Apple iPhone 7
        <br />Apple iPhone 5s
        <br />Apple iPhone 3GS
      </p>
    </div>
  )
}

export default About;
  