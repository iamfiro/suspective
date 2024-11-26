import {ColorRGB} from "./type";

export function hexToRgb(hex: string): ColorRGB {
    const removedCrossHatch = hex.replace('#', '');
    return {
        r: parseInt(removedCrossHatch.slice(0, 2), 16),
        g: parseInt(removedCrossHatch.slice(2, 4), 16),
        b: parseInt(removedCrossHatch.slice(4, 6), 16),
    }
}