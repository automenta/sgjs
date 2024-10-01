--- a/src/scene/Scene.js
+++ b/src/scene/Scene.js
@@ -19,7 +19,7 @@
   }
 
   getNodeAtPoint(x, y) { // Find the node at a given point (for selection)
-    // TODO: Implement logic to find the node at the given point
+    return this.nodes.find(node => node.containsPoint(x, y));
   }
 }
 

