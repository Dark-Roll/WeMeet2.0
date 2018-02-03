import React from 'react';

export default class PaintingColor extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     isColorListOpen: false,
        //     color: "black"
        // }
    }


    onClick_black() {
        this.props.Change({
            color: "black",
            isColorListOpen: false
        });
    }

    onClick_red() {
        this.props.Change({
            color: "red" ,
            isColorListOpen: false
        });
    }

    onClick_yellow() {
        this.props.Change({
            color: "yellow",
            isColorListOpen: false
        });
    }

    onClick_green() {
        this.props.Change({
            color: "green",
            isColorListOpen: false
        });
    }

    onClick_white() {
        this.props.Change({
            color: "white",
            isColorListOpen: false
        });
    }

    onClick_blue() {
        this.props.Change({
            color: "blue",
            isColorListOpen: false
        });
    }

    showColorList() {
        this.props.ChangeIs(!this.props.isColorListOpen);
    }

    render() {
        return (
            <div>
                
                <div className="button2" id="color">
                    <div
                        className="color"
                        id={this.props.color}
                        
                        onClick={() => this.showColorList()}
                    />
                    <span>顏色</span>
                </div>

                <div
                    className="colorlist"
                    id={this.props.isColorListOpen ? "visible" : ""}
                >
                    <div
                        className="choice"
                        id="black"
                        onClick={() => { this.onClick_black() }}
                    />
                    <div
                        className="choice"
                        id="red"
                        onClick={() => { this.onClick_red() }}
                    />
                    <div
                        className="choice"
                        id="white"
                        onClick={() => { this.onClick_white() }}
                    />
                    <div
                        className="choice"
                        id="yellow"
                        onClick={() => { this.onClick_yellow() }}
                    />
                    <div
                        className="choice"
                        id="green"
                        onClick={() => { this.onClick_green() }}
                    />
                    <div
                        className="choice"
                        id="blue"
                        onClick={() => { this.onClick_blue() }}
                    />
                </div>
            </div>
        );
    }
}
