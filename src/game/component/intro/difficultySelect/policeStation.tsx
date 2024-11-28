import {useEffect} from "react";
import {useGLTF} from "@react-three/drei";
import {MeshWithMaterial} from "../../../../type/mesh.ts";
import * as THREE from "three";

const PoliceStation = () => {
	const {scene} = useGLTF('/src/game/model/glb/police_station.glb');

	useEffect(() => {
		scene.traverse((node: MeshWithMaterial) => {
			if (node instanceof THREE.Mesh) {
				node.castShadow = true;
				node.receiveShadow = true;
				if (node.material) {
					(node.material as THREE.MeshStandardMaterial).roughness = 0.7;
					(node.material as THREE.MeshStandardMaterial).metalness = 0.3;
					(node.material as THREE.MeshStandardMaterial).envMapIntensity = 1;
				}
			}
		});
	}, []);

	return (
		<primitive
			object={scene}
			position={[115.9, -3.7, -14.9]}
			rotation={[0, 0, 0]}
			scale={3}
		/>
	);
}

export default PoliceStation;