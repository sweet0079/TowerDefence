/** 槽管理组件 */
import itemBase from './itemBase'

const {ccclass, property} = cc._decorator;

@ccclass
export default class slotsCon extends cc.Component {

    //----- 编辑器属性 -----//
    //槽数组
    @property([itemBase]) items: Array<itemBase> = [];

    //----- 属性声明 -----//
    //----- 生命周期 -----//

    // onLoad () {}

    start () {

    }
    //----- 按钮回调 -----//
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    setAct(num:number){
        for(let i = 0; i < this.items.length; i++)
        {
            if(i < num)
            {
                this.items[i].node.active = true;
            }
            else
            {
                this.items[i].node.active = false;
            }
        }
    }
    //----- 私有方法 -----//
}
