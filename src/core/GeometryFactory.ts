import * as THREE from "three";

export class GeometryFactory {
  static createBox(width: number, height: number, depth: number): THREE.BoxGeometry {
    return new THREE.BoxGeometry(width, height, depth);
  }

  static createCylinder(radius: number, height: number): THREE.CylinderGeometry {
    return new THREE.CylinderGeometry(radius, radius, height, 32);
  }
}
