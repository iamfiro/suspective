import { useState } from 'react';
import style from './style.module.scss';

const Dock = () => {
    const [hoveredApp, setHoveredApp] = useState<string | null>(null);

    const apps = [
        { id: 'finder', name: 'Finder', icon: '/images/macbook/program/finder.png', active: true },
        { id: 'safari', name: 'Safari', icon: '/images/macbook/program/safari.png', active: false },
        { id: 'messages', name: 'Messages', icon: '/images/macbook/program/messages.png', active: true },
        { id: 'mail', name: 'Mail', icon: '/images/macbook/program/mail.png', active: false },
        { id: 'photos', name: 'Photos', icon: '/images/macbook/program/photos.png', active: false },
        { id: 'settings', name: 'System Settings', icon: '/images/macbook/program/settings.png', active: false },
    ];

    const recentApps = [
        { id: 'notes', name: 'Notes', icon: '/images/macbook/program/note.png', active: false },
        { id: 'trash', name: 'Trash', icon: '/images/macbook/program/trash.png', active: false },
    ];

    return (
        <div className={style.dockContainer}>
            <div className={style.dock}>
                <div className={style.dockSection}>
                    {apps.map((app) => (
                        <div
                            key={app.id}
                            className={`${style.dockIcon} ${hoveredApp === app.id ? style.hovered : ''}`}
                            onMouseEnter={() => setHoveredApp(app.id)}
                            onMouseLeave={() => setHoveredApp(null)}
                        >
                            <img src={app.icon} alt={app.name} />
                            <span className={style.tooltip}>{app.name}</span>
                            {app.active && <div className={style.activeIndicator} />}
                        </div>
                    ))}
                </div>
                <div className={style.divider} />
                <div className={style.dockSection}>
                    {recentApps.map((app) => (
                        <div
                            key={app.id}
                            className={`${style.dockIcon} ${hoveredApp === app.id ? style.hovered : ''}`}
                            onMouseEnter={() => setHoveredApp(app.id)}
                            onMouseLeave={() => setHoveredApp(null)}
                        >
                            <img src={app.icon} alt={app.name} />
                            <span className={style.tooltip}>{app.name}</span>
                            {app.active && <div className={style.activeIndicator} />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dock;