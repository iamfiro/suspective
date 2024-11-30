export enum DesktopItemType {
    application = 'application',
    folder = 'folder',
    image = 'image'
}

export interface Program {
    id: string;
    name: string;
    type: DesktopItemType;
    icon?: string;
    position?: {
        x: number;
        y: number;
    };
}

export interface ApplicationProgram extends Program {
    type: DesktopItemType.application;
    onLaunch?: () => void;
}

export interface ImageProgram extends Program {
    type: DesktopItemType.image;
    imagePath: string;
}

export interface FolderProgram extends Program {
    type: DesktopItemType.folder;
    items?: Program[];
}

export type DesktopProgram = ApplicationProgram | ImageProgram | FolderProgram;