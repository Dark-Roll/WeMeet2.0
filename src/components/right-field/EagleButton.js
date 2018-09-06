"use strict";

import React from "react";
import styled from 'styled-components';
import Eagle from '../../img/eagle.png';
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
            right:4%;
            z-index: 4;
            bottom: 5%;
            padding: 10px;
            border-radius: 20px;
            background-color: #f39c12;
            font-size: 1vmax;
            pointer-events: auto;
            color: #fff;
            transition: all .2s ease-in-out;
            display: inline-block;
            margin: 0;
            box-shadow: 0 0 1px -1px #121416;
            font-family: inherit;

            -webkit-transition-duration: 0.2s; /* Safari */
            transition-duration: 0.2s;
            text-decoration: none;
            overflow: hidden;
            :hover{
                background:#fff;
                box-shadow:0px 2px 10px 5px #97B1BF;
                color:#000;
            }
            :active {
                background: inherit;
            
                transform: translateY(50%);
            }
        `;

        const Hidden=styled.div`
            display:${this.state.display};
            
            box-sizing:border-box;
            right:5%;
            position:absolute;

            background-color: #3D348B;
            border: 1px solid;
            border-color: #3D348B;
            height: 200px;
            width: 150%;
            top:5%;
            right:60%;
            z-index: 10;
        `;
        
        const Textarea=styled.textarea`
            
            position:absolute;
            resize : none;
            overflow-y : auto;

            box-sizing:border-box;

            padding: 5px 15px;
            border: none;
            z-index: 3;
            background-color: #E0EEC6;
            display: block;
            width: 100%;
            height: 60%;
            bottom: 0%;
        `;
    
        
        // const Eagle=styled.img`
        //     position: absolute;
        //     z-index: 2;
        //     top:0%;
        //     height: 16%;
            
        //     animation: eagle 5s infinite;
            
        //     src=${{Eagle}};
        // `;

        const AdviceIntroduce=styled.div`
            display: inline-block;
            font-family: inherit;
            font-size: 16px;
            line-height: 125%;
            padding: 7px 10px;
            color: #E0E2DB;
        `;
// 設判斷 font-size

        return(
            <div className="box">
                <img className="eagle" src={Eagle} 
                    onClick={ ()=>{
                        this.onClick()
                    }}
                />
                
                {/* <Button                     
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
                </Button> */}
                {/* // RETURN 變數 很少就ok */}
                <Hidden>
                    <AdviceIntroduce>
                        {/* <span> */}
                        Hi there! Leave a message and we'll get back to you as 
                    soon as possible :)
                        {/* </span> */}
                    </AdviceIntroduce>
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

