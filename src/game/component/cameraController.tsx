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
		camera.position.set(position.x, position.y, position.z);
		camera.rotation.set(rotation.x, rotation.y, rotation.z);
		camera.updateProjectionMatrix();
	}, [camera, position, rotation]);

	return null;
};

export default CameraController;