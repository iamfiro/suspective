import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import style from './programBootScreen.module.scss';

const ProgramBootScreen = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const messageRef = useRef<HTMLDivElement>(null);
    const [currentMessage, setCurrentMessage] = useState<string>("");

    useEffect(() => {
        const messages = [
            "시스템 초기화 중...",
            "보안 프로토콜 확인 중...",
            "인트라넷 연결 중...",
            "연결 완료. 프로그램 로딩 중...",
        ];

        // 메시지 전환 애니메이션
        const animateMessage = (msg: string) => {
            const tl = gsap.timeline();

            if (messageRef.current) {
                // 현재 메시지를 위로 올리면서 페이드아웃
                tl.to(messageRef.current, {
                    y: -30,
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        setCurrentMessage(msg);
                    }
                })
                    // 새 메시지를 아래에서 위로 올리면서 페이드인
                    .fromTo(messageRef.current,
                        {
                            y: 30,
                            opacity: 0
                        },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.3
                        }
                    );
            }
        };

        // 메시지 순차 표시
        messages.forEach((msg, i) => {
            setTimeout(() => {
                animateMessage(msg);
            }, 1000 + (i * 2800));
        });

        const mainTl = gsap.timeline({
            defaults: {
                ease: 'power2.inOut',
            },
            delay: 1
        });

        // Initial state
        if (logoRef.current) {
            gsap.set(logoRef.current, {
                scale: 0.8,
                opacity: 0,
                filter: 'blur(10px)'
            });
        }

        // Handle text children animation setup
        const textChildren = textRef.current?.children;
        if (textChildren && textChildren.length > 0) {
            gsap.set(Array.from(textChildren), {
                opacity: 0,
                y: 20
            });
        }

        // Main animation sequence
        if (logoRef.current) {
            mainTl.to(logoRef.current, {
                duration: 1.5,
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
            })
                .to(logoRef.current, {
                    duration: 0.8,
                    y: -20,
                    yoyo: true,
                    repeat: -1,
                });
        }

        // Animate text children
        if (textChildren && textChildren.length > 0) {
            mainTl.to(Array.from(textChildren), {
                duration: 0.6,
                opacity: 1,
                y: 0,
                stagger: 0.2,
            }, '-=1.8');
        }

        return () => {
            mainTl.kill();
        };
    }, []);

    return (
        <div ref={containerRef} className={style.container}>
            <img
                ref={logoRef}
                className={style.logo}
                src="/images/us_police_logo.svg"
                alt="Program Boot Screen"
            />
            <div ref={textRef} className={style.content}>
                <div className={style.messageContainer}>
                    <div ref={messageRef} className={style.systemMessage}>
                        {currentMessage}
                    </div>
                </div>
                <span className={style.description}>잠시만 기다려주세요</span>
            </div>
        </div>
    );
};

export default ProgramBootScreen;