import React from 'react';
import { motion } from 'framer-motion';

class AnimatedHeading extends React.Component {
  /**
   *
   * @param {text} text - The text to be displayed in the heading
   * @param {level} level - The level of the heading
   * @param {otherClassNames} otherClassName - The other class name to be added to the heading
   */
  constructor ({ text, level, otherClassNames, initialX }) {
    super();
    this.state = {
      text,
      level,
      otherClassNames,
      initialX
    };
  }

  render () {
    const Tag = `${this.state.level}`;
    const MotionHeading = motion[Tag];
    return (
      // dynamic motion level
      <MotionHeading
        layout
        initial={{ opacity: 0, scale: 0.5, x: this.state.initialX }}
        animate={{
          opacity: 1,
          scale: 1,
          x: 0,
          transition: { duration: 0.7, delay: 0.4 }
        }}
        exit={{ opacity: 0 }}
        className={`from-white/70 to-white/70 bg-clip-text text-transparent
                   bg-gradient-to-r z-50 text-right ${this.state.otherClassNames}`}
      >
        {this.state.text}
      </MotionHeading>
    );
  }
}

export default AnimatedHeading;
