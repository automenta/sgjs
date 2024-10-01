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
    alert('An error occurred compiling the shaders: ' + glContext.gl.getShaderInfoLog(shader));
    glContext.gl.deleteShader(shader);
    return null;
  }

  return shader;
};

NodeRenderer.prototype.getShaderSource = function(filename) {
  const request = new XMLHttpRequest();
  request.open('GET', `./${filename}`, false);
  request.send();
  return request.responseText;
};

NodeRenderer.prototype.render = function(node, camera) {
  // Get the shader program
  const shaderProgram = this.shaderProgram;

  // Use the shader program
  glContext.gl.useProgram(shaderProgram);

  // Get the attribute and uniform locations
  const positionLocation = glContext.gl.getAttribLocation(shaderProgram, 'a_position');
  const colorLocation = glContext.gl.getAttribLocation(shaderProgram, 'a_color');
  const modelViewProjectionLocation = glContext.gl.getUniformLocation(shaderProgram, 'u_modelViewProjection');

  // Bind the vertex data
  glContext.gl.bindBuffer(glContext.gl.ARRAY_BUFFER, node.vertexData.buffer);

  // Set the attribute pointers
  glContext.gl.vertexAttribPointer(positionLocation, 2, glContext.gl.FLOAT, false, 0, 0);
  glContext.gl.enableVertexAttribArray(positionLocation);

  glContext.gl.vertexAttribPointer(colorLocation, 4, glContext.gl.FLOAT, false, 0, 0);
  glContext.gl.enableVertexAttribArray(colorLocation);

  // Set the uniform values
  glContext.gl.uniform4fv(colorLocation, node.vertexData.color);
  glContext.gl.uniformMatrix4fv(modelViewProjectionLocation, false, camera.getViewMatrix());

  // Draw the node
  glContext.gl.drawArrays(glContext.gl.TRIANGLES, 0, 6);
};

module.exports = NodeRenderer;
