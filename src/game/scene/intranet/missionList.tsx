import style from '../../../styles/scene/intranet/missionList.module.scss';
import MarqueeFooter from "../../component/missionList/marqueeFooter.tsx";
import USPoliceLogo from "../../component/intranet/usPoliceLogo.tsx";
import MessengerDummy from "../../component/missionList/messengerDummy.tsx";
import Map from "../../component/missionList/map.tsx";

const MissionList = () => {
	return (
		<div className={style.wrap}>
			<div className={style.container}>
				<aside className={style.accessorData}>
					<header className={style.accessorDataHeader}>
						<span>Emily님 다시 오신것을 환영합니다</span>
					</header>
					<section style={{padding: '20px 0', height: 'calc(100% - 40px)'}}>
						<MessengerDummy/>
						<Map/>
					</section>
					<MarqueeFooter text={'캘리포니아 주의 안전은 SWAT 대원들에 의해 보호되고 있습니다. 안심하십시오'}/>
				</aside>
			</div>
			<USPoliceLogo/>
		</div>
	);
};

export default MissionList;