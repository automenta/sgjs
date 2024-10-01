import Renderer from '../rendering/Renderer';
import Scene from '../scene/Scene';
import SceneController from './SceneController';
import InputHandler from './InputHandler';
import NodeEditorUI from './NodeEditorUI';
 
 class NodeEditor {
   constructor(canvas) {
@@ -1100,6 +1106,12 @@
       }
     });
 
+    // Zoom to selection
+    this.inputHandler.addHandler('zoomToSelection', () => {
+      const selectedNode = this.nodeEditorUI.selectedNode;
+      if (selectedNode) {
+        this.renderer.zoomTo(1); // Adjust zoom level as needed
+      }
+    });
     // Start the rendering loop
     function render() {
       this.sceneController.update();
@@ -1110,6 +1122,7 @@
     // Add event listeners for user input
     this.canvas.addEventListener('mousemove', (event) => this.inputHandler.handleEvent({ type: 'pan', x: event.offsetX, y: event.offsetY }));
     this.canvas.addEventListener('wheel', (event) => this.inputHandler.handleEvent({ type: 'zoom', deltaY: event.deltaY }));
+    this.canvas.addEventListener('keydown', (event) => { if (event.key === ' ') this.inputHandler.handleEvent({ type: 'zoomToSelection' }) });
     this.canvas.addEventListener('click', (event) => this.inputHandler.handleEvent({ type: 'click', x: event.offsetX, y: event.offsetY }));
 
     // Add event listeners for node editing
@@ -1123,6 +1136,7 @@
       }
     });
   }
+
 }
 
 export default NodeEditor;
