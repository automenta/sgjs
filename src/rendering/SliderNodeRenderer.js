var gl = require('../utils/webgl').gl;

var SliderNodeRenderer = function() {
  // Create a shader program for rendering sliders
  this.shaderProgram = this.createShaderProgram();
 };
 
 // Method for creating the shader program
-SliderNodeRenderer.prototype.createShaderProgram = function() {
+SliderNodeRenderer.prototype.createShaderProgram = function () {
   const vertexShader = this.loadShader(gl.VERTEX_SHADER, 'basic.vert');
   const fragmentShader = this.loadShader(gl.FRAGMENT_SHADER, 'basic.frag');
 
@@ -46,7 +46,7 @@
 };
 
 // Method for rendering a slider node
-SliderNodeRenderer.prototype.render = function(node, camera) {
+SliderNodeRenderer.prototype.render = function (node, camera) {
   // Get the shader program
   const shaderProgram = this.shaderProgram;
 
@@ -81,4 +81,4 @@
   gl.drawArrays(gl.TRIANGLES, 0, 6);
 };
 
-module.exports = SliderNodeRenderer;
+module.exports = SliderNodeRenderer;
