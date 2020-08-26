import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import ImageLoader from './Image'

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
    return(
      <section className="library">
        {
          this.state.albums.map( (album, index) =>
            <Link className="card" to={`/album/${album.slug}`} key={index}>
              <p className="library-title">{album.title}</p>
              <ImageLoader 
                src={album.albumCover}
                alt={album.title}
              />
              <div>{album.artist}</div>
              <div>{album.songs.length} songs</div>
            </Link>
          )
        }
      </section>
    );
  }
}

export default Library;


// <img src={album.albumCover} alt={album.title} />