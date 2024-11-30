import style from '../../../styles/scene/macbook/loginScreen.module.scss';

export const MacLoginScreen = () => {
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
            </main>
        </div>
    )
}