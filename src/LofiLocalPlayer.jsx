import { useRef, useState } from 'react';

const LofiLocalPlayer = () => {
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25); // Start at 25%

  const startMusic = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    audioRef.current.play();
    setPlaying(true);
    setStarted(true);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleVolumeChange = (e) => {
    const vol = parseInt(e.target.value) / 100;
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  return (
   <div className="lofi-player" style={{ textAlign: 'center' }}>
    <audio ref={audioRef} loop src={`${import.meta.env.BASE_URL}lofi.mp3`} />

    <button
      className="lofi-button"
      onClick={started ? togglePlay : startMusic}
    >
      {!started
        ? '🎵 Play Music'
        : playing
          ? '🔇 Pause Music'
          : '🔊 Play Music'}
    </button>

    <div
      className={`volume-slider ${started ? 'visible' : ''}`}
      style={{ marginTop: '0.5em' }}
      aria-hidden={!started}
    >
      <span>🔉</span>
      <input
        type="range"
        min="0"
        max="100"
        value={volume * 100}
        onChange={handleVolumeChange}
        tabIndex={started ? 0 : -1}
        aria-label="Music volume"
      />
    </div>
  </div>
  );
};

export default LofiLocalPlayer;
