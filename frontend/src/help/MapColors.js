const rainbowColors = ['#F43545', '#FF8901', '#FAD717', '#00BA71', '#00C2DE', '#00418D', '#5F2879',];
const predefinedColors = [
  '#FF0000',
  '#FF8000',
  '#FFD700',
  '#00FF00',
  '#00FF80',
  '#00FFFF',
  '#0080FF',
  '#0000FF',
  '#8000FF',
  '#FF00FF',
  '#FF0080',
  '#800000',
  '#008000',
  '#00FF40',
  '#00FFBF',
  '#00DDFF',
  '#0040FF',
  '#6600FF',
  '#BF00FF',
  '#FF00BF',
  '#FF4000',
  '#FFA000',
  '#FFFF00',
  '#80FF00',
  '#00FF80',
  '#00FFFF',
  '#00BFFF',
  '#0080FF',
  '#8000FF',
  '#FF00FF',
  '#FF0040',
  '#800080',
  '#004000',
  '#008080',
  '#40FF80',
  '#80FFDF',
  '#80BFFF',
  '#4080FF',
  '#A000FF',
  '#FF80FF',
  '#FF8040',
  '#FFC080',
  '#FFFF80',
  '#BFFF00',
  '#80FF80',
  '#80FFFF',
  '#00FFFF',
  '#0080FF',
  '#8080FF',
  '#FF80FF',
  '#FF4080',
  '#804000',
  '#00A000',
  '#00FF00',
  '#00FF60',
  '#60FFFF',
  '#6060FF',
  '#A000FF',
  '#FF60FF',
  '#FF8080',
  '#FFA040',
  '#FFFF40',
  '#BFFF60',
  '#BFFFBF',
  '#BFFFFF',
  '#40BFFF',
  '#8080FF',
  '#FF80FF',
  '#FFA0A0',
  '#FFD080',
  '#FFFF80',
  '#DFFF80',
  '#BFFFBF',
  '#BFFFFF',
  '#80DFFF',
  '#A0A0FF',
  '#FFA0FF',
  '#FFC0C0',
  '#FFE0A0',
  '#FFFF60',
  '#DFFF60',
  '#BFFFBF',
  '#BFFFFF',
  '#60DFFF',
  '#C0C0FF',
  '#FFC0FF',
  '#FFE0E0',
  '#FFF0C0',
  '#FFFF40',
  '#EFFF40',
  '#DFFF80',
  '#DFDFFF',
  '#40CFFF',
  '#E0E0FF',
  '#FFDEFF',
];

export const mapColors = (items, type) => {
  const itemToColor = new Map();
  let colorIndex = 0;

  for (const item of items) {
    if (!itemToColor.has(item)) {
      const colorArray = colorIndex < 6 ? rainbowColors : predefinedColors;
      const color = colorArray[(colorArray.length - colorIndex + 4) % colorArray.length];
      itemToColor.set(item, color);
      colorIndex++;
    }
  }

  const colorMapping = Object.fromEntries(itemToColor);

  return type === 'label'
    ? { labelColorMapping: colorMapping }
    : { linkColorMapping: colorMapping };
};
