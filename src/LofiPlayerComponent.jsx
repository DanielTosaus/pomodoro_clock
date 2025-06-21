import { useRef, useState } from 'react';
import YouTube from 'react-youtube';

const LofiPlayer = () => {
  const playerRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(25); // Low initial volume

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      mute: 1,       // ✅ Start muted
      loop: 1,
      playlist: 'NvftPSb5Xtw',
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;
    playerRef.current.setVolume(volume);
  };

  const startMusic = () => {
    if (!playerRef.current) return;
    playerRef.current.unMute();
    playerRef.current.playVideo();
    setPlaying(true);
    setStarted(true);
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
    <div className="lofi-player fade-in">
      <YouTube videoId="NvftPSb5Xtw" opts={opts} onReady={onReady} />
      
      {!started ? (
        <button className="lofi-button" onClick={startMusic}>
          🎵 Play Music
        </button>
      ) : (
        <>
          <button className="lofi-button" onClick={togglePlay}>
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
        </>
      )}
    </div>
  );
};

export default LofiPlayer;
