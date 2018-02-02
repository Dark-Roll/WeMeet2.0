import React from 'react';

import {
    toggleAudio,
    toggleUserMedia,
    delRemoteStreamURL,
    gotLocalVideo,
    addRemoteStreamURL
} from "../../actions/Actions";
import socket from "../../socket";
import DetectRTC from '../../lib/detect';

export default class AVWindowShare extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isShareScreenStart:false
        }

        this.onClick_startShare = this.onClick_startShare.bind(this);
    }


    WindowShare(thisComponent){
        window.sharePeer.on("call", call => {
            // window.Peer.destroy()
            call.answer(window.shareScreenStream);
            call.on("stream", remoteStream => {
                console.log("收到影像啦!" + stream);
                let url = URL.createObjectURL(remoteStream);
                thisComponent.props.dispatch(
                    addRemoteStreamURL({
                        remotePeer: call.peer,
                        url: url
                    })
                );
            });
        });
    }

    SetShareScreenStart(thisComponent){
        thisComponent.setState({
            isShareScreenStart: true
        });
    }
    
    onClick_startShare() {
        DetectRTC.screen.getChromeExtensionStatus((status)=>{
            if(status !== 'installed-enabled') {
                let r = confirm('請安裝插件，以進行螢幕分享')
                if (r) window.open('https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk/support')
                return;               
            } else {
                
            }
        });
        let thisComponent = this;
        // <    set=thisComponent/> 
        if (window.shareScreen && Object.keys(window.shareScreen).length > 0) {
            //可以直接撥打
        } else {
            //先取得UserMedia
            let screen_constraints = {
                mandatory: {
                    chromeMediaSource: "screen",
                    maxWidth: 1920,
                    maxHeight: 1080,
                    minAspectRatio: 1.77
                },
                optional: []
            };
            getScreenId(function (error, sourceId, screen_constraints) {
                navigator.getUserMedia =
                    navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
                navigator.getUserMedia(
                    screen_constraints,
                    function (stream) {
                        window.shareScreenStream = stream;
                        window.shareScreenStream.oninactive = () => {
                            socket.emit("closeShareScreen");
                            thisComponent.props.dispatch(
                                gotLocalVideo(
                                    URL.createObjectURL(window.localStream),
                                    false
                                )
                            );
                        };
                        console.log("收到stream了", stream);
                        thisComponent.props.dispatch(
                            gotLocalVideo(
                                URL.createObjectURL(window.shareScreenStream),
                                true
                            )
                        );
                        //開始撥打
                        //window.Peer.destroy()
                        let UUID = Date.now();
                        let peer = new window.peerConstructor(
                            thisComponent.props.localUserID + UUID,
                            {
                                host: "140.123.174.34",
                                port: 8888,
                                path: "/api",
                                config:
                                thisComponent.props.Meeting.configuration
                            }
                        );
                        window.sharePeer = peer;
                        this.WindowShare
                    
                        socket.emit("shareScreenInvoke", UUID);
                        
                        this.SetShareScreenStart
                    },
                    function (error) {
                        console.error("getScreenId error", error);
                        // alert(
                        //     "Failed to capture your screen. Please check Chrome console logs for further information."
                        // );
                    }
                );
            });
        }
    }



    render() {

        return (
            <div
                className="sharescreen"
                id={this.state.isShareScreenStart ? "active" : "no-active"}
                onClick={this.onClick_startShare}
            >
                <label
                    className="sharetext"
                    id={this.state.isShareScreenStart ? "active" : ""}
                >
                    {this.state.isShareScreenStart ? "取消共享" : "共享螢幕"}
                </label>
            </div>

        );
    }
}