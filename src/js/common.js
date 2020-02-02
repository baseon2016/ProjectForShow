import axios from "axios";
import { PUBLICAXIOS } from "./publicPath";
export default {
  getFile(payload) {
    // 获取科目三科目四等内容
    // 需要传递的参数Url,UserId,CategoryId,mainType,subType,mainTypeVal,构造对象的属性值id,text。还需要传递mutations commit 修改对应模块state
    const {
      Url,
      UserId,
      CategoryId,
      mainType,
      subType,
      constructor,
      assignState,
      assignCategory3,
      assignCategory4,
      commit
    } = payload;
    const { mainTypeName, nameValue1, nameValue2 } = mainType;
    const { id, text } = constructor;
    axios.get(`${Url}?UserId=${UserId}&CategoryId=${CategoryId}`).then(res => {
      if (res.data.Result) {
        const mainType1Array = res.data.Data.filter(
          item => item[mainTypeName] === nameValue1
        );
        const mainType2Array = res.data.Data.filter(
          item => item[mainTypeName] === nameValue2
        );
        commit(assignCategory3, mainType1Array);
        commit(assignCategory4, mainType2Array);
        // 封装该函数在本文件上方
        const reducer = function(accumulator, currentValue) {
          let oldType = accumulator.find(
            item => item[subType] === currentValue[subType]
          );
          if (oldType) {
            oldType.content = [...oldType.content, currentValue];
            return accumulator;
          } else {
            let newType = {};
            newType.id = currentValue[id];
            newType.text = currentValue[text];
            newType[subType] = currentValue[subType];
            newType.content = [currentValue];
            return [...accumulator, newType];
          }
        };

        const mainType1 = mainType1Array.reduce(reducer, []);
        const mainType2 = mainType2Array.reduce(reducer, []);
        commit(assignState, [
          { id: "1", text: "科目三", content: mainType1 },
          { id: "2", text: "科目四", content: mainType2 }
        ]);
      }
    });
  },

  // 在获取数据基础上添加样式参数和文字信息
  // 需要参数,state.coursePractice,state.courseMock,state.courseOnline
  styledData(payload) {
    let result = payload;
    if (result) {
      result = result.map(item => {
        let itemRst = { ...item };
        if (itemRst.content) {
          itemRst.content = itemRst.content.map(ele => {
            let eleRst = { ...ele };
            if (eleRst.UnitType === "1") {
              eleRst.subtitle = "通用单元";
            } else if (eleRst.UnitType === "2") {
              eleRst.subtitle = "特定单元";
            } else {
              eleRst.subtitle = "未定单元";
            }
            return eleRst;
          });
        }
        return itemRst;
      });
    }
    return result;
  },
  // 验证用户手机存在否
  verifyMobileExist(UserMobile) {
    return axios.get(`${PUBLICAXIOS}/api/user/userExist?account=${UserMobile}`);
  },
  // 请求发送手机验证码
  requestMobileCode(UserMobile) {
    return axios.get(
      `${PUBLICAXIOS}/api/GetValCode?UserId=${UserMobile}&Type=1`
    );
  },
  // 后台日期数据截取
  transDate(payload) {
    const showDate = payload.slice(0, payload.indexOf("T"));
    return showDate;
  },
  transTime(payload) {
    const showTime = payload.slice(
      payload.indexOf("T") + 1,
      payload.indexOf("T") + 6
    );
    return showTime;
  },
  // 页面窗口大小变化时，自动延迟刷新页面
  autoResize() {
    let timer = true;
    window.onresize = () => {
      if (timer) {
        timer = false;
        setTimeout(() => {
          location.reload();
          timer = true;
        }, 200);
      }
    };
  },
  // 页面滚动到指定位置动画
  slideTo(targetPageY) {
    const timer = setInterval(function() {
      var currentY =
        document.documentElement.scrollTop || document.body.scrollTop; //当前及滑动中任意时刻位置
      var distance =
        targetPageY > currentY
          ? targetPageY - currentY
          : currentY - targetPageY; //剩余距离
      var speed = Math.ceil(distance / 10); //每时刻速度
      if (currentY == targetPageY) {
        clearInterval(timer);
      } else {
        window.scrollTo(
          0,
          targetPageY > currentY ? currentY + speed : currentY - speed
        );
      }
    }, 10);
  }

  // getUserIP(callback) {
  //   var myBrowserInfo = myBrowser();
  //   ///判断浏览器是否是IE
  //   if (myBrowserInfo.indexOf("IE") > -1) {
  //     var ipv4;
  //     var service = locator.ConnectServer();
  //     service.Security_.ImpersonationLevel = 3;
  //     service.InstancesOfAsync(foo, "Win32_NetworkAdapterConfiguration");
  //     // IE 控件ActiveX enabled
  //     if (
  //       objObject.IPEnabled != null &&
  //       objObject.IPEnabled != "undefined" &&
  //       objObject.IPEnabled == true
  //     ) {
  //       if (
  //         objObject.IPEnabled &&
  //         objObject.IPAddress(0) != null &&
  //         objObject.IPAddress(0) != "undefined"
  //       ) {
  //         ipv4 = objObject.IPAddress(0);
  //         callback(ipv4);
  //       }
  //     }
  //   } else {
  //     //获取客户端本地IP地址（不等于IE浏览器）
  //     getYourIP();
  //   }
  //   function getYourIP() {
  //     var RTCPeerConnection =
  //       window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
  //     if (RTCPeerConnection)
  //       (function() {
  //         var rtc = new RTCPeerConnection({ iceServers: [] });
  //         if (1 || window.mozRTCPeerConnection) {
  //           rtc.createDataChannel("", { reliable: false });
  //         }

  //         rtc.onicecandidate = function(evt) {
  //           if (evt.candidate) grepSDP("a=" + evt.candidate.candidate);
  //         };
  //         rtc.createOffer(
  //           function(offerDesc) {
  //             grepSDP(offerDesc.sdp);
  //             rtc.setLocalDescription(offerDesc);
  //           },
  //           function(e) {
  //             console.warn("offer failed", e);
  //           }
  //         );

  //         var addrs = Object.create(null);
  //         addrs["0.0.0.0"] = false;
  //         function updateDisplay(newAddr) {
  //           if (newAddr in addrs) return;
  //           else addrs[newAddr] = true;
  //           var displayAddrs = Object.keys(addrs).filter(function(k) {
  //             return addrs[k];
  //           });
  //           for (var i = 0; i < displayAddrs.length; i++) {
  //             if (displayAddrs[i].length > 16) {
  //               displayAddrs.splice(i, 1);
  //               i--;
  //             }
  //           }
  //           // 展示结果处
  //           // document.getElementById("list").textContent = displayAddrs[0];
  //           callback(displayAddrs[0]);
  //         }

  //         function grepSDP(sdp) {
  //           var hosts = [];
  //           sdp.split("\r\n").forEach(function(line, index, arr) {
  //             if (~line.indexOf("a=candidate")) {
  //               var parts = line.split(" "),
  //                 addr = parts[4],
  //                 type = parts[7];
  //               if (type === "host") updateDisplay(addr);
  //             } else if (~line.indexOf("c=")) {
  //               var parts = line.split(" "),
  //                 addr = parts[2];
  //               updateDisplay(addr);
  //             }
  //           });
  //         }
  //       })();
  //     else {
  //       // 结果为否时
  //       // document.getElementById("list").textContent =
  //       //   "请使用主流浏览器：chrome,firefox,opera,safari";
  //       alert("请使用主流浏览器：chrome,firefox,opera,safari");
  //     }
  //   }
  //   //浏览器判断
  //   function myBrowser() {
  //     var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  //     //alert(userAgent);
  //     var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器

  //     var isIE11 = userAgent.toLowerCase().indexOf("trident") > -1 && userAgent.indexOf("rv") > -1;
  //     if (isIE11) {
  //       var reIE11 = new RegExp("rv:(\\d+\\.\\d+);");
  //       reIE11.test(userAgent);
  //     }
  //     var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
  //     var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
  //     var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
  //     var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
  //     var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

  //     if (isIE) {
  //       var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
  //       reIE.test(userAgent);
  //       var fIEVersion = parseFloat(RegExp["$1"]);
  //       if (fIEVersion == 7) {
  //         return "IE7";
  //       } else if (fIEVersion == 8) {
  //         return "IE8";
  //       } else if (fIEVersion == 9) {
  //         return "IE9";
  //       } else if (fIEVersion == 10) {
  //         return "IE10";
  //       } else if (fIEVersion == 11) {
  //         return "IE11";
  //       } //IE版本过低
  //       return "IE";
  //     }
  //     if (isIE11) return "IE11";
  //     if (isOpera) {
  //       return "Opera";
  //     }
  //     if (isEdge) {
  //       return "Edge";
  //     }
  //     if (isFF) {
  //       return "FF";
  //     }
  //     if (isSafari) {
  //       return "Safari";
  //     }
  //     if (isChrome) {
  //       return "Chrome";
  //     }
  //   }
  // }
};
