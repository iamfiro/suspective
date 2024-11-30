import style from './style.module.scss';
import { DesktopItemType } from "../../../../types/program.ts";
import useBackgroundSelectedIcon from "../../../../states/backgroundSelectedIcon.ts";
import { MouseEvent } from "react";

interface DesktopIconProps {
    type: DesktopItemType;
    iconSrc?: string;
    name: string;
    x?: number;
    y?: number;
}

const ICON_CONFIG: Record<DesktopItemType, { src: string; className?: string; width?: number }> = {
    application: {
        src: '/images/macbook/dummy/git.png',
        className: style.appIcon,
        width: 70
    },
    folder: {
        src: '/images/macbook/folder.webp'
    },
    image: {
        src: '/images/macbook/dummy/cat.jpg',
        className: style.imageIcon,
        width: 70
    }
};

export const DesktopIcon = ({ type, iconSrc, name, x, y }: DesktopIconProps) => {
    const { setSelectedName, selectedName } = useBackgroundSelectedIcon();

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setSelectedName(name);
    };

    const iconConfig = ICON_CONFIG[type];

    // iconSrc가 있으면 iconConfig을 덮어씌움
    if(iconSrc) {
        iconConfig.src = iconSrc;
    }

    if (!iconConfig) {
        return <div>Unknown type: {type}</div>;
    }

    const { src, className, width } = iconConfig;

    return (
        <div
            className={style.container}
            onClick={handleClick}
            data-clicked={selectedName === name}
            style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`
            }}
        >
            <div className={style.iconContainer}>
                <img
                    src={src}
                    alt={`${name} ${type}`}
                    className={`${style.icon} ${className || ''}`}
                    style={width ? { width: `${width}px` } : undefined}
                />
            </div>
            <div className={style.nameContainer}>
                <span>{name}</span>
            </div>
        </div>
    );
};