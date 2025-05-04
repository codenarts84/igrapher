import * as THREE from 'three';

const createTreeDnode = (node, graphSetting, setGraphSetting) => {
  // Geometry
  const geometry = new THREE.SphereGeometry(
    // default radius
    0.75,
    // update the node resolution
    graphSetting.nodeResolution,
    graphSetting.nodeResolution
  );
  // Material

  const material = new THREE.MeshStandardMaterial({
    color: node.color,
    transparent: true,
    // set the node opacity
    opacity: graphSetting.nodeOpacity
  });
  if (
    graphSetting.nodeColors === undefined ||
    graphSetting.nodeColors[node.label] === undefined
  ) {
    setGraphSetting((prevGraphSetting) => ({
      ...prevGraphSetting,
      nodeColors: {
        ...prevGraphSetting.nodeColors,
        [node.label]: node.color
      }
    }));
  }
  // Mesh
  const sphere = new THREE.Mesh(geometry, material);
  // sphere.position.set(node.x, node.y, node.z);
  // set the node scale size
  sphere.scale.set(
    graphSetting.nodeSize,
    graphSetting.nodeSize,
    graphSetting.nodeSize
  );
  // add the sphere to the group
  const group = new THREE.Group();
  group.add(sphere);
  return group;
};

export default createTreeDnode;
