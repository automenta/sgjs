import Renderer from './rendering/Renderer';
import Camera from './camera/Camera';
import InputManager from './input/InputManager';
import Scene from '../scene/Scene';
import WidgetNode from '../scene/WidgetNode';
import NodeRenderer from '../rendering/NodeRenderer';
import TextNode from '../scene/TextNode';
import ShapeNode from '../scene/ShapeNode';
import GroupNode from '../scene/GroupNode';
import ButtonNode from '../scene/ButtonNode';
import ButtonNodeRenderer from '../rendering/ButtonNodeRenderer';
import SliderNode from '../scene/SliderNode';
import SliderNodeRenderer from '../rendering/SliderNodeRenderer';
import LabelNode from '../scene/LabelNode';
import LabelNodeRenderer from '../rendering/LabelNodeRenderer';
import EdgeNode from '../scene/EdgeNode';
import EdgeRenderer from '../rendering/EdgeRenderer';
import ContainerNode from '../scene/ContainerNode';
import RectangleNodeRenderer from '../rendering/RectangleNodeRenderer';
import DataFlowNode from '../scene/DataFlowNode';
import DataFlowRenderer from '../rendering/DataFlowRenderer';
import SceneController from './examples/SceneController';
import InputHandler from './examples/InputHandler';
 
 // Create a new scene
 const scene = new Scene();
@@ -102,6 +103,7 @@
 renderer.registerNodeRenderer('label', new LabelNodeRenderer());
 renderer.registerNodeRenderer('edge', new EdgeRenderer());
 
+// TODO: Add a zoom UI (e.g., a slider or buttons)
 // Set up the rendering loop
 function render() {
   // Update the camera's view matrix
@@ -121,10 +123,12 @@
 inputManager.addHandler('pan', (dx, dy) => {
   camera.pan(dx, dy);
 });
-
 inputManager.addHandler('zoom', (factor) => {
   camera.zoomIn(factor);
 });
+
+// TODO: Add a zoom out handler
 inputManager.addHandler('zoomOut', (factor) => {
   camera.zoomOut(factor);
 });

