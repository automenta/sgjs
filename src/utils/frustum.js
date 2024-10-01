import { mat4 } from 'gl-matrix';

export function calculateFrustumPlanes(viewMatrix, projectionMatrix) {
  const modelViewProjectionMatrix = mat4.create();
  mat4.multiply(modelViewProjectionMatrix, projectionMatrix, viewMatrix);

  const frustumPlanes = [
    // Left plane
    [modelViewProjectionMatrix[3] + modelViewProjectionMatrix[0],
     modelViewProjectionMatrix[7] + modelViewProjectionMatrix[4],
     modelViewProjectionMatrix[11] + modelViewProjectionMatrix[8],
     modelViewProjectionMatrix[15] + modelViewProjectionMatrix[12]],

    // Right plane
    [modelViewProjectionMatrix[3] - modelViewProjectionMatrix[0],
     modelViewProjectionMatrix[7] - modelViewProjectionMatrix[4],
     modelViewProjectionMatrix[11] - modelViewProjectionMatrix[8],
     modelViewProjectionMatrix[15] - modelViewProjectionMatrix[12]],

    // Bottom plane
    [modelViewProjectionMatrix[3] + modelViewProjectionMatrix[1],
     modelViewProjectionMatrix[7] + modelViewProjectionMatrix[5],
     modelViewProjectionMatrix[11] + modelViewProjectionMatrix[9],
     modelViewProjectionMatrix[15] + modelViewProjectionMatrix[13]],

    // Top plane
    [modelViewProjectionMatrix[3] - modelViewProjectionMatrix[1],
     modelViewProjectionMatrix[7] - modelViewProjectionMatrix[5],
     modelViewProjectionMatrix[11] - modelViewProjectionMatrix[9],
     modelViewProjectionMatrix[15] - modelViewProjectionMatrix[13]],

    // Near plane
    [modelViewProjectionMatrix[3] + modelViewProjectionMatrix[2],
     modelViewProjectionMatrix[7] + modelViewProjectionMatrix[6],
     modelViewProjectionMatrix[11] + modelViewProjectionMatrix[10],
     modelViewProjectionMatrix[15] + modelViewProjectionMatrix[14]],

    // Far plane
    [modelViewProjectionMatrix[3] - modelViewProjectionMatrix[2],
     modelViewProjectionMatrix[7] - modelViewProjectionMatrix[6],
     modelViewProjectionMatrix[11] - modelViewProjectionMatrix[10],
     modelViewProjectionMatrix[15] - modelViewProjectionMatrix[14]],
  ];

  return frustumPlanes.map((plane) => {
    const length = Math.sqrt(plane[0] * plane[0] + plane[1] * plane[1] + plane[2] * plane[2]);
    return [plane[0] / length, plane[1] / length, plane[2] / length, plane[3] / length];
  });
}
