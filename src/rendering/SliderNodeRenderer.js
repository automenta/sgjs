var gl = require('../utils/webgl').gl;

var SliderNodeRenderer = function () {
  // Create a shader program for rendering sliders
  this.shaderProgram = this.createShaderProgram();
 };
 
 // Method for creating the shader program
 SliderNodeRenderer.prototype.createShaderProgram = function() {
   const vertexShader = this.loadShader(gl.VERTEX_SHADER, 'basic.vert');
   const fragmentShader = this.loadShader(gl.FRAGMENT_SHADER, 'basic.frag');
 
   const shaderProgram = gl.createProgram();
   gl.attachShader(shaderProgram, vertexShader);
   gl.attachShader(shaderProgram, fragmentShader);
   gl.linkProgram(shaderProgram);
 
   if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
     alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
     return null;
   }
 
   return shaderProgram;
 };
 
 // Method for loading a shader
-SliderNodeRenderer.prototype.loadShader = function (type, filename) {
+SliderNodeRenderer.prototype.loadShader = function(type, filename) {
   const shader = gl.createShader(type);
   const source = this.getShaderSource(filename);
   gl.shaderSource(shader, source);
@@ -38,7 +38,7 @@
 };
 
 // Method for getting the shader source from a file
-SliderNodeRenderer.prototype.getShaderSource = function (filename) {
+SliderNodeRenderer.prototype.getShaderSource = function(filename) {
   const request = new XMLHttpRequest();
   request.open('GET', `./${filename}`, false);
   request.send();
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
