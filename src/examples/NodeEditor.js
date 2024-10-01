import Renderer from '../rendering/Renderer';
import Scene from '../scene/Scene';
import SceneController from './SceneController';
import InputHandler from './InputHandler';
import NodeEditorUI from './NodeEditorUI';

class NodeEditor {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new Renderer(canvas);
    this.scene = new Scene();
    this.sceneController = new SceneController(this.scene, this.renderer);
    this.inputHandler = new InputHandler(canvas);
    this.nodeEditorUI = new NodeEditorUI(this.scene, this.renderer.canvas);
 
     // Register node renderers
@@ -1094,28 +1168,14 @@
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
     });
   }
-
-  // ... (rest of the code)
-
-  // ... (rest of the code)
-
-  // ... (rest of the code)
-
-  // ... (rest of the code)
-
-  // ... (rest of the code)
-
-  // ... (rest of the code)
-
-  // ... (rest of the code)
+  
+  // ... (rest of the code)
+  
+  // ... (rest of the code)
+  
+  // ... (rest of the code)
+  
+  // ... (rest of the code)
+  
+  // ... (rest of the code)
+  
+  // ... (rest of the code)
 }
 

