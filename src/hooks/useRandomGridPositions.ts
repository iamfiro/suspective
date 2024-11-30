import { useMemo } from 'react';

interface GridConfig {
    gridSize?: number;
    padding?: number;
    menuBarHeight?: number;
    widgetWidth?: number;
}

interface Position {
    x: number;
    y: number;
}

export const useRandomGridPositions = (itemCount: number, config?: GridConfig) => {
    const {
        gridSize = 100,
        padding = 20,
        menuBarHeight = 30,
        widgetWidth = 300
    } = config || {};

    return useMemo(() => {
        const positions = new Set<string>();
        const gridPositions: Position[] = [];

        const availableColumns = Math.floor((window.innerWidth - widgetWidth - padding * 2) / gridSize);
        const availableRows = Math.floor((window.innerHeight - padding * 2 - menuBarHeight) / gridSize);
        const minX = widgetWidth + padding;

        for (let i = 0; i < itemCount; i++) {
            let position: string;
            let x: number;
            let y: number;

            do {
                x = Math.floor(Math.random() * availableColumns) * gridSize + minX;
                y = Math.floor(Math.random() * availableRows) * gridSize + padding + menuBarHeight;
                position = `${x},${y}`;
            } while (positions.has(position));

            positions.add(position);
            gridPositions.push({ x, y });
        }

        return gridPositions;
    }, [itemCount, config?.gridSize, config?.padding, config?.menuBarHeight, config?.widgetWidth]);
};