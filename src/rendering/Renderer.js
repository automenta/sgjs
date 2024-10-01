import VertexData from '../utils/VertexData';
import TransformMatrix from '../utils/TransformMatrix';
import DataFlowRenderer from './DataFlowRenderer';
 import { calculateFrustumPlanes } from '../utils/frustum';
 
@@ -132,6 +133,7 @@
     this.dataFlowRenderer.render(scene, this.camera);
   }
 
+  // ... (rest of the Renderer class)
   setCamera(camera) {
     this.camera = camera;
     this.camera.updateViewMatrix();
@@ -140,6 +142,7 @@
 
   zoomTo(zoomLevel) {
     this.zoomTarget = zoomLevel;
+    this.updateZoom();
     this.updateZoom();
   }
 
@@ -149,6 +152,10 @@
       this.camera.zoom += zoomDelta * this.zoomSpeed;
       this.camera.updateProjectionMatrix();
     }
+  }
+
+  getZoom() {
+    return this.camera.zoom;
   }
 }
 

