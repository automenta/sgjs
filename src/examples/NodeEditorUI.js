--- a/src/examples/NodeEditorUI.js
+++ b/src/examples/NodeEditorUI.js
@@ -12,6 +12,8 @@
     this.nodeColor = document.getElementById('node-color');
     this.closeNodeEditorButton = document.getElementById('close-node-editor');
     this.selectedNode = null;
+    this.zoomSlider = document.getElementById('zoom-slider');
+    this.zoomIndicator = document.getElementById('zoom-indicator');
   }
 
   handleNodeSelection(node) {
@@ -48,6 +50,8 @@
       this.nodeSizeHeight.value = 50;
       this.nodeColor.value = '#000000';
     }
+    this.zoomSlider.value = this.nodeEditor.renderer.getZoom();
+    this.zoomIndicator.textContent = `${Math.round(this.nodeEditor.renderer.getZoom() * 100)}%`;
   }
 
   setupEventListeners() {
@@ -95,6 +99,14 @@
     this.closeNodeEditorButton.addEventListener('click', () => {
       this.handleNodeDeselection();
     });
+    this.zoomSlider.addEventListener('input', (event) => {
+      this.nodeEditor.renderer.zoomTo(parseFloat(event.target.value));
+      this.zoomIndicator.textContent = `${Math.round(parseFloat(event.target.value) * 100)}%`;
+    });
+    this.zoomSlider.addEventListener('change', (event) => {
+      this.nodeEditor.renderer.zoomTo(parseFloat(event.target.value));
+      this.zoomIndicator.textContent = `${Math.round(parseFloat(event.target.value) * 100)}%`;
+    });
   }
 }
 

