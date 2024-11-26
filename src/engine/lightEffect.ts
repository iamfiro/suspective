import { RefObject } from "react";
import {morphColorByStep} from "../lib/color/morphColorByStep.ts";

// THREE.js Light 타입 정의
interface Light {
    color: {
        setHex: (hex: number) => void;
    };
}

// 패턴 정의를 위한 인터페이스
interface LightPattern {
    duration: number;
    colors: string[];
    timings: number[];
}

// 사전 정의된 패턴들
const patterns: Record<string, LightPattern> = {
    flicker: {
        duration: 1000,
        colors: ['#ffffff', '#000000', '#ffffff', '#000000', '#ffffff'],
        timings: [0, 100, 200, 300, 400]
    },
    pulse: {
        duration: 2000,
        colors: ['#ffffff', '#888888', '#444444', '#888888', '#ffffff'],
        timings: [0, 500, 1000, 1500, 2000]
    },
    strobe: {
        duration: 800,
        colors: ['#ffffff', '#000000', '#ffffff', '#000000'],
        timings: [0, 100, 200, 300]
    },
    fadeInOut: {
        duration: 3000,
        colors: ['#000000', '#ffffff', '#000000'],
        timings: [0, 1500, 3000]
    },
    rainbow: {
        duration: 3000,
        colors: ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ff0000'],
        timings: [0, 500, 1000, 1500, 2000, 2500, 3000]
    }
} as const;

type PatternName = keyof typeof patterns;

export class LightController {
    private lightRef: RefObject<Light>;
    private currentAnimation: number | null = null;
    private isAnimating: boolean = false;

    constructor(lightRef: RefObject<Light>) {
        this.lightRef = lightRef;
    }

    private setColor(hexColor: string): void {
        if (!this.lightRef?.current) return;
        const hexValue = parseInt(hexColor.replace('#', ''), 16);
        this.lightRef.current.color.setHex(hexValue);
    }

    private async animatePattern(pattern: LightPattern): Promise<void> {
        if (this.isAnimating) {
            this.stop();
        }

        this.isAnimating = true;
        const { duration, colors, timings } = pattern;

        // 각 색상에 대한 타이밍 애니메이션 설정
        timings.forEach((timing, index) => {
            this.currentAnimation = window.setTimeout(() => {
                this.setColor(colors[index]);
            }, timing);
        });

        // 애니메이션 완료 후 상태 초기화
        this.currentAnimation = window.setTimeout(() => {
            this.isAnimating = false;
            this.currentAnimation = null;
        }, duration);
    }

    public async smoothTransition(
        startColor: string,
        endColor: string,
        duration: number = 1000,
        steps: number = 30
    ): Promise<void> {
        if (this.isAnimating) {
            this.stop();
        }

        this.isAnimating = true;
        const stepDuration = duration / steps;

        for (let i = 0; i <= steps; i++) {
            if (!this.isAnimating) break;

            const step = i / steps;
            const color = morphColorByStep(startColor, endColor, step);

            await new Promise(resolve => setTimeout(resolve, stepDuration));
            this.setColor(color.hex);
        }

        this.isAnimating = false;
    }

    public randomFlicker(duration: number = 2000, minIntensity: number = 0): void {
        if (this.isAnimating) {
            this.stop();
        }

        this.isAnimating = true;
        const flickerCount = Math.floor(duration / 50);
        let currentTime = 0;

        for (let i = 0; i < flickerCount; i++) {
            if (!this.isAnimating) break;

            const randomIntensity = Math.random() * (1 - minIntensity) + minIntensity;
            const hexIntensity = Math.floor(randomIntensity * 255)
                .toString(16)
                .padStart(2, '0');
            const color = `#${hexIntensity}${hexIntensity}${hexIntensity}`;

            this.currentAnimation = window.setTimeout(() => {
                this.setColor(color);
            }, currentTime);

            currentTime += 50;
        }

        // 애니메이션 종료 후 원래 색상으로 복귀
        this.currentAnimation = window.setTimeout(() => {
            this.setColor('#ffffff');
            this.isAnimating = false;
            this.currentAnimation = null;
        }, duration);
    }

    public playPattern(patternName: PatternName): void {
        const pattern = patterns[patternName];
        if (!pattern) {
            throw new Error(`Pattern "${patternName}" not found`);
        }
        this.animatePattern(pattern);
    }

    public stop(): void {
        this.isAnimating = false;
        if (this.currentAnimation) {
            window.clearTimeout(this.currentAnimation);
            this.currentAnimation = null;
        }
        this.setColor('#ffffff'); // 기본 색상으로 리셋
    }
}

// 사용 예시를 위한 래퍼 함수
const createLightAnimation = (lightRef: RefObject<Light>) => {
    return new LightController(lightRef);
};

export type { Light, LightPattern, PatternName };
export { createLightAnimation, patterns };

// 기존 함수를 새로운 시스템으로 대체
const chandlerLightUpdate = (lightRef: RefObject<Light>): void => {
    const controller = createLightAnimation(lightRef);
    controller.playPattern('flicker');

    // 다른 패턴 예시:
    // controller.playPattern('rainbow');
    // controller.randomFlicker(2000, 0.2);
    // controller.smoothTransition('#ffffff', '#000000', 1000);
};

export default chandlerLightUpdate;