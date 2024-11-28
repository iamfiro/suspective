import {Canvas} from "@react-three/fiber";
import style from '../../../styles/scene/difficultySelect.module.scss';
import DifficultySelectRoom from "../../component/intro/difficultySelect/room.tsx";
import CameraController from "../../component/cameraController.tsx";



const difficultySelect = () => {
	return (
		<Canvas className={style.container} style={{height: '100vh', width: '100%'}}>
			<ambientLight intensity={Math.PI / 2}/>
			<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI}/>
			<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI}/>
			<DifficultySelectRoom />
			<CameraController />
		</Canvas>
	)
}

export default difficultySelect;