import { FaFolder, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import { MdAccessTime } from 'react-icons/md';
import style from '../../../styles/scene/intranet/missionList.module.scss';
import USPoliceLogo from "../../component/intranet/usPoliceLogo.tsx";
import MessengerDummy from "../../component/missionList/messengerDummy.tsx";
import MarqueeFooter from "../../component/missionList/marqueeFooter.tsx";
import Map from '../../component/missionList/map.tsx';

interface Session {
    id: string;
    title: string;
    players: number;
    location: string;
    status: 'active' | 'pending';
    startTime: string;
}

const MissionList = () => {
    // 샘플 세션 데이터
    const sessions: Session[] = [
        {
            id: '1',
            title: '수원시 마약 조직 수사',
            players: 4,
            location: 'LA Downtown',
            status: 'active',
            startTime: '11:30 AM'
        },
        {
            id: '2',
            title: '안산구 인신매매 조직 감시',
            players: 6,
            location: 'SF Bay Area',
            status: 'pending',
            startTime: '12:00 PM'
        },
        {
            id: '2',
            title: '화성시 정은수 강간 살인 사건',
            players: 6,
            location: 'SF Bay Area',
            status: 'pending',
            startTime: '12:00 PM'
        },
        {
            id: '2',
            title: '정은수 맥북 갈취 사건',
            players: 6,
            location: 'SF Bay Area',
            status: 'pending',
            startTime: '12:00 PM'
        }
    ];

    const renderSessionItem = (session: Session) => (
        <div key={session.id} className={style.sessionItem}>
            <div className={style.sessionInfo}>
                <div className={style.title}>{session.title}</div>
                <div className={style.details}>
                    <div className={style.detailItem}>
                        <FaUsers />
                        <span>{session.players}명</span>
                    </div>
                    <div className={style.detailItem}>
                        <FaMapMarkerAlt />
                        <span>{session.location}</span>
                    </div>
                </div>
            </div>
            <div className={style.sessionStatus}>
                <div className={`${style.status} ${style[session.status]}`}>
                    {session.status === 'active' ? '진행중' : '대기중'}
                </div>
                <div className={style.time}>{session.startTime}</div>
            </div>
        </div>
    );

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
                <main className={style.sessionList}>
                    <header className={style.sessionHeader}>
                        <div className={style.serviceName}>
                            <FaFolder/>
                            <span>진행중인 수사</span>
                        </div>
                        <div className={style.difficulty}>
                            <span>난이도: 어려움</span>
                        </div>
                    </header>
                    <section className={style.sessionDataList}>
                        {sessions.length > 0 ? (
                            sessions.map(renderSessionItem)
                        ) : (
                            <div className={style.noSessions}>
                                현재 진행중인 수사가 없습니다
                            </div>
                        )}
                    </section>
                    <footer className={style.sessionFooter}>
                        <div className={style.currentTime}>
                            <MdAccessTime />
                            <span>12:08 AM</span>
                        </div>
                        <div className={style.difficulty}>
                            <span>날씨: 맑음</span>
                        </div>
                    </footer>
                </main>
            </div>
            <USPoliceLogo/>
        </div>
    );
};

export default MissionList;