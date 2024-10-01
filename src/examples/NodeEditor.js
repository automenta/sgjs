import Renderer from '../rendering/Renderer';
import Scene from '../scene/Scene';
import SceneController from './SceneController';
import InputHandler from './InputHandler';
import NodeEditorUI from './NodeEditorUI';
 
 class NodeEditor {
@@ -1100,28 +1106,28 @@
       }
     });
 
+    // Start the rendering loop
     function render() {
       this.sceneController.update();
       requestAnimationFrame(render);
     }
-    render();
-
-    // Add event listeners for user input
-    this.canvas.addEventListener('mousemove', (event) => this.inputHandler.handleEvent({ type: 'pan', x: event.offsetX, y: event.offsetY }));
-    this.canvas.addEventListener('wheel', (event) => this.inputHandler.handleEvent({ type: 'zoom', deltaY: event.deltaY }));
-    this.canvas.addEventListener('click', (event) => this.inputHandler.handleEvent({ type: 'click', x: event.offsetX, y: event.offsetY }));
-
-    // Add event listeners for node editing
-    this.canvas.addEventListener('mousedown', (event) => {
-      const node = this.scene.getNodeAtPoint(event.offsetX, event.offsetY);
-      if (node) {
-        this.nodeEditorUI.handleNodeSelection(node);
-      } else {
-        this.nodeEditorUI.handleNodeDeselection();
-      }
-    });
+    render();
+
+    // Add event listeners for user input
+    this.canvas.addEventListener('mousemove', (event) => this.inputHandler.handleEvent({ type: 'pan', x: event.offsetX, y: event.offsetY }));
+    this.canvas.addEventListener('wheel', (event) => this.inputHandler.handleEvent({ type: 'zoom', deltaY: event.deltaY }));
+    this.canvas.addEventListener('click', (event) => this.inputHandler.handleEvent({ type: 'click', x: event.offsetX, y: event.offsetY }));
+
+    // Add event listeners for node editing
+    this.canvas.addEventListener('mousedown', (event) => {
+      const node = this.scene.getNodeAtPoint(event.offsetX, event.offsetY);
+      if (node) {
+        this.nodeEditorUI.handleNodeSelection(node);
+      } else {
+        this.nodeEditorUI.handleNodeDeselection();
+      }
+    });
   }
 }
 

