// Single Responsibility Principle - this class only manages cabinet configuration

export interface CabinetConfiguration {
  width: number;
  height: number;
  depth: number;
  woodColor: number;
  metalColor: number;
  woodRoughness: number;
  woodMetalness: number;
  metalRoughness: number;
  metalMetalness: number;
}

export class CabinetConfig {
  private config: CabinetConfiguration;
  private observers: ((config: CabinetConfiguration) => void)[] = [];

  constructor() {
    this.config = {
      width: 2,
      height: 1,
      depth: 1,
      woodColor: 0x8b5a2b,
      metalColor: 0xaaaaaa,
      woodRoughness: 0.6,
      woodMetalness: 0.1,
      metalRoughness: 0.2,
      metalMetalness: 0.9
    };
  }

  subscribe(observer: (config: CabinetConfiguration) => void): void {
    this.observers.push(observer);
  }

  unsubscribe(observer: (config: CabinetConfiguration) => void): void {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  private notify(): void {
    this.observers.forEach(observer => observer(this.config));
  }

  setDimensions(width: number, height: number, depth: number): void {
    this.config.width = width;
    this.config.height = height;
    this.config.depth = depth;
    this.notify();
  }

  setWoodColor(color: number): void {
    this.config.woodColor = color;
    this.notify();
  }

  setMetalColor(color: number): void {
    this.config.metalColor = color;
    this.notify();
  }

  setWoodProperties(roughness: number, metalness: number): void {
    this.config.woodRoughness = roughness;
    this.config.woodMetalness = metalness;
    this.notify();
  }

  setMetalProperties(roughness: number, metalness: number): void {
    this.config.metalRoughness = roughness;
    this.config.metalMetalness = metalness;
    this.notify();
  }

  getConfig(): CabinetConfiguration {
    return { ...this.config };
  }
}
