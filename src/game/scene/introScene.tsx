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
	const chandelierLightRef = useRef<THREE.SpotLight | null>(null);

	useEffect(() => {
		if (!mountRef.current) return;

		const initThreeJs = (): void => {
			if (!mountRef.current) return;

			// Scene
			const scene = new THREE.Scene();
			scene.background = new THREE.Color("rgba(0,255,72,0.66)");
			sceneRef.current = scene;

			// Camera
			const camera = new THREE.PerspectiveCamera(
				90,
				mountRef.current.clientWidth / mountRef.current.clientHeight,
				1,
				1000
			);
			camera.position.set(0.9, 0.5, 1.25);
			cameraRef.current = camera;

			// Renderer with improved settings
			const renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true
			});
			renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.outputColorSpace = THREE.SRGBColorSpace;
			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 부드러운 그림자
			mountRef.current.appendChild(renderer.domElement);
			rendererRef.current = renderer;

			// Controls
			const controls = new OrbitControls(camera, renderer.domElement);
			controls.enableDamping = true;
			controls.dampingFactor = 0.05;
			controls.target.set(0, 0, 0);
			controlsRef.current = controls;

			// Lights
			const ambientLight = new THREE.AmbientLight(0xffffff, 2.7);
			scene.add(ambientLight);

			const mainLight = new THREE.DirectionalLight(0xffffff, 1);
			mainLight.position.set(10, 10, 10);
			mainLight.castShadow = true;
			scene.add(mainLight);

			// Enhanced chandelier light
			const chandelierLight = new THREE.SpotLight(
				"#1800ff", // 색상
				2, // 강도
				10, // 거리
				Math.PI / 4, // 각도
				0.5, // 페널티
				1 // 감쇠
			);
			chandelierLight.position.set(0, 2, 0); // 천장에서 아래로
			chandelierLight.castShadow = true;
			chandelierLight.shadow.mapSize.width = 1024;
			chandelierLight.shadow.mapSize.height = 1024;
			chandelierLight.shadow.camera.near = 0.1;
			chandelierLight.shadow.camera.far = 10;
			scene.add(chandelierLight);
			chandelierLightRef.current = chandelierLight;

			// 빛 시각화를 위한 요소들
			// SpotLight Helper
			const spotLightHelper = new THREE.SpotLightHelper(chandelierLight);
			scene.add(spotLightHelper);

			// 빛 원뿔 시각화
			const geometry = new THREE.ConeGeometry(
				Math.tan(Math.PI / 4) * 10, // 밑면 반지름
				10, // 높이
				32 // 분할 수
			);
			const material = new THREE.MeshBasicMaterial({
				color: "#1800ff",
				transparent: true,
				opacity: 0.1,
				side: THREE.DoubleSide
			});
			const lightCone = new THREE.Mesh(geometry, material);
			lightCone.position.copy(chandelierLight.position);
			lightCone.rotation.x = Math.PI; // 원뿔을 뒤집어서 빛이 아래로 향하게 함
			scene.add(lightCone);

			// 빛줄기 효과
			const beamGeometry = new THREE.CylinderGeometry(0.05, 0.05, 10, 8);
			const beamMaterial = new THREE.MeshBasicMaterial({
				color: "#1800ff",
				transparent: true,
				opacity: 0.3
			});
			const lightBeam = new THREE.Mesh(beamGeometry, beamMaterial);
			lightBeam.position.copy(chandelierLight.position);
			lightBeam.position.y -= 5; // 빛줄기를 아래로 이동
			scene.add(lightBeam);

			const fillLight = new THREE.DirectionalLight("#412c2c", .5);
			fillLight.position.set(-10, 5, -10);
			scene.add(fillLight);

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

					model.traverse((node) => {
						if (node instanceof THREE.Mesh) {
							node.castShadow = true;
							node.receiveShadow = true;
						}
					});

					const box = new THREE.Box3().setFromObject(model);
					const center = box.getCenter(new THREE.Vector3());
					const size = box.getSize(new THREE.Vector3());

					const maxDim = Math.max(size.x, size.y, size.z);
					const scale = 3 / maxDim;
					model.scale.multiplyScalar(scale);

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

		// 빛 애니메이션
		const animateLights = (): void => {
			if (chandelierLightRef.current) {
				// 빛의 강도를 시간에 따라 미세하게 변화
				const time = Date.now() * 0.001;
				chandelierLightRef.current.intensity = 2 + Math.sin(time * 2) * 0.2;
			}
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

			animateLights();
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

		initThreeJs();
		loadModel();
		animate();

		window.addEventListener('resize', handleResize);

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