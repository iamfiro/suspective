import {BackgroundProgram, DesktopItemType, ReminderData} from "../types/program.ts";

export const MACBOOK_SETTINGS = {
    password: '0429',
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

export const REMINDER_DATA: ReminderData[] = [
    {
        date: '2024-04-29',
        title: '내 생일 🍰😁😂🎉',
    },
]