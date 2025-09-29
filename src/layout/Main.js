// import React from "react";
// import Preloader from '../components/Preloader.js';
// import MusicList from '../components/MusicList.js';
// import Search from '../components/Search.js';
// import './Main.css';

// class Main extends React.Component
// {
//     state = {musics:[], loading:false, type:"all", count:0, displayType:'list'}
//     componentDidMount()
//     {
//         this.setState({loading:true})
//         fetch(`/api/search?q=kate%20bush`)
//         .then(response => response.json())
//         .then 
//         (
//             data =>
//             {
//                 if(data.data && data.data.length > 0)this.setState({musics:data.data, loading:false, count:data.total});
//                 else this.setState({musics:[], loading:false, count:0});
//             }
//         )
//         .catch(error => {
//             console.error('Error fetching data:', error);
//             this.setState({musics:[], loading:false, count:0});
//         })
//     }
//     handleDisplayChange = (type) => {
//         this.setState({displayType: type});
//     }
//     searchMusic = (str, type = 'all', page) =>
//     {
//         this.setState({loading:true})
//         // fetch(`https://api.deezer.com/search?q=${str.trim()}${type !== 'all' ? `&type=${type}` : ''}${`&page=${page}`}`)
//         fetch(`/api/search?q=${encodeURIComponent(str.trim())}`)
//         .then(response => response.json())
//         .then 
//         (
//             data =>
//             {
//                 // if(data.Response === "True") this.setState({musics:data.Search, loading:false, count:data.totalResults});
//                 // else this.setState({musics:[], loading:false, count:data.totalResults});
//                 if(data.data && data.data.length > 0) {
//                     this.setState({
//                         musics: data.data, 
//                         loading:false, 
//                         count:data.total
//                     });
//                 } else {
//                     this.setState({musics:[], loading:false, count:0});
//                 }
//             }
//         )
//          .catch(error => {
//             console.error('Error searching:', error);
//             this.setState({musics:[], loading:false, count:0});
//         })
//     }
//     render()
//     {
//         return(
//             <div className="main">
//                 <div className="wrap">
//                     <Search searchMusic={this.searchMusic} totalCount={this.state.count} onDisplayChange={this.handleDisplayChange}/>
//                     {
//                         !this.state.loading && this.state.musics.length ?
//                         <MusicList 
//                         displayType={this.state.displayType}
//                         musics={this.state.musics}
//                         />
//                         :<Preloader/>
//                     }
//                 </div>
//             </div>
//         )
//     }
// }

// export default Main;
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
        
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(str.trim())}&media=music&entity=song&limit=20&offset=${(page-1)*20}`;
        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.results && data.results.length > 0) {
                const tracks = data.results.map(track => ({
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
                
                this.setState({
                    musics: tracks, 
                    loading:false, 
                    count: data.resultCount
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