import MusicItem from './MusicItem';

const MusicList = ({musics, displayType='list'}) => {
    return(
        <div className={`music-container ${displayType === 'tile' ? 'tile-view' : 'list-view'}`}>
            {musics.map(music => (
                <MusicItem
                    key={music.id}
                    music={music}
                    displayType={displayType}
                />
            ))}
        </div>
    );
};

export default MusicList;