var VertexData = require('../utils/VertexData');
var TransformMatrix = require('../utils/TransformMatrix');

var Renderer = function(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.nodeRenderers = {};
  this.camera = null;
  this.projectionMatrix = null;
  this.vertexData = new VertexData();
  this.transformMatrix = new TransformMatrix();
  require('../utils/webgl').initWebGL(canvas);
};

Renderer.prototype.registerNodeRenderer = function(type, renderer) {
  this.nodeRenderers[type] = renderer;
};

Renderer.prototype.setCamera = function(camera) {
  this.camera = camera;
  this.projectionMatrix = camera.getProjectionMatrix();
};

Renderer.prototype.renderScene = function(scene) {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  scene.nodes.forEach((node) => {
    const renderer = this.nodeRenderers[node.type];
    if (renderer) {
      renderer.render(node, this.camera);
    }
  });
};

module.exports = Renderer;
