import { CabinetConfig } from "../config/CabinetConfig";

// Single Responsibility Principle - manages only UI controls
export class ControlPanel {
  private container: HTMLDivElement;
  private config: CabinetConfig;

  constructor(config: CabinetConfig) {
    this.config = config;
    this.container = this.createPanel();
    this.setupControls();
  }

  private createPanel(): HTMLDivElement {
    const panel = document.createElement('div');
    panel.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      width: 300px;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      font-family: Arial, sans-serif;
      font-size: 14px;
      color: #333;
      max-height: 90vh;
      overflow-y: auto;
    `;
    
    panel.innerHTML = `
      <h2 style="margin: 0 0 20px 0; font-size: 18px; color: #222;">Cabinet Controls</h2>
      
      <div class="control-group">
        <h3 style="margin: 15px 0 10px 0; font-size: 16px; color: #444;">Dimensions</h3>
        
        <label style="display: block; margin: 10px 0 5px 0;">
          Width: <span id="width-value">2.0</span>m
          <input type="range" id="width" min="1" max="4" step="0.1" value="2" style="width: 100%;">
        </label>
        
        <label style="display: block; margin: 10px 0 5px 0;">
          Height: <span id="height-value">1.0</span>m
          <input type="range" id="height" min="0.5" max="3" step="0.1" value="1" style="width: 100%;">
        </label>
        
        <label style="display: block; margin: 10px 0 5px 0;">
          Depth: <span id="depth-value">1.0</span>m
          <input type="range" id="depth" min="0.5" max="2" step="0.1" value="1" style="width: 100%;">
        </label>
      </div>
      
      <div class="control-group">
        <h3 style="margin: 15px 0 10px 0; font-size: 16px; color: #444;">Wood Material</h3>
        
        <label style="display: block; margin: 10px 0 5px 0;">
          Color:
          <input type="color" id="wood-color" value="#8b5a2b" style="width: 100%; height: 30px; border: 1px solid #ccc; border-radius: 4px;">
        </label>
        
        <label style="display: block; margin: 10px 0 5px 0;">
          Roughness: <span id="wood-roughness-value">0.6</span>
          <input type="range" id="wood-roughness" min="0" max="1" step="0.05" value="0.6" style="width: 100%;">
        </label>
        
        <label style="display: block; margin: 10px 0 5px 0;">
          Metalness: <span id="wood-metalness-value">0.1</span>
          <input type="range" id="wood-metalness" min="0" max="1" step="0.05" value="0.1" style="width: 100%;">
        </label>
      </div>
      
      <div class="control-group">
        <h3 style="margin: 15px 0 10px 0; font-size: 16px; color: #444;">Metal Material</h3>
        
        <label style="display: block; margin: 10px 0 5px 0;">
          Color:
          <input type="color" id="metal-color" value="#aaaaaa" style="width: 100%; height: 30px; border: 1px solid #ccc; border-radius: 4px;">
        </label>
        
        <label style="display: block; margin: 10px 0 5px 0;">
          Roughness: <span id="metal-roughness-value">0.2</span>
          <input type="range" id="metal-roughness" min="0" max="1" step="0.05" value="0.2" style="width: 100%;">
        </label>
        
        <label style="display: block; margin: 10px 0 5px 0;">
          Metalness: <span id="metal-metalness-value">0.9</span>
          <input type="range" id="metal-metalness" min="0" max="1" step="0.05" value="0.9" style="width: 100%;">
        </label>
      </div>
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p style="margin: 0; font-size: 12px; color: #666;">
          <strong>Camera Controls:</strong><br>
          • Left Click + Drag: Rotate view<br>
          • Right Click + Drag: Pan camera<br>
          • Scroll Wheel: Zoom in/out
        </p>
      </div>
    `;
    
    document.body.appendChild(panel);
    return panel;
  }

  private setupControls(): void {
    const cfg = this.config.getConfig();
    
    // Dimension controls
    this.setupSlider('width', cfg.width, (value) => {
      const height = parseFloat((document.getElementById('height') as HTMLInputElement).value);
      const depth = parseFloat((document.getElementById('depth') as HTMLInputElement).value);
      this.config.setDimensions(value, height, depth);
    });
    
    this.setupSlider('height', cfg.height, (value) => {
      const width = parseFloat((document.getElementById('width') as HTMLInputElement).value);
      const depth = parseFloat((document.getElementById('depth') as HTMLInputElement).value);
      this.config.setDimensions(width, value, depth);
    });
    
    this.setupSlider('depth', cfg.depth, (value) => {
      const width = parseFloat((document.getElementById('width') as HTMLInputElement).value);
      const height = parseFloat((document.getElementById('height') as HTMLInputElement).value);
      this.config.setDimensions(width, height, value);
    });
    
    // Wood material controls
    this.setupColorPicker('wood-color', cfg.woodColor, (color) => {
      this.config.setWoodColor(color);
    });
    
    this.setupSlider('wood-roughness', cfg.woodRoughness, (value) => {
      const metalness = parseFloat((document.getElementById('wood-metalness') as HTMLInputElement).value);
      this.config.setWoodProperties(value, metalness);
    });
    
    this.setupSlider('wood-metalness', cfg.woodMetalness, (value) => {
      const roughness = parseFloat((document.getElementById('wood-roughness') as HTMLInputElement).value);
      this.config.setWoodProperties(roughness, value);
    });
    
    // Metal material controls
    this.setupColorPicker('metal-color', cfg.metalColor, (color) => {
      this.config.setMetalColor(color);
    });
    
    this.setupSlider('metal-roughness', cfg.metalRoughness, (value) => {
      const metalness = parseFloat((document.getElementById('metal-metalness') as HTMLInputElement).value);
      this.config.setMetalProperties(value, metalness);
    });
    
    this.setupSlider('metal-metalness', cfg.metalMetalness, (value) => {
      const roughness = parseFloat((document.getElementById('metal-roughness') as HTMLInputElement).value);
      this.config.setMetalProperties(roughness, value);
    });
  }

  private setupSlider(id: string, _initialValue: number, onChange: (value: number) => void): void {
    const slider = document.getElementById(id) as HTMLInputElement;
    const valueDisplay = document.getElementById(`${id}-value`);
    
    slider.addEventListener('input', () => {
      const value = parseFloat(slider.value);
      if (valueDisplay) {
        valueDisplay.textContent = value.toFixed(1);
      }
      onChange(value);
    });
  }

  private setupColorPicker(id: string, initialColor: number, onChange: (color: number) => void): void {
    const picker = document.getElementById(id) as HTMLInputElement;
    
    // Convert number color to hex string
    const hexColor = '#' + initialColor.toString(16).padStart(6, '0');
    picker.value = hexColor;
    
    picker.addEventListener('input', () => {
      // Convert hex string to number
      const color = parseInt(picker.value.replace('#', ''), 16);
      onChange(color);
    });
  }

  dispose(): void {
    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
}
