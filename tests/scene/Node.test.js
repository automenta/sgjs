var Node = require('../../src/scene/Node');

describe('Node', () => {
  let node;

  beforeEach(() => {
    node = new Node('test-node', 'test-type', {
      position: [10, 20],
      size: [50, 60],
      color: [1, 0, 0, 1],
    });
  });

  it('should have the correct id and type', () => {
    expect(node.id).toBe('test-node');
    expect(node.type).toBe('test-type');
  });

  it('should have the correct initial properties', () => {
    expect(node.position).toEqual([10, 20]);
    expect(node.size).toEqual([50, 60]);
    expect(node.color).toEqual([1, 0, 0, 1]);
  });

  it('should have a parent property initially set to null', () => {
    expect(node.parent).toBeNull();
  });

  it('should have a transform property initially set to an identity matrix', () => {
    expect(node.transform).toEqual([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);
  });

  it('should update its transform property when its position is changed', () => {
    node.position = [30, 40];
    expect(node.transform).toEqual([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      30, 40, 0, 1,
    ]);
  });

  it('should update its transform property when its size is changed', () => {
    node.size = [70, 80];
    expect(node.transform).toEqual([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      10, 20, 0, 1,
    ]);
  });

  it('should update its transform property when its parent is changed', () => {
    const parentNode = new Node('parent-node', 'parent-type');
    node.parent = parentNode;
    expect(node.transform).toEqual([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      10, 20, 0, 1,
    ]);
  });

  it('should return true for containsPoint if the point is within the node', () => {
    expect(node.containsPoint(15, 25)).toBe(true);
  });

  it('should return false for containsPoint if the point is outside the node', () => {
    expect(node.containsPoint(60, 70)).toBe(false);
  });
});
