import React, { PureComponent } from "react";
import { PhotoConsumer } from 'react-photo-view';

/**
 * props 对象内容
 * alt: "javaSynchronized原理.png"
 * src: "/api/files/bace05e84e4eb616e550f46cd16296a4.png"
 */
class ImageBlock extends PureComponent { 
    

    render() {
        console.log(this.props);
        return (
            <PhotoConsumer key={this.props.src} src={this.props.src} intro={this.props.alt}>
                <img src={this.props.src} alt={this.props.alt} />
            </PhotoConsumer>
        );
    }
}

export default ImageBlock;