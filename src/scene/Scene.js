--- a/src/scene/Scene.js
+++ b/src/scene/Scene.js
@@ -1,15 +1,13 @@
---- a/src/scene/Scene.js
-+++ b/src/scene/Scene.js
-@@ -19,7 +19,7 @@
- 4│   }
- 5│ 
- 6█   getNodeAtPoint(x, y) { // Find the node at a given point (for selection)
- 7█-    return this.nodes.find((node) => node.containsPoint(x, y));
- 8█+    return this.nodes.find(node => node.containsPoint(x, y));
- 9│   }
-10█ }
-11│ 
-12│ 
+import Node from './Node';
 
+class Scene {
+  constructor() {
+    this.nodes = [];
+  }
+
+  addNode(node) {
+    this.nodes.push(node);
+  }
+
+  getNodeAtPoint(x, y) { // Find the node at a given point (for selection)
+    return this.nodes.find(node => node.containsPoint(x, y));
+  }
+}
+
+export default Scene;
