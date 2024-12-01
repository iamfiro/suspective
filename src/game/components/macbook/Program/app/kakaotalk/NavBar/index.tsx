import style from './style.module.scss';
import { FaUserLarge } from "react-icons/fa6";
import { BsChatFill } from "react-icons/bs";

export const KakaoTalkNavBar = ({selected}: {selected: 'chat' | 'profile'}) => {
    return (
        <aside className={style.container}>
            <FaUserLarge color={selected === 'profile' ? '#181818' : '#868686'} />
            <BsChatFill color={selected === 'chat' ? '#181818' : '#868686'} />
        </aside>
    )
}