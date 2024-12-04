// ScrollingFooter.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import style from './marque.module.scss';

interface HorizontalLoopConfig {
    repeat: number;
    speed: number;
    snap: boolean;
    paddingRight: number;
}

interface TextRefs extends HTMLSpanElement {
    offsetWidth: number;
}

const horizontalLoop = (items: TextRefs[], config: HorizontalLoopConfig) => {
    const tl = gsap.timeline({
        repeat: config.repeat,
        defaults: { ease: "none" }
    });

    const length = items.length;
    const startX = items[0].offsetLeft;
    const widths: number[] = [];
    const xPercents: number[] = [];
    const pixelsPerSecond = (config.speed || 1) * 100;

    gsap.set(items, {
        xPercent: (i: number, el: Element): number => {
            const w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
            xPercents[i] = (parseFloat(gsap.getProperty(el, "x", "px") as string) / w * 100) + (gsap.getProperty(el, "xPercent") as number);
            return xPercents[i];
        }
    });

    gsap.set(items, { x: 0 });

    const totalWidth = items[length - 1].offsetLeft +
        xPercents[length - 1] / 100 * widths[length - 1] -
        startX +
        items[length - 1].offsetWidth * (gsap.getProperty(items[length - 1], "scaleX") as number) +
        (config.paddingRight || 0);

    items.forEach((item, i) => {
        const curX = xPercents[i] / 100 * widths[i];
        const distanceToStart = item.offsetLeft + curX - startX;
        const distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number);

        tl.to(item, {
            xPercent: ((curX - distanceToLoop) / widths[i] * 100),
            duration: distanceToLoop / pixelsPerSecond
        }, 0)
            .fromTo(item,
                { xPercent: ((curX - distanceToLoop + totalWidth) / widths[i] * 100) },
                {
                    xPercent: xPercents[i],
                    duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                    immediateRender: false
                },
                distanceToLoop / pixelsPerSecond
            );
    });

    return tl;
};

interface ScrollingFooterProps {
    text: string;
}

const MarqueeFooter: React.FC<ScrollingFooterProps> = ({ text }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<Array<TextRefs | null>>([]);

    useEffect(() => {
        if (!containerRef.current || !textRefs.current[0] || !textRefs.current[1]) return;

        const items = textRefs.current.filter((item): item is TextRefs => item !== null);
        const tl = horizontalLoop(items, {
            repeat: -1,
            speed: 1,
            snap: false,
            paddingRight: 50
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <footer className={style.accessorDataFooter}>
            <div className={style.warningTape}></div>
            <div ref={containerRef} className={style.textContainer}>
                <span style={{opacity: 0.6}} ref={el => textRefs.current[0] = el}>{text}</span>
                <span style={{opacity: 0.6}} ref={el => textRefs.current[1] = el}>{text}</span>
            </div>
            <div className={`${style.warningTape} ${style.bottom}`}></div>
        </footer>
    );
};

export default MarqueeFooter;
