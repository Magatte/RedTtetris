import React from 'react';
import Sound from 'react-sound';
import soundfile from '../sounds/delete.mp3';

const Music = (props) => {
    return (
        <Sound
            url={props.track}
            playStatus={Sound.status.PLAYING}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
        />
    );
}

export default Music;