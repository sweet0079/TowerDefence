import userInfo from "./userInfo"

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

