class InputManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.handlers = {};
    this.currentMode = 'pan';
    this.isDragging = false;
    this.lastMousePosition = [0, 0];
    this.selectedNode = null;
 
-    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
-    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
-    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
-    this.canvas.addEventListener('wheel', this.handleWheel.bind(this));
-    this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
-    this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
-    this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
+    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
+    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
+    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
+    this.canvas.addEventListener('wheel', this.onWheel.bind(this));
+    this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this));
+    this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this));
+    this.canvas.addEventListener('touchend', this.onTouchEnd.bind(this));
   }
 
   addHandler(mode, handler) {
@@ -100,36 +106,36 @@
     this.currentMode = mode;
   }
 
-  handleMouseDown(event) {
+  onMouseDown(event) {
     this.isDragging = true;
     this.lastMousePosition = [event.clientX, event.clientY];
 
-    const clickedNode = this.getNodeAtPoint(event.clientX, event.clientY);
+    const clickedNode = this.getNodeAtPoint(event.offsetX, event.offsetY);
     if (clickedNode) {
       this.selectedNode = clickedNode;
       this.currentMode = 'drag';
     }
   }
 
-  handleMouseMove(event) {
+  onMouseMove(event) {
     if (this.isDragging) {
       const dx = event.clientX - this.lastMousePosition[0];
       const dy = event.clientY - this.lastMousePosition[1];
 
       if (this.currentMode === 'pan') {
-        this.handlers[this.currentMode](dx, dy);
+        this.handlers.pan(dx, dy);
       } else if (this.currentMode === 'drag') {
         this.selectedNode.position = [
           this.selectedNode.position[0] + dx,
           this.selectedNode.position[1] + dy,
         ];
       }
-
       this.lastMousePosition = [event.clientX, event.clientY];
     }
   }
 
-  handleMouseUp(event) {
+  onMouseUp(event) {
     this.isDragging = false;
     this.selectedNode = null;
     this.currentMode = 'pan';
@@ -137,23 +143,23 @@
     this.currentMode = 'pan';
   }
 
-  handleWheel(event) {
+  onWheel(event) {
     const factor = event.deltaY > 0 ? 1.1 : 0.9;
-    this.handlers[this.currentMode](factor);
+    this.handlers.zoom(factor);
   }
 
-  handleTouchStart(event) {
+  onTouchStart(event) {
     // ... (handle touch start event)
   }
 
-  handleTouchMove(event) {
+  onTouchMove(event) {
     // ... (handle touch move event)
   }
 
-  handleTouchEnd(event) {
+  onTouchEnd(event) {
     // ... (handle touch end event)
   }
 
-  getNodeAtPoint(x, y) {
+  getNodeAtPoint(x, y) { // Find the node at a given point (for selection)
     // ... (implement logic to find the node at the given point)
   }
 }

