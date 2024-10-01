--- a/src/scene/Scene.js
+++ b/src/scene/Scene.js
@@ -19,7 +19,7 @@
   }
 
   getNodeAtPoint(x, y) { // Find the node at a given point (for selection)
-    return this.nodes.find(node => node.containsPoint(x, y));
+    return this.nodes.find((node) => node.containsPoint(x, y));
   }
 }
 

