import {useThree} from "@react-three/fiber";
import {useControls} from "leva";
import {useEffect} from "react";

const CameraController = () => {
	const {camera} = useThree();

	const {position, rotation} = useControls("Camera", {
		position: {
			value: {x: -0.9, y: -0.3, z: 0.2},
			step: 0.1,
		},
		rotation: {
			value: {x: 0, y: -1.57, z: 0},
			step: 0.1,
		},
	});

	useEffect(() => {
		camera.position.set(0, -0.2, 1.9);
		camera.rotation.set(0, -0.05, 0);
		camera.updateProjectionMatrix();
	}, [camera, position, rotation]);

	return null;
};

export default CameraController;