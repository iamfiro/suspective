import {ReactNode} from "react";

export interface Mail {
    id: string;
    sender: string;
    title: string;
    content: string;
    timestamp: string;
    component?: ReactNode;  // html 대신 ReactNode로 변경
}

export interface MailStore {
    mails: Mail[];
    lastOpenedMailId: string | null;
    selectedMailId: string | null;
    searchQuery: string;

    setSelectedMail: (id: string | null) => void;
    addMail: (mail: Mail) => void;
    setSearchQuery: (query: string) => void;

    getLastOpenedMail: (id: string) => void;
    getFilteredMails: () => Mail[];
    getSelectedMail: () => Mail | undefined;
}