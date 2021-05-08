import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainNav from './components/MainNav';
import ImageView from './components/ImageView';
import { gapi } from 'gapi-script'
import './App.css';

const imageUrlBase = 'https://storage.googleapis.com/oceanography-photography/';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { galleries: [], numCatalogs: 0, useSignedUrl: true };
    this.start = this.start.bind(this);
  }

  useSignedUrls = false;

  setCatalog(galleries, name, items) {
    for (const gallery of galleries) {
      if (gallery.name === name) {
        gallery.catalog = items;
        return;
      }
    }
  }

  signedUrl(url) {
    // return fetch('http://localhost:7000/signed?url=' + url, {
    return fetch('local_signed?url=' + url, {
        method: 'GET',
      mode: 'cors',
      headers: {
        'Origin' : 'http://localhost:8080/'
      }
    });
  }

  getContent(url) {
    return fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Origin' : 'http://localhost:8080/'
      }
    });
  }

  fetchGalleries() {
    // Initialize the catalog count
    this.setState({numCatalogs: 0});
    // Start by getting the master list of galleries
    this.signedUrl('galleries.json').then((response) => {
      response.text().then((text) => {
        this.getContent(text).then((response) => {
          response.json().then((data) => {
            let galleries = [];
            for (const gallery of data) {
              galleries.push({'name': gallery.name, 'folder': gallery.folder, 'catalog': [] });
            }
            // Fetch the catalog for this gallery
            for (const gallery of data) {
              this.signedUrl(gallery.folder + '/catalog.json').then((response) => {
                response.text().then((text) => {
                  this.getContent(text).then((response) => {
                    response.json().then((data) => {
                      // First create the item list for each catalog without the signed urls
                      let items = [];
                      for (var i = 0; i < data.length; i++) {
                        const item = data[i];
                        item.index = i;
                        items.push({'index': item.index, 'id': item.id, 'title': item.title, 'location': item.location, 'date': item.date,
                                    'width': item.width, 'height': item.height, 'comment': item.comment || '', 'folder': gallery.folder,
                                    'src': ''});
                      }
                      // Update the state to have the full list of catalogs
                      this.setCatalog(galleries, gallery.name, items);
                      this.setState({numCatalogs: this.state.numCatalogs + 1});
                      if (galleries.length === this.state.numCatalogs) {
                        this.setState({galleries: galleries});
                      }
                      // Asynchronously get signed urls for each item and add them to the gallery catalog
                      for (var j = 0; j < data.length; j++) {
                        const item = items[j];
                        this.signedUrl(gallery.folder + '/' + item.id + '.jpeg').then((response) => {
                          response.text().then((text) => {
                            item.src = text;
                          });
                        });
                      }
                    });
                  },
                  (response) => { console.log('Error on catalog for gallery ' + gallery.folder); }
                  );
                });
              });
            }
          });
        },
        (response) => { console.log('Error on galleries'); }
        );
      });
    });
  }

  start() {
    // Initializes the client with the API key and the Translate API.
    this.setState({numCatalogs: 0});
    // Initialize the Google API javascript client
    gapi.client.init({
      'apiKey': 'AIzaSyDSfKJF2NTEVxsbwHA-vra9Pgk2mLfIryE'
    }).then(() => {
      // Executes an API request, and returns a Promise.
      return gapi.client.request({
          'path': 'https://storage.googleapis.com/oceanography-photography/galleries.json'
        });
    }).then((response) => {
      // First create a gallery list with emtpy catalogs in order to establish the order
      let galleries = [];
      for (const gallery of response.result) {
        galleries.push({'name': gallery.name, 'folder': gallery.folder, 'catalog': [] });
      }
      // Populate the catalog of each gallery
      for (const gallery of response.result) {
        // Fetch the catalog for this gallery
        gapi.client.request({
          'path': 'https://storage.googleapis.com/oceanography-photography/' + gallery.folder + '/catalog.json'
        }).then((response) => {
          let items = [];
          for (var i = 0; i < response.result.length; i++) {
            const item = response.result[i];
            items.push({'index': i, 'id': item.id, 'title': item.title, 'location': item.location, 'date': item.date,
              'width': item.width, 'height': item.height, 'comment': item.comment || '', 'folder': gallery.folder,
              'src': imageUrlBase + gallery.folder + '/' + item.id + '.jpeg'});
          }
          this.setCatalog(galleries, gallery.name, items);
          this.setState({numCatalogs: this.state.numCatalogs + 1});
          if (galleries.length === this.state.numCatalogs) {
            this.setState({galleries: galleries});
          }
        }, (reason) => {
          console.log('Catalog error: ' + reason.result.error.message);
        })
      }
    }, (reason) => {
      console.log('Galleries error: ' + reason.result.error.message);
    });
  };


  componentDidMount() {
    // console.log('Call getSigned');
    // this.signedUrl('papaya').then((response) => {response.text().then((text) => console.log('Have signed Url: ' + text))});
    // console.log('Called getSigned');

    if (this.useSignedUrls) {
      // We can just use 'fetch()' with the signed urls
      this.fetchGalleries();
    } else {
    // Loads the JavaScript client library and invokes `start` afterwards.
      gapi.load('client', this.start);
    }
  } 

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path='/image'>
              <ImageView galleries={this.state.galleries}/>
            </Route>
            <Route path='/'>
              <MainNav galleries={this.state.galleries}/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
