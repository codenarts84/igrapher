import React from 'react';
import { motion } from 'framer-motion';
const ColoumnStyle =
  'drak:bg-white/10  bg-gray-500/20    w-full px-[10px] backdrop-blur-[5px] h-[60px] rounded-[20px] px-[17px] my-[10px] text-[17px] dark:text-white text-gray-900 border-gray-400  focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50';

class WhiteLabel extends React.Component {
  constructor ({ text, htmlFor }) {
    super();
    this.state = {
      text,
      htmlFor
    };
  }

  render () {
    const text = this.state.text;
    return (
      <label
        htmlFor={this.state.htmlFor}
        className="block mb-2 text-5xl font-medium text-gray-900 dark:text-white select-none"
      >
        {text}
      </label>
    );
  }
}

class GrayInput extends React.Component {
  render () {
    const { type, id, value, required, onChange, delay } = this.props;
    return (
      <motion.input
        type={type}
        id={id}
        value={value}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '100%', opacity: 1 }}
        transition={{ delay: `${delay}` }}
        exit={{ width: 0, opacity: 0 }}
        className={ColoumnStyle}
        required={required}
        onChange={onChange}
      />
    );
  }
}

export { WhiteLabel, GrayInput };
