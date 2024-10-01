--- a/README.md
+++ b/README.md
@@ -1,10 +1,10 @@
 # Fractal Zooming User Interface
 
-This is a prototype for a "Fractal" Zooming HTML environment. It uses CSS transforms to position and scale HTML fragments to Cytoscape.js (graph visualization) nodes. There is also preliminary support for dataflow diagramming.
+This is a prototype for a "Fractal" Zooming HTML environment. It uses CSS transforms to position and scale HTML fragments to Cytoscape.js (graph visualization) nodes. There is also preliminary support for dataflow diagramming and a basic node editor.
 
 Imagine exploring vast datasets, intricate graphs, or expansive maps with ease, zooming in to reveal hidden details and panning across the canvas to uncover new insights. The ZUI system makes this possible through a combination of cutting-edge technologies and thoughtful design. 🕵️‍♀️
 
-Key components of the system include:
+Key components of the ZUI system include:
 
 - A flexible scene graph API for organizing and manipulating visual elements 🌳
 - A high-performance rendering engine that leverages WebGL for crisp vector graphics 🖼️
@@ -12,6 +12,7 @@
 - Robust input handlers for seamless mouse and touch interactions 🖱️
 - Intelligent frustum culling for efficient rendering of visible elements ✂️
 - A modular plugin system for extending functionality and customization 🔌
+- A basic node editor for creating and manipulating nodes 🧰
 
 ## 📚 Background on Zooming User Interfaces 📚
 
@@ -33,7 +34,7 @@
 
 ## 🏗️ Architecture Overview
 
-The ZUI system is built upon a layered architecture that separates concerns and promotes modularity. This design allows for easy extensibility and customization, while ensuring a robust and efficient core.
+The ZUI system is built upon a layered architecture that separates concerns and promotes modularity. This design allows for easy extensibility and customization, while ensuring a robust and efficient core. It is designed to be flexible and extensible, allowing developers to create complex scenes with ease.
 
 ### 🌿 Scene Graph
 
@@ -46,6 +47,7 @@
 - **ContainerNode:** A specialized node that can contain other nodes, allowing for grouping and layout management.
 - **WidgetNode:** A basic node representing a visual element with attributes like shape, color, and size.
 - **EdgeNode:** A node representing a connection between two other nodes, typically used for dataflow diagrams.
+- **TODO: OTHER NODE TYPES**
 
 ### 🎨 Rendering Engine
 
@@ -56,6 +58,7 @@
 - **Renderer:** The core rendering class that handles the drawing process. It uses shaders to define how nodes are rendered and applies transformations based on their positions and camera settings.
 - **NodeRenderer:** A specialized renderer for drawing nodes. It uses different shaders for different node types, allowing for customization of appearance.
 - **EdgeRenderer:** A specialized renderer for drawing edges. It uses shaders to render lines connecting nodes, with options for different line styles and colors.
+- **TODO: OTHER RENDERERS**
 
 ### 📽️ Camera and Viewport
 
@@ -66,6 +69,7 @@
 - **Camera:** The main camera class that manages the viewport and zoom level. It provides methods for panning, zooming, and rotating the view.
 - **ProjectionMatrix:** A matrix that transforms 3D coordinates from world space to screen space.
 - **ViewMatrix:** A matrix that transforms 3D coordinates from world space to camera space.
+- **TODO: OTHER CAMERA FEATURES**
 
 ### 🖱️ Input Handling
 
@@ -76,6 +80,7 @@
 - **InputManager:** The main input handler class that listens for mouse and touch events. It dispatches events to appropriate handlers based on the current interaction mode.
 - **TouchHandler:** Handles mouse events like clicks, drags, and wheel scrolling, and touch events like taps, swipes, and pinch gestures.
 
+- **TODO: OTHER INPUT HANDLERS**
 ## 🌱 Scene Graph API
 
 The scene graph API provides a set of classes and methods for creating, manipulating, and rendering visual elements. It is designed to be flexible and extensible, allowing developers to create complex scenes with ease.
@@ -90,7 +95,7 @@```

src/scene/LabelNode.js
