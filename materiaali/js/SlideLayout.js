
/*
 * This hash helps exerslide to determine whether the file needs to be updated
 * or not. Please don't remove it.
 * @exerslide-file-hash a7d12fc3c1f0728656ec9a3dbeb43cf2
 */

import ExtensionPoint from 'exerslide/components/ExtensionPoint';
import React from 'react';

/**
 * The base layout for every slide. This allows you do add additional
 * content to all slides before or after the content.
 */
export default function SlideLayout({children}) {
  return (
    <ExtensionPoint tags={['content']}>
      <div>
        {children}
      </div>
    </ExtensionPoint>
  );
}

SlideLayout.propTypes = {
  /**
   * The current slide content and header are passed in as children by exerslide
   */
  children: React.PropTypes.node,
};
