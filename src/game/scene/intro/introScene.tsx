import { useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import {
	useGLTF,
	OrbitControls,
} from '@react-three/drei';
import {
	EffectComposer,
	Bloom,
	SSAO,
} from '@react-three/postprocessing';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useControls } from 'leva';
import Logo from '../../../../public/images/logo.svg';
import style from '../../../styles/scene/introScene.module.scss';
import SoundManager from "../../../engine/sound/soundManager.ts";

interface MeshWithMaterial extends THREE.Object3D {
	material?: THREE.Material;
	geometry?: THREE.BufferGeometry;
}

type orbitControls = typeof OrbitControls;

interface ExtendedOrbitControls extends orbitControls {
	target: THREE.Vector3;
}

// Scene setup and effects
const SceneSetup = ({logoRef}: { logoRef: React.RefObject<HTMLImageElement> }) => {
	const { camera } = useThree();
	const controlsRef = useRef<ExtendedOrbitControls>(null);

	useEffect(() => {
		camera.position.set(-2, 2.9, 2.2);
		camera.rotation.set(0, 0, 0);

		const handleClick = () => {
			const soundManager = SoundManager.getInstance();
			soundManager.loadSound('bgm', '/public/sounds/intro-daru.mp3');
			soundManager.playBGM('bgm');
			soundManager.setMusicVolume(0.1);

			if (logoRef.current) {
				gsap.to(logoRef.current, {
					opacity: 0,
					duration: 1
				});
			}

			gsap.to(camera.position, {
				x: -1,
				y: 1,
				z: 2.2,
				ease: 'power3.inOut',
				duration: 4
			});
		};

		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
	}, [camera]);

	return (
		<>
			<OrbitControls
				ref={controlsRef}
				enableDamping
				dampingFactor={0.05}
				rotateSpeed={0.5}
				minDistance={1}
				maxDistance={10}
				minPolarAngle={Math.PI / 4}
				maxPolarAngle={Math.PI / 1.5}
			/>
			<EffectComposer enableNormalPass>
				<Bloom
					intensity={1}
					luminanceThreshold={0}
					luminanceSmoothing={0.85}
				/>
				<SSAO
					radius={10}
					intensity={20}
					luminanceInfluence={0.5}
					color={new THREE.Color(0x000000)}
				/>
			</EffectComposer>

			<ambientLight intensity={1} />
			<pointLight position={[0, 3, 0]} intensity={2} />
			<pointLight position={[-3, 2, -3]} intensity={1} color={'#ff9900'} />
			<pointLight position={[3, 2, 3]} intensity={1} color={'#ff9900'} />
		</>
	);
};

const MainModel = () => {
	const { scene } = useGLTF('/src/game/model/glb/computer_desk.glb');

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

		const box = new THREE.Box3().setFromObject(scene);
		const center = box.getCenter(new THREE.Vector3());
		const size = box.getSize(new THREE.Vector3());
		const maxDim = Math.max(size.x, size.y, size.z);
		const scale = 3 / maxDim;

		scene.scale.multiplyScalar(scale);
		scene.position.set(
			-center.x * scale,
			-center.y * scale,
			-center.z * scale
		);
	}, []);

	return <primitive object={scene} />;
}

// Main component
const IntroScene: React.FC = () => {
	const logoRef = useRef<HTMLImageElement>(null);

	return (
		<>
			<Canvas
				style={{ width: '100vw', height: '100vh' }}
				shadows
				gl={{
					antialias: true,
					alpha: true,
					toneMapping: THREE.ACESFilmicToneMapping,
					toneMappingExposure: 1.5,
					outputColorSpace: THREE.SRGBColorSpace,
				}}
				camera={{ fov: 75, near: 0.01, far: 1000 }}
			>
				<color attach="background" args={[0x493C3B]} />
				<SceneSetup logoRef={logoRef} />
				<MainModel />
			</Canvas>
			<img ref={logoRef} src={Logo} className={style.logo} alt={'logo'} />
		</>
	);
};

export default IntroScene;