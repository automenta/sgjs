class NodeEditorUI {
  constructor(nodeEditor) {
    this.nodeEditor = nodeEditor;
    this.nodeEditorUI = document.getElementById('node-editor-ui');
    this.nodeId = document.getElementById('node-id');
    this.nodeType = document.getElementById('node-type');
    this.nodePositionX = document.getElementById('node-position-x');
    this.nodePositionY = document.getElementById('node-position-y');
    this.nodeSizeWidth = document.getElementById('node-size-width');
    this.nodeSizeHeight = document.getElementById('node-size-height');
    this.nodeColor = document.getElementById('node-color');
    this.closeNodeEditorButton = document.getElementById('close-node-editor');
    this.selectedNode = null;
  }

  handleNodeSelection(node) {
    this.selectedNode = node;
    this.updateUI();
    this.nodeEditorUI.style.display = 'block';
  }

  handleNodeDeselection() {
    this.selectedNode = null;
    this.updateUI();
    this.nodeEditorUI.style.display = 'none';
  }

  updateUI() {
    if (this.selectedNode) {
      this.nodeId.textContent = this.selectedNode.id;
      this.nodeType.textContent = this.selectedNode.type;
      this.nodePositionX.value = this.selectedNode.position[0];
      this.nodePositionY.value = this.selectedNode.position[1];
      this.nodeSizeWidth.value = this.selectedNode.size[0];
      this.nodeSizeHeight.value = this.selectedNode.size[1];
      this.nodeColor.value = `#${this.selectedNode.color.slice(0, 3).map(c => Math.round(c * 255).toString(16).padStart(2, '0')).join('')}`;
    } else {
      this.nodeId.textContent = '';
      this.nodeType.textContent = '';
      this.nodePositionX.value = 0;
      this.nodePositionY.value = 0;
      this.nodeSizeWidth.value = 100;
      this.nodeSizeHeight.value = 50;
      this.nodeColor.value = '#000000';
    }
  }

  setupEventListeners() {
    this.nodePositionX.addEventListener('change', (event) => {
      if (this.selectedNode) {
        this.selectedNode.position[0] = parseFloat(event.target.value);
      }
    });
    this.nodePositionY.addEventListener('change', (event) => {
      if (this.selectedNode) {
        this.selectedNode.position[1] = parseFloat(event.target.value);
      }
    });
    this.nodeSizeWidth.addEventListener('change', (event) => {
      if (this.selectedNode) {
        this.selectedNode.size[0] = parseFloat(event.target.value);
      }
    });
    this.nodeSizeHeight.addEventListener('change', (event) => {
      if (this.selectedNode) {
        this.selectedNode.size[1] = parseFloat(event.target.value);
      }
    });
    this.nodeColor.addEventListener('change', (event) => {
      if (this.selectedNode) {
        this.selectedNode.color = [
          parseInt(event.target.value.substring(1, 3), 16) / 255,
          parseInt(event.target.value.substring(3, 5), 16) / 255,
          parseInt(event.target.value.substring(5, 7), 16) / 255,
          1,
        ];
      }
    });
    this.closeNodeEditorButton.addEventListener('click', () => {
      this.handleNodeDeselection();
    });
  }
}

export default NodeEditorUI;
