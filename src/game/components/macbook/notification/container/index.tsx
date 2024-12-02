import style from '../style.module.scss';
import {useNotificationStore} from "../../../../../states/useNotification.ts";
import {Notification} from '../index.tsx';
export const NotificationContainer = () => {
    const notifications = useNotificationStore((state) => state.notifications);

    return (
        <div className={style.notificationContainer}>
            {notifications.map((notification) => (
                <Notification key={notification.id} {...notification} />
            ))}
        </div>
    );
};