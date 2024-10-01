class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.nodeRenderers = {};
    this.camera = null;
    this.projectionMatrix = null;
    this.vertexData = new VertexData();
    this.transformMatrix = new TransformMatrix();
    glContext.initWebGL(canvas);
  }

  registerNodeRenderer(type, renderer) {
    this.nodeRenderers[type] = renderer;
  }

  setCamera(camera) {
    this.camera = camera;
    this.projectionMatrix = camera.getProjectionMatrix();
  }

  renderScene(scene) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    scene.nodes.forEach((node) => {
      const renderer = this.nodeRenderers[node.type];
      if (renderer) {
        renderer.render(node, this.camera);
      }
    });
  }
}
