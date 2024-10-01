var glContext = require('../utils/webgl');

var NodeRenderer = function() {
  this.shaderProgram = this.createShaderProgram();
};

NodeRenderer.prototype.createShaderProgram = function() {
  const vertexShader = this.loadShader(glContext.gl.VERTEX_SHADER, 'basic.vert');
  const fragmentShader = this.loadShader(glContext.gl.FRAGMENT_SHADER, 'basic.frag');

  const shaderProgram = glContext.gl.createProgram();
  glContext.gl.attachShader(shaderProgram, vertexShader);
  glContext.gl.attachShader(shaderProgram, fragmentShader);
  glContext.gl.linkProgram(shaderProgram);

  if (!glContext.gl.getProgramParameter(shaderProgram, glContext.gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + glContext.gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
};

NodeRenderer.prototype.loadShader = function(type, filename) {
  const shader = glContext.gl.createShader(type);
  const source = this.getShaderSource(filename);
  glContext.gl.shaderSource(shader, source);
  glContext.gl.compileShader(shader);

  if (!glContext.gl.getShaderParameter(shader, glContext.gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + glContext.gl.getShaderInfoLog(shader