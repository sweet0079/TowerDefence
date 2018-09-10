import * as defConfig from '../cfg/defConfig'

/** 一个生成随机形状组件参数的类 */
export const RandomParameters = {

    //获得一个随机的bool值
    getRandomBool(){
        //console.log(cc.random0To1() * 2);
        let temp = parseInt((cc.random0To1() * 2).toString());
        //console.log(temp);
        if(temp == 0)
        {
            return false;
        }
        else
        {
            return true;
        }
    },

    //获得一个随机的int值,y到x + y之间的随机int值，不填y默认是0
    getRandomInt(x,y = 0){
        let temp = parseInt((cc.random0To1() * x).toString()) + y;
        return temp;
    },
}