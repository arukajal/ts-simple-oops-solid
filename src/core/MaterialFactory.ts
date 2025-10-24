import * as THREE from "three";

export class MaterialFactory {
  static createWoodMaterial(
    color: number = 0x8b5a2b,
    roughness: number = 0.6,
    metalness: number = 0.1
  ): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness,
    });
  }

  static createMetalMaterial(
    color: number = 0xaaaaaa,
    roughness: number = 0.2,
    metalness: number = 0.9
  ): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness,
    });
  }
}
