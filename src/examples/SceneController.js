import Renderer from '../rendering/Renderer';
import Camera from '../camera/Camera';

class SceneController {
  constructor(scene, renderer) {
    this.scene = scene;
    this.renderer = renderer;
    this.camera = new Camera();
    this.renderer.setCamera(this.camera);
    this.render = this.render.bind(this);
    requestAnimationFrame(this.render);
  }

  render() {
    this.camera.updateViewMatrix();
    this.renderer.renderScene(this.scene);
    requestAnimationFrame(this.render);
  }
}

export default SceneController;
