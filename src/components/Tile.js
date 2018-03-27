import React from 'react';
import style from 'styled-components';

const Square = style.div`
    height: 100px;
    width: 100px;
    background-image: ${props => "url('" + props.imageUrl + "')"};
    background-position: ${props => props.imgPosition.x + "px " + props.imgPosition.y + "px"};
    background-size: 300px;
    box-sizing: border-box;
    border: 1px solid gray;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: ${props => props.selected ? "gray" : "transparent"};
    transform: ${props => "rotateZ(" + props.rotation + "deg)"};
`

export default class Tile extends React.Component {

    handleDragStart = (e) => {
        e.dataTransfer.setData("Text", e.target.i)
        this.props.onDragStart();
    }

    handleDrop = (e) => {
        console.log("drop");
        e.preventDefault()
        this.props.onDrop();

    }

    render() {
        return (
            <div >
                <Square droppable="true" draggable="true"
                    imgPosition={this.props.imgPosition}
                    imageUrl={this.props.imageUrl}
                    rotation={this.props.rotation}
                    onClick={this.props.onClick}
                    onDragOver={(e) => e.preventDefault()}
                    onDragStart={this.handleDragStart}
                    onDrop={this.handleDrop}
                    selected={this.props.selected}>
                    {this.props.children}
                </Square>
            </div >
        );
    }
};

