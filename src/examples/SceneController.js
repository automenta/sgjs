var Camera = require('../camera/Camera');

var SceneController = function(scene, renderer) {
  this.scene = scene;
  this.renderer = renderer;
  this.camera = new Camera();
  this.renderer.setCamera(this.camera);
};

SceneController.prototype.update = function(dt) {
  this.scene.update(dt);
  this.renderer.renderScene(this.scene);
};

module.exports = SceneController;
