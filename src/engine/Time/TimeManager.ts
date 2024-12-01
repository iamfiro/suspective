class TimeManager {
    private static instance: TimeManager;
    private currentTime: Date;
    private timeScale: number;
    private isPaused: boolean;
    private timeUpdateCallbacks: ((time: Date) => void)[];
    private intervalId: number | null;

    private constructor() {
        this.currentTime = new Date();
        this.timeScale = 60; // 1초당 1분 (기본값)
        this.isPaused = false;
        this.timeUpdateCallbacks = [];
        this.intervalId = null;
    }

    public static getInstance(): TimeManager {
        if (!TimeManager.instance) {
            TimeManager.instance = new TimeManager();
        }
        return TimeManager.instance;
    }

    // 시간 시스템 시작
    public start(): void {
        if (this.intervalId === null) {
            // 시작하기 전에 현재 시간이 유효한지 확인
            if (!(this.currentTime instanceof Date) || isNaN(this.currentTime.getTime())) {
                console.error('Invalid current time when starting TimeManager');
                this.currentTime = new Date(); // 안전하게 현재 시간으로 리셋
            }

            this.intervalId = window.setInterval(() => {
                if (!this.isPaused) {
                    // timeScale에 따라 시간 업데이트
                    const newTime = new Date(this.currentTime.getTime() + (1000 * this.timeScale));

                    // 새로운 시간이 유효한지 확인
                    if (!isNaN(newTime.getTime())) {
                        this.currentTime = newTime;
                        // 콜백 실행
                        this.timeUpdateCallbacks.forEach(callback => callback(this.currentTime));
                    }
                }
            }, 1000);
        }
    }

    // 시간 시스템 정지
    public stop(): void {
        if (this.intervalId !== null) {
            window.clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    // 시간 일시정지
    public pause(): void {
        this.isPaused = true;
    }

    // 시간 재개
    public resume(): void {
        this.isPaused = false;
    }

    // 현재 시간 설정
    public setTime(time: Date): void {
        this.currentTime = new Date(time);
        this.timeUpdateCallbacks.forEach(callback => callback(this.currentTime));
    }

    // 시간 흐름 속도 설정 (1.0 = 실제 시간, 2.0 = 2배 빠름, 0.5 = 절반 속도)
    public setTimeScale(scale: number): void {
        this.timeScale = Math.max(0, scale);
    }

    // 현재 시간 가져오기
    public getCurrentTime(): Date {
        return new Date(this.currentTime);
    }

    public getCurrentDay(): string {
        return ['일', '월', '화', '수', '목', '금', '토'][this.currentTime.getDay()];
    }

    public getCurrentDayIndex(): number {
        return this.currentTime.getDay();
    }

    // 시간 업데이트 콜백 등록
    public onTimeUpdate(callback: (time: Date) => void): () => void {
        this.timeUpdateCallbacks.push(callback);

        // 콜백 제거 함수 반환
        return () => {
            this.timeUpdateCallbacks = this.timeUpdateCallbacks.filter(cb => cb !== callback);
        };
    }

    // 포맷팅된 시간 문자열 반환
    public getFormattedTime(format: 'HH:mm' | 'MM월 DD일 dddd' | 'YYYY년 MM월 DD일'): string {
        const year = this.currentTime.getFullYear();
        const month = this.currentTime.getMonth() + 1;
        const date = this.currentTime.getDate();
        const hours = this.currentTime.getHours();
        const minutes = this.currentTime.getMinutes();

        const day = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][this.currentTime.getDay()];

        switch (format) {
            case 'HH:mm':
                return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            case 'MM월 DD일 dddd':
                return `${month}월 ${date}일 ${day}`;
            case 'YYYY년 MM월 DD일':
                return `${year}년 ${month}월 ${date}일`;
            default:
                return '';
        }
    }
}

export default TimeManager;