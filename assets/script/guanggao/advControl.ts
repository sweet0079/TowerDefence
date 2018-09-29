import * as lib from '../lib/lib'

const {ccclass, property} = cc._decorator;

@ccclass
export default class advControl extends cc.Component {

    //----- 编辑器属性 -----//
    //游戏名
    @property(cc.Label) gameName: cc.Label = null;
    //图标
    @property(cc.Sprite) icon: cc.Sprite = null;
    //红点
    @property(cc.Node) redPoint: cc.Node = null;
    //----- 属性声明 -----//
    private appid = "";
    private path = "";
    private ad_pos = "";
    private id = "";
    //----- 生命周期 -----//

    // onLoad () {}

    // start () {

    // }

    // update (dt) {}
    //----- 按钮回调 -----//
    click(){
        wx.navigateToMiniProgram(
            {
                appId:this.appid, 
                path:this.path,
                success: ()=>{
                    let url = "https://click.xyx.bkdau.cn/click/" + lib.userInfo.getinstance().getappID() + "/" + this.ad_pos + "/" + this.id;
                    lib.httpRequest.getinstance().send(url);
                }
            }
        );
    }
    //----- 事件回调 -----//
    //----- 公有方法 -----//
    init(url:string,name:string,showpoint:boolean,appid:string,path:string,ad_pos:string,id:string)
    {
        cc.loader.load({ url: url, type: 'png' }, (err, tex) => {
            if (tex instanceof cc.Texture2D) {
                let faceframe = new cc.SpriteFrame(tex);
                this.icon.spriteFrame = faceframe;
            }
            else {
                lilog(url);
                lierr('加载头像失败');
            }
        });
        this.gameName.string = name;
        this.redPoint.active = showpoint;
        this.appid = appid;
        this.path = path;
        this.ad_pos = ad_pos;
        this.id = id;
    }
    //----- 私有方法 -----//
}
