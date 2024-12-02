import {create} from 'zustand';
import {MailStore} from "../types/mail.ts";
import {useNotificationStore} from "./useNotification.ts";
import MessageIcon from "../../public/images/macbook/program/mail.png";
import {useMacPrograms} from "./useMacPrograms.ts";

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

		const randomX = Math.floor(Math.random() * 100) + 50; // 50~150px 사이
        const randomY = Math.floor(Math.random() * 100) + 50; // 50~150px 사이

		// 메일 추가시 알림 발송
		useNotificationStore.getState().addNotification({
			appName: 'Mail',
			icon: MessageIcon,
			title: mail.title,
			content: mail.content,
			duration: 3000,
			onClick: (id) => {
				// 알림 닫기
				useNotificationStore.getState().removeNotification(id);
				// 알림 클릭 시 메일 프로그램 실행
				useMacPrograms.getState().addProgram({
					id: 'mail',
					title: '메일',
					icon: '/images/macbook/program/mail.png',
					size: {width: 900, height: 560},
					position: {x: randomX, y: randomY},
					isResizable: false,
					isFullScreen: false,
					isMinimized: false
				})
			},
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