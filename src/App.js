import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header>
          <nav className="row">
            <h1 className="offset-by-four four columns">SPUN</h1>
            <Link className="two columns" to='/'>Landing</Link>
            <Link className="two columns" to='/library'> Library</Link>
          </nav>
          
        </header>
        <main className="container">
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
        <footer><span>© Spun Inc. Seattle, WA USA</span></footer>
      </div>
    );
  }
}

export default App;
