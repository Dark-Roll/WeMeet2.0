"use strict";

import React from "react";
import { connect } from "react-redux";
import socket from "../../socket";
import {
    setAgenda,
    newAgenda,
    deleteAgenda,
    updateAgenda,
    doneAgenda
} from "../../actions/Actions";
import AgendaCheckbox from './AgendaCheckbox';
import AgendaInput from './AgendaInput';
import Branch from '../../img/branch.gif';
import Eagle from '../../img/eagle.png';
import EagleButton from './EagleButton'

class Agenda extends React.Component {
    constructor(props) {
        super(props);
        
        // this.state = {
        //     agendaList: [
        //         {
        //             content: "", //單個議程內容
        //             isAgendaFinished: false //議程是否完成，會觸發checkbox是否被選取&是否有刪除縣
        //         }
        //     ]
        // };
        this.agendaListCounter = 0;
        this.onClickToggleDeleteAgenda = this.onClickToggleDeleteAgenda.bind(
            this
        );
        //this.onClick_ToggleAddAgenda = this.onClick_ToggleAddAgenda.bind(this);
        //this.handleAgendaInputPressEnter = this.handleAgendaInputPressEnter.bind(this);
    }

    componentWillMount() {}

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    onClickToggleDeleteAgenda(e) {
        const key = Number(e.target.id);
		this.props.agendaList.forEach((item, index) => {
			if (item.id === key) {
				this.props.dispatch(deleteAgenda(index));
				socket.emit('deleteAgenda', index);
			}
		});
        // this.setState({
        //     ...this.state,
        //     agendaList: [
        //         ...this.state.agendaList.slice(0, key),
        //         ...this.state.agendaList.slice(key + 1)
        //     ]
        // });
    }

    onClickNewAgenda(e) {
        this.agendaListCounter += 1;
		const uniqueID = this.agendaListCounter;
		this.props.dispatch(newAgenda(uniqueID));
		socket.emit('newAgenda');
    }

    scrollToBottom() {
        const node = this.messagesEnd;
        node.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        let agendaDetail;
        if (this.props.agendaList.length > 0) {
            agendaDetail = this.props.agendaList.map(item => {
                return (
                    <div className="detail" key={item.id}>
                        <div className="checkbox">
                            <AgendaCheckbox
                                inputKey={item.id}
                                isFinished={item.isAgendaFinished}
                                hasContent={item.content}
                                agendaList={this.props.agendaList}
                            />
                        </div>
                        <AgendaInput
                            inputKey={item.id}
                            isFinished={item.isAgendaFinished}
                            content={item.content}
                            agendaList={this.props.agendaList}
                        />
                        <div
                            className="delete"
                            id={item.id}
                            onClick={e => {
                                this.onClickToggleDeleteAgenda(e);
                            }}
                        />
                    </div>
                );
            });
        }

        return (
            <div className="agenda-block">
                <img className="branch" src={Branch} />
                <img className="eagle" src={Eagle} />
                <EagleButton />
                <div className="flag">
                    <div className="bar" />
                    <div className="left" />
                    <div className="right" />
                    <div className="agenda-title">議程</div>
                    <div className="agenda-content">
                        {agendaDetail}
                        <div
                            style={{ float: "left", clear: "both" }}
                            ref={el => {
                                this.messagesEnd = el;
                            }}
                        />
                    </div>
                    <div
                        className="agenda-add"
                        onClick={e => {
                            this.onClickNewAgenda(e);
                        }}
                    >
                        <div className="cross" />
                        <div className="text" unselectable="on">
                            增加議程
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        agendaList: state.agenda
    };
};

export default connect(mapStateToProps)(Agenda);
