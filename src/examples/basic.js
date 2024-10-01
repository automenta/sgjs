const canvas = document.getElementById('canvas');
const renderer = new Renderer(canvas);
const camera = new Camera();
const scene = new Scene();
 
 // Create a widget node
@@ -1162,28 +1168,28 @@
       }
     });
 
-    this.canvas.addEventListener('mousemove', (event) => this.inputHandler.handleEvent({ type: 'pan', x: event.offsetX, y: event.offsetY }));
-    this.canvas.addEventListener('wheel', (event) => this.inputHandler.handleEvent({ type: 'zoom', deltaY: event.deltaY }));
-    this.canvas.addEventListener('click', (event) => this.inputHandler.handleEvent({ type: 'click', x: event.offsetX, y: event.offsetY }));
-
     // Start the rendering loop
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
 

