// import { renderToString } from 'react-dom/server';

const nodeTooltipText = (node) => {
  const formattedProperties = Object.entries(node.properties)
    .map(([key, { value, _ }], index) => {
      const AnimationDelay = 0.15 * index;
      const AnimationDuration = 0.5;
      return `<div key=${index} 
          class='animate__animated animate__fadeInUp animate__faster flex justify-between items-center py-[10px]'
          style='animationDelay: ${AnimationDelay}s; animationDuration: ${AnimationDuration}s'>
          <div class='animate__animated animate__zoomIn animate__slow flex w-[30%] text-[16px] text-left font-black uppercase'>${String(key)}:</div>  
          <div class='animate__animated animate__zoomIn animate__slower flex w-[60%] text-[14px] justify-end text-right'>${String(value)}</div>
        </div>`;
    })
    .join('');

  const backgroundColor = `rgba(${parseInt(node.color.slice(1, 3), 16)}, ${parseInt(node.color.slice(3, 5), 16)}, ${parseInt(node.color.slice(5, 7), 16)}, 0.1)`;
  const borderColor = `rgba(${Math.max(parseInt(node.color.slice(1, 3), 16) - 100, 100)}, ${Math.max(parseInt(node.color.slice(3, 5), 16) - 100, 100)}, ${Math.max(parseInt(node.color.slice(5, 7), 16) - 100, 100)}, 1)`;

  return `<div style="background-color: ${backgroundColor}; border-color: ${borderColor}; ;" class="animate__animated animate__fadeInUp w-[300px]  backdrop-blur-[15px] p-[28px] rounded-[28px] text-gray-700 dark:text-white ">
            ${formattedProperties}
          </div>`;
};

const linkTooltipText = (link) => {
  const formattedProperties = Object.entries(link.properties)
    .map(([key, { value, _ }], index) => {
      const AnimationDelay = 0.15 * index;
      const AnimationDuration = 0.5;
      return `<div key=${index} 
          class='animate__animated animate__fadeInUp animate__faster flex justify-between items-center py-[10px]'
          style='animationDelay: ${AnimationDelay}s; animationDuration: ${AnimationDuration}s'>
          <div class='animate__animated animate__zoomIn animate__slow flex w-[30%] text-[16px] text-left font-black uppercase'>${String(key)}:</div>  
          <div class='animate__animated animate__zoomIn animate__slower flex w-[60%] text-[14px] justify-end text-right'>${String(value)}</div>
        </div>`;
    })
    // delete the comma between each formattedProperties
    .join('');

  const backgroundColor = `rgba(${parseInt(link.color.slice(1, 3), 16)}, ${parseInt(link.color.slice(3, 5), 16)}, ${parseInt(link.color.slice(5, 7), 16)}, 0.1)`;
  const borderColor = `rgba(${Math.max(parseInt(link.color.slice(1, 3), 16) - 100, 100)}, ${Math.max(parseInt(link.color.slice(3, 5), 16) - 100, 100)}, ${Math.max(parseInt(link.color.slice(5, 7), 16) - 100, 100)}, 1)`;

  return `<div style="background-color: ${backgroundColor}; border-color: ${borderColor}; ;" class="animate__animated animate__fadeInUp w-[300px]  backdrop-blur-[15px] p-[28px] rounded-[28px] text-gray-700 dark:text-white ">
          <div class='animate__animated animate__fadeInUp animate__faster flex justify-between items-center py-[10px]'>
            <div class='animate__animated animate__zoomIn animate__slow flex w-[30%] text-[16px] text-left font-black uppercase'>Type:</div>
            <div class='animate__animated animate__zoomIn animate__slower flex w-[60%] text-[14px] justify-end text-right'>${link.type}</div>
          </div>
    ${formattedProperties}
  </div>`;
};
export { nodeTooltipText, linkTooltipText };
