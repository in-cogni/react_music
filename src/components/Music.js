import './Music.css';

function Music(props)
{
    const { title, artist, album, duration } = props.music;
    return(
        <div className='card'>
            <img src={album.cover_medium} alt={title}/>
            <div>
                <h3>{title}</h3>
                <h2>{artist.name}</h2>
                <p>{album.title} • {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}</p>
            </div>
        </div>
    )
}

export default Music;