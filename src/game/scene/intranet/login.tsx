import {useEffect, useState} from 'react';
import style from '../../../styles/scene/intranet/login.module.scss';
import Logo from '../../../../public/images/us_police_logo.svg';

const IntranetLogin = () => {
    const [animatedText, setAnimatedText] = useState({
        username: '',
        password: ''
    });
    const [isTyping, setIsTyping] = useState(false);

    const credentials = {
        username: '********',
        password: '****************'
    };

    const startTypingAnimation = () => {
        setIsTyping(true);
        let usernameIndex = 0;
        let passwordIndex = 0;

        // Type username first
        const usernameInterval = setInterval(() => {
            if (usernameIndex <= credentials.username.length) {
                setAnimatedText(prev => ({
                    ...prev,
                    username: credentials.username.slice(0, usernameIndex)
                }));
                usernameIndex++;
            } else {
                clearInterval(usernameInterval);
                // Start typing password after username is complete
                const passwordInterval = setInterval(() => {
                    if (passwordIndex <= credentials.password.length) {
                        setAnimatedText(prev => ({
                            ...prev,
                            password: credentials.password.slice(0, passwordIndex)
                        }));
                        passwordIndex++;
                    } else {
                        clearInterval(passwordInterval);
                        setIsTyping(false);
                    }
                }, 100);
            }
        }, 100);
    };

    useEffect(() => {
        const timeout = setTimeout(startTypingAnimation, 1000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <main className={style.container}>
            <div className={style.loginBox}>
                <div className={style.header}>
                    <img src={Logo} className={style.logo} alt={'intranet Logo'} />
                    <h1 className={style.title}>POLICE DEPARTMENT</h1>
                    <div className={style.subtitle}>INTERNAL NETWORK ACCESS</div>
                </div>

                <div className={style.warning}>
                    AUTHORIZED PERSONNEL ONLY
                    <br />
                    무단 접근시 처벌됨
                </div>

                <form className={style.loginForm}>
                    <div className={style.inputGroup}>
                        <label>USERNAME:</label>
                        <input
                            type="text"
                            value={animatedText.username}
                        />
                    </div>
                    <div className={style.inputGroup}>
                        <label>PASSWORD:</label>
                        <input
                            type="text"
                            value={animatedText.password}
                        />
                    </div>
                    <button type="submit">로그인</button>
                </form>

                <div className={style.footer}>
                    SYSTEM VERSION 2.1.4
                    <br />
                    © 1985 DEPARTMENT OF JUSTICE
                </div>
            </div>
        </main>
    );
};

export default IntranetLogin;