# 3D Cabinet Builder with SOLID & OOP Principles

A TypeScript-based 3D cabinet visualization application built with Three.js, demonstrating SOLID principles and Object-Oriented Programming concepts.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd ts-simple-oops-solid

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🏗️ Architecture Overview

This project demonstrates a clean, maintainable architecture following SOLID principles and OOP best practices.

### Project Structure
```
src/
├── components/          # 3D Components (Door, Panel, Handle)
├── config/             # Configuration management
├── core/               # Core abstractions and factories
├── interfaces/         # SOLID interfaces
├── objects/            # Complex objects (Cabinet)
├── scene/             # Scene management
└── ui/                 # User interface controls
```

## 📐 SOLID Principles Implementation

### 1. Single Responsibility Principle (SRP)
Each class has **one reason to change**:

- **`CabinetConfig`**: Only manages configuration state
- **`ControlPanel`**: Only handles UI controls  
- **`MaterialFactory`**: Only creates materials
- **`GeometryFactory`**: Only creates geometries
- **`SceneManager`**: Only manages the 3D scene

```typescript
// Example: CabinetConfig has single responsibility
export class CabinetConfig {
  // Only manages cabinet configuration
  // No UI logic, no 3D rendering, no business logic
}
```

### 2. Open/Closed Principle (OCP)
Classes are **open for extension, closed for modification**:

```typescript
// Cabinet is open for extension via configuration
export class Cabinet implements IRebuildable {
  constructor(config: CabinetConfig) {
    // Configuration-driven, no hardcoded values
  }
}

// Component3D allows new components without modification
export abstract class Component3D {
  abstract createGeometry(): THREE.BufferGeometry;
  // New components extend this without changing base class
}
```

### 3. Liskov Substitution Principle (LSP)
Subclasses can **replace their base classes**:

```typescript
// All components can be substituted for Component3D
const components: Component3D[] = [
  new Door(width, height, thickness, material),
  new Panel(width, height, depth, material),
  new Handle(radius, length, material)
];

// Each implements createGeometry() correctly
components.forEach(component => {
  const geometry = component.createGeometry(); // Works for all
});
```

### 4. Interface Segregation Principle (ISP)
**Small, focused interfaces** instead of large ones:

```typescript
// Instead of one large interface, we have focused ones:
export interface IDimensionable {
  setDimensions(width: number, height: number, depth: number): void;
}

export interface IColorable {
  setColor(color: number): void;
}

export interface IMaterializable {
  setMaterial(material: THREE.Material): void;
}

// Classes only implement interfaces they need
export class Cabinet implements IRebuildable {
  // Only implements what it needs
}
```

### 5. Dependency Inversion Principle (DIP)
Depend on **abstractions, not concretions**:

```typescript
// Cabinet depends on abstraction (interface)
export class Cabinet implements IRebuildable {
  constructor(config: CabinetConfig) {
    // Depends on abstraction, not concrete implementation
  }
}

// Configuration is injected, not created internally
const config = new CabinetConfig();
const cabinet = new Cabinet(config); // Dependency injection
```

## 🎯 Object-Oriented Programming Concepts

### 1. Encapsulation
**Data hiding** and controlled access:

```typescript
export class CabinetConfig {
  private config: CabinetConfiguration; // Private data
  private observers: Function[] = [];   // Hidden implementation
  
  // Controlled access through public methods
  public setDimensions(width: number, height: number, depth: number): void {
    this.config.width = width;
    this.notify(); // Internal notification system
  }
}
```

### 2. Inheritance
**Code reuse** through class hierarchy:

```typescript
// Base class with common functionality
export abstract class Component3D {
  protected mesh: THREE.Mesh;
  protected material: THREE.Material;
  
  constructor(material: THREE.Material) {
    this.material = material;
    this.mesh = new THREE.Mesh();
  }
  
  abstract createGeometry(): THREE.BufferGeometry;
}

// Subclasses inherit and extend
export class Door extends Component3D {
  createGeometry(): THREE.BufferGeometry {
    return GeometryFactory.createBox(this.width, this.height, this.thickness);
  }
}
```

### 3. Polymorphism
**Same interface, different behavior**:

```typescript
// Each component implements createGeometry() differently
const door = new Door(1, 2, 0.1, material);
const panel = new Panel(1, 2, 0.1, material);
const handle = new Handle(0.1, 0.5, material);

// Same method call, different implementations
door.createGeometry();    // Returns box geometry
panel.createGeometry();   // Returns box geometry  
handle.createGeometry();  // Returns cylinder geometry
```

### 4. Abstraction
**Hide complexity** behind simple interfaces:

```typescript
// Abstract base class defines contract
export abstract class Component3D {
  abstract createGeometry(): THREE.BufferGeometry;
  
  build(): THREE.Object3D {
    this.mesh.geometry = this.createGeometry(); // Delegates to subclass
    return this.mesh;
  }
}

// Concrete implementations handle details
export class Door extends Component3D {
  createGeometry(): THREE.BufferGeometry {
    // Specific implementation details hidden
    return GeometryFactory.createBox(this.width, this.height, this.thickness);
  }
}
```

## 🎨 Design Patterns Used

### 1. Factory Pattern
**Centralized object creation**:

```typescript
// MaterialFactory - creates materials
const wood = MaterialFactory.createWoodMaterial(color, roughness, metalness);
const metal = MaterialFactory.createMetalMaterial(color, roughness, metalness);

// GeometryFactory - creates geometries  
const box = GeometryFactory.createBox(width, height, depth);
const cylinder = GeometryFactory.createCylinder(radius, height);
```

### 2. Observer Pattern
**Loose coupling** through event notification:

```typescript
// CabinetConfig notifies observers of changes
export class CabinetConfig {
  private observers: Function[] = [];
  
  subscribe(observer: Function): void {
    this.observers.push(observer);
  }
  
  private notify(): void {
    this.observers.forEach(observer => observer(this.config));
  }
}

// Cabinet subscribes to configuration changes
this.config.subscribe(() => this.rebuild());
```

### 3. Composite Pattern
**Tree structure** of objects:

```typescript
// Cabinet contains multiple components
export class Cabinet {
  private group: THREE.Group;
  
  build() {
    this.group.add(
      topPanel.build(),
      leftDoor.build(),
      rightDoor.build(),
      // ... more components
    );
  }
}
```

### 4. Template Method Pattern
**Algorithm skeleton** with customizable steps:

```typescript
// Component3D defines the algorithm
export abstract class Component3D {
  build(): THREE.Object3D {
    this.mesh.geometry = this.createGeometry(); // Abstract step
    this.mesh.material = this.material;         // Concrete step
    return this.mesh;                           // Concrete step
  }
  
  abstract createGeometry(): THREE.BufferGeometry; // Subclasses implement
}
```

## 🎮 Usage

### Interactive Controls
- **Left Click + Drag**: Rotate camera around cabinet
- **Right Click + Drag**: Pan camera
- **Scroll Wheel**: Zoom in/out
- **Control Panel**: Adjust cabinet dimensions and materials in real-time

### Configuration Options
- **Dimensions**: Width, Height, Depth
- **Wood Material**: Color, Roughness, Metalness
- **Metal Material**: Color, Roughness, Metalness

## 🔧 Development

### Adding New Components
1. Extend `Component3D`:
```typescript
export class NewComponent extends Component3D {
  createGeometry(): THREE.BufferGeometry {
    return GeometryFactory.createBox(width, height, depth);
  }
}
```

2. Add to Cabinet:
```typescript
const newComponent = new NewComponent(dimensions, material);
this.group.add(newComponent.build());
```

### Adding New Materials
1. Extend `MaterialFactory`:
```typescript
static createGlassMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.8
  });
}
```

### Adding New Interfaces
1. Create focused interface:
```typescript
export interface IResizable {
  resize(scale: number): void;
}
```

2. Implement in classes that need it:
```typescript
export class Cabinet implements IRebuildable, IResizable {
  resize(scale: number): void {
    // Implementation
  }
}
```

---

This project serves as a practical example of how SOLID principles and OOP concepts create maintainable, extensible software architecture.
