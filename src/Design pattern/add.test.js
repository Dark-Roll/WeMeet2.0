
// var add= function(number1,number2){
    
//     Console.log(number1 + number2);
// }

// var printUserInfo =(data)=>{
//     Console.log(
//         'userId' + data.userId +
//         'userName' + data.userName +
//         'userNickname' + data.userNickname
//     );        
// }


// var printAjaxUserInfo = function(){
//     ajax('https://xxx.com/userinfo' , function(data){
//         printUserInfo(data);
//     });
// };

// var transePage =(currPage)=>{
//     if(currPage<0){
//         currPage=0;
//     }elseif(currPage>totalPage){
//         currPage=totalPage;
//     }
//     jump(currPage);
// };

// var getPrice =(price)=>{
//     if(isSummer()){
//         price= price*0.8
//     }
//     return price;
// }

// var isSummer= ()=>{
//     var date =new Date();
//     if (date.getMonth()<9 && date.getMonth()>6){
//         return true;
//     }else{
//         return false;
//     }
// }

var add= require ('./add.js');
var expect = require('chai').expect;

describe( '加法測試' , ()=>{
    it('2+1=3',()=>{
        expect(add(1,1)).to.be.equal(3);
    });
});

// var concat=(x,y)=>{
//     var res=[];
//     res.push(x,y);
    
//     return res;
// }

// describe('陣列合併', ()=>{
//     it('貓狗合併陣列',()=>{
//         expect(concat(cat,dog)).to.be.equal([cat,dog]);
//     });
// });