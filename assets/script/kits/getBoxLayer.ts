/** 获得宝箱界面 */
import * as lib from '../lib/lib';

const {ccclass, property} = cc._decorator;

@ccclass
export default class getBoxLayer extends cc.Component {

    //----- 编辑器属性 -----//
    //标题
    @property(cc.Label) title: cc.Label = null;
    //关闭
    @property(cc.Node) close: cc.Node = null;
    //获取按钮
    @property(cc.Node) getBtn: cc.Node = null;
    //分享按钮
    @property(cc.Node) shareBtn: cc.Node = null;
    //----- 属性声明 -----//
    //----- 生命周期 -----//

    // onLoad () {}

    // start () {

    // }

    // update (dt) {}
    //----- 按钮回调 -----//
    cilckOk(){
        lib.msgEvent.getinstance().emit(lib.msgConfig.playTreausre);
        this.node.destroy();
    }
    cilckClose(){
        this.node.destroy();
    }
    cilckShare(){
        let temp = lib.RandomParameters.RandomParameters.getRandomInt(lib.userInfo.getinstance().getShareInfo().relation.Tomatowar04.length);
        let shareinfo = lib.userInfo.getinstance().getShareInfo().relation.Tomatowar04[temp].shareInfoId;
        let query = "uid=" + lib.userInfo.getinstance().getuid() + "&shareId=" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar04[temp].shareId;
        lib.wxFun.shareApp({title:lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].content,
            imageUrl:lib.userInfo.getinstance().getShareInfo().shareInfo[shareinfo].img_url,query: query},
                    (res)=>{
                            let url = "https://click.xyx.bkdau.cn/share/" + lib.userInfo.getinstance().getappID() + "/" + lib.userInfo.getinstance().getShareInfo().relation.Tomatowar02[temp].shareId;
                            lib.httpRequest.getinstance().send(url);
                            lib.msgEvent.getinstance().emit(lib.msgConfig.playTreausre);
                            this.node.destroy();
                            // this.ProControl.addDoubleMoneyTime(300);
                            // this.init(0);
                    },
                (res)=>{
                    lib.wxFun.showToast("请分享到微信群哦～");
                },
                (res)=>{
                    lib.wxFun.showToast("不要连续分享到同一个群哦~");
                });
    }
    //----- 事件回调 -----//
    init(type:number){
        switch(type)
        {
            case 0:
                this.title.string = "升级!";
                this.getBtn.active = true;
                this.shareBtn.active = false;
                this.close.active = false;
                break;
            case 1:
                this.title.string = "免费!";
                this.getBtn.active = false;
                this.shareBtn.active = true;
                this.close.active = true;
                break;
            case 2:
                this.title.string = "打败BOSS!";
                this.getBtn.active = true;
                this.shareBtn.active = false;
                this.close.active = false;
                break;
            default:
                break;
        }
    }
    //----- 公有方法 -----//
    //----- 私有方法 -----//
}
