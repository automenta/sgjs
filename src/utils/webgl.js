var gl;

// Function for initializing the WebGL context
function initWebGL(canvas) {
  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }
  return gl;
}

// Export the WebGL context
var glContext = {
  gl: gl,
  initWebGL: initWebGL,
};
