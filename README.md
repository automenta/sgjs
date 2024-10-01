# Fractal Zooming User Interface

This is a prototype for a "Fractal" Zooming HTML environment. It uses CSS transforms to position and scale HTML fragments to Cytoscape.js (graph visualization) nodes. There is also preliminary support for dataflow diagramming.

Imagine exploring vast datasets, intricate graphs, or expansive maps with ease, zooming in to reveal hidden details and panning across the canvas to uncover new insights. The ZUI system makes this possible through a combination of cutting-edge technologies and thoughtful design. 🕵️‍♀️

Key components of the system include:

- A flexible scene graph API for organizing and manipulating visual elements 🌳
- A high-performance rendering engine that leverages WebGL for crisp vector graphics 🖼️
- An intuitive camera system for controlling the viewport and zoom level 📽️
- Robust input handlers for seamless mouse and touch interactions 🖱️
- Intelligent frustum culling for efficient rendering of visible elements ✂️
- A modular plugin system for extending functionality and customization 🔌

## 📚 Background on Zooming User Interfaces 📚

A Zooming User Interface (ZUI) is a type of graphical user interface where users can change the scale of the viewed area to see more or less detail and browse through different documents. Unlike traditional window-based GUIs, information elements in a ZUI appear directly on an infinite virtual desktop, usually created using vector graphics.

Key characteristics of ZUIs include:

- Seamless zooming and panning navigation across a large 2D information space
- Recursive nesting of objects, allowing for arbitrary levels of zoom and detail
- Semantic zooming, where the level of detail in a resized object changes to fit the relevant information into the current size
- A more flexible and immersive canvas for presenting and exploring complex datasets, documents, and multivariate information

ZUIs use zooming as the main metaphor for browsing and interacting with information, providing a more natural and intuitive way to navigate and explore. Some consider ZUIs to be a successor to traditional windowing GUIs, representing a Post-WIMP (Windows, Icons, Menus, Pointer) interface paradigm.

This project aims to provide a powerful and flexible framework for creating zoomable interfaces, enabling developers, scientists, business people, and curious individuals to explore and present information in innovative and engaging ways.

## 🏗️ Architecture Overview

The ZUI system is built upon a layered architecture that separates concerns and promotes modularity. This design allows for easy extensibility and customization, while ensuring a robust and efficient core.

### 🌿 Scene Graph

The scene graph is the foundation of the ZUI system, providing a hierarchical structure for organizing and manipulating visual elements. It is implemented as a tree-like data structure where each node represents a visual object. Nodes can be nested to create complex scenes with multiple levels of detail.

- **SceneNode:** The base class for all nodes in the scene graph. It provides fundamental properties like position, rotation, scale, and a reference to its parent node.
- **ContainerNode:** A specialized node that can contain other nodes, allowing for grouping and layout management.
- **WidgetNode:** A basic node representing a visual element with attributes like shape, color, and size.
- **EdgeNode:** A node representing a connection between two other nodes, typically used for dataflow diagrams.

### 🎨 Rendering Engine

The rendering engine is responsible for drawing the scene graph onto the canvas using WebGL. It leverages the power of the GPU to achieve high-performance rendering, even for complex scenes with many nodes.

- **Renderer:** The core rendering class that handles the drawing process. It uses shaders to define how nodes are rendered and applies transformations based on their positions and camera settings.
- **NodeRenderer:** A specialized renderer for drawing nodes. It uses different shaders for different node types, allowing for customization of appearance.
- **EdgeRenderer:** A specialized renderer for drawing edges. It uses shaders to render lines connecting nodes, with options for different line styles and colors.

### 📽️ Camera and Viewport

The camera system controls the viewport and zoom level, allowing users to navigate the scene graph. It provides methods for panning, zooming, and rotating the view.

- **Camera:** The main camera class that manages the viewport and zoom level. It provides methods for panning, zooming, and rotating the view.
- **ProjectionMatrix:** A matrix that transforms 3D coordinates from world space to screen space.
- **ViewMatrix:** A matrix that transforms 3D coordinates from world space to camera space.

### 🖱️ Input Handling

The input handlers are responsible for processing mouse and touch events, allowing users to interact with the scene graph. They translate user input into actions like panning, zooming, and selecting nodes.

- **InputManager:** The main input handler class that listens for mouse and touch events. It dispatches events to appropriate handlers based on the current interaction mode.
- **TouchHandler:** Handles mouse events like clicks, drags, and wheel scrolling, and touch events like taps, swipes, and pinch gestures.

## 🌱 Scene Graph API

The scene graph API provides a set of classes and methods for creating, manipulating, and rendering visual elements. It is designed to be flexible and extensible, allowing developers to create complex scenes with ease.

### 🪄 Nodes and Transforms

Nodes in the scene graph represent visual objects and have properties like position, rotation, scale, and a reference to their parent node. Each node has a transform matrix that defines its position and orientation in the scene.

- **Node:** The base class for all nodes in the scene graph. It provides fundamental properties like position, rotation, scale, and a reference to its parent node.
- **TransformMatrix:** A 4x4 matrix that defines the position, rotation, and scale of a node.

### 🧩 Built-in Node Types

The ZUI system provides a set of built-in node types for common visual elements:

- **WidgetNode:** A basic node representing a visual element with attributes like shape, color, and size.
- **ButtonNode** Pushbutton
- **SliderNode** Draggable slider
- **LabelNode** Label, with mutable text and font options
- **ContainerNode:** A specialized node that can contain other nodes, allowing for grouping and layout management
- **EdgeNode:** A node representing a connection between two other nodes, typically used for dataflow diagrams
- **TODO: OTHERS**

### 🎨 Custom Nodes

Developers can create custom node types to represent specific visual elements or behaviors. Custom nodes can inherit from the `SceneNode` class and override methods to define their own rendering logic and interactions.

## 🖌️ Rendering

The rendering engine uses WebGL to draw the scene graph onto the canvas. It leverages the power of the GPU to achieve high-performance rendering, even for complex scenes with many nodes.

### 🎬 WebGL Fundamentals

WebGL is a JavaScript API that allows developers to render 2D and 3D graphics using the GPU. It provides a low-level interface to the graphics hardware, allowing for fine-grained control over the rendering process