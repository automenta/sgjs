class SceneController {
  constructor(scene, renderer) {
    this.scene = scene;
    this.renderer = renderer;
    this.camera = new Camera();
    this.renderer.setCamera(this.camera);
  }

  update(dt) {
    this.scene.update(dt);
    this.renderer.renderScene(this.scene);
  }
}

export default SceneController;
