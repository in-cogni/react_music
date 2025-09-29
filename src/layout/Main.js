import React from "react";
import Preloader from '../components/Preloader.js';
import MusicList from '../components/MusicList.js';
import Search from '../components/Search.js';
import './Main.css';

class Main extends React.Component {
    state = {musics:[], loading:false, type:"all", count:0, displayType:'list'}
    
    componentDidMount() {
        this.searchMusic("kate bush");
    }
    
   
    searchMusic = (str, type = 'all', page = 1) => {
    this.setState({loading:true});
    
    const limit = 10; // 5 треков на страницу
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(str.trim())}&media=music&entity=song&limit=200`; // Запрашиваем больше
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if(data.results && data.results.length > 0) {
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const pageTracks = data.results.slice(startIndex, endIndex);
            
            const tracks = pageTracks.map(track => ({
                id: track.trackId,
                title: track.trackName,
                artist: { name: track.artistName },
                album: { 
                    title: track.collectionName,
                    cover_medium: track.artworkUrl100.replace('100x100', '300x300')
                },
                duration: Math.floor(track.trackTimeMillis / 1000),
                preview: track.previewUrl
            }));
            
            const maxResults = Math.min(data.resultCount, 200);
            
            this.setState({
                musics: tracks, 
                loading:false, 
                count: maxResults
            });
        } else {
            this.setState({musics:[], loading:false, count:0});
        }
    })
    .catch(error => {
        console.error('Error:', error);
        this.setState({musics:[], loading:false, count:0});
    })
}
    
    handleDisplayChange = (type) => {
        this.setState({displayType: type});
    }
    
    render() {
        return(
            <div className="main">
                <div className="wrap">
                    <Search searchMusic={this.searchMusic} totalCount={this.state.count} onDisplayChange={this.handleDisplayChange}/>
                    {
                        !this.state.loading && this.state.musics.length ?
                        <MusicList 
                            displayType={this.state.displayType}
                            musics={this.state.musics}
                        />
                        : <Preloader/>
                    }
                </div>
            </div>
        )
    }
}

export default Main;