class NodeRenderer {
  constructor(gl, program) {
    this.gl = gl;
    this.program = program;
    this.positionLocation = gl.getAttribLocation(program, 'aVertexPosition');
    this.colorLocation = gl.getAttribLocation(program, 'aVertexColor');
    this.modelViewMatrixLocation = gl.getUniformLocation(program, 'uModelViewMatrix');
    this.projectionMatrixLocation = gl.getUniformLocation(program, 'uProjectionMatrix');
  }

  render(node) {
    // Set up the shader program and uniforms
    this.gl.useProgram(this.program);

    // Create a buffer for the node's vertices
    const vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(node.vertexData.vertices), this.gl.STATIC_DRAW);

    // Create a buffer for the node's colors
    const colorBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(node.vertexData.colors), this.gl.STATIC_DRAW);

    // Set up the vertex attributes
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.positionLocation);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
    this.gl.vertexAttribPointer(this.colorLocation, 4, this.gl.FLOAT, false, 0, 0);
    this.gl.enableVertexAttribArray(this.colorLocation);

    // Set up the model-view and projection matrices
    this.gl.uniformMatrix4fv(this.modelViewMatrixLocation, false, node.transform.matrix);
    this.gl.uniformMatrix4fv(this.projectionMatrixLocation, false, node.transform.matrix);

    // Draw the node
    this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, 4);
  }
}

export default NodeRenderer;
