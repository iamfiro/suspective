import { useEffect, useState, useRef } from 'react';
import style from '../../../styles/scene/macbook/bootScreen.module.scss';
import MacLogo from '../../../../public/images/macbook/apple_logo.svg';
import { useScene } from '../../../engine/scene/sceneManager';
import SoundManager from "../../../engine/sound/soundManager.ts";

export const MacBootScreen = () => {
    const { navigate } = useScene();
    const [progress, setProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);
    const animationRef = useRef<number>();
    const logoRef = useRef<HTMLImageElement>(null);

    // 배경 효과음
    useEffect(() => {
        const soundManager = SoundManager.getInstance();
        soundManager.loadSound('mac_startup', '/sounds/macbook/startup.mp3');

        // 1초 뒤에 재생
        setTimeout(() => {
            soundManager.playSFX('mac_startup');
        }, 1000);

        return () => soundManager.stopBGM();
    }, []);

    // 애플 로고 까꿍!
    useEffect(() => {
        setTimeout(() => {
            if (logoRef.current) {
                logoRef.current.style.opacity = '1';
            }
            // 효과음과 로고 애니메이션을 동기화 하기 위해 1.2초 뒤에 재생
        }, 1200);
    }, []);

    // Progress bar animation with 3-second delay
    useEffect(() => {
        const soundManager = SoundManager.getInstance();

        // Start the progress animation after 3 seconds
        const progressDelay = setTimeout(() => {
            setShowProgress(true);
            soundManager.playSFX('startup');

            let lastTimestamp = performance.now();
            let currentProgress = 0;

            const animate = (timestamp: number) => {
                const deltaTime = timestamp - lastTimestamp;
                lastTimestamp = timestamp;

                // 진행 속도를 랜덤하게 변화
                const speedMultiplier = Math.random() * 0.2 + 0.01; // 0.1 ~ 0.6
                const increment = (deltaTime / 1000) * speedMultiplier * 100; // 초당 10~60% 진행

                // 특정 구간에서 일시 정지하는 효과
                const shouldPause = Math.random() < 0.1 && currentProgress < 95; // 10% 확률로 일시 정지

                if (!shouldPause) {
                    currentProgress = Math.min(currentProgress + increment, 100);
                    setProgress(currentProgress);
                }

                if (currentProgress < 100) {
                    animationRef.current = requestAnimationFrame(animate);
                } else {
                    setTimeout(() => {
                        navigate('/login');
                    }, 500);
                }
            };

            animationRef.current = requestAnimationFrame(animate);
        }, 3000);

        return () => {
            clearTimeout(progressDelay);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [navigate]);

    return (
        <main className={style.container}>
            <img
                src={MacLogo}
                alt="Apple Logo"
                className={style.logo}
                ref={logoRef}
                style={{opacity: 0}}
            />
            {showProgress && (
                <div className={style.progress}>
                    <div
                        className={style.bar}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}
        </main>
    );
};

export default MacBootScreen;