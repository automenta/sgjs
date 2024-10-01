import { mat4 } from 'gl-matrix';

// Function for calculating the frustum planes from the view and projection matrices
export function calculateFrustumPlanes(viewMatrix, projectionMatrix) {
  // Combine the view and projection matrices
  const modelViewProjectionMatrix = mat4.create();
  mat4.multiply(modelViewProjectionMatrix, projectionMatrix, viewMatrix);

  // Extract the frustum planes from the combined matrix
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

  // Normalize the plane equations
  for (let i = 0; i < frustumPlanes.length; i++) {
    const plane = frustumPlanes[i];
    const length = Math.sqrt(plane[0] * plane[0] + plane[1] * plane[1] + plane[2] * plane[2]);
    frustumPlanes[i] = [plane[0] / length, plane[1] / length, plane[2] / length, plane[3] / length];
  }

  return frustumPlanes;
}
