import style from './menuBar.module.scss';

export const MenuBar = () => {
    return (
        <header className={style.menuBar}>
            <div>
            </div>
            <div className={style.macData}>
                <span className={style.time}>11월 30일 (토) 오후 11:05</span>
            </div>
        </header>
    )
}

export default MenuBar;