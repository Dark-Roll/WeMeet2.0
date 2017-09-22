"use strict";
// {   投票資料格式
//     secretOrNot:1, 0:記名 1:匿名
//     question:"sssssss",
//     option:["ssss","xxxxx","pppppp"],
//     multiOrNot:[1(0:一票 1:多票),3(多票是幾票)],
// }
import React from "react";
import socket from "../../socket";

class VoteDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegisteredSelect: true,
            isMultivoteOpen: false,
            isVoteReady: false,
            MultivoteNumber: 2,
            voting: {
                secretOrNot: 0,
                multiOrNot: [0],
                question: "",
                option: {
                    option1: ""
                }
            }
        };
        this.onClick_ToggleMultivote = this.onClick_ToggleMultivote.bind(this);
        this.onClick_Subtractuon = this.onClick_Subtractuon.bind(this);
        this.onClick_Addition = this.onClick_Addition.bind(this);
    }

    componentWillMount() { }

    componentDidMount() { }

    onClick_Registered() {
        if (this.state.isRegisteredSelect) {
            return;
        } else {
            this.setState({
                isRegisteredSelect: !this.state.isRegisteredSelect,
                voting: {
                    ...this.state.voting,
                    secretOrNot: 0
                }
            });
        }
    }

    onClick_Anonymous() {
        if (!this.state.isRegisteredSelect) {
            return;
        } else {
            this.setState({
                isRegisteredSelect: !this.state.isRegisteredSelect,
                voting: {
                    ...this.state.voting,
                    secretOrNot: 1
                }
            });
        }
    }

    onEnterQuestion(e) {
        let counter = 0
        let flag = true
        Object.keys(this.state.voting.option).map((key) => {
            if (this.state.voting.option[key]) {
                counter++
            } else {
                flag = false
            }
        })
        if (!e.target.value) {
            console.log("沒打東C喔QQ，提醒一波");
            this.setState({
                isVoteReady: false,

            });
        } else {
            this.setState({
                voting: {
                    ...this.state.voting,
                    isVoteReady: (counter >= 2 && flag ? true : false),
                    question: e.target.value
                }
            });
        }
    }

    onBlurQuestion(e) {
        let counter = 0
        let flag = true
        Object.keys(this.state.voting.option).map((key) => {
            if (this.state.voting.option[key]) {
                counter++
            } else {
                flag = false
            }
        })
        if (!e.target.value) {
            console.log("沒打東C喔QQ，提醒一波");
            this.setState({
                isVoteReady: false,
            });
        } else {
            this.setState({
                voting: {
                    ...this.state.voting,
                    isVoteReady: (counter >= 2 && flag ? true : false),
                    question: e.target.value
                }
            });
        }
    }

    onEnterOption(e) {
        if (e.target.value) {
            let counter = 0
            let flag = true
            Object.keys(this.state.voting.option).map((key) => {
                if (!this.state.voting.option[key]) {
                    let flag = false
                } else {
                    counter += 1
                }

            })

            this.setState({
                isVoteReady: (counter + 1 >= 2 && flag ? true : false),
                voting: {
                    ...this.state.voting,
                    option: {
                        ...this.state.voting.option,
                        [e.target.id]: e.target.value
                    }
                }
            });
        } else {
            console.log("沒值阿!給個紅框");
            this.setState({
                isVoteReady: false,
                voting: {
                    ...this.state.voting,
                    option: {
                        ...this.state.voting.option,
                        [e.target.id]: e.target.value
                    }
                }
            });
        }
    }

    onBlurOption(e) {
        if (e.target.value) {
            let counter = 0
            let flag = true
            Object.keys(this.state.voting.option).map((key) => {
                if (!this.state.voting.option[key]) {
                    flag = false
                } else {
                    counter += 1
                }
            })

            this.setState({
                isVoteReady: (counter >= 2 && flag ? true : false),
                voting: {
                    ...this.state.voting,
                    option: {
                        ...this.state.voting.option,
                        [e.target.id]: e.target.value
                    }
                }
            });
        } else {
            console.log("給個紅框");
            this.setState({
                isVoteReady: false,
                voting: {
                    ...this.state.voting,
                    option: {
                        ...this.state.voting.option,
                        [e.target.id]: e.target.value
                    }
                }
            });
        }
    }

    onClick_ToggleMultivote() {
        //如果原本是多票>改成單票
        if (this.state.isMultivoteOpen) {
            this.setState({
                isMultivoteOpen: !this.state.isMultivoteOpen,
                voting: {
                    ...this.state.voting,
                    multiOrNot: [0]
                }
            });
        } else {
            this.setState({
                isMultivoteOpen: !this.state.isMultivoteOpen,
                voting: {
                    ...this.state.voting,
                    multiOrNot: [1, this.state.MultivoteNumber]
                }
            });
        }
    }

    onClick_Subtractuon() {
        if (this.state.MultivoteNumber > 2) {
            this.setState({
                MultivoteNumber: this.state.MultivoteNumber - 1,
                voting: {
                    ...this.state.voting,
                    multiOrNot: [1, this.state.MultivoteNumber - 1]
                }
            });
        }
    }

    onClick_Addition() {
        if (this.state.MultivoteNumber < 10) {
            this.setState({
                MultivoteNumber: this.state.MultivoteNumber + 1,
                voting: {
                    ...this.state.voting,
                    multiOrNot: [1, this.state.MultivoteNumber + 1]
                }
            });
        }
    }

    onClick_deleteOption(e) {
        //刪除那個選項
        let delOption = Object.keys(
            this.state.voting.option
        ).reduce((newOption, key) => {
            if (key !== e.target.id) {
                newOption[key] = this.state.voting.option[key];
            }
            return newOption;
        }, {});

        let newOptionOrder = {};

        Object.keys(delOption).map((optionKey, index) => {
            newOptionOrder["option" + (index + 1)] = delOption[optionKey];
        });

        let counter = 0
        let flag = true

        Object.keys(newOptionOrder).map((key) => {
            if (!newOptionOrder[key]) {
                flag = false
            } else {
                counter += 1
            }
        })

        this.setState({
            isVoteReady: (counter >= 2 && flag ? true : false),
            voting: {
                ...this.state.voting,
                option: newOptionOrder
            }
        });
    }

    onClick_newOption(e) {
        let key = "option" +
            (Object.keys(this.state.voting.option).length + 1);
        this.setState({
            isVoteReady: false,
            voting: {
                ...this.state.voting,
                option: {
                    ...this.state.voting.option,
                    ["option" +
                    (Object.keys(this.state.voting.option).length + 1)]: ""
                }
            }
        }, () => { this.refs[key].focus() });
    }

    onClick_startVoing() {
        console.log("發送投票資訊到伺服器>全部人同步");
        socket.emit("createVote", this.state.voting);
    }

    render() {
        let option = [];
        for (let key in this.state.voting.option) {
            option.push(
                <div className="question">
                    <div
                        className="delete"
                        onClick={e => {
                            this.onClick_deleteOption(e);
                        }}
                        id={key}
                        ref={key}
                    />
                    <input
                        value={this.state.voting.option[key]}
                        className="text"
                        type="text"
                        id={key}
                        ref={key}
                        placeholder="點此新增投票選項"
                        onBlur={e => {
                            this.onBlurOption(e);
                        }}
                        onChange={e => {
                            this.onEnterOption(e);
                        }}
                    />
                    <span className="focus-bg"></span>
                </div>
            );
            this.refs.key = this.state.voting.option[key];
        }

        return (
            <div className="voting" id="Fadein">
                <div className="votetypeselect">
                    <button
                        className="registered"
                        id={
                            this.state.isRegisteredSelect
                                ? "selected"
                                : "notselected"
                        }
                        onClick={() => {
                            this.onClick_Registered();
                        }}
                    >
                        記名投票
                    </button>

                    <button
                        className="anonymous"
                        id={
                            this.state.isRegisteredSelect
                                ? "notselected"
                                : "selected"
                        }
                        onClick={() => {
                            this.onClick_Anonymous();
                        }}
                    >
                        匿名投票
                    </button>
                </div>

                <div className="votequestion">
                    <input
                        className="input"
                        ref="votequestion"
                        type="text"
                        placeholder="請輸入投票問題"
                        onKeyUp={e => {
                            this.onEnterQuestion(e);
                        }}
                        onBlur={e => {
                            this.onBlurQuestion(e);
                        }}
                    />
                    <span className="focus-border"></span>
                </div>

                <div className="voteconent">
                    {option}
                    <div
                        className="question"
                        onClick={e => {
                            this.onClick_newOption(e);
                        }}
                    >
                        <div className="add" />
                        <div className="text">按此新增選項</div>
                    </div>
                </div>

                <div className="votebottom">
                    <div className="multi-vote">複選</div>
                    <input
                        className="toggle"
                        type="checkbox"
                        name="check-3"
                        onClick={this.onClick_ToggleMultivote}
                    />
                    <div
                        className="multivote-number"
                        id={this.state.isMultivoteOpen ? "visible" : "hidden"}
                    >
                        <button
                            className="subtraction"
                            onClick={this.onClick_Subtractuon}
                        >
                            -
                        </button>
                        <input
                            className="number"
                            type="text"
                            value={this.state.MultivoteNumber}
                        />
                        <button
                            className="addition"
                            onClick={this.onClick_Addition}
                        >
                            +
                        </button>
                    </div>
                    <button
                        className="votesubmit"
                        id={this.state.isVoteReady ? "open" : "close"}
                        onClick={e => {
                            this.onClick_startVoing(e);
                        }}
                        disabled={this.state.isVoteReady ? false : true}
                    >
                        開始投票
                    </button>
                </div>
            </div>
        );
    }
}

export default VoteDetail;
