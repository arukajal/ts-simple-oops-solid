import * as THREE from "three";
import { Component3D } from "../core/Component3D";
import { GeometryFactory } from "../core/GeometryFactory";

export const DoorSide = {
  LEFT: 0,
  RIGHT: 1
} as const;

export type DoorSideType = typeof DoorSide[keyof typeof DoorSide];

export class Door extends Component3D {
  private width: number;
  private height: number;
  private thickness: number;
  private doorGroup: THREE.Group;

  constructor(
    width: number,
    height: number,
    thickness: number,
    material: THREE.Material
  ) {
    super(material);
    this.width = width;
    this.height = height;
    this.thickness = thickness;
    this.doorGroup = new THREE.Group();
  }

  createGeometry(): THREE.BufferGeometry {
    return GeometryFactory.createBox(this.width, this.height, this.thickness);
  }
  
  build(): THREE.Object3D {
    // Create the door mesh
    this.mesh.geometry = this.createGeometry();
    this.mesh.material = this.material;
    
    // Center the mesh in the group (no offset needed for static doors)
    this.mesh.position.set(0, 0, 0);
    
    // Add mesh to group
    this.doorGroup.add(this.mesh);
    
    return this.doorGroup;
  }
  
  setPosition(x: number, y: number, z: number): void {
    this.doorGroup.position.set(x, y, z);
  }
  
  getObject(): THREE.Object3D {
    return this.doorGroup;
  }
  
  attachHandle(handle: THREE.Object3D): void {
    this.doorGroup.add(handle);
  }
}
