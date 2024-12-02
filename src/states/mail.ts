import {create} from 'zustand';
import {MailStore} from "../types/mail.ts";
import {useNotificationStore} from "./useNotification.ts";
import MessageIcon from "../../public/images/macbook/program/mail.png";

export const useMailStore = create<MailStore>((set, get) => ({
    mails: [],
    selectedMailId: null,
    lastOpenedMailId: null,  // 마지막으로 열었던 메일 ID 저장
    searchQuery: '',

    setSelectedMail: (id) => set(_ => ({
        selectedMailId: id,
        lastOpenedMailId: id  // 메일 선택 시 lastOpenedMailId 업데이트
    })),

    addMail: (mail) => {
       set((state) => ({
          mails: [...state.mails, mail]
       }));

       // 메일 추가시 알림 발송
       useNotificationStore.getState().addNotification({
          appName: 'Mail',
          icon: MessageIcon,
          title: mail.title,
          content: mail.content,
          duration: 3000,
          onClick: () => console.log('notification clicked'),
       });
    },

    setSearchQuery: (query) => set({searchQuery: query}),

    getFilteredMails: () => {
       const {mails, searchQuery} = get();
       return mails.filter(mail =>
          searchQuery ?
             mail.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             mail.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
             mail.sender.toLowerCase().includes(searchQuery.toLowerCase())
             : true
       );
    },

    getSelectedMail: () => {
       const {mails, selectedMailId} = get();
       return mails.find(mail => mail.id === selectedMailId);
    },

    getLastOpenedMail: () => {
       const {mails, lastOpenedMailId} = get();
       return mails.find(mail => mail.id === lastOpenedMailId);
    }
}));