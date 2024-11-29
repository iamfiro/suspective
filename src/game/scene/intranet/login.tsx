import {useEffect, useState} from 'react';
import style from '../../../styles/scene/intranet/login.module.scss';
import Logo from '../../../../public/images/us_police_logo.svg';
import {useScene} from "../../../engine/scene/sceneManager.tsx";

const IntranetLogin = () => {
    const [animatedText, setAnimatedText] = useState({ username: '', password: '' });
    const [showModal, setShowModal] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const {navigate} = useScene();

    const credentials = {
        username: '********',
        password: '****************'
    };

    const startTypingAnimation = () => {
        let usernameIndex = 0;
        let passwordIndex = 0;

        const usernameInterval = setInterval(() => {
            if (usernameIndex <= credentials.username.length) {
                setAnimatedText(prev => ({
                    ...prev,
                    username: credentials.username.slice(0, usernameIndex)
                }));
                usernameIndex++;
            } else {
                clearInterval(usernameInterval);
                const passwordInterval = setInterval(() => {
                    if (passwordIndex <= credentials.password.length) {
                        setAnimatedText(prev => ({
                            ...prev,
                            password: credentials.password.slice(0, passwordIndex)
                        }));
                        passwordIndex++;
                    } else {
                        clearInterval(passwordInterval);
                    }
                }, 100);
            }
        }, 100);
    };

    useEffect(() => {
        const timeout = setTimeout(startTypingAnimation, 1000);
        return () => clearTimeout(timeout);
    }, []);

    const handleLogin = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowModal(true);

        setTimeout(() => {
            setShowOverlay(true);
            setTimeout(() => {
                navigate('/difficultySelect');
            }, 1000);
        }, 2000);
    };

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
                        <input type="text" value={animatedText.username} readOnly />
                    </div>
                    <div className={style.inputGroup}>
                        <label>PASSWORD:</label>
                        <input type="text" value={animatedText.password} readOnly />
                    </div>
                    <button onClick={handleLogin}>로그인</button>
                </form>

                <div className={style.footer}>
                    SYSTEM VERSION 2.1.4
                    <br />
                    © 1985 DEPARTMENT OF JUSTICE
                </div>
            </div>

            {showModal && (
                <div className={style.modal}>
                    <div className={style.modalContent}>
                        다시 오신 것을 환영합니다, Emily 님.
                    </div>
                </div>
            )}

            {showOverlay && <div className={style.overlay} />}
        </main>
    );
};

export default IntranetLogin;