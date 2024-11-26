import {ColorRGB} from "./type";

type ColorStartEnd = {start: string, end: string}

export function morphColorByStep(startColor: string, endColor: string, step: number) {
    // Hex 컬러의 # 부분을 지우기 위해
    const removedCrossHatch: ColorStartEnd = {
        start: startColor.replace('#', ''),
        end: endColor.replace('#', '')
    }

    // Start, End Color의 hex값을 slice 함수를 사용하여 RGB 값으로 추출
    const startColorRGB: ColorRGB = {
        r: parseInt(removedCrossHatch.start.slice(0, 2), 16), // 1,3을 0,2로 수정
        g: parseInt(removedCrossHatch.start.slice(2, 4), 16), // 3,5를 2,4로 수정
        b: parseInt(removedCrossHatch.start.slice(4, 6), 16), // 5,7을 4,6으로 수정
    }

    const endColorRGB: ColorRGB = {
        r: parseInt(removedCrossHatch.end.slice(0, 2), 16),
        g: parseInt(removedCrossHatch.end.slice(2, 4), 16),
        b: parseInt(removedCrossHatch.end.slice(4, 6), 16),
    }

    const morphedColorRGB: ColorRGB = {
        r: Math.round(startColorRGB.r + (endColorRGB.r - startColorRGB.r) * step),
        g: Math.round(startColorRGB.g + (endColorRGB.g - startColorRGB.g) * step),
        b: Math.round(startColorRGB.b + (endColorRGB.b - startColorRGB.b) * step),
    }

    return {
        rgb: {
            r: morphedColorRGB.r,
            g: morphedColorRGB.g,
            b: morphedColorRGB.b
        },
        hex: `#${morphedColorRGB.r.toString(16).padStart(2, '0')}${morphedColorRGB.g.toString(16).padStart(2, '0')}${morphedColorRGB.b.toString(16).padStart(2, '0')}`
    };
}