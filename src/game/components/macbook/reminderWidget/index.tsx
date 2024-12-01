import { useEffect, useState } from 'react';
import style from './style.module.scss';
import TimeManager from "../../../../engine/Time/TimeManager.ts";
import {REMINDER_DATA} from "../../../../constant/macbook.ts";
import {ReminderData} from "../../../../types/program.ts";
import { BsCalendarDate } from "react-icons/bs";

export const ReminderWidget = () => {
    const [upcomingReminders, setUpcomingReminders] = useState<ReminderData[]>([]);
    const timeManager = TimeManager.getInstance();

    useEffect(() => {
        const updateReminders = (currentDate: Date) => {
            const upcoming = REMINDER_DATA.filter(reminder => {
                const reminderDate = new Date(reminder.date);
                return reminderDate > currentDate;
            }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            setUpcomingReminders(upcoming.slice(0, 3));
        };

        const removeCallback = timeManager.onTimeUpdate((time) => {
            updateReminders(time);
        });

        updateReminders(timeManager.getCurrentTime());

        return () => {
            removeCallback();
        };
    }, []);

    if (upcomingReminders.length === 0) {
        return null;
    }

    return (
        <div className={style.reminderWidget}>
            <div className={style.header}>
                <h3>{timeManager.getCurrentDay()}요일</h3>
                <span className={style.time}>{timeManager.getCurrentDayIndex()}</span>
            </div>
            <div className={style.reminderList}>
                {upcomingReminders.map((reminder, index) => (
                    <div key={index} className={style.reminderItem}>
                        <div className={style.icon}>
                            <BsCalendarDate />
                        </div>
                        <span className={style.date}>
                            {new Date(reminder.date).toLocaleDateString('ko-KR', {
                                month: 'short',
                                day: 'numeric'
                            })}
                        </span>
                        <span className={style.title}>{reminder.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};