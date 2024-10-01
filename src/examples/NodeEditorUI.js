import { gl } from '../utils/webgl';

class NodeEditorUI {
  constructor(nodeEditor) {
    this.nodeEditor = nodeEditor;
    this.nodeSizeWidth = document.getElementById('node-size-width');
    this.nodeSizeHeight = document.getElementById('node-size-height');
    this.nodeColor = document.getElementById('node-color');
    this.closeNodeEditorButton = document.getElementById('close-node-editor');
    this.selectedNode = null;
    this.zoomSlider = document.getElementById('zoom-slider');
    this.zoomIndicator = document.getElementById('zoom-indicator');
    this.zoomResetButton = document.getElementById('zoom-reset');
  }

  handleNodeSelection(node) {
    this.selectedNode = node;
    this.nodeSizeWidth.value = node.size[0];
    this.nodeSizeHeight.value = node.size[1];
    this.nodeColor.value = `#${node.color.slice(0, 3).map(c => Math.round(c * 255).toString(16).padStart(2, '0')).join('')}`;
  }

  handleNodeDeselection() {
    this.selectedNode = null;
    this.nodeSizeWidth.value = 100;
    this.nodeSizeHeight.value = 50;
    this.nodeColor.value = '#000000';
    this.zoomSlider.value = this.nodeEditor.renderer.getZoom();
    this.zoomIndicator.textContent = `${Math.round(this.nodeEditor.renderer.getZoom() * 100)}%`;
  }

  setupEventListeners() {
    this.nodeSizeWidth.addEventListener('input', (event) => {
      if (this.selectedNode) {
        this.selectedNode.setSize(parseFloat(event.target.value), this.selectedNode.size[1]);
        this.nodeEditor.renderer.renderScene(this.nodeEditor.scene);
      }
    });

    this.nodeSizeHeight.addEventListener('input', (event) => {
      if (this.selectedNode) {
        this.selectedNode.setSize(this.selectedNode.size[0], parseFloat(event.target.value));
        this.nodeEditor.renderer.renderScene(this.nodeEditor.scene);
      }
    });

    this.nodeColor.addEventListener('input', (event) => {
      if (this.selectedNode) {
        const color = parseInt(event.target.value.slice(1), 16);
        this.selectedNode.setColor([
          ((color >> 16) & 0xFF) / 255,
          ((color >> 8) & 0xFF) / 255,
          (color & 0xFF) / 255,
          1,
        ]);
        this.nodeEditor.renderer.renderScene(this.nodeEditor.scene);
      }
    });

    this.closeNodeEditorButton.addEventListener('click', () => {
      this.handleNodeDeselection();
    });

    this.zoomSlider.addEventListener('input', (event) => {
      this.nodeEditor.renderer.zoomTo(parseFloat(event.target.value));
      this.zoomIndicator.textContent = `${Math.round(parseFloat(event.target.value) * 100)}%`;
    });

    this.zoomSlider.addEventListener('change', (event) => {
      this.nodeEditor.renderer.zoomTo(parseFloat(event.target.value));
      this.zoomIndicator.textContent = `${Math.round(parseFloat(event.target.value) * 100)}%`;
    });

    this.zoomResetButton.addEventListener('click', () => {
      this.nodeEditor.renderer.zoomTo(1);
      this.zoomSlider.value = 1;
      this.zoomIndicator.textContent = '100%';
    });
  }
}

export default NodeEditorUI;
