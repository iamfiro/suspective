import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
// @ts-ignore
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
// @ts-ignore
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const IntroScene: React.FC = () => {
	const mountRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<THREE.Scene | null>(null);
	const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
	const controlsRef = useRef<OrbitControls | null>(null);
	const frameIdRef = useRef<number>(0);

	useEffect(() => {
		if (!mountRef.current) return;

		const initThreeJs = (): void => {
			if (!mountRef.current) return;

			// Scene
			const scene = new THREE.Scene();
			scene.background = new THREE.Color("rgba(0,255,72,0.66)");
			sceneRef.current = scene;

			// Camera - 시야각과 위치 조정
			const camera = new THREE.PerspectiveCamera(
				90,
				mountRef.current.clientWidth / mountRef.current.clientHeight,
				1,
				1000
			);
			camera.position.set(0.9, 0.5, 1.25); // 카메라 위치 조정
			cameraRef.current = camera;

			// Renderer
			const renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true
			});
			renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.outputColorSpace = THREE.SRGBColorSpace;
			renderer.shadowMap.enabled = true; // 그림자 활성화
			mountRef.current.appendChild(renderer.domElement);
			rendererRef.current = renderer;

			// Controls
			const controls = new OrbitControls(camera, renderer.domElement);
			controls.enableDamping = true;
			controls.dampingFactor = 0.05;
			controls.target.set(0, 0, 0);
			controlsRef.current = controls;

			// Lights
			// 주변광
			const ambientLight = new THREE.AmbientLight(0xffffff, 2.7);
			scene.add(ambientLight);

			// 주 조명
			const mainLight = new THREE.DirectionalLight(0xffffff, 1);
			mainLight.position.set(10, 10, 10);
			mainLight.castShadow = true;
			scene.add(mainLight);

			// const
			const chandelierLight = new THREE.SpotLight("#1800ff", 1, 10);
			scene.add(chandelierLight);

			// 보조 조명
			const fillLight = new THREE.DirectionalLight("#412c2c", .5);
			fillLight.position.set(-10, 5, -10);
			scene.add(fillLight);

			// 바닥 helper (디버깅용)
			const gridHelper = new THREE.GridHelper(10, 10);
			scene.add(gridHelper);
		};

		const loadModel = (): void => {
			const loader = new GLTFLoader();

			loader.load(
				'/src/game/model/glb/detective_room.glb',
				(gltf: GLTF) => {
					if (!sceneRef.current) return;

					const model = gltf.scene;

					// 그림자 설정
					model.traverse((node) => {
						if (node instanceof THREE.Mesh) {
							node.castShadow = true;
							node.receiveShadow = true;
						}
					});

					// 모델 위치 및 스케일 조정
					const box = new THREE.Box3().setFromObject(model);
					const center = box.getCenter(new THREE.Vector3());
					const size = box.getSize(new THREE.Vector3());

					// 모델 크기에 따라 스케일 조정
					const maxDim = Math.max(size.x, size.y, size.z);
					const scale = 3 / maxDim; // 스케일 값 증가
					model.scale.multiplyScalar(scale);

					// 모델을 장면의 중앙에 위치시키기
					model.position.x = -center.x * scale;
					model.position.y = -center.y * scale;
					model.position.z = -center.z * scale;

					sceneRef.current.add(model);
					console.log('Model loaded successfully:', model);
				},
				(xhr: ProgressEvent) => {
					const progress = (xhr.loaded / xhr.total) * 100;
					console.log(`Loading progress: ${progress}%`);
				},
				(error: ErrorEvent) => {
					console.error('Error loading model:', error);
				}
			);
		};

		const animate = (): void => {
			frameIdRef.current = requestAnimationFrame(animate);

			if (
				!sceneRef.current ||
				!cameraRef.current ||
				!rendererRef.current ||
				!controlsRef.current
			)
				return;

			controlsRef.current.update();
			rendererRef.current.render(sceneRef.current, cameraRef.current);
		};

		const handleResize = (): void => {
			if (
				!mountRef.current ||
				!cameraRef.current ||
				!rendererRef.current
			) return;

			const width = mountRef.current.clientWidth;
			const height = mountRef.current.clientHeight;

			cameraRef.current.aspect = width / height;
			cameraRef.current.updateProjectionMatrix();
			rendererRef.current.setSize(width, height);
		};

		// Initialize
		initThreeJs();
		loadModel();
		animate();

		window.addEventListener('resize', handleResize);

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(frameIdRef.current);

			if (rendererRef.current && mountRef.current) {
				mountRef.current.removeChild(rendererRef.current.domElement);
				rendererRef.current.dispose();
			}

			if (controlsRef.current) {
				controlsRef.current.dispose();
			}

			sceneRef.current = null;
			cameraRef.current = null;
			rendererRef.current = null;
			controlsRef.current = null;
		};
	}, []);

	return (
		<div
			ref={mountRef}
			style={{
				width: '100vw',
				height: '100vh',
			}}
		/>
	);
};

export default IntroScene;