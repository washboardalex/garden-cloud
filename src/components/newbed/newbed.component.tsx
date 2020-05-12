import React from 'react';
import Draggable from 'react-draggable';

import './newbed.styles.scss';

class NewBed extends React.Component {

  componentDidMount() {
    this.makeResizableDiv('.resizable');
  }

  makeResizableDiv = (div : string) => {
    const element : any = document.querySelector(div)!;
    const resizer = document.querySelector(div + ' .resizer');
    const minimum_size = 20;
    let [original_width, original_height, original_mouse_x, original_mouse_y]  = [0,0,0,0];
    resizer!.addEventListener('mousedown', function(e : any) {
      e.preventDefault();
      original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      [original_mouse_x, original_mouse_y] = [e.pageX, e.pageY];
      element.offsetParent.addEventListener('mousemove', resize);
      element.offsetParent.addEventListener('mouseup', stopResize);
    })
    function resize(e : any) { 
      const [width, height] = [original_width + (e.pageX - original_mouse_x), original_height + (e.pageY - original_mouse_y)];
      width > minimum_size && (element.style.width = width + 'px');
      height > minimum_size && (element.style.height = height + 'px');
    }
    function stopResize() {
      element.offsetParent.removeEventListener('mousemove', resize);
      element.offsetParent.removeEventListener('mouseup', stopResize);
    }
  }

  render() {
      return (
          <Draggable handle="strong" bounds="parent" >
            <div className='resizable'>
                <strong style={{position:'absolute', top:'0', border:'1px solid black'}}><div>Drag here</div></strong>
                <div className='resizers'>
                  <div className='resizer'></div>
                </div>
            </div>
          </Draggable>
      );
  } 
} 

export default NewBed;