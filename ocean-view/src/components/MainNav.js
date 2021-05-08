import React from 'react';
import { BrowserRouter as Router, Route, Switch, useRouteMatch,  } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Sidebar from './Sidebar';
import Gallery from './Gallery';
import Home from './Home';
import Header from './Header';
import About from './About';

const containerStyle = {
  display: 'flex',
  padding: '0'
}

const mainStyle = {
  flexGrow: '1'
}

function MainNav(props) {

  const match = useRouteMatch();

  const history = useHistory();

  const routeChange = (event, context) => {
    history.push({pathname: `image`, state: {folder: context.folder, index: context.index, thumbIndices: context.thumbIndices}});
  }

  // Make the list of menu items for the Sidebar
  let items = [
    {link: "Home", route: "/"},
    {link: "About", route: "/about"}
  ];
  for (const gallery of props.galleries) {
    items.push({link: gallery.name, route: '/' + gallery.folder})
  }

  // Make the list of routes for each gallery
  const galleryRoutes = props.galleries.map((gallery) =>
    <Route path={'/' + gallery.folder} key={gallery.name}>
      <Gallery photos={gallery.catalog} folder={gallery.folder} direction={'row'} onClick={routeChange} />
    </Route>
  );

  return (
    <Router>
      <div className="MainNav">
        <Header />
        <div className="container" style={containerStyle}>
          <div>
            <Sidebar items={items}/>
          </div>
          <div style={mainStyle}>
            <Switch>
              <Route path={`${match.path}about`}>
                <About />
              </Route>
              {galleryRoutes}
              <Route path={`${match.path}`}>
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default MainNav;
  