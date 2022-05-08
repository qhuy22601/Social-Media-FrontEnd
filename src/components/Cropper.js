import React, { Component } from 'react'
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import './cropper.css'
import image from '../image.png';
export class Cropper extends Component {
    state= {
        imageDestination:""
    }
    imageElement = React.createRef();
    componentDidMount(){
        const cropper = new Cropper(this.imageElement.current, {
            // zoomable:true,
            scalable:true,
            aspectRatio:1,      
            crop:()=>{
                const canvas = cropper.getCroppedCanvas();
                this.setState({
                    imageDestination:canvas.toDataURL('image/png')
                })
            }

        });

    }
    render() {

        return (
            <div>
              <div className ="img-container">
                  <img ref ={this.imageElement} src ={this.props.src||image} alt ="source"/>
                  </div>  
                  <img src = {this.state.imageDestination} className = "img-preview" alt ="Destination" />
                  {this.state.imageDestination&&<a href ={this.state.imageDestination}
                   download>Download</a> 
}
            </div>
        )
    }
}

export default Cropper