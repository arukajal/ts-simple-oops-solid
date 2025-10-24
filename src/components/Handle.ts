import { Component3D } from "../core/Component3D";
import { GeometryFactory } from "../core/GeometryFactory";
import * as THREE from "three";


export class Handle extends Component3D {
  private radius: number;
  private length: number;

  constructor(radius: number, length: number, material: THREE.Material) {
    super(material);
    this.radius = radius;
    this.length = length;
  }

  createGeometry(): THREE.BufferGeometry {
    return GeometryFactory.createCylinder(this.radius, this.length);
  }
}
