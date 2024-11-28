import { Canvas } from "@react-three/fiber";
import style from '../../../styles/scene/difficultySelect.module.scss';
import CameraController from "../../component/cameraController.tsx";
import Monitor from "../../component/intro/difficultySelect/monitor.tsx";
import Desk from "../../component/intro/difficultySelect/desk.tsx";
import PoliceStation from "../../component/intro/difficultySelect/policeStation.tsx";

const DifficultySelect = () => {
    return (
        <Canvas className={style.container} style={{height: '100vh', width: '100%'}}>
            <ambientLight intensity={Math.PI / 2}/>
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}/>
            <Monitor />
            <CameraController />
            <PoliceStation />
            <Desk />
        </Canvas>
    )
}

export default DifficultySelect;