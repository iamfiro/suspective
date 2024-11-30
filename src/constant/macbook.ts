import {DesktopItemType} from "../types/program.ts";

export const MACBOOK_SETTINGS = {
    password: '0429',
}

interface BackgroundProgram {
    type: DesktopItemType;
    name: string;
    icon?: string;
}

export const MACBOOK_BACKGROUND_PROGRAMS: BackgroundProgram[] = [
    {
        type: DesktopItemType.application,
        name: 'Github',
        icon: '/images/macbook/dummy/git.png'
    },
    {
        type: DesktopItemType.folder,
        name: '폴더',
        icon: '/images/macbook/folder.webp'
    },
    {
        type: DesktopItemType.image,
        name: '중요한거',
        icon: '/images/macbook/dummy/cat.jpg'
    }
]