import Node from './Node';
import VertexData from '../utils/VertexData';

class SliderNode extends Node {
  constructor(id, type, props) {
    super(id, type, props);
    this.value = props.value || 0;
    this.min = props.min || 0;
    this.max = props.max || 100;
    this.color = props.color || '#000000';
    this.size = props.size || [100, 20];
    this.