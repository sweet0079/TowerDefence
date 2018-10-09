import userInfo from "./userInfo";
// import RdWXBizDataCrypt = require('../waibu/RdWXBizDataCrypt');

export let showShareMenu = function (success?:Function,fail?:Function,complete?:Function) {
    if(typeof wx !== 'undefined')
    {
        return new Promise((resolve, reject) => {
            wx.showShareMenu({
            withShareTicket: true,
            success: res => {
                console.log("showShareMenu true");
                if(success)
                {
                    success(res);
                }
            },
            fail: res => {
                console.log("showShareMenu fail");
                console.log(res);
                if(fail)
                {
                    fail(res);
                }
            },
            complete: res => {
                console.log("showShareMenu complete");
                console.log(res);
                if(complete)
                {
                    complete(res);
                }
            },
            })
        })
    }
}

export let shareAppMessage = function (titlestr:string,imgurl:string,query?:string,success?:Function,fail?:Function,complete?:Function) {
    if(typeof wx !== 'undefined')
    {
        console.log("shareAppMessage");
        wx.shareAppMessage({
                title:titlestr,
                imageUrl:imgurl,
                query: query,
                success: res => {
                    console.log("shareAppMessage true");
                    console.log(res);
                    if(success)
                    {
                      success(res);
                    }
                },
                fail: res => {
                    console.log("shareAppMessage fail");
                    console.log(res);
                    if(fail)
                    {
                      fail(res);
                    }
                },
                complete: res => {
                    console.log("shareAppMessage complete");
                    console.log(res);
                    if(complete)
                    {
                      complete(res);
                    }
                },
          })
    }
}

export let onShareAppMessage = function (titlestr:string,imgurl:string,query?:string) {
    if(typeof wx !== 'undefined')
    {
        console.log("onShareAppMessage");
        wx.onShareAppMessage(function () {
            // 用户点击了“转发”按钮
            return {
                title:titlestr,
                imageUrl:imgurl,
            }
          })
    }
}

export let getUserInfo = function (success:Function,fail:Function,complete:Function){
    if(typeof wx !== 'undefined')
    {
        wx.login({
            success: function (res) {
                console.log(res);
                userInfo.getinstance().setcode(res.code);
                wx.getUserInfo({
                    openIdList:[],
                    lang:"zh_CN",
                    success: res => {
                        console.log("getUserInfo success");
                        console.log(res);
                        success(res);
                    },
                    fail: res => {
                        console.log("getUserInfo fail");
                        console.log(res);
                        let button = wx.createUserInfoButton({
                            type: 'text',
                            text: '获取用户信息',
                            style: {
                                left: 10,
                                top: 10,
                                width: 200,
                                height: 40,
                                lineHeight: 40,
                                backgroundColor: '#ff0000',
                                color: '#ffffff',
                                textAlign: 'center',
                                fontSize: 16,
                                borderRadius: 4
                            }
                        })
                        button.onTap((res) => {
                            console.log(res);
                            success(res);
                        });
                        fail(res);
                    },
                    complete: res => {
                        console.log("getUserInfo complete");
                        console.log(res);
                        complete(res);
                    },
                });
            }
          })
    }
}

export let setUserCloudStorage = function(score:number){
    let timestamp:number = new Date().getTime();
    let kvdata = {
        key: "score",
        value: score.toString(),
      };
    if(typeof wx !== 'undefined')
    {
        wx.setUserCloudStorage({
            KVDataList:[kvdata],
              success: res => {
                  console.log("setUserCloudStorage true");
                  console.log(res);
              },
              fail: res => {
                  console.log("setUserCloudStorage fail");
                  console.log(res);
              },
              complete: res => {
                  console.log("setUserCloudStorage complete");
                  console.log(res);
              },
        })
    }
}

export let vibrateLong = function(success?:Function,fail?:Function,complete?:Function){
    if(typeof wx !== 'undefined')
    {
        wx.vibrateLong({
              success: res => {
                  console.log("vibrateLong true");
                  console.log(res);
                  if(success)
                  {
                    success(res);
                  }
              },
              fail: res => {
                  console.log("vibrateLong fail");
                  console.log(res);
                  if(fail)
                  {
                    fail(res);
                  }
              },
              complete: res => {
                  console.log("vibrateLong complete");
                  console.log(res);
                  if(complete)
                  {
                    complete(res);
                  }
              },
        })
    }
}

export let vibrateShort = function(success?:Function,fail?:Function,complete?:Function){
    if(typeof wx !== 'undefined')
    {
        wx.vibrateShort({
              success: res => {
                  console.log("vibrateLong true");
                  console.log(res);
                  if(success)
                  {
                    success(res);
                  }
              },
              fail: res => {
                  console.log("vibrateLong fail");
                  console.log(res);
                  if(fail)
                  {
                    fail(res);
                  }
              },
              complete: res => {
                  console.log("vibrateLong complete");
                  console.log(res);
                  if(complete)
                  {
                    complete(res);
                  }
              },
        })
    }
}

export let getSystemInfo = function(success?:Function,fail?:Function,complete?:Function){
    if(typeof wx !== 'undefined')
    {
        wx.getSystemInfo({
              success: res => {
                  console.log("getSystemInfo true");
                  console.log(res);
                  if(success)
                  {
                    success(res);
                  }
              },
              fail: res => {
                  console.log("getSystemInfo fail");
                  console.log(res);
                  if(fail)
                  {
                    fail(res);
                  }
              },
              complete: res => {
                  console.log("getSystemInfo complete");
                  console.log(res);
                  if(complete)
                  {
                    complete(res);
                  }
              },
        })
    }
}

export let showToast = function(title:string,icon:string = "none")
{
    if(typeof wx !== 'undefined')
    {
        wx.showToast(
            {
                title:title,
                icon:icon
            }
        );
    }
}

export let shareApp = function(info: any, successfun: Function = null, qun: Function = null, same_qun: Function = null) {
    wx.shareAppMessage({
        title: info.title, imageUrl: info.imageUrl, query: info.query, success: function (res) {
            if (info.callBack) {
                info.callBack.apply([res]);
            }

            //分享回调
            //判断是否有分享到群
            var shareTickets = "";
            if (res.shareTickets != undefined) {
                if (res.shareTickets[0] != undefined) {
                    shareTickets = res.shareTickets[0];
                }

                if (shareTickets == "") {
                    // PopUpManager.toast("请分享到微信群哦～");

                    if (qun) {

                        qun.apply(res);
                    }
                } else {
                    //是否分享到通一个群
                    shareTipInfo(shareTickets, function (has_shared_group) {
                        if (has_shared_group) {
                            if (same_qun) {
                                same_qun.apply(res);
                            }
                            // PopUpManager.toast("不要频繁分享到一个群哦～");
                        } else {
                            if (successfun) {
                                successfun.apply(shareTickets);
                            }
                        }
                    });
                }
            } else {
                if (qun) {
                    qun.apply(res);
                }
                // PopUpManager.toast("分享到群受益更大哟～");
            }
        }
    })
}

let parseEntry = function(encryptedData, iv, appid, sessionKey) {
    let pc = new RdWXBizDataCrypt(appid, sessionKey);

    let data = pc.decryptData(encryptedData, iv);

    console.log('解密后 data: ', data)
    return data;
}

let shareTipInfo = function(shareTickets: string, success_call: Function = null) {
    var now = new Date().getTime();
    wx.getShareInfo(
    { 
        shareTicket: shareTickets,
        success:(group_info)=>{

            var roup__: any = parseEntry(group_info.encryptedData, group_info.iv, userInfo.getinstance().getappID(), userInfo.getinstance().getsession_key());
            console.log(roup__);
        
            var result = wx.getStorageSync("sharetask");
            console.log(result);
        
            var has = true;
            var share = {}
            //如果没有保存过
            if (result) {
                share = JSON.parse(result);
                if (!share[roup__.openGId]) {
                    has = false;
                } else {
                    //120分钟 7200000
                    if (now - Number(share[roup__.openGId]) >= 7200000) {
                        has = false;
                    }
                }
            } else {
                has = false;
            }
            if (has == false) {
                share[roup__.openGId] = now;
                wx.setStorageSync("sharetask", JSON.stringify(share));
                if (success_call) {
                    success_call.apply(this, [has]);
                }
            } else {
                if (success_call) {
                    success_call.apply(this, [has]);
                }
            }
        }
    });
}

export let showRewardedVideoAd = function(adUnitId) {
    return new Promise((resolve, reject) => {
        this.videoAd = wx.createRewardedVideoAd({
            adUnitId: adUnitId,
        });
        this.videoAd.onClose((res) => {
            this.videoAd.load();
            resolve(res);
        });
        this.videoAd.show()
            .catch(err => {
                this.videoAd.load().then(
                    () => this.videoAd.show());
            })
    });
}
