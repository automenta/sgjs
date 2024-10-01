import Node from './Node';
import TransformMatrix from '../utils/TransformMatrix';

class ShapeNode extends Node {
  constructor(id, type, options) {
    super(id, type, options);
    this.shape = options.shape || 'rect';
    this.color = options.color || [0, 0, 0, 1];
    this.lineWidth = options.lineWidth || 1;
    this.strokeStyle = options.strokeStyle || [0, 0, 0, 1];
+    this.svgPath = options.svgPath || null; // Path to the SVG file
+    this.svgElement = null; // The SVG element
   }
 
   update(dt) {
@@ -20,25 +26,37 @@
     const ctx = renderer.ctx;
     ctx.fillStyle = `rgba(${this.color.join(',')})`;
     ctx.strokeStyle = `rgba(${this.strokeStyle.join(',')})`;
-    ctx.lineWidth = this.lineWidth;
-    const transformMatrix = new TransformMatrix(this.transform);
-    const [x, y] = transformMatrix.applyToPoint([0, 0]);
-    const [width, height] = this.size;
-    switch (this.shape) {
-      case 'rect':
-        ctx.fillRect(x, y, width, height);
-        ctx.strokeRect(x, y, width, height);
-        break;
-      case 'circle':
-        ctx.beginPath();
-        ctx.arc(x + width / 2, y + height / 2, width / 2, 0, 2 * Math.PI);
-        ctx.fill();
-        ctx.stroke();
-        break;
-      default:
-        console.warn(`Unknown shape: ${this.shape}`);
+    if (this.svgPath) {
+      // Render the SVG shape
+      if (!this.svgElement) {
+        // Load the SVG element if it hasn't been loaded yet
+        this.svgElement = this.loadSVG(this.svgPath);
+      }
+      const transformMatrix = new TransformMatrix(this.transform);
+      const [x, y] = transformMatrix.applyToPoint([0, 0]);
+      const [width, height] = this.size;
+      ctx.drawImage(this.svgElement, x, y, width, height);
+    } else {
+      // Render the default shape
+      ctx.lineWidth = this.lineWidth;
+      const transformMatrix = new TransformMatrix(this.transform);
+      const [x, y] = transformMatrix.applyToPoint([0, 0]);
+      const [width, height] = this.size;
+      switch (this.shape) {
+        case 'rect':
+          ctx.fillRect(x, y, width, height);
+          ctx.strokeRect(x, y, width, height);
+          break;
+        case 'circle':
+          ctx.beginPath();
+          ctx.arc(x + width / 2, y + height / 2, width / 2, 0, 2 * Math.PI);
+          ctx.fill();
+          ctx.stroke();
+          break;
+        default:
+          console.warn(`Unknown shape: ${this.shape}`);
+      }
     }
   }
 
@@ -46,4 +64,18 @@
     return this.shape;
   }
 
+  // Method for loading an SVG element from a file
+  loadSVG(path) {
+    return new Promise((resolve, reject) => {
+      const img = new Image();
+      img.onload = () => resolve(img);
+      img.onerror = reject;
+      img.src = path;
+    });
+  }
+}
+
+export default ShapeNode;
+
+
 export default ShapeNode;
