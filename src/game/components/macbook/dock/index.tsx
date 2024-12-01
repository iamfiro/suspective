import { useState } from 'react';
import style from './style.module.scss';
import { useMacPrograms } from "../../../../states/useMacPrograms.ts";
import {DOCK_APPS, DOCK_RECENT_APP} from "../../../../constant/dock.ts";

const Dock = () => {
    const [hoveredApp, setHoveredApp] = useState<string | null>(null);
    const { addProgram, programs } = useMacPrograms(); // programs 상태 추가

    // 앱이 실행 중인지 확인하는 함수
    const isAppRunning = (appId: string) => {
        return programs.some(program => program.id === appId && !program.isMinimized);
    };

    const handleAppClick = (app: typeof DOCK_APPS[0]) => {
        // 화면 중앙에 랜덤하게 위치하도록 계산
        const randomX = Math.floor(Math.random() * 100) + 50; // 50~150px 사이
        const randomY = Math.floor(Math.random() * 100) + 50; // 50~150px 사이

        addProgram({
            id: app.id,
            title: app.config.title,
            icon: app.icon,
            position: { x: randomX, y: randomY },
            size: app.config.size,
            isResizable: app.config.isResizable,
            isFullScreen: false,
            isMinimized: false
        });
    };

    return (
        <div className={style.dockContainer}>
            <div className={style.dock}>
                <div className={style.dockSection}>
                    {DOCK_APPS.map((app) => (
                        <div
                            key={app.id}
                            className={`${style.dockIcon} ${hoveredApp === app.id ? style.hovered : ''}`}
                            onMouseEnter={() => setHoveredApp(app.id)}
                            onMouseLeave={() => setHoveredApp(null)}
                            onClick={() => handleAppClick(app)}
                        >
                            <img src={app.icon} alt={app.name} />
                            <span className={style.tooltip}>{app.name}</span>
                            {isAppRunning(app.id) && <div className={style.activeIndicator} />}
                        </div>
                    ))}
                </div>
                <div className={style.divider} />
                <div className={style.dockSection}>
                    {DOCK_RECENT_APP.map((app) => (
                        <div
                            key={app.id}
                            className={`${style.dockIcon} ${hoveredApp === app.id ? style.hovered : ''}`}
                            onMouseEnter={() => setHoveredApp(app.id)}
                            onMouseLeave={() => setHoveredApp(null)}
                            onClick={() => handleAppClick(app)}
                        >
                            <img src={app.icon} alt={app.name} />
                            <span className={style.tooltip}>{app.name}</span>
                            {isAppRunning(app.id) && <div className={style.activeIndicator} />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dock;