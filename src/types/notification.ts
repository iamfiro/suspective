import { CSSProperties } from 'react';

export interface NotificationStyle {
    container?: CSSProperties;
    icon?: CSSProperties;
    appName?: CSSProperties;
    title?: CSSProperties;
    content?: CSSProperties;
}

export interface NotificationData {
    id: string;
    icon?: string;
    appName: string;
    title: string;
    content: string;
    duration?: number;
    style?: NotificationStyle;
    onClick?: () => void;
    glitch?: {
        text: string;
        interval: number;
        target: 'title' | 'content';
    };
}