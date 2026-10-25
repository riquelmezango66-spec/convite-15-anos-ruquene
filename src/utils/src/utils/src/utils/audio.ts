class AmbientMusicController {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;

  private notes = [293.66, 329.63, 369.99, 440.0, 493.88, 554.37, 587.33, 659.25, 739.99, 880.0];
  private sequence = [
    [0, 2, 4],
    [2, 4, 6],
    [3, 5, 7],
    [1, 3, 5],
    [0, 4, 7],
    [2, 6, 8],
    [4, 7, 9],
    [2, 5, 8],
  ];
  private step = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, delaySec: number = 0, duration: number = 2.4) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delaySec);

    const startTime = this.ctx.currentTime + delaySec;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.2, startTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  public play() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    const playNextChord = () => {
      if (!this.isPlaying || !this.ctx) return;
      const chordIndices = this.sequence[this.step % this.sequence.length];
      this.step++;

      chordIndices.forEach((idx, i) => {
        const freq = this.notes[idx % this.notes.length];
        this.playTone(freq, i * 0.28, 2.8);
      });

      this.timer = window.setTimeout(playNextChord, 2200);
    };

    playNextChord();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }
}

export const ambientMusic = new AmbientMusicController();
