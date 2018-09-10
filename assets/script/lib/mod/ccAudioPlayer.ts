const { ccclass, property } = cc._decorator;
@ccclass
export default abstract class ccAudioPlayer extends cc.Component {

    static readonly GameVolume = {
        BGvolume: 1,
        SPvolume: 1
    }

    static readonly BGvolume = "BGvolume"
    static readonly Peovolume = "Peovolume"

    //----- 属性声明 -----//
    protected BGmic: number = null
    protected Peomic: number = null
    protected Sysmic: number = null

    //----- 公用方法 -----//
    /** 设置背景音量 */
    setBGvolume(num: number) {
        if (num < 0) num = 0;
        else if (num > 1) num = 1;
        ccAudioPlayer.GameVolume.BGvolume = num;
        if (this.BGmic != null) cc.audioEngine.setVolume(this.BGmic, ccAudioPlayer.GameVolume.BGvolume);
        cc.sys.localStorage.setItem(ccAudioPlayer.BGvolume, num.toString());
    }

    /** 获取背景音量 */
    getBGvolume() {
        return ccAudioPlayer.GameVolume.BGvolume;
    }

    /** 设置音效音量 */
    setPeovolume(num: number) {
        if (num < 0) num = 0;
        else if (num > 1) num = 1;
        ccAudioPlayer.GameVolume.SPvolume = num;
        if (this.Peomic != null) cc.audioEngine.setVolume(this.Peomic, ccAudioPlayer.GameVolume.SPvolume);
        if (this.Sysmic != null) cc.audioEngine.setVolume(this.Sysmic, ccAudioPlayer.GameVolume.SPvolume);
        cc.sys.localStorage.setItem(ccAudioPlayer.Peovolume, num.toString());
    }

    /** 获取音效音量 */
    getPeovolume() {
        return ccAudioPlayer.GameVolume.SPvolume;
    }

    //----- 生命周期回调 -----//
    onLoad() {
        //-- 设置播放通道
        //-- 背景音乐通道
        this.BGmic = null;
        //-- 出牌语音通道
        this.Peomic = null;
        //-- 系统音乐通道
        this.Sysmic = null;

        // 初始化
        cc.audioEngine.uncacheAll();
        cc.audioEngine.stopAll();

        ccAudioPlayer.GameVolume.BGvolume = parseFloat(cc.sys.localStorage.getItem(ccAudioPlayer.BGvolume, '1'));
        ccAudioPlayer.GameVolume.SPvolume = parseFloat(cc.sys.localStorage.getItem(ccAudioPlayer.Peovolume, '1'));
        if (ccAudioPlayer.GameVolume.BGvolume !== 0 && (!ccAudioPlayer.GameVolume.BGvolume || isNaN(ccAudioPlayer.GameVolume.BGvolume))) {
            ccAudioPlayer.GameVolume.BGvolume = 1;
        }
        if (ccAudioPlayer.GameVolume.SPvolume !== 0 && (!ccAudioPlayer.GameVolume.SPvolume || isNaN(ccAudioPlayer.GameVolume.SPvolume))) {
            ccAudioPlayer.GameVolume.SPvolume = 1;
        }

    }

    start() { }

    onDestroy() {
        cc.audioEngine.stopAll();
    }

    //----- 私有方法 -----//
    // 0 背景音乐 1 人声 2 系统声  3 以外一次性根据人声音量 且不循环播放
    protected play(type: number, audioCilp: string, Loop: boolean = false) {
        let voice = 0;
        if (type === 0) {
            if (this.BGmic !== null) cc.audioEngine.stop(this.BGmic);
            voice = ccAudioPlayer.GameVolume.BGvolume;
        }
        else if (type === 1) {
            if (this.Peomic !== null) cc.audioEngine.stop(this.Peomic);
            voice = ccAudioPlayer.GameVolume.SPvolume;
        }
        else if (type === 2) {
            if (this.Sysmic !== null) cc.audioEngine.stop(this.Sysmic);
            voice = ccAudioPlayer.GameVolume.SPvolume;
        }
        else {
            Loop = false;
            voice = ccAudioPlayer.GameVolume.SPvolume;
        }
        if (typeof audioCilp !== 'string' || audioCilp.length <= 0) return;
        let audioId = 0;
        if (voice >= 0) {
            audioId = cc.audioEngine.play(audioCilp, Loop, voice);
        }
        if (type === 0) {
            this.BGmic = audioId;
        }
        else if (type === 1) {
            this.Peomic = audioId;
        }
        else if (type === 2) {
            this.Sysmic = audioId;
        }
    }
}