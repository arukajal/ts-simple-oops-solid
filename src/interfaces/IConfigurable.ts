// Interface Segregation Principle - separate interfaces for different concerns
import * as THREE from "three";

export interface IDimensionable {
  setDimensions(width: number, height: number, depth: number): void;
}

export interface IColorable {
  setColor(color: number): void;
}

export interface IMaterializable {
  setMaterial(material: THREE.Material): void;
}

export interface IPositionable {
  setPosition(x: number, y: number, z: number): void;
}

export interface IRebuildable {
  rebuild(): void;
}

export interface IAnimatable {
  update(deltaTime: number): void;
}

export interface IInteractable {
  onClick(): void;
  isClickable(): boolean;
}
