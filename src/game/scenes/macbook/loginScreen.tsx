import style from '../../../styles/scene/macbook/loginScreen.module.scss';
import {NAME} from "../../../constant/name.ts";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import {useState} from "react";
import {MACBOOK_SETTINGS} from "../../../constant/macbook.ts";

export const MacLoginScreen = () => {
    const [password, setPassword] = useState('');
    const [isWrong, setIsWrong] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== MACBOOK_SETTINGS.password) { // 실제 비밀번호 검증 로직으로 교체
            setIsWrong(true);
            // 애니메이션이 끝나면 상태를 리셋
            setTimeout(() => setIsWrong(false), 500);
        }
    };

    return (
        <div className={style.container}>
            <header className={style.controlCenter}>
                <img src="/images/macbook/control/battery.svg" className={style.battery} alt="배터리 충전중"/>
            </header>
            <main className={style.content}>
                <section className={style.time}>
                    <h2>11월 30일 토요일</h2>
                    <h1>6:46</h1>
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