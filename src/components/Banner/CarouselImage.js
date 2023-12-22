import React from "react";
import {Image} from "react-bootstrap";


const CarouselImage = ({imagePath, text }) =>{
    const imageStyle = {
        height: "600px",
        width: '9 00px',
        maxWidth: '100%',
        maxHeight: '100%',
        display: 'block',
        margin: '0 auto',
    };
    return (
        <div>
            <Image style={imageStyle} src={require(`${imagePath}`)} alt={text} />
        </div>
    )
}

export default CarouselImage;
