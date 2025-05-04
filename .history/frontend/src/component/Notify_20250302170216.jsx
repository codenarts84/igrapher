import React, { useState, useEffect } from 'react';
import { useAppContext } from '../help/ContextManager';
import { motion } from 'framer-motion';
import DropdownForQuery from './DropdownForQuery';

const NodeQueryPanel = ({ open, onClose, onSubmit, selectedNode }) => {
  const { graphData } = useAppContext();
  const [labelProperties, setLabelProperties] = useState([]);
  const [labelConditions, setLabelConditions] = useState([]);
  const [loading] = useState(false);

  const [currentQueryFeature, setCurrentQueryFeature] = useState();
  const [setcValue] = useState();
  const header =
    'text-[20px] font-[400] text-gray-900 dark:text-gray-200 flex justify-start items-center';
  const RowContainer =
    'flex w-full justify-between items-center gap-x-[20px] pb-[10px] z-50';
  const firstCol = 'flex w-[10%] justify-start items-center';
  const secondCol = 'flex w-[30%] justify-center items-center';
  const thirdCol = 'flex w-[50%] justify-end items-center';
  const inputCol =
    'drak:bg-white/30  bg-gray-500/40   w-full  backdrop-blur-[5px] h-[60px] rounded-[20px] px-[17px] my-[10px] text-[17px] dark:text-white text-gray-900 border-gray-400  focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 w-full';
  // const dropdown =
  //   ' drak:bg-white/10  bg-gray-500/20  w-full px-[10px] backdrop-blur-[5px] h-[48px] rounded-[20px] my-[10px] text-[17px] dark:text-white text-gray-900 border-gray-400  focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50';

  useEffect(() => {
    const handleKeyPress = (event) => {
      // 检查按下的键是否是回车键或者 ESC 键
      if (event.key === 'Enter' || event.key === 'Escape') {
        // 找到所有包含 ENTER 或 ESC 类的元素
        const buttons = document.querySelectorAll('.ENTER, .ESC');

        // 遍历每个元素
        buttons.forEach((button) => {
          // 检查元素类名中是否包含 'ENTER' 或 'ESC'
          const hasEnterClass = button.classList.contains('ENTER');
          const hasEscClass = button.classList.contains('ESC');

          // 如果按下的是回车键，并且元素包含 'ENTER' 类，则触发点击事件
          if (event.key === 'Enter' && hasEnterClass) {
            button.click();
          }

          // 如果按下的是 ESC 键，并且元素包含 'ESC' 类，则触发点击事件
          if (event.key === 'Escape' && hasEscClass) {
            button.click();
          }
        });
      }
    };

    // 添加事件监听器
    document.addEventListener('keydown', handleKeyPress);

    // 组件卸载时移除事件监听器
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  useEffect(() => {
    if (graphData.nodes.length > 0 && selectedNode) {
      const initialLabelProperties = graphData.nodes.find(
        (node) => node.label === selectedNode.group
      ).properties;

      console.log('initialLabelProperties', initialLabelProperties);
      const initialLabelConditions = {};
      Object.keys(initialLabelProperties).forEach((key) => {
        const type = initialLabelProperties[key].type;
        initialLabelConditions[key] = '=';
        switch (type) {
          case 'number':
            initialLabelProperties[key].value = ''; // Or null, or whatever signifies 'empty' for a number
            break;
          case 'string':
            initialLabelProperties[key].value = ''; // Empty string for string type
            break;
          case 'boolean':
            initialLabelProperties[key].value = false; // False for boolean type
            break;
          case 'array':
            initialLabelProperties[key].value = []; // Empty array for array type
            break;
          case 'object':
            initialLabelProperties[key].value = {}; // Empty object for object type
            break;
          default:
            initialLabelProperties[key].value = null; // null or undefined for unknown types
        }
      });
      setLabelProperties(initialLabelProperties);
      setLabelConditions(initialLabelConditions);
    }
  }, [selectedNode]);

  const handleSubmit = () => {
    // const requestData = {
    //   label: [selectedNode.group],
    //   attribute1: {},
    //   attribute2: {},
    //   relationship_type: '',
    //   relationship_attribute: {}
    // };
    // Object.entries(labelProperties).forEach(([property, { value }]) => {
    //   if (value !== '') {
    //     requestData.attribute1[property] =
    //       `${labelConditions[property]} ${value}`;
    //   }
    // });

    const nodeAttributes = {};
    Object.entries(labelProperties).forEach(([property, { value, type }]) => {
      if (value !== '') {
        nodeAttributes[property] = {
          value,
          type,
          condition: labelConditions[property]
        };
      }
    });

    const updatedNode = {
      ...selectedNode,
      label: selectedNode.group,
      properties: nodeAttributes
    };

    console.log('updated Node', updatedNode);
    onSubmit(updatedNode);
    onClose();
  };

  const handlePropertyChange = (property, value, condition) => {
    setLabelProperties((prevProperties) => {
      // console.log('condition when changing the value', condition);
      // console.log('anoter condition when changing the value', labelProperties[property].condition);
      const updatedProperty = {
        [property]: {
          ...prevProperties[property],
          value,
          condition
        }
      };
      return { ...prevProperties, ...updatedProperty };
    });
    setLabelConditions((prevConditions) => ({
      ...prevConditions,
      [property]: condition
    }));
  };

  // useEffect(() => {
  //   console.log('current label properties', labelProperties);
  // }, [labelProperties]);

  const renderPropertyField = (property, value, dataType, fontSize) => {
    const textFieldProps = {
      label: property,
      value,
      // fullWidth: true,
      onChange: (e) => {
        // console.log('value change', e.target.value);
        handlePropertyChange(
          property,
          e.target.value,
          labelConditions[property]
        );
      }
    };

    switch (dataType) {
      case 'number':
        return (
          <div className={RowContainer}>
            <div className={firstCol}>
              <h2 className={header}>
                <div className="pr-[5px]">◆</div>
                {property}
              </h2>
            </div>
            {/* Conditions */}
            <div className={secondCol}>
              {/* <TextField
                select
                value={labelConditions[property] || '='}
                onChange={(e) =>
                  handlePropertyChange(property, value, e.target.value)
                }
                className={dropdown}
              >
                <MenuItem value="=">Equal</MenuItem>
                <MenuItem value=">">Greater Than</MenuItem>
                <MenuItem value="<">Less Than</MenuItem>
                <MenuItem value="<>">Not Equal</MenuItem>
              </TextField> */}
              <DropdownForQuery
                onClick={(selectedOption) => {
                  handlePropertyChange(property, value, selectedOption.value);
                }}
                options={[
                  { value: '=', label: 'Equal' },
                  { value: '>', label: 'Greater Than' },
                  { value: '<', label: 'Less Than' },
                  { value: '<>', label: 'Not Equal' }
                ]}
                // value={cValue}
                currentIndex={currentQueryFeature}
              />
            </div>
            <div className={thirdCol}>
              <input
                type="number"
                {...textFieldProps}
                value={value || ''}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (
                    newValue !== '' ||
                    !isNaN(Number(newValue) || newValue === 0)
                  ) {
                    handlePropertyChange(
                      property,
                      Number(newValue),
                      labelConditions[property]
                    );
                  }
                }}
                className={inputCol}
              />
            </div>
          </div>
        );
      default: // string
        return (
          <div className={RowContainer}>
            <div className={firstCol}>
              <h2 className={header}>
                <div className="pr-[5px]">◆</div>
                {property}
              </h2>
            </div>

            {/* Conditions */}
            <div className={secondCol}>
              {/* <TextField
                select
                value={labelConditions[property] || '='}
                onChange={(e) => {
                  console.log('condition', e.target.value);
                  handlePropertyChange(property, value, e.target.value);
                }}
                className={dropdown}
              >
                <MenuItem value="=">Equal</MenuItem>
                <MenuItem value="<>">Not Equal</MenuItem>
              </TextField> */}
              <DropdownForQuery
                options={[
                  { value: '=', label: 'Equal' },
                  { value: '<>', label: 'Not Equal' }
                ]}
                setValue={setcValue}
                // value={cValue}
                currentIndex={currentQueryFeature}
              />
            </div>
            {/* Value */}
            <div className={thirdCol}>
              <input {...textFieldProps} className={inputCol} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 transform z-50 flex justify-center items-center transition-all backdrop-blur-[10px]">
      <div className="w-[1000px] max-h-[80%] rounded-[28px] bg-gray-300/50 dark:bg-gray-600/50  px-[40px] py-[50px] transition-all">
        <h1 className="mb-2 text-[25px] font-medium text-gray-900 dark:text-white animate__animated animate__zoomIn transition-all">
          {selectedNode ? `Query Panel - ${selectedNode.group}` : 'Query Panel'}
        </h1>
        <div className="z-50 gradient-mask max-h-[50vh] -mr-[20px] pr-[20px]  h-auto relative w-full overflow-y-auto overflow-x-hidden scrollbar-show text-left transition-all">
          <div className="flex-1 justify-center items-center pt-[20px] z-50">
            <div className="px-[10px] grid w-full grid-cols-1 gap-x-[20px]">
              {Object.entries(labelProperties).map(
                ([property, { value, type }], index) => (
                  <div
                    onClick={() => setCurrentQueryFeature(index)}
                    key={property}
                    style={{
                      animationDelay: `${index * 0.08}s`,
                      zIndex: 50 - 1 * index
                    }}
                    className="animate__animated animate__fadeInRight transition-all"
                  >
                    {renderPropertyField(property, value, type)}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <motion.div
          layout
          className="w-full  flex justify-center items-center place-items-center text-center gap-x-24 pt-[15px] z-0 transition-all"
        >
          <motion.button
            layout
            onClick={onClose}
            className="w-[50%] ESC hover:w-[70%] focus:w-[100%] flex justify-center items-center animate__animated animate__zoomIn rounded-full text-3xl bg-sky-900 px-10 py-6 font-semibold text-white shadow-sm hover:bg-sky-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300"
          >
            <i className={'fi mr-6 mt-2 fi fi-br-cross'}></i>
            Cancel
          </motion.button>
          <motion.button
            layout
            onClick={handleSubmit}
            style={{ animationDelay: '0.3s' }}
            className="w-[50%] ENTER hover:w-[70%] focus:w-[100%] flex justify-center items-center animate__animated animate__zoomIn rounded-full text-3xl bg-sky-900 px-10 py-6 font-semibold text-white shadow-sm hover:bg-sky-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-300"
          >
            {loading && (
              <div className="px-[10px]">
                <i className={'fi mr-6 mt-3'}></i>
              </div>
            )}
            <i className={'fi mr-6 mt-2 fi fi-rr-search'}></i>
            Query Node
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default NodeQueryPanel;
