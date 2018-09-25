/** 道具管理控制组件 */
import PropManager from '../Manager/PropManager';

const {ccclass, property} = cc._decorator;

@ccclass
export default class PropControl extends cc.Component {

    //----- 编辑器属性 -----//
    //----- 属性声明 -----//
    //自动合成剩余时间
    private composeTime: number = 0;
    private _PropManager:PropManager = null;
    //----- 生命周期 -----//
    // onLoad () {}

    start () {
        this._PropManager = PropManager.getinstance();
        this.schedule(this.minTime,1);
    }

    // update (dt) {}
    //----- 按钮回调 -----//
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    addComposeTime(num: number)
    {
        this.composeTime += num;
    }
    //----- 私有方法 -----//
    private minTime(){
        if(this.composeTime > 0)
        {
            this.composeTime--;
            if(!this._PropManager.getAutoCompose())
            {
                this._PropManager.setAutoCompose(true);
            }
        }
        if(this.composeTime <= 0 && this._PropManager.getAutoCompose())
        {
            this._PropManager.setAutoCompose(false);
        }
    }
}
