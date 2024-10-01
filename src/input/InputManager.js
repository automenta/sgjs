class InputManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.handlers = {};
@@ -112,36 +118,36 @@
     this.currentMode = mode;
   }
 
-  onMouseDown(event) {
+  handleMouseDown(event) {
     this.isDragging = true;
     this.lastMousePosition = [event.clientX, event.clientY];
 
-    const clickedNode = this.getNodeAtPoint(event.clientX, event.clientY);
+    const clickedNode = this.getNodeAtPoint(event.offsetX, event.offsetY);
     if (clickedNode) {
       this.selectedNode = clickedNode;
       this.currentMode = 'drag';
     }
   }
 
-  onMouseMove(event) {
+  handleMouseMove(event) {
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
+
       this.lastMousePosition = [event.clientX, event.clientY];
     }
   }
 
-  handleMouseUp(event) {
+  handleMouseUp(event) {
     this.isDragging = false;
     this.selectedNode = null;
     this.currentMode = 'pan';
@@ -149,23 +155,23 @@
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

