import style from '../../../styles/scene/intranet/missionList.module.scss';
import MarqueeFooter from "../../component/missionList/marqueeFooter.tsx";
import USPoliceLogo from "../../component/intranet/usPoliceLogo.tsx";
import MessengerDummy from "../../component/missionList/messengerDummy.tsx";

const MissionList = () => {
    return (
        <div className={style.wrap}>
            <div className={style.container}>
                <aside className={style.accessorData}>
                    <header className={style.accessorDataHeader}>
                        <span>Emily님 다시 오신것을 환영합니다</span>
                    </header>
                    <MessengerDummy />
                    <MarqueeFooter text={'캘리포니아 주의 안전은 SWAT 대원들에 의해 보호되고 있습니다. 안심하십시오'} />
                </aside>
            </div>
            <USPoliceLogo />
        </div>
    );
};

export default MissionList;