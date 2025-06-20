import { useRef, useState } from 'react';
import YouTube from 'react-youtube';

const LofiPlayer = () => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(25); // start with low volume

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: 'NvftPSb5Xtw', // needed for looping
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;
    playerRef.current.setVolume(volume);
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setPlaying(!playing);
  };

  const handleVolumeChange = (e) => {
    const vol = parseInt(e.target.value);
    setVolume(vol);
    if (playerRef.current) {
      playerRef.current.setVolume(vol);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <YouTube videoId="NvftPSb5Xtw" opts={opts} onReady={onReady} />
      <button onClick={togglePlay} style={{ marginTop: '1em' }}>
        {playing ? '🔇 Pause Music' : '🔊 Play Music'}
      </button>
        <div className="volume-slider">
        <span>🔉</span>
        <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
        />
        </div>
    </div>
  );
};

export default LofiPlayer;
