class NodeRenderer {
  constructor() {
    this.shaderProgram = this.createShaderProgram();
  }

  createShaderProgram() {
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
  }

  loadShader(type, filename) {
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
  }

  getShaderSource(filename) {
    const request = new XMLHttpRequest();
    request.open('GET', `./${filename}`, false);
    request.send();
    return request.responseText;
  }

  render(node, camera) {
    const shaderProgram = this.shaderProgram;
    glContext.gl.useProgram(shaderProgram);

    const positionLocation = glContext.gl.getAttribLocation(shaderProgram, 'a_position');
    const colorLocation = glContext.gl.getAttribLocation(shaderProgram, 'a_color');
    const modelViewProjectionLocation = glContext.gl.getUniformLocation(shaderProgram, 'u_modelViewProjection');

    glContext.gl.bindBuffer(glContext.gl.ARRAY_BUFFER, node.vertexData.buffer);

    glContext.gl.vertexAttribPointer(positionLocation, 2, glContext.gl.FLOAT, false, 0, 0);
    glContext.gl.enableVertexAttribArray(positionLocation);

    glContext.gl.vertexAttribPointer(colorLocation, 4, glContext.gl.FLOAT, false, 0, 0);
    glContext.gl.enableVertexAttribArray(colorLocation);

    glContext.gl.uniformMatrix4fv(modelViewProjectionLocation, false, camera.getViewMatrix());

    glContext.gl.drawArrays(glContext.gl.TRIANGLES, 0, 6);
  }
}
