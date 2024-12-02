import { useEffect, useState } from 'react';
import style from './style.module.scss';
import {NotificationData} from "../../../../types/notification.ts";
import {createGlitchText} from "../../../../lib/createGlitchText.ts";

export const Notification = ({
    id,
    icon,
    appName,
    title,
    content,
    style: customStyle,
    onClick,
    glitch,
}: NotificationData) => {
    const [glitchedText, setGlitchedText] = useState('');

    useEffect(() => {
        if (glitch) {
            const glitchElement = createGlitchText({
                text: glitch.text,
                onUpdate: setGlitchedText,
                interval: glitch.interval,
            });

            return () => glitchElement.stop();
        }
    }, [glitch]);

    return (
        <article
            className={style.container}
            style={customStyle?.container}
            onClick={() => onClick?.(id)}
        >
            {icon && (
                <img
                    src={icon}
                    alt={appName}
                    className={style.icon}
                    style={customStyle?.icon}
                />
            )}
            <div className={style.data}>
                <span
                    className={style.appName}
                    style={customStyle?.appName}
                >
                    {appName}
                </span>
                <span
                    className={style.title}
                    style={customStyle?.title}
                >
                    {glitch?.target === 'title' ? glitchedText : title}
                </span>
                <span
                    className={style.content}
                    style={customStyle?.content}
                >
                    {glitch?.target === 'content' ? glitchedText : content}
                </span>
            </div>
        </article>
    );
};