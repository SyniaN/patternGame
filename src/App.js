import styled from 'styled-components';
import React, { Component } from 'react';
import style from 'styled-components';
import Tile from './components/Tile';
import { isNullOrUndefined } from 'util';

const Wrapper = style.div`
    width: 300px;
    display: flex;
    flex-wrap: wrap;
    margin: auto;
`
class App extends Component {

    constructor() {
        super();
        this.swapSquare = this.swapSquare.bind(this);
        this.selectSquare = this.selectSquare.bind(this);
        this.rotateSquare = this.rotateSquare.bind(this);
    }

    state = {
        imageUrl: "https://vignette.wikia.nocookie.net/logopedia/images/1/16/300px-DC_Comics_logo.svg.png/revision/latest?cb=20110127205851",
        tiles: [
            [
                { value: 1, rotation: 0, imgPosition: { x: 0, y: 0 } },
                { value: 2, rotation: 0, imgPosition: { x: -100, y: 0 } },
                { value: 3, rotation: 0, imgPosition: { x: -200, y: 0 } }
            ],
            [
                { value: 4, rotation: 0, imgPosition: { x: 0, y: -100 } },
                { value: 5, rotation: 0, imgPosition: { x: -100, y: -100 } },
                { value: 6, rotation: 0, imgPosition: { x: -200, y: -100 } }
            ],
            [
                { value: 7, rotation: 0, imgPosition: { x: 0, y: -200 } },
                { value: 8, rotation: 0, imgPosition: { x: -100, y: -200 } },
                { value: 9, rotation: 0, imgPosition: { x: -200, y: -200 } }
            ]
        ],
        selected: undefined
    }

    swapSquare = (x, y) => {
        const l1 = { x: x, y: y }
        const l2 = { x: this.state.selected.x, y: this.state.selected.y }
        const v1 = this.state.tiles[l1.y][l1.x];
        const v2 = this.state.tiles[l2.y][l2.x];

        const array = [...this.state.tiles];
        array[l1.y][l1.x] = v2;
        array[l2.y][l2.x] = v1;

        this.setState({
            tiles: array,
            selected: undefined
        })
    }

    selectSquare = (x, y) => {
        console.log('select Square fired');
        this.setState({ selected: { x: x, y: y } });
    }

    rotateSquare = (x, y) => {
        let rotation = this.state.tiles[y][x].rotation;
        rotation = rotation + 90;
        const array = [...this.state.tiles];
        array[y][x].rotation = rotation;
        this.setState({
            tiles: array,
            selected: { x: x, y: y }
        })
    }

    render() {
        return (
            <Wrapper>
                {
                    this.state.tiles.map((row, y) => {
                        return row.map((tile, x) => {
                            const isSelected =
                                !isNullOrUndefined(this.state.selected) &&
                                x === this.state.selected.x &&
                                y === this.state.selected.y

                            return <Tile
                                key={x}
                                imageUrl={this.state.imageUrl}
                                imgPosition={tile.imgPosition}
                                onDragStart={() => this.selectSquare(x, y)}
                                onDrop={() => this.swapSquare(x, y)}
                                selected={isSelected}
                                onClick={() => this.rotateSquare(x, y)}
                                rotation={tile.rotation}
                            >
                                {tile.value}
                            </Tile>;
                        })
                    })
                }
            </Wrapper >
        );
    }
}

export default App;

const Sample = styled.div`
    height: 300px;
    width: 300px;
    background-image: ${props => "url('" + props.imageUrl + "')"};
`
