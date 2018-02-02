"use strict";

import React from "react";
import styled from 'styled-components';
// import socket from "../../../WeMeetWork/src/socket";

export default class EagleButton extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            display: 'none' ,
            advice: ''
        }
    }
    
// componentDidMount(){
//     socket.on('receiveDBStatus', (DBstatus)=>{
//         if(DBstatus.DBstatus==="Success"){

//         }else{
            
//         }
//     })
// }

// if else 
// 3 等於
onClick(){
    console.log(this);
    if ('inline-block' === this.state.display ){
        this.setState({
            display:'none'
        })
    }else{
        this.setState({
            display:'inline-block'
        });
    }
    
        
    // console.log(this);
// this.props.click(this.state.display);
    //setState(this.state.diplay) 
}    

onChange_Text(e){
    this.setState({advice: e.target.value});
}

// onClick_adviceSend(){
//     socket.emit('sendFeedback',{
//             'msg': this.state.advice,
//             'creat_at' : date
//     })
// }


// emit ????
// styled-components
    render(){
        const Button=styled.button`
            position: absolute;
            top:5%;
            right:10%;
            width:150px;
            height:50px;
            border: 2px solid;
        `;
        const Textarea=styled.textarea`
            top:5%;
            right:5%;
            position:absolute;
            resize : none;
            overflow-y : auto;
        `;
        const Hidden=styled.div`
            display:${this.state.display};
            top:5%;
            right:5%;
            position:absolute;
            
        `;
        
        return(
            <div className="box">
                <Button                     
                    onClick={ ()=>{
                            this.onClick()
                        }
                        // this.onClick.bind(this)   //arrow function
                        // 查this //eaglebutton本身 
                        // 拿不到參數
                        // constructor 的寫法
                    }
                >
                顯示
                </Button>
                {/* // RETURN 變數 很少就ok */}
                <Hidden>
                    <Textarea placeholder="Enter your advice" 
                        onChange={ ()=>{
                            this.onChange_Text
                            }
                        }
                    />  
                    
                    <Button
                        onClick={ ()=>{
                                // this.onClick_adviceSend()
                            }
                        }
                    >
                    send
                    </Button>
                </Hidden>
            </div>
            // ul>li*2
            // p10
            


        );
    }


}

