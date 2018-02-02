import React from 'react';


export default class AVwindowShare extends React.Component {
    constructor(props){
        super(props);

        
        this.onClick_toggleVideoControl = this.onClick_toggleVideoControl.bind(
            this
        );
    }


    onClick_toggleVideoControl() {
        this.props.Chat.toggleUserMedia();
        socket.emit(
            "setRemoteVideoState",
            !this.props.isStreaming,
            this.props.localUserID
        );
        this.props.dispatch(toggleUserMedia());
    }


    render() {
        return (
            <div
                className="av-button"
                id={this.props.isStreaming ? "video-on" : "video-off"}
                onClick={this.onClick_toggleVideoControl}
            >
                <div
                    className="hovertext"
                    id={this.props.isStreaming ? "video-on" : "video-off"}
                >
                    {this.props.isStreaming ? "開啟視訊" : "取消視訊"}
                </div>
            </div>
        );
    }
}
