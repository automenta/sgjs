class NodeEditorUI {
  constructor(scene, canvas) {
    this.scene = scene;
    this.canvas = canvas;
    this.selectedNode = null;
    this.propertiesPanel = null;
    this.createPropertiesPanel();
  }
 
  createPropertiesPanel() {
    this.propertiesPanel = document.createElement('div');
    this.propertiesPanel.style.position = 'absolute';
    this.propertiesPanel.style.top = '10px';
    this.propertiesPanel.style.right = '10px';
    this.propertiesPanel.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    this.propertiesPanel.style.padding = '10px';
    this.propertiesPanel.style.border = '1px solid #ccc';
    this.propertiesPanel.style.zIndex = '100';
    this.propertiesPanel.style.display = 'none';
    document.body.appendChild(this.propertiesPanel);
  }
 
  updatePropertiesPanel(node) {
    if (node) {
      this.propertiesPanel.innerHTML = '';
      this.propertiesPanel.style.display = 'block';
 
      const positionLabel = document.createElement('label');
      positionLabel.textContent = 'Position:';
      this.propertiesPanel.appendChild(positionLabel);
 
      const positionInput = document.createElement('input');
      positionInput.type = 'text';
      positionInput.value = `${node.position[0]}, ${node.position[1]}`;
      positionInput.addEventListener('change', () => {
        const [x, y] = positionInput.value.split(',').map(Number);
        node.position = [x, y];
      });
      this.propertiesPanel.appendChild(positionInput);
 
      const sizeLabel = document.createElement('label');
      sizeLabel.textContent = 'Size:';
      this.propertiesPanel.appendChild(sizeLabel);
 
      const sizeInput = document.createElement('input');
      sizeInput.type = 'text';
      sizeInput.value = `${node.size[0]}, ${node.size[1]}`;
      sizeInput.addEventListener('change', () => {
        const [width, height] = sizeInput.value.split(',').map(Number);
        node.size = [width, height];
      });
      this.propertiesPanel.appendChild(sizeInput);
 
      const colorLabel = document.createElement('label');
      colorLabel.textContent = 'Color:';
      this.propertiesPanel.appendChild(colorLabel);
 
      const colorInput = document.createElement('input');
      colorInput.type = 'color';
      colorInput.value = `#${node.color.slice(0, 3).map(c => Math.round(c * 255).toString(16).padStart(2, '0')).join('')}`;
      colorInput.addEventListener('change', () => {
        const color = colorInput.value.match(/#[0-9a-f]{6}/i)[0];
        node.color = [
          parseInt(color.substring(1, 3), 16) / 255,
          parseInt(color.substring(3, 5), 16) / 255,
          parseInt(color.substring(5, 7), 16) / 255,
          1,
        ];
      });
      this.propertiesPanel.appendChild(colorInput);
    } else {
      this.propertiesPanel.style.display = 'none';
    }
  }
 
  handleNodeSelection(node) {
    this.selectedNode = node;
    this.updatePropertiesPanel(node);
  }
 
  handleNodeDeselection() {
    this.selectedNode = null;
    this.updatePropertiesPanel(null);
  }
}
 
 export default NodeEditorUI;
