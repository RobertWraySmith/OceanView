import React from 'react';

const headerStyle = {
  background: '#154360',
  color: '#fff',
  textAlign: 'center',
  fontFamily: 'Courgette',
  fontSize: '1.0em',
  fontStyle: 'bold',
  height: '100px',
  padding: '30px'
}

const h1Style ={
  display: 'flex'
}

const leftStyle = {
  padding: '0 20px',
  fontSize: '1.1em',
  color: '#F0F0F0'
}

const rightStyle = {
  padding: '12px 20px',
  fontSize: '0.75em',
  color: '#B0B0B0'
}


function Header() {
  return (
    <header style={headerStyle} className="Header">
      <h1 style={h1Style}>
        <div style={leftStyle}>
          Robert Wray Smith
        </div>
        <div style={rightStyle}>
          Oceanography Photography
        </div>
      </h1>
    </header>
  )
}

export default Header;
