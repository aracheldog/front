import {Component, useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import {Image} from "react-bootstrap";
import CarouselImage from "./CarouselImage";
import './carousel.css'


export default class ControlledCarousel extends Component{
    state = {
        index: 0,
        slides : [
            { imagePath: './imgs/product3.png', caption: 'Caption 1' },
            { imagePath: './imgs/product2.png', caption: 'Caption 2' },
            { imagePath: './imgs/product1.png', caption: 'Caption 3' },
        ]
    };

    handleSelect = (selectedIndex) => {
        this.setState({
            index: selectedIndex,
        });
    };


    render() {
        return (
            this.state.slides.length !== 0 &&
            <div>
                <Carousel activeIndex={this.state.index} onSelect={this.handleSelect} data-bs-theme="dark">
                    {this.state.slides.map(slide =>
                        <Carousel.Item>
                            <CarouselImage imagePath={slide.imagePath} />
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )}
                </Carousel>
            </div>
        );
    }
}


