import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      volume: 0.80,
      duration: album.songs[0].duration,
      isPlaying: false,
    };


    this.audioElement = document.createElement('audio');
    this.audioElement.src = `.${album.songs[0].audioSrc}`;
  }

  componentDidMount() {
    this.eventListener = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumechange: e => {
        this.setState({ volume: this.audioElement.volume });
      },
    };
    this.audioElement.addEventListener('timeupdate', this.eventListener.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListener.durationchange);
    this.audioElement.addEventListener('volumechange', this.eventListener.volumechange);

  }


  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListener.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListener.durationchange);
    this.audioElement.removeEventListener('volumechange', this.eventListener.volumechange);
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  formatTime(timeInSeconds) {
    let minutes = Math.floor(timeInSeconds / 60);
    let seconds = Math.floor(timeInSeconds - (minutes * 60));

    if(!timeInSeconds) { return "-:--" }

    minutes = minutes < 10 ? "0" + minutes: minutes;
    seconds = seconds < 10 ? "0" + seconds: seconds;

    return minutes + ":" + seconds;
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if(this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if(!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex -1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = currentIndex +1;
    const newSong = this.state.album.songs[newIndex];
    if(newIndex > this.state.album.songs.length -1) {return}
    this.setSong(newSong);
    this.play(newSong);
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });
  }

  render() {
    return(
      <section className="album">
      <div className="card">
        <div  id="album-info">
          <div className="album-details">
            <p className="album-title" id="album-title">{this.state.album.title}</p>
            <p className="artist">{this.state.album.artist}</p>
            <p className="label-info" id="release-info">{this.state.album.releaseInfo}</p>
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <img src={`.${this.state.album.albumCover}`} alt={this.state.album.slug}/>
          </div>
          <div className="six columns">
            <table id="song-list">
              <colgroup>
                <col id="song-number-column" />
                <col id="song-title-column" />
                <col id="song-duration-column" />
              </colgroup>
              <tbody>
                {
                  this.state.album.songs.map( (song, index) =>
                <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                  <td className="song-actions">
                    <button>
                        <span className="song-number" >{ index +1 }</span>
                        <span className={ this.state.currentSong === song ? (this.state.isPlaying ? "ion-pause" : "ion-play") : "ion-play" }></span>
                    </button>
                  </td>
                  <td className="song-title">{song.title}</td>
                  <td className="song-duration">{this.formatTime(song.duration)}</td>
                </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          volume={this.state.volume}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          handleTimeChange={(e) => this.handleTimeChange(e)}
          formatTime={(timeInSeconds) => this.formatTime(timeInSeconds)}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}
        />
      </section>
    );
  }
}

//{ !this.state.isPlaying ? ( this.state.isMouseInside ? <span className="ion-play"></span> : <span>{ index + 1 }</span> ) : <span className="ion-pause"></span> }
//this.state.isPlaying ? "ion-pause" : "ion-play"
export default Album;
