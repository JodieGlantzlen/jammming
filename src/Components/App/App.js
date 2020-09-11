import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'name1',
          artist: 'artist1',
          album: 'album1',
          id: 1,
        },
        {
          name: 'name2',
          artist: 'artist2',
          album: 'album2',
          id: 2,
        },
        {
          name: 'name3',
          artist: 'artist3',
          album: 'album3',
          id: 3,
        },
      ],
      playlistName: 'Cool Playlist',
      playlistTracks: [
        {
          name: 'pName1',
          artist: 'pArtist1',
          album: 'pAlbum1',
          id: 4,
        },
        {
          name: 'pName2',
          artist: 'pArtist2',
          album: 'pAlbum2',
          id: 5,
        },
        {
          name: 'pName3',
          artist: 'pArtist3',
          album: 'pAlbum3',
          id: 6,
        },
      ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let pTracks = this.state.playlistTracks;
    if (pTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    pTracks.push(track);
    this.setState({ playlistTracks: pTracks });
  }

  removeTrack(track) {
    let pTracks = this.state.playlistTracks;
    pTracks = pTracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ playlistTracks: pTracks });
  }

  updatePlaylistName(newName) {
    this.setState({ playlistName: newName });
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
  }

  search(term) {
    Spotify.search(term).then(results => {
      this.setState({searchResults: results});
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    )
  }
}


export default App;
