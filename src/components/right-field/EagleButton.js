"use strict";

import React from "react";
import styled from 'styled-components';

export default class EagleButton extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            display: 'none'
        }
        const AdviceButton=styled.div`
            position: absolute;
            top:5%;
            right:10%;
            width:150px;
            height:50px;
        `;

    
    }
    
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
    render(){

        
        return(
            <div className="box">
                <AdviceButton>
                    <button className="adviceButton"
                        // style={{
                        //     'position' : 'absolute',
                        //     'top' : '5px' ,
                        //     'cursor': 'pointer'
                        // }}
                        
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
                    </button>
                </AdviceButton>
                // RETURN 變數 很少就ok

                <input className="hiddenAdvice" 
                    style= {{'display':this.state.display }}
                    
                >
                </input>
            </div>

        );
    }


}

