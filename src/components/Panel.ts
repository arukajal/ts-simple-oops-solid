import { Component3D } from "../core/Component3D";
import { GeometryFactory } from "../core/GeometryFactory";
import * as THREE from "three";


export class Panel extends Component3D {
  private width: number;
  private height: number;
  private depth: number;

  constructor(
    width: number,
    height: number,
    depth: number,
    material: THREE.Material
  ) {
    super(material);
    this.width = width;
    this.height = height;
    this.depth = depth;
  }

  createGeometry(): THREE.BufferGeometry {
    return GeometryFactory.createBox(this.width, this.height, this.depth);
  }
}
