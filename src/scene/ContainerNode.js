import Node from './Node';

class ContainerNode extends Node {
  constructor(id, type, props) {
    super(id, type, props);
    this.layout = null;
   }

  addChild(child) {
    super.addChild(child);
-    // Apply layout if a layout manager is set
     if (this.layout) {
       this.layout.applyLayout(this);
     }
   }
 
   removeChild(child) {
     super.removeChild(child);
-    // Apply layout if a layout manager is set
     if (this.layout) {
       this.layout.applyLayout(this);
     }
@@ -32,7 +32,6 @@
   setLayout(layout) {
     this.layout = layout;
     this.layout.applyLayout(this);
-  }
 
   // Methods for rendering the container node
   render(renderer) {

