import React, { useState, useEffect } from 'react';

// hideRow.js
export function hideRow (row) {
  return {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: row,
  };
}

// bgPic.js
export function bgPic (pic, scale, position) {
  return {
    backgroundImage: `url(${pic})`,
    backgroundSize: `${scale}`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: position,
  };
}

// generateRandomColor.js
export function generateRandomColor () {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// language.js
export function useLanguage () {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 0);

  useEffect(() => {
    const storedLang = localStorage.getItem('lang');
    if (storedLang) {
      setLang(storedLang);
    }
  }, []);

  useEffect(() => {}, [lang]);

  return lang;
}

// Bold_[Text].js
export function SelectText (text, color, space) {
  const parts = text.split(/(\[.*?\])/); // 利用正则表达式分割字符串，保留方括号部分

  return parts.map((part, index) => {
    if (part.startsWith('[') && part.endsWith(']')) {
      // 如果是方括号内的文本，应用加粗样式
      return (
        <span key={index} className={`font-black text-${color}`}>
          {(space || '') +
            `${part.substring(1, part.length - 1)}` +
            (space || '')}
        </span>
      );
    } else {
      // 非方括号内的文本
      return <React.Fragment key={index}>{part}</React.Fragment>;
    }
  });
}

// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

export function scrollToHash () {
  const { hash } = window.location;

  useEffect(() => {
    if (hash) {
      const targetElement = document.getElementById(hash.substring(1));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);
}

// import React, { useState, useEffect } from 'react';

export function DynamicBackground ({ children, initialPaths }) {
  const [loadedImage, setLoadedImage] = useState(null);
  const [bgPaths] = useState(initialPaths);

  useEffect(() => {
    const loadImage = new Image();
    loadImage.src = bgPaths[0];
    loadImage.onload = () => {
      setLoadedImage(bgPaths[0]);
    };
    loadImage.onerror = () => {
      setLoadedImage(bgPaths[1]);
    };
  }, [bgPaths]);

  return (
    <div style={{ backgroundImage: `url(${loadedImage})` }}>{children}</div>
  );
}

export function ScrollToTop () {
  window.scrollTo(0, 0);

  return null;
}

// preloadImages.js
export function preloadImages (imageUrls, onSuccess, onError) {
  // 创建 Promise 对象数组
  const imagePromises = imageUrls.map((imageUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = resolve;
      img.onerror = reject;
    });
  });

  // 等待所有图片加载完成
  Promise.all(imagePromises)
    .then(() => {
      // console.log('所有图片已预加载');
      // 执行成功回调函数
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch((error) => {
      // console.error('图片预加载失败:', error);
      // 执行失败回调函数
      if (onError) {
        onError(error);
      }
    });
}
