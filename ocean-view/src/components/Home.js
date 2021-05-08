import React from 'react';
import welcomeImage from '../images/Welcome.jpeg';

const containerStyle = {
    position: 'relative'
};

const imageStyle = {
    width: '100%',
    height: 'auto'
};

const quoteBoxStyle = {
  position: 'absolute',
  top: '40px'
};

const quoteStyle = {
    margin: '20px 50px 0',
    textAlign: 'center',
    fontFamily: 'Calligraffitti',
    fontSize: '2.0em',
    color: '#303030',
};

const attributionStyle = {
    width: '80%',
    textAlign: 'right',
    fontFamily: "Arial",
    fontStyle: 'italic',
    fontSize: '12',
    color: '#404040'
}

function Home() {
return (
    <div style={containerStyle}>
      <img src={welcomeImage} style={imageStyle} alt='Welcom' />
      <div style={quoteBoxStyle}>
        <h2 style={quoteStyle}>
          “&nbsp;We are tied to the ocean. And when we go back to the sea, whether it is to sail or to watch – we are going back from whence we came.&nbsp;”
        </h2>
        <p style={attributionStyle}>
          ~ John F. Kennedy
        </p>
      </div>
    </div>
  )
}

export default Home;
