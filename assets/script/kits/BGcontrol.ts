/** 背景管理组件 */
import * as lib from '../lib/lib';

const {ccclass, property} = cc._decorator;

@ccclass
export default class BGControl extends cc.Component {
    //----- 编辑器属性 -----//
    //路径背景图精灵组件
    @property(cc.Sprite) RouteSprite: cc.Sprite = null;
    //路径背景图图集
    @property([cc.SpriteFrame]) RouteSpfArr: Array<cc.SpriteFrame> = [];

    //----- 属性声明 -----//
    //----- 生命周期 -----//
    onLoad () {
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.stageChange,"stageChange",this);
    }

    start () {

    }

    // update (dt) {}
    onDestroy(){
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.stageChange,"stageChange",this);
    }
    //----- 按钮回调 -----//
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    //----- 私有方法 -----//
    private stageChange(num){
        if(num == 0)
        {
            this.RouteSprite.spriteFrame = this.RouteSpfArr[0];
        }
        else
        {
            this.RouteSprite.spriteFrame = this.RouteSpfArr[1];
        }
    }
}
