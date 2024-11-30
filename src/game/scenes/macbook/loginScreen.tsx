import style from '../../../styles/scene/macbook/loginScreen.module.scss';
import {NAME} from "../../../constant/name.ts";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import {useEffect, useState} from "react";
import {MACBOOK_SETTINGS} from "../../../constant/macbook.ts";
import TimeManager from "../../../engine/Time/TimeManager.ts";

export const MacLoginScreen = () => {
    const [password, setPassword] = useState('');
    const [isWrong, setIsWrong] = useState(false);
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== MACBOOK_SETTINGS.password) { // 실제 비밀번호 검증 로직으로 교체
            setIsWrong(true);
            // 애니메이션이 끝나면 상태를 리셋
            setTimeout(() => setIsWrong(false), 500);
        }
    };

    useEffect(() => {
        const timeManager = TimeManager.getInstance();

        // 초기 시간 설정
        timeManager.setTime(new Date('2024-11-30T06:46:00'));

        // 시간 업데이트 콜백 등록
        const removeCallback = timeManager.onTimeUpdate((time) => {
            setCurrentDate(timeManager.getFormattedTime('MM월 DD일 dddd'));
            setCurrentTime(timeManager.getFormattedTime('HH:mm'));
        });

        // 시간 시스템 시작
        timeManager.start();

        // 컴포넌트 언마운트시 정리
        return () => {
            removeCallback();
            timeManager.stop();
        };
    }, []);

    return (
        <div className={style.container}>
            <header className={style.controlCenter}>
                <img src="/images/macbook/control/battery.svg" className={style.battery} alt="배터리 충전중"/>
            </header>
            <main className={style.content}>
                <section className={style.time}>
                    <h2>{currentDate}</h2>
                    <h1>{currentTime}</h1>
                </section>
                <section className={style.login}>
                {password.length > 0 && (
                        <IoArrowForwardCircleOutline
                            className={`${style.enterPassword} ${isWrong ? style.wrongPassword : ''}`}
                            onClick={handleSubmit}
                        />
                    )}
                    <div className={style.mimoji}>
                        <img src="/images/macbook/login/mimoji.png" alt="미모지"/>
                    </div>
                    <span className={style.name}>{NAME.daughter}</span>
                    <input
                        type="password"
                        className={`${style.password} ${isWrong ? style.wrongPassword : ''}`}
                        placeholder="암호 입력"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit(e);
                            }
                        }}
                    />
                    <span className={style.info}>Touch ID 또는 암호 입력</span>
                </section>
            </main>
        </div>
    )
}