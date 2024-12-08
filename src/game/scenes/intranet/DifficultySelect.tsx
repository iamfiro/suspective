import {useEffect, useRef, useState} from 'react';
import {useScene } from '../../../engine/scene/sceneManager';
import style from '../../../styles/scene/intranet/difficultySelect.module.scss';
import Logo from '../../../../public/images/us_police_logo.svg';
import { gsap } from 'gsap';

interface DifficultyOption {
    id: string;
    label: string;
    description: string;
    image: string;
}

const DifficultySelect = () => {
    const { navigate } = useScene();
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
    const [mousePosition, setMousePosition] = useState<{ [key: string]: { x: string; y: string } }>({});
    // Refs
    const logoRef = useRef<HTMLImageElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<HTMLDivElement>(null);

    const difficulties: DifficultyOption[] = [
        {
            id: 'easy',
            label: 'ROOKIE',
            description: '수사 힌트가 자주 제공되며, 실수에 대한 패널티가 적습니다.',
            image: '/images/intro/difficulty/easy.jpg'
        },
        {
            id: 'normal',
            label: 'DETECTIVE',
            description: '균형 잡힌 난이도로 일반적인 수사 경험을 제공합니다.',
            image: '/images/intro/difficulty/normal.jpg'
        },
        {
            id: 'hard',
            label: 'INSPECTOR',
            description: '제한된 힌트와 높은 패널티로 도전적인 수사를 진행합니다.',
            image: '/images/intro/difficulty/hard.jpg'
        }
    ];

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, difficultyId: string) => {
        if (selectedDifficulty) return; // 선택 후에는 마우스 이펙트 비활성화

        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / card.offsetWidth) * 100;
        const y = ((e.clientY - rect.top) / card.offsetHeight) * 100;

        setMousePosition(prev => ({
            ...prev,
            [difficultyId]: { x: `${x}%`, y: `${y}%` }
        }));
    };

    const handleDifficultySelect = (difficultyId: string) => {
        if (selectedDifficulty) return; // 이미 선택된 경우 중복 선택 방지

        setSelectedDifficulty(difficultyId);

        // 선택되지 않은 카드들 페이드 아웃
        difficulties.forEach((difficulty) => {
            if (difficulty.id !== difficultyId) {
                gsap.to(`.${style.difficultyCard}[data-difficulty="${difficulty.id}"]`, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });

        // 선택된 카드 애니메이션
        gsap.timeline()
            .to(`.${style.difficultyCard}[data-difficulty="${difficultyId}"]`, {
                scale: 1.05,
                duration: 0.5,
                ease: 'power2.out'
            })
            .to(animationRef.current, {
                opacity: 1,
                duration: 0.5,
                delay: 0.3,
                onComplete: () => {
                    navigate('/missionList');
                }
            });
    };

    // 초기 애니메이션
    useEffect(() => {
        gsap.fromTo(logoRef.current, {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
        });

        gsap.fromTo(titleRef.current, {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.3,
            ease: 'power2.out'
        });

        difficulties.forEach((difficulty, index) => {
            gsap.fromTo(`.${style.difficultyCard}[data-difficulty="${difficulty.id}"]`, {
                opacity: 0,
                y: 30
            }, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                delay: 0.5 + index * 0.2,
                ease: 'power2.out'
            });
        });
    }, []);

    return (
        <main ref={containerRef} className={style.container}>
            <div className={style.header}>
                <img ref={logoRef} src={Logo} className={style.logo} alt="Department Logo" />
                <h1 ref={titleRef} className={style.title}>게임 난이도를 선택하세요</h1>
            </div>

            <div className={style.content}>
                {difficulties.map((difficulty) => (
                    <div
                        key={difficulty.id}
                        className={`${style.difficultyCard} ${selectedDifficulty === difficulty.id ? style.selected : ''}`}
                        data-difficulty={difficulty.id}
                        onMouseMove={(e) => handleMouseMove(e, difficulty.id)}
                        onClick={() => handleDifficultySelect(difficulty.id)}
                        style={{opacity: 0}}
                    >
                        <div className={style.cardContent}>
                            <img
                                src={difficulty.image}
                                alt={difficulty.label}
                                className={style.difficultyImage}
                            />
                        </div>
                        <div className={style.cardInfo}>
                            <h2 className={style.cardTitle}>{difficulty.label}</h2>
                            <p className={style.cardDescription}>{difficulty.description}</p>
                        </div>
                        <div
                            className={`${style.glowEffect} ${mousePosition[difficulty.id] ? style.active : ''}`}
                            style={{
                                '--mouse-x': mousePosition[difficulty.id]?.x,
                                '--mouse-y': mousePosition[difficulty.id]?.y
                            } as React.CSSProperties}
                        />
                    </div>
                ))}
            </div>

            <div className={style.footer}>
                SYSTEM VERSION 2.1.4
                <br />
                © 1985 DEPARTMENT OF JUSTICE
            </div>
            {selectedDifficulty && (
                <div ref={animationRef} className={style.animation}/>
            )}
        </main>
    );
};

export default DifficultySelect;