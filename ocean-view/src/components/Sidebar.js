import React from 'react'
import { NavLink } from 'react-router-dom';
import '../App.css';

const menuStyle = {
  fontSize: '1.4em',
  fontFamily: 'Calligraffitti',
  color: '#fff',
  background: '#AED6F1'
}

const activeLinkStyle = {
  background: '#7FB3D5'
}

function Sidebar(props) {

  const listItems = props.items.map((item) =>
    <NavLink activeStyle={activeLinkStyle} exact={true} to={item.route} key={item.link}>
      {item.link}
    </NavLink>
  );

  return (
     <ul style={menuStyle}>{listItems}</ul>
  );
}

export default Sidebar
