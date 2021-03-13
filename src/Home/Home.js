import React, { Component } from 'react';
import './Home.css';
import world_pic from '../resource/world.jpg';

class Home extends Component{
    render(){
        return (
        <div>
            <img className="homePic" src={world_pic} alt="" />
        </div>
        );
    }
}

export default Home;