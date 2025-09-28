import './MusicItem.css';

const MusicItem = ({ music, displayType}) => {
    return(
        <div className={`music-item ${displayType === 'tile' ? 'tile' : 'list'}`}>
            <img
                src={music.album.cover_medium}
                alt={music.title}
                className="music-poster"
            />
            <div className="music-info">
                {/* <h3 className="music-title">{music.Title}</h3>
                <p className="music-year">{music.Year}</p>
                <p className="music-type">{music.Type}</p> */}
                <h3 className="music-title">{music.title}</h3>
                <p className="music-artist">{music.artist.name}</p>
                <p className="music-album">{music.album.title}</p>
                <p className="music-duration">{Math.floor(music.duration / 60)}:{(music.duration % 60).toString().padStart(2, '0')}</p>
            </div>
        </div>
    )
}

export default MusicItem;