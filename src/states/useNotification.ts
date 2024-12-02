import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { NotificationData } from '../types/notification';

interface NotificationStore {
    notifications: NotificationData[];
    addNotification: (notification: Omit<NotificationData, 'id'>) => string;
    removeNotification: (id: string) => void;
    clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
    notifications: [],
    addNotification: (notification) => {
        const id = uuidv4();
        const newNotification = { ...notification, id };

        set((state) => ({
            notifications: [...state.notifications, newNotification],
        }));

        return id;
    },
    removeNotification: (id) =>
        set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
        })),
    clearNotifications: () => set({ notifications: [] }),
}));