import style from './style.module.scss';
import Battery from '../../../../../public/images/macbook/control/battery.svg';
import { MdOutlineWifi } from "react-icons/md";
import { SiDolby } from "react-icons/si";
import AppleIcon from '../../../../../public/images/macbook/apple_logo.svg';

export const MenuBar = () => {
    return (
        <header className={style.menuBar}>
            <div className={style.appMenu}>
                <img src={AppleIcon} alt="애플 로고" className={style.appleLogo}/>
                <span className={style.focusedAppName}>Finder</span>
                <span className={style.focusedAppMenu}>파일</span>
                <span className={style.focusedAppMenu}>편집</span>
                <span className={style.focusedAppMenu}>보기</span>
                <span className={style.focusedAppMenu}>이동</span>
                <span className={style.focusedAppMenu}>윈도우</span>
                <span className={style.focusedAppMenu}>도움말</span>
            </div>
            <div className={style.macData}>
                <SiDolby className={style.icon} />
                <MdOutlineWifi className={style.icon} />
                <div className={style.batteryContainer}>
                    <span className={style.batteryValue}>100%</span>
                    <img src={Battery} alt="배터리" className={style.icon}/>
                </div>
                <span className={style.time}>11월 30일 (토) 오후 11:05</span>
            </div>
        </header>
    )
}