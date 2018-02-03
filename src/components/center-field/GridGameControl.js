import React from 'react';
import { setGridClose } from "../../actions/Actions";
import { downloadCSV } from "../../lib/downloadCSV";

import { connect } from "react-redux";

export default class GridGameControl extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {

        // }
    }

    onClick_closeGrid() {
        this.props.dispatch(setGridClose());
    }

    render() {
        return (
            <div>
                { this.props.isEnlarge ? <div className="blackBG" /> : null }
                < div
                    className = "gametoolbar"
                    id = { this.props.isEnlarge ? "bigger" : "" }
                > 
                    {this.props.isEnlarge ? (
                        <div
                            className="button2"
                            id="backtosmall"
                            onClick={this.props.ChangeSize}
                        >
                            縮小
                        </div>
                    ) : (
                        <div
                            className="button2"
                            id="fullscreen"
                            onClick={this.props.ChangeSize}
                        >
                            放大
                        </div>
                    )}
                    < div
                        className = "button2"
                        id = "reset"
                        onClick = {() => {
                            this.props.clearGrid();
                        }}
                    >
                        清空
                    </div >
                    <div
                        className="button2"
                        id="dowload"
                        onClick={() => {
                            downloadCSV(this.props.grid);
                        }}
                    >
                        下載
                    </div>
                    <div
                        className="button2"
                        id="shutdown"
                        onClick={() => {
                            this.onClick_closeGrid();
                        }}
                    >
                        結束
                    </div>
                </div >
                {/* { result } */}
            </div>
        );
    }
}