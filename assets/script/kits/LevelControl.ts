/** 关卡相关控制组件 */
import * as lib from '../lib/lib'
import itemsCon from './itemsCon'
import slotsCon from './slotsCon'
import enemysCon from './enemysCon'
import uiCon from './UIControl'
import JsonManager from '../Manager/JsonReaderManager'
import GameManager from '../Manager/GameManager';

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelControl extends cc.Component {

    //----- 编辑器属性 -----//
    //合成槽控制组件
    @property(itemsCon) itemsControl: itemsCon = null;
    //攻击槽控制组件
    @property(slotsCon) slotsControl: slotsCon = null;
    //敌人控制组件
    @property(enemysCon) enemysControl: enemysCon = null;
    //UI控制组件
    @property(uiCon) uiControl: uiCon = null;
    //----- 属性声明 -----//
    //失败后返回的关卡
    private FailLevel:number = 1;
    //当前大关
    private StageNum:number = 0;
    //----- 生命周期 -----//
    onLoad () {
        JsonManager.getinstance();
        wx.onShow((res)=>{
            console.log("onShow");
            console.log(res);
            if(res.query.uid 
                && res.query.shareId)
            {
                lib.userInfo.getinstance().setquery(res.query);
                if(lib.userInfo.getinstance().getquery().uid 
                    && lib.userInfo.getinstance().getquery().shareId)
                    {
                        let netData: Object = { 'uid': lib.userInfo.getinstance().getuid(), 'appId': lib.userInfo.getinstance().getappID(), "qudao": "share_" + lib.userInfo.getinstance().getquery().shareId};
                        let type = "POST";
                        let str = JSON.stringify(netData);
                        let url = "https://api.xyx.bkdau.cn/?c=user&a=addShareClick";
                        lib.httpRequest.getinstance().send(url, str, 'json');
                    }
            }
        });
        console.log(wx.getLaunchOptionsSync());
        if(wx.getLaunchOptionsSync().query)
        {
            lib.userInfo.getinstance().setquery(wx.getLaunchOptionsSync().query);
        }
        lib.wxFun.getSystemInfo((res)=>{
            let arr:string = res.system;
            if(arr.indexOf("iOS") == -1)
            {
                console.log("not iOS");
                lib.userInfo.getinstance().setisiOS(false);
            }
            else
            {
                console.log("is iOS");
                lib.userInfo.getinstance().setisiOS(true);
            }
        });
        lib.wxFun.getUserInfo(
        ()=>{
            
        },
        ()=>{

        },
        ()=>{
            let netData: Object = { 'code': lib.userInfo.getinstance().getcode(), 'appId': lib.userInfo.getinstance().getappID(), 'ver': lib.userInfo.getinstance().getver() };
            console.log(lib.userInfo.getinstance().getquery().uid);
            console.log(lib.userInfo.getinstance().getquery().shareId);
            if(lib.userInfo.getinstance().getquery().uid 
                && lib.userInfo.getinstance().getquery().shareId)
            {
                netData = { 'code': lib.userInfo.getinstance().getcode(), 'appId': lib.userInfo.getinstance().getappID(), 'ver': lib.userInfo.getinstance().getver() 
                            ,"fromUid": lib.userInfo.getinstance().getquery().uid , "qudao": "share_" + lib.userInfo.getinstance().getquery().shareId};
            }
            let type = "POST";
            let str = JSON.stringify(netData);
            let url = "https://api.xyx.bkdau.cn/?c=xyx&a=wxProgramLogin";
            let headers = ["Content-Type", "application/json"];
            lib.httpRequest.getinstance().send(url, str, 'json', headers,(res:_qudao.LoginCB)=>{
                console.log("fun");
                lib.userInfo.getinstance().setuid(res.user.id);
                lib.userInfo.getinstance().setsession_key(res.session_key);
                if(res.user.isLegal)
                {
                    lib.userInfo.getinstance().setisLegal(true);
                }
                else if(res.user.isBlackIp)
                {
                    if(res.user.limit_time == "")
                    {
                        lib.userInfo.getinstance().setisLegal(true);
                    }
                    else
                    {
                        let arr = JSON.parse(res.user.limit_time);
                        let hour = new Date().getHours();
                        for(let i = 0; i < arr.length ; i++)
                        {
                            if(hour >= arr[i][0] 
                            && hour <= arr[i][1])
                            {
                                lib.userInfo.getinstance().setisLegal(false);
                                break;
                            }
                            if(i == arr.length - 1)
                            {
                                lib.userInfo.getinstance().setisLegal(true);
                            }
                        }
                    }
                }
                else if(!res.user.isBlackIp)
                {
                    if(res.user.limit_time == "")
                    {
                        lib.userInfo.getinstance().setisLegal(false);
                    }
                    else
                    {
                        let arr = JSON.parse(res.user.limit_time);
                        let hour = new Date().getHours();
                        for(let i = 0; i < arr.length ; i++)
                        {
                            if(hour >= arr[i][0] 
                            && hour <= arr[i][1])
                            {
                                lib.userInfo.getinstance().setisLegal(true);
                                break;
                            }
                            if(i == arr.length - 1)
                            {
                                lib.userInfo.getinstance().setisLegal(false);
                            }
                        }
                    }
                }
            });
            url = "https://www.bkdau.cn/xiaoyouxi/_share/" + lib.userInfo.getinstance().getappID() + "/shareConfig.json";
            
            var _type = "cc.RawAsset";
            cc.loader.load({url:url , type:_type} ,(err, res) =>{
                console.log("shareConfig");
                console.log(res);
                var i = JSON.parse(res);
                console.log(i);
                lib.userInfo.getinstance().setShareInfo(i);
            });
            if(lib.userInfo.getinstance().getisiOS())
            {
                url = "https://www.bkdau.cn/xiaoyouxi_cfg_json/" + lib.userInfo.getinstance().getappID() + "/myadv_ios.json";
            }
            else
            {
                url = "https://www.bkdau.cn/xiaoyouxi_cfg_json/" + lib.userInfo.getinstance().getappID() + "/myadv_android.json";
            }
            
            var _type = "cc.RawAsset";
            cc.loader.load({url:url , type:_type} ,(err, res) =>{
                console.log("guanggaoConfig");
                console.log(res);
                var i = JSON.parse(res);
                console.log(i);
                lib.userInfo.getinstance().setadvnfo(i);
                lib.msgEvent.getinstance().emit(lib.msgConfig.initAdv);
            });
        });
        //读取相关json
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.nextlevel,"nextlevel",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.gameover,"failsetlevel",this);
        lib.msgEvent.getinstance().addEvent(lib.msgConfig.gamestart,"gameStart",this);
    }
    
    start () {
        lib.wxFun.showShareMenu();
        lib.wxFun.onShareAppMessage("小情侣在树林里发出奇怪的声音，原来是在玩这个......","res/raw-assets/pic/share/dapao.jpg");
        let tempLevel = GameManager.getinstance().getLevel();
        if(tempLevel >= JsonManager.getinstance().getLevelobj(0).length)
        {   
            this.StageNum = 1;
        }
        lib.msgEvent.getinstance().emit(lib.msgConfig.stageChange,this.StageNum);
    }

    onDestroy(){
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.nextlevel,"nextlevel",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.gameover,"failsetlevel",this);
        lib.msgEvent.getinstance().removeEvent(lib.msgConfig.gamestart,"gameStart",this);
    }
    //----- 按钮回调 -----//
    //----- 事件回调 -----//
    private gameStart(){
        let tempLevel = GameManager.getinstance().getLevel();
        this.FailLevel = this.setlevel(tempLevel,false);
    }

    private nextlevel(num){
        console.log("nextlevel");
        lib.msgEvent.getinstance().emit(lib.msgConfig.micNextLevel);
        if(num >= JsonManager.getinstance().getLevelobj(0).length
        && this.StageNum != 1)
        {   
            this.StageNum = 1;
            lib.msgEvent.getinstance().emit(lib.msgConfig.showStageAni);
        }
        lib.msgEvent.getinstance().emit(lib.msgConfig.stageChange,this.StageNum);
        let temp = this.setlevel(num);
        if(this.FailLevel != temp)
        {
            this.FailLevel = temp;
            lib.msgEvent.getinstance().emit(lib.msgConfig.showRoundLabel,this.FailLevel - 1);
        }
    }
    //----- 公有方法 -----//
    //----- 私有方法 -----//

    private setlevel(num,isShowAni:boolean = true){
        console.log("setlevel");
        let temp = 0;
        if(this.StageNum == 1)
        {
            num -= (JsonManager.getinstance().getLevelobj(0).length);
        }
        if(num >= JsonManager.getinstance().getLevelobj(this.StageNum).length - 1)
        {
            num = JsonManager.getinstance().getLevelobj(this.StageNum).length - 1;
        }
        // this.itemsControl.setAct(parseInt(JsonManager.getinstance().getLevelobj(this.StageNum)[num].Upgrade));
        this.itemsControl.setprice(parseInt(JsonManager.getinstance().getLevelobj(this.StageNum)[num].TowerGold));
        // this.itemsControl.setinital(parseInt(JsonManager.getinstance().getLevelobj(this.StageNum)[num].initial));
        this.slotsControl.setAct(parseInt(JsonManager.getinstance().getLevelobj(this.StageNum)[num].TowerQuantity));
        this.enemysControl.startCreate(parseInt(JsonManager.getinstance().getLevelobj(this.StageNum)[num].Quantity),
                                        parseInt(JsonManager.getinstance().getLevelobj(this.StageNum)[num].GetGold),
                                        parseInt(JsonManager.getinstance().getLevelobj(this.StageNum)[num].HP)
                                        ,parseInt(JsonManager.getinstance().getLevelobj(this.StageNum)[num].monsterID));
        temp = this.uiControl.showLevel(parseInt(JsonManager.getinstance().getLevelobj(this.StageNum)[num].stage1),3 + this.StageNum,isShowAni);
        GameManager.getinstance().initEnd();
        return temp;
    }

    private failsetlevel(){
        let temp = (this.FailLevel - 1) * 4;
        if(this.StageNum == 1)
        {
            temp = (this.FailLevel - 1) * 5;
            temp += JsonManager.getinstance().getLevelobj(0).length;
        }
        GameManager.getinstance().setLevel(temp);
        lib.msgEvent.getinstance().emit(lib.msgConfig.micFail);
        lib.msgEvent.getinstance().emit(lib.msgConfig.showFailLabel);
        this.scheduleOnce(()=>{
            lib.msgEvent.getinstance().emit(lib.msgConfig.showFailLabel);
        },0.5);
        this.scheduleOnce(()=>{
            this.setlevel(temp);
            lib.msgEvent.getinstance().emit(lib.msgConfig.showGroupLabel,0);
        },2.5);
    }
}
