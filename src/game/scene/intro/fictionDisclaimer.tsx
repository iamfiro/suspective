import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import style from '../../../styles/scene/fictionDisclaimer.module.scss';
import {useScene} from "../../../engine/scene/sceneManager.tsx";

const FictionDisclaimer = () => {
    const containerRef = useRef(null);
    const paragraphRefs = useRef<HTMLDivElement[]>([]);
    const {navigate} = useScene();

    useEffect(() => {

        // Create the animation timeline
        const tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.out" }});

        // Set initial state
        gsap.set(paragraphRefs.current, { opacity: 0, y: 20 });

        // Animate each paragraph with a 0.5s delay between them
        paragraphRefs.current.forEach((p, index) => {
            tl.to(p, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                delay: index === 0 ? 0 : 1
            }, index === 0 ? 0 : '>');
        });
    }, []);

    const addToRefs = (el: HTMLDivElement) => {
        if (el && !paragraphRefs.current.includes(el)) {
            paragraphRefs.current.push(el);
        }
    };

    const pressSpace = (e: KeyboardEvent) => {
        if (e.code === 'Space') {
            navigate('/welcomeToStation');
        }
    };

    // Space 이벤트 핸들러 등록
    useEffect(() => {
        window.addEventListener('keydown', pressSpace);
        return () => window.removeEventListener('keydown', pressSpace);
    }, []);

    return (
        <main className={style.container} ref={containerRef}>
            <p className={style.content} ref={addToRefs}>
                본 게임에 등장하는 모든 인물, 사건, 장소 및 상황은 모두 허구이며, 실제 인물이나 사건과의 유사성은 우연의 일치일 뿐, 어떠한 의도성도 없음을 밝힙니다<br/>
                본 게임에서 다루는 범죄, 사건 및 수사 과정은 오직 극적 효과를 위해 구성된 것으로, 실제 수사 절차나 법적 절차와는 차이가 있으며, 범죄를 미화하거나 옹호하지 않습니다
            </p>
            <p className={style.content} ref={addToRefs}>
                THE SUPECT는 실시간 추리 게임으로 플레이어는 게임 내에서 제시되는 단서를 토대로 범인을 찾아내는 것이 목적입니다<br/>
                매 턴마다 인공지능으로 생성되는 사건을 토대로 범인을 추리하고, 다른 사람들보다 먼저 범인을 찾아내세요
            </p>
            <p className={style.content} ref={addToRefs}>
                좌호빈 화이팅
            </p>
            <div className={style.nextKey}>
                <div className={style.key}>
                    SPACE
                </div>
                <span className={style.nextKeyText}>SPACE를 눌러 다음</span>
            </div>
        </main>
    );
};

export default FictionDisclaimer;