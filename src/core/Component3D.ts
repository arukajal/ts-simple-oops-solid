import * as THREE from "three";

export abstract class Component3D {
  protected mesh: THREE.Mesh;
  protected material: THREE.Material;

  constructor(material: THREE.Material) {
    this.material = material;
    this.mesh = new THREE.Mesh();
  }

  abstract createGeometry(): THREE.BufferGeometry;

  build(): THREE.Object3D {
    this.mesh.geometry = this.createGeometry();
    this.mesh.material = this.material;
    return this.mesh;
  }

  setPosition(x: number, y: number, z: number): void {
    this.mesh.position.set(x, y, z);
  }

  getMesh(): THREE.Mesh {
    return this.mesh;
  }
}
