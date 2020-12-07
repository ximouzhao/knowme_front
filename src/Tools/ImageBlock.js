import React, { PureComponent } from "react";
import ReactZmage from 'react-zmage'
/**
 * props 对象内容
 * alt: "javaSynchronized原理.png"
 * src: "/api/files/bace05e84e4eb616e550f46cd16296a4.png"
 */
class ImageBlock extends PureComponent {
  
    render() {
      return (
        <ReactZmage src={this.props.src}
        alt={this.props.alt}
        />
      );
    }
  }
  
export default ImageBlock;