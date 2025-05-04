import React, { useState, useEffect } from 'react';
import { useAppContext } from '../help/ContextManager';
// import { getAllRelations } from '../help/APIs';
import DropdownForQuery from './DropdownForQuery';
import { motion } from 'framer-motion';

const LinkQueryPanel = ({ open, onClose, onSubmit, specifiedLink }) => {
  const { graphData } = useAppContext();
  const [uniqueRelationTypes, setUniqueRelationTypes] = useState([]);
  const [linkProperties, setLinkProperties] = useState([]);
  const [linkConditions, setLinkConditions] = useState([]);
  const [selectedRelationType, setSelectedRelationType] = useState('');
  const [loading] = useState(false);
  const header =
    'text-[20px] font-[400] text-gray-900 dark:text-gray-200 flex justify-start items-center';
  const RowContainer =
    'flex w-full justify-between items-center gap-x-[20px] pb-[10px] z-50';
  const firstCol = 'flex w-[10%] justify-start items-center';
  const secondCol = 'flex w-[30%] justify-center items-center';
  const thirdCol = 'flex w-[50%] justify-end items-center';
  const inputCol =
    'drak:bg-white/30  bg-gray-500/40   w-full  backdrop-blur-[5px] h-[60px] rounded-[20px] px-[17px] my-[10px] text-[17px] dark:text-white text-gray-900 border-gray-400  focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 w-full';
  const transformedArray = {
    array: Object.values(uniqueRelationTypes).map((relationType) => ({
      value: relationType,
      label: relationType
    }))
  };

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
    if (graphData.links.length > 0 && specifiedLink) {
      console.log('graphData', graphData);
      const { sourceLabel, targetLabel } = specifiedLink;
      console.log('sourceLabel', sourceLabel);
      const filteredTpyes = new Set(
        graphData.links
          .filter(
            (relation) =>
              relation.source.label === sourceLabel &&
              relation.target.label === targetLabel
          )
          .map((filteredRelation) => filteredRelation.type)
      );
      console.log('filteredTypes', filteredTpyes);

      setUniqueRelationTypes(Array.from(filteredTpyes));

      setSelectedRelationType(Array.from(uniqueRelationTypes)[0] || '');
    }
  }, [specifiedLink]);

  useEffect(() => {
    if (selectedRelationType) {
      const selectedRelation = graphData.links.find(
        (relation) => relation.type === selectedRelationType
      );
      if (selectedRelation) {
        console.log('selectedRealtion', selectedRelation);
        console.log('selectedRelation.properties', selectedRelation.properties);

        setLinkProperties(
          Object.entries(selectedRelation.properties || {}).reduce(
            (properties, [key, { type }]) => ({
              ...properties,
              [key]: {
                value: '',
                type
              }
            }),
            {}
          )
        );
        setLinkConditions(
          Object.keys(selectedRelation.properties || {}).reduce(
            (conditions, key) => ({ ...conditions, [key]: '=' }),
            {}
          )
        );
      }
    }
  }, [selectedRelationType]);

  const handleSubmit = () => {
    const linkAttributes = {};
    console.log('linkProperties', linkProperties);
    Object.entries(linkProperties).forEach(([property, { value }]) => {
      if (value !== '') {
        linkAttributes[property] = {
          condition: linkConditions[property],
          value
        };
      }
    });
    const updatedLink = {
      ...specifiedLink,
      type: selectedRelationType,
      properties: linkAttributes
    };

    console.log('Updated link:', updatedLink);
    onSubmit(updatedLink);
  };

  const handlePropertyChange = (property, value, condition) => {
    setLinkProperties((prevProperties) => ({
      ...prevProperties,
      [property]: {
        ...prevProperties[property],
        value
      }
    }));
    setLinkConditions((prevConditions) => ({
      ...prevConditions,
      [property]: condition
    }));
  };

  const renderPropertyField = (property, value, dataType) => {
    console.log('property', property);
    console.log('value', value);
    console.log('dataType', dataType);
    const textFieldProps = {
      label: property,
      value,
      // fullWidth: true,
      onChange: (e) => {
        handlePropertyChange(
          property,
          e.target.value,
          linkConditions[property]
        );
      }
    };

    switch (dataType) {
      case 'number':
        return (
          <div className={RowContainer}>
            <div className={firstCol}>
              <div className={header}>
                <div className="pr-[5px]">◆</div>
                {property}
              </div>
            </div>
            <div className={secondCol}>
              {/* <TextField
                select
                value={linkConditions[property] || '='}
                onChange={(e) =>
                  handlePropertyChange(property, value, e.target.value)
                }
                sx={{
                  fontSize,
                  width: '100%'
                }}
              >
                <MenuItem value="=">Equal</MenuItem>
                <MenuItem value=">">Greater Than</MenuItem>
                <MenuItem value="<">Less Than</MenuItem>
                <MenuItem value="<>">Not Equal</MenuItem>
              </TextField> */}
              {/* <DropdownForQuery
                onChange={() => {
                  handlePropertyChange(property, value, dropDownCurrentValue);
                }}
                options={[
                  { value: '=', label: 'Equal' },
                  { value: '>', label: 'Greater Than' },
                  { value: '<', label: 'Less Than' },
                  { value: '<>', label: 'Not Equal' }
                ]}
                setValue={setDropDownCurrentValue}
              /> */}
              <DropdownForQuery
                onClick={(selectedOption) => {
                  console.log('selectedOption', selectedOption);
                  handlePropertyChange(property, value, selectedOption.value);
                }}
                options={[
                  { value: '=', label: 'Equal' },
                  { value: '>', label: 'Greater Than' },
                  { value: '<', label: 'Less Than' },
                  { value: '<>', label: 'Not Equal' }
                ]}
              />
            </div>
            <div className={thirdCol}>
              <input
                type="number"
                {...textFieldProps}
                value={value || ''}
                className={inputCol}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (
                    newValue !== '' ||
                    !isNaN(Number(newValue) || newValue === 0)
                  ) {
                    handlePropertyChange(
                      property,
                      Number(newValue),
                      linkConditions[property]
                    );
                  }
                }}
              />
            </div>
          </div>
        );
      default:
        return (
          <div className={RowContainer}>
            <div className={firstCol}>
              <div className={header}>
                <div className="pr-[5px]">◆</div>
                {property}
              </div>
            </div>
            <div className={secondCol}>
              {/* <TextField
                select
                value={linkConditions[property] || '='}
                onChange={(e) => {
                  handlePropertyChange(property, value, e.target.value);
                }}
                sx={{
                  fontSize,
                  width: '100%'
                }}
              >
                <MenuItem value="=">Equal</MenuItem>
                <MenuItem value="<>">Not Equal</MenuItem>
              </TextField> */}
              <DropdownForQuery
                onChange={(e) => {
                  handlePropertyChange(property, value, e.target.value);
                }}
                options={[
                  { value: '=', label: 'Equal' },
                  { value: '<>', label: 'Not Equal' }
                ]}
              />
            </div>
            <div className={thirdCol}>
              <div {...textFieldProps} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 transform z-50 flex justify-center items-center transition-all backdrop-blur-[10px]">
      <div className="w-[1000px] max-h-[80%] rounded-[28px] bg-gray-300/50 dark:bg-gray-600/50  px-[40px] py-[50px] transition-all">
        <div className="flex justify-between items-center z-50">
          <h1 className="mb-2 text-[25px] font-medium text-gray-900 dark:text-white animate__animated animate__zoomIn transition-all">
            Link Query Panel
          </h1>
          <div>
            <DropdownForQuery
              options={transformedArray.array}
              value={selectedRelationType}
              setValue={setSelectedRelationType}
            />
          </div>
        </div>

        <div className="z-40 gradient-mask max-h-[50vh] -mr-[20px] pr-[20px]  h-auto relative w-full overflow-y-auto overflow-x-hidden scrollbar-show text-left transition-all">
          <div className="px-[10px] grid w-full grid-cols-1 gap-x-[20px]">
            {Object.entries(linkProperties).map(
              ([property, { value, type }], index) => (
                <div
                  key={property}
                  style={{
                    animationDelay: `${index * 0.08}s`,
                    zIndex: 999 - index
                  }}
                  className="flex animate__animated animate__fadeInRight transition-all"
                >
                  {renderPropertyField(property, value, type)}
                </div>
              )
            )}
          </div>
        </div>
        <motion.div
          layout
          className="w-full flex justify-center items-center place-items-center text-center gap-x-24 pt-[15px] z-0 transition-all"
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
            Query Link
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default LinkQueryPanel;
