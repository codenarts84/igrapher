const dataTypeMapping = {
  number: (value) => !isNaN(Number(value)),
  string: (value) => typeof value === 'string',
  boolean: (value) => typeof value === 'boolean'
};

const getDataType = (value) => {
  for (const [dataType, checkFunction] of Object.entries(dataTypeMapping)) {
    if (checkFunction(value)) {
      return dataType;
    }
  }
  return 'unknown';
};

const getProperties = (properties) => {
  return Object.entries(properties).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: {
        value,
        type: getDataType(value),
        condition: '='
      }
    }),
    {}
  );
};

const processNodes = (originalNodes, labelColorMapping) => {
  const nodes = Object.values(originalNodes).flatMap(([nodeId, nodeData]) => {
    // console.log('nodeData as original', nodeData);
    const label = nodeData.labels[0];
    const color = labelColorMapping[label] || '#000000';
    return {
      id: nodeId,
      label,
      properties: getProperties(nodeData.properties),
      color
    };
  });
  return nodes;
};

const processRelationships = (originalLinks, linkColorMapping) => {
  const links = Object.values(originalLinks).map(([linkId, linkData]) => {
    const type = linkData.type;
    const sourceId = linkData.node_id[0];
    const targetId = linkData.node_id[1];
    const color = linkColorMapping[type] || '#000000';
    return {
      id: linkId,
      source: sourceId,
      target: targetId,
      properties: getProperties(linkData.properties),
      type,
      color
    };
  });

  return links;
};

export { processNodes, processRelationships, getProperties };
