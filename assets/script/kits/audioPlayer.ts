import * as lib from '../lib/lib'

const {ccclass, property} = cc._decorator;

@ccclass
export default class audioPlayer extends lib.ccAudioPlayer {

    //----- 编辑器属性 -----//
    //----- 静态属性 -----//
    //----- 静态方法 -----//
    //----- 属性声明 -----//
    private redAtk = 'res/raw-assets/mic/redATK.mp3';
    private buleAtk = 'res/raw-assets/mic/buleATK.mp3';
    private greenAtk = 'res/raw-assets/mic/greenATK.mp3';
    private purpleAtk = 'res/raw-assets/mic/purpleATK.mp3';

    private gold = 'res/raw-assets/mic/gold.mp3';
    private sell_coins = 'res/raw-assets/mic/sell_coins.mp3';
    private click_tower = 'res/raw-assets/mic/click_tower.mp3';
    private compose_tower = 'res/raw-assets/mic/compose_tower.mp3';
    private next_level = 'res/raw-assets/mic/next_level.mp3';
    private fail = 'res/raw-assets/mic/fail.mp3';
    private UI_click = 'res/raw-assets/mic/UI_click.mp3';
    //----- 公共方法 -----//
    //----- 事件回调 -----//
    playmicredAtk(){
        this.play(3, this.redAtk, false);
    }
    
    playmicbuleAtk(){
        this.play(3, this.buleAtk, false);
    }
    
    playmicgreenAtk(){
        this.play(3, this.greenAtk, false);
    }
    
    playmicpurpleAtk(){
        this.play(3, this.purpleAtk, false);
    }

    playmicGold(){
        this.play(3, this.gold, false);
    }

    playmicSell(){
        this.play(3, this.sell_coins, false);
    }

    playmicClickTower(){
        this.play(3, this.click_tower, false);
    }

    playmicComposeTower(){
        this.play(3, this.compose_tower, false);
    }

    playmicNextLevel(){
        this.play(3, this.next_level, false);
    }

    playmicFail(){
        this.play(3, this.fail, false);
    }

    playmicUIClick(){
        this.play(3, this.UI_click, false);
    }
    //----- 按键回调 -----//
    //----- 生命周期 -----//
    onLoad() {
        super.onLoad();
        let msgEvent = lib.msgEvent.getinstance();
        msgEvent.addEvent(lib.msgConfig.micredAtk, 'playmicredAtk', this);
        msgEvent.addEvent(lib.msgConfig.micbuleAtk, 'playmicbuleAtk', this);
        msgEvent.addEvent(lib.msgConfig.micgreenAtk, 'playmicgreenAtk', this);
        msgEvent.addEvent(lib.msgConfig.micpurpleAtk, 'playmicpurpleAtk', this);
        msgEvent.addEvent(lib.msgConfig.micGold, 'playmicGold', this);
        msgEvent.addEvent(lib.msgConfig.micSell, 'playmicSell', this);
        msgEvent.addEvent(lib.msgConfig.micClickTower, 'playmicClickTower', this);
        msgEvent.addEvent(lib.msgConfig.micComposeTower, 'playmicComposeTower', this);
        msgEvent.addEvent(lib.msgConfig.micNextLevel, 'playmicNextLevel', this);
        msgEvent.addEvent(lib.msgConfig.micFail, 'playmicFail', this);
        msgEvent.addEvent(lib.msgConfig.micUIClick, 'playmicUIClick', this);
    }
    
    start() {
        super.start();
    }

    onDestroy() {
        let msgEvent = lib.msgEvent.getinstance(); 
        msgEvent.removeEvent(lib.msgConfig.micredAtk, 'micredAtk', this);
        msgEvent.removeEvent(lib.msgConfig.micbuleAtk, 'playmicbuleAtk', this);
        msgEvent.removeEvent(lib.msgConfig.micgreenAtk, 'playmicgreenAtk', this);
        msgEvent.removeEvent(lib.msgConfig.micpurpleAtk, 'playmicpurpleAtk', this);
        msgEvent.removeEvent(lib.msgConfig.micGold, 'playmicGold', this);
        msgEvent.removeEvent(lib.msgConfig.micSell, 'playmicSell', this);
        msgEvent.removeEvent(lib.msgConfig.micClickTower, 'playmicClickTower', this);
        msgEvent.removeEvent(lib.msgConfig.micComposeTower, 'playmicComposeTower', this);
        msgEvent.removeEvent(lib.msgConfig.micNextLevel, 'playmicNextLevel', this);
        msgEvent.removeEvent(lib.msgConfig.micFail, 'playmicFail', this);
        msgEvent.removeEvent(lib.msgConfig.micUIClick, 'playmicUIClick', this);
        super.onDestroy();
    }

    //----- 保护方法 -----//
    //----- 私有方法 -----//

}