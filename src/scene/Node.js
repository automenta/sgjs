--- a/src/scene/Node.js
+++ b/src/scene/Node.js
@@ -10,6 +10,15 @@
     this.transform = options.transform || [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
     this.parent = null;
     this.children = [];
+  }
+
+  containsPoint(x, y) {
+    const transformMatrix = new TransformMatrix(this.transform);
+    const [localX, localY] = transformMatrix.invert().applyToPoint([x, y]);
+    return (
+      localX >= 0 && localX <= this.size[0] && localY >= 0 && localY <= this.size[1]
+    );
   }
 
   update(dt) {

