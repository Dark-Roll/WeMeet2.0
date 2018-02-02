"use strict";

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
    toggleAudio,
    toggleUserMedia,
    delRemoteStreamURL,
    gotLocalVideo,
    addRemoteStreamURL
} from "../../actions/Actions";
import socket from "../../socket";
// import DetectRTC from '../../lib/detect';
import AVVideoControl from './AVVideoControl';
import AVWindowShare from './AVWindowShare';

class AVcontrol extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     // isShowExitConfirm: false 是否顯示離開房間的警示框
        //     isShareScreenStart: false
        // };
  
       
   

        // this.onClick_ShowConfirm = this.onClick_ShowConfirm.bind(this);
    }

    componentWillMount() { }

    componentDidMount() {
        // window.screenSharingObject = new Screen(this.props.localUserID);; // argument is optional
        // // on getting local or remote streams
        // window.screenSharingObject.onaddstream = function(e) {
        //     console.log('收到別人的影像了!')
        //     document.body.appendChild(e.video);
        // };
    }

    //Button Events
    onClick_toggleAudioControl() {
        this.props.Chat.toggleAudio();
        socket.emit(
            "setRemoteAudioState",
            !this.props.isSounding,
            this.props.localUserID
        );
        this.props.dispatch(toggleAudio());
    }

    

    onClick_showRecord() {
        this.props.history.push("/record" + this.props.roomName.substring(37));
    }

    


    render() {
        return (
            <div className="av-control">
                <div
                    className="av-button"
                    id={this.props.isSounding ? "audio-on" : "audio-off"}
                    onClick={this.onClick_toggleAudioControl}
                >
                    <div
                        className="hovertext"
                        id={this.props.isSounding ? "audio-on" : "audio-off"}
                    >
                        {this.props.isSounding ? "靜音" : "取消靜音"}
                    </div>
                </div>

                <div
                    className="av-button"
                    id="exit"
                    onClick={() => {
                        this.onClick_showRecord();
                    }}
                >
                    <div className="hovertext" id="exit">
                        結束會議
                    </div>
                </div>

                <AVVideoControl/>

                <AVWindowShare />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        localUserID: state.connection.localUserID,
        roomName: state.connection.roomName,
        isStreaming: state.connection.isStreaming,
        isSounding: state.connection.isSounding
    };
};

export default withRouter(connect(mapStateToProps)(AVcontrol));
