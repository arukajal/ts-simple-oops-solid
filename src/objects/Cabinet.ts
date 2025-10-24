import * as THREE from "three";
import { Panel } from "../components/Panel";
import { Door } from "../components/Door";
import { Handle } from "../components/Handle";
import { MaterialFactory } from "../core/MaterialFactory";
import { CabinetConfig } from "../config/CabinetConfig";
import type { IRebuildable } from "../interfaces/IConfigurable";

// Open/Closed Principle - open for extension via configuration, closed for modification
export class Cabinet implements IRebuildable {
  private group: THREE.Group;
  private config: CabinetConfig;

  constructor(config: CabinetConfig) {
    this.group = new THREE.Group();
    this.config = config;
    this.build();
    
    // Subscribe to configuration changes
    this.config.subscribe(() => this.rebuild());
  }

  rebuild(): void {
    // Clear existing objects recursively
    this.disposeObject(this.group);
    
    // Rebuild with new configuration
    this.build();
  }

  private disposeObject(obj: THREE.Object3D): void {
    while (obj.children.length > 0) {
      const child = obj.children[0];
      
      // Recursively dispose children if it's a group
      if (child.children.length > 0) {
        this.disposeObject(child);
      }
      
      // Dispose mesh resources
      if (child instanceof THREE.Mesh) {
        if (child.geometry) {
          child.geometry.dispose();
        }
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => mat.dispose());
          } else {
            child.material.dispose();
          }
        }
      }
      
      obj.remove(child);
    }
  }

  private build() {
    const cfg = this.config.getConfig();
    const wood = MaterialFactory.createWoodMaterial(cfg.woodColor, cfg.woodRoughness, cfg.woodMetalness);
    const metal = MaterialFactory.createMetalMaterial(cfg.metalColor, cfg.metalRoughness, cfg.metalMetalness);

    // Base frame - using configuration dimensions
    const topPanel = new Panel(cfg.width, 0.1, cfg.depth, wood);
    const bottomPanel = new Panel(cfg.width, 0.1, cfg.depth, wood);
    const sidePanelL = new Panel(0.1, cfg.height, cfg.depth, wood);
    const sidePanelR = new Panel(0.1, cfg.height, cfg.depth, wood);
    const backPanel = new Panel(cfg.width - 0.2, cfg.height - 0.2, 0.05, wood);

    topPanel.setPosition(0, cfg.height / 2, 0);
    bottomPanel.setPosition(0, -cfg.height / 2, 0);
    sidePanelL.setPosition(-cfg.width / 2 + 0.05, 0, 0);
    sidePanelR.setPosition(cfg.width / 2 - 0.05, 0, 0);
    backPanel.setPosition(0, 0, -cfg.depth / 2 + 0.025);

    // Doors - proportional to cabinet size
    const doorWidth = (cfg.width - 0.3) / 2;
    const doorHeight = cfg.height - 0.2;
    const leftDoor = new Door(doorWidth, doorHeight, 0.05, wood);
    leftDoor.setPosition(-doorWidth / 2 - 0.05, 0, cfg.depth / 2 + 0.025);

    const rightDoor = new Door(doorWidth, doorHeight, 0.05, wood);
    rightDoor.setPosition(doorWidth / 2 + 0.05, 0, cfg.depth / 2 + 0.025);
    
    // Handles - positioned on the doors and attached to them
    const handleLength = cfg.height * 0.15;
    const leftHandle = new Handle(0.02, handleLength, metal);
    const rightHandle = new Handle(0.02, handleLength, metal);
    
    // Build handles
    const leftHandleMesh = leftHandle.build();
    const rightHandleMesh = rightHandle.build();
    
    // Position handles relative to door center
    // Left handle on the right side of left door (towards center)
    leftHandleMesh.position.set(doorWidth * 0.35, 0, 0.025);
    // Right handle on the left side of right door (towards center)
    rightHandleMesh.position.set(-doorWidth * 0.35, 0, 0.025);
    
    // Attach handles to doors
    leftDoor.attachHandle(leftHandleMesh);
    rightDoor.attachHandle(rightHandleMesh);

    // Add everything (handles are already attached to doors)
    this.group.add(
      topPanel.build(),
      bottomPanel.build(),
      sidePanelL.build(),
      sidePanelR.build(),
      backPanel.build(),
      leftDoor.build(),
      rightDoor.build()
    );
  }

  getObject(): THREE.Group {
    return this.group;
  }
}
