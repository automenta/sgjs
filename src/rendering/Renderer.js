import VertexData from '../utils/VertexData';
import TransformMatrix from '../utils/TransformMatrix';
import DataFlowRenderer from './DataFlowRenderer';
 import { calculateFrustumPlanes } from '../utils/frustum';
 
@@ -132,6 +146,7 @@
     this.dataFlowRenderer.render(scene, this.camera);
   }
 
+  // ... (rest of the Renderer class)
   setCamera(camera) {
     this.camera = camera;
     this.camera.updateViewMatrix();
@@ -140,6 +155,7 @@
 
   zoomTo(zoomLevel) {
     this.zoomTarget = zoomLevel;
+    this.updateZoom();
   }
 
   updateZoom() {
@@ -149,6 +165,10 @@
       this.camera.zoom += zoomDelta * this.zoomSpeed;
       this.camera.updateProjectionMatrix();
     }
+  }
+
+  getZoom() {
+    return this.camera.zoom;
   }
 }
 

