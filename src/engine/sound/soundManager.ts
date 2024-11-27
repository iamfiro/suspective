class SoundManager {
    private static instance: SoundManager;
    private sounds: Map<string, HTMLAudioElement>;
    private musicVolume: number;
    private sfxVolume: number;
    private currentBGM: HTMLAudioElement | null;

    private constructor() {
        this.sounds = new Map();
        this.musicVolume = 1.0;
        this.sfxVolume = 1.0;
        this.currentBGM = null;
    }

    public static getInstance(): SoundManager {
        if (!SoundManager.instance) {
            SoundManager.instance = new SoundManager();
        }
        return SoundManager.instance;
    }

    // 사운드 로드
    public loadSound(key: string, path: string): void {
        const audio = new Audio(path);
        audio.load();
        this.sounds.set(key, audio);
    }

    // 효과음 재생
    public playSFX(key: string): void {
        const sound = this.sounds.get(key);
        if (sound) {
            sound.volume = this.sfxVolume;
            sound.currentTime = 0;
            sound.play().catch(error => console.error('SFX 재생 실패:', error));
        }
    }

    // 배경음악 재생
    public playBGM(key: string, loop: boolean = true): void {
        // 현재 재생 중인 BGM이 있다면 중지
        if (this.currentBGM) {
            this.currentBGM.pause();
            this.currentBGM.currentTime = 0;
        }

        const music = this.sounds.get(key);
        if (music) {
            music.volume = this.musicVolume;
            music.loop = loop;
            music.play().catch(error => console.error('BGM 재생 실패:', error));
            this.currentBGM = music;
        }
    }

    // BGM 정지
    public stopBGM(): void {
        if (this.currentBGM) {
            this.currentBGM.pause();
            this.currentBGM.currentTime = 0;
        }
    }

    // BGM 일시정지
    public pauseBGM(): void {
        if (this.currentBGM) {
            this.currentBGM.pause();
        }
    }

    // BGM 재개
    public resumeBGM(): void {
        if (this.currentBGM) {
            this.currentBGM.play().catch(error => console.error('BGM 재개 실패:', error));
        }
    }

    // BGM 볼륨 설정
    public setMusicVolume(volume: number): void {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        if (this.currentBGM) {
            this.currentBGM.volume = this.musicVolume;
        }
    }

    // 효과음 볼륨 설정
    public setSFXVolume(volume: number): void {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
    }

    // 모든 사운드 제거
    public clearSounds(): void {
        this.stopBGM();
        this.sounds.clear();
    }
}

export default SoundManager;