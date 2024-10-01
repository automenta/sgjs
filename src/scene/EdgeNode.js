import Node from './Node';
import VertexData from '../utils/VertexData';

class EdgeNode extends Node {
  constructor(id, type, props) {
    super(id, type, props);
    this.source = props.source; // Reference to the source node
    this.target = props.target; // Reference to the target node
    this.color = props.