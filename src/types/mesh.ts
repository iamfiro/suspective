import * as THREE from 'three';

export interface MeshWithMaterial extends THREE.Object3D {
	material?: THREE.Material;
	geometry?: THREE.BufferGeometry;
}