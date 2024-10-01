var TransformMatrix = require('../utils/TransformMatrix');

var Node = function(id, type, options) {
  this.id = id;
  this.type = type;
  this.position = options.position || [0, 0];
  this.size = options.size || [100, 50];
  this.color = options.color || [0, 0, 0, 1];
  this.transform = options.transform || [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  this.parent = null;
  this.children = [];
+  this.inputs = {};
+  this.outputs = {};
+  this.data = {};
 };
 
 Node.prototype.containsPoint = function(x, y) {
@@ -24,6 +32,14 @@
   );
 };
 
+Node.prototype.addInput = function(name, type) {
+  this.inputs[name] = { type: type, value: null };
+};
+
+Node.prototype.addOutput = function(name, type) {
+  this.outputs[name] = { type: type, value: null };
+};
+
 Node.prototype.update = function(dt) {
   this.transform = [
     1, 0, 0, 0,
@@ -38,6 +54,10 @@
     this.transform = parentTransform.toArray();
   }
 };
+
+Node.prototype.execute = function() {
+  // Placeholder for node-specific execution logic
+};
 
 Node.prototype.draw = function(renderer) {
   // Placeholder for drawing logic

