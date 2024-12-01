
interface AppConfig {
    title: string;
    size: { width: number; height: number };
    isResizable: boolean;
    defaultArgs?: Record<string, string | number | boolean>;  // 기본 인자
}

interface AppDefinition {
    id: string;
    name: string;
    icon: string;
    config: AppConfig;
}

export const DOCK_APPS: AppDefinition[] = [
    {
        id: 'finder',
        name: 'Finder',
        icon: '/images/macbook/program/finder.png',
        config: {
            title: 'Finder',
            size: { width: 800, height: 500 },
            isResizable: true,
            defaultArgs: {
                path: '/home'
            }
        }
    },
    {
        id: 'safari',
        name: 'Safari',
        icon: '/images/macbook/program/safari.png',
        config: {
            title: 'Safari',
            size: { width: 1024, height: 768 },
            isResizable: true,
            defaultArgs: {
                url: 'https://www.apple.com'
            }
        }
    },
    {
        id: 'messages',
        name: 'Messages',
        icon: '/images/macbook/program/messages.png',
        config: {
            title: 'Messages',
            size: { width: 400, height: 600 },
            isResizable: true,
        }
    },
    {
        id: 'kakaotalk',
        name: 'Mail',
        icon: '/images/macbook/program/mail.png',
        config: {
            title: 'Mail',
            size: { width: 220, height: 340 },
            isResizable: false,
            defaultArgs: {
                mailbox: 'inbox'
            }
        }
    },
    {
        id: 'photos',
        name: 'Photos',
        icon: '/images/macbook/program/photos.png',
        config: {
            title: 'Photos',
            size: { width: 900, height: 600 },
            isResizable: true,
            defaultArgs: {
                album: 'recent'
            }
        }
    },
    {
        id: 'settings',
        name: 'System Settings',
        icon: '/images/macbook/program/settings.png',
        config: {
            title: 'System Settings',
            size: { width: 800, height: 600 },
            isResizable: false,
        }
    },
];

export const DOCK_RECENT_APP: AppDefinition[] = [
    {
        id: 'notes',
        name: 'Notes',
        icon: '/images/macbook/program/note.png',
        config: {
            title: 'Notes',
            size: { width: 400, height: 600 },
            isResizable: true,
        }
    },
    {
        id: 'trash',
        name: 'Trash',
        icon: '/images/macbook/program/trash.png',
        config: {
            title: 'Trash',
            size: { width: 800, height: 500 },
            isResizable: true,
        }
    },
];