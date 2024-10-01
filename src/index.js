import { gl } from './utils/webgl';
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
import NodeEditorUI from './examples/NodeEditorUI';
import NodeEditor from './examples/NodeEditor';

// Create a canvas element
const canvas = document.getElementById('canvas');

// Create a node editor
const nodeEditor = new NodeEditor(canvas);

// Setup the node editor
nodeEditor.setup();
