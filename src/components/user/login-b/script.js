import { mapState } from "vuex";
import myajax from "@/api/myajax";
import Axios from "axios";
import Vue from "vue";
import { Field, Button, Cell, Toast } from "mint-ui";
import { Indicator } from "mint-ui";
import axios from "axios";
import { MessageBox } from "mint-ui";
Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);
export default {
  // name: "SecurityCode",
  // component properties
  props: {
    number: {
      type: Number,
      default: 4
    },
    placeholder: {
      type: String,
      default: "-"
    }
  },
  data() {
    return {
      message: "",
      flag: false,
      value: "",
      codestate: "",
      isDisable:false
    };
  },
  computed: {},
  watch: {
    value() {
     // let codeState = document.getElementsByClassName("input-code")[0];
      let codeState = document.getElementsByClassName("input-code")[0];
      //console.log(codeState)
      if (codeState.value.length == 4) {
        this.codestate = "success";
        let nextBtn = document.getElementsByClassName("next")[0];
        let nextBtns = document.getElementsByClassName("nextBtn")[0];
        let Err = document.getElementsByClassName("errText")[0];
        Err.style.display = 'none';
        nextBtn.style.cssText = "border-color:#1AAE15";
        nextBtns.style.cssText = "color:#1AAE15";
      } else {
        this.codestate = "err";
        let nextBtn = document.getElementsByClassName("next")[0];
        let nextBtns = document.getElementsByClassName("nextBtn")[0];
        nextBtn.style.cssText = "border-color:#555d61";
        nextBtns.style.cssText = "color:#555d61";
      }
    }
  },
  mounted() {
    window.alert = function(name) {
      var iframe = document.createElement("IFRAME");
      // console.log(iframe)
      iframe.style.display = "none";
      iframe.setAttribute("src", "data:text/plain,");
      document.documentElement.appendChild(iframe);
      window.frames[0].window.alert(name);
      iframe.parentNode.removeChild(iframe);
    };
    let elseList = document.getElementsByClassName("field-wrap");
    for (let i = 0; i < elseList.length; i++) {
      elseList[i].onclick = function() {
      };
    }
    document.title = "输入验证码";
    let sendCode = document.getElementsByClassName("inputCode")[1];
    // sendCode.onkeyup=function(){
    //   SendKeys.Send("TAB")
    // }
    let Number = document.getElementsByClassName("Number")[0];
    let Ms = document.getElementsByClassName("Ms")[0];
    Number.innerHTML = this.$route.query.mobile.replace(/(^\d{3}|\d{4}\B)/g, "$1-");
    let time = 60;
    this.message = "请输入短信验证码" + '  ' + time + "s";
    let timer = setInterval(() => {
      time--;
      this.message = "请输入短信验证码" +'  '+time +"s";
      this.flag = true;
      if (time == 0) {
        this.message = "重新发送验证码";
        Ms.style.color ="#00B131"
        this.flag = false;
        clearInterval(timer);
      }else{
        Ms.style.color = "#333";
      }
    }, 1000);
    // code
    let inputCode = document.getElementsByClassName("inputCode");
    inputCode.onkeyup = function() {};
    //反向获取
  },
  methods: {
    hideKeyboard() {
      // 输入完成隐藏键盘
      document.activeElement.blur(); // ios隐藏键盘
      this.$refs.input.blur(); // android隐藏键盘
    },
    handleSubmit() {
      this.$emit("input", this.value);
    },
    handleInput(e) {
      this.$refs.input.value = this.value;
      if (this.value.length >= this.number) {
        this.hideKeyboard();
      }
      this.handleSubmit();
    },
    toBack() {
      this.$router.replace(
        "/user/login?openId=" +
        this.$route.query.openId +
        "&TranslateId=" +
        this.$route.query.TranslateId +
        "&GuideId=" +
        this.$route.query.GuideId
      );
    },
    toNext() {
      let sendCode = document.getElementsByClassName("input-code")[0];
      if (sendCode.value.length==4) {
        sessionStorage.setItem("Code", sendCode.value);
        let _this = this;
        axios
          .post(//http://106.14.115.8:8008/api/
            // http://api.jzker.cn/api/
            "http://api.jzker.cn/api/User_Customer/CompleteDetailAsync?param.openId=" + this.$route.query.openId + "&param.mobile=" + sessionStorage.phone + "&param.validCode=" + sendCode.value)
          .then(function(response) {
            switch (response.data.Code) {
              case "0":
                if (response.data.Tips == "完善客户信息失败") {
                  _this.$router.replace("/user/login-c?openId=" + _this.$route.query.openId + "&TranslateId=" + _this.$route.query.TranslateId + "&GuideId=" + _this.$route.query.GuideId);
                }
                // if (response.data.Tips == "验证码错误,请重新输入!操作失败"){
                //   MessageBox.alert(response.data.Tips);
                // }
                else {
                  let Err = document.getElementsByClassName("errText")[0];
                  Err.style.display = "block";
                  Err.innerHTML = "验证码错误,请输入正确的验证码!";
                }
                break;
              case "1":
                console.log(response.data.Code);
                _this.$router.replace("/user/login-c?openId=" + _this.$route.query.openId + "&TranslateId=" + _this.$route.query.TranslateId + "&GuideId=" + _this.$route.query.GuideId);
                break;
              case "-1":
                throw "网络超时";
                break;
              case "-2":
                throw "无权限,非法访问";
                break;
            }
          });
      } else {
        let Err = document.getElementsByClassName("errText")[0];
        Err.style.display = 'block';
        Err.innerHTML = "验证码错误,请输入正确的验证码!";
      }
    },
    setCode() {
      this.isDisable = true
      setTimeout(() => {
        this.isDisable = false
      }, 60000)
      let Ms = document.getElementsByClassName("Ms")[0];
      if (this.message == "重新发送验证码") {
        Ms.style.color = "#333";
        spinnerType: "fading-circle";
        let time = 60;
        this.message = "请输入短信验证码" + '  ' + time + "s";
        let timer = setInterval(() => {
          time--;
          this.message = "请输入短信验证码" + time + "s";
          this.flag = true;
          if (time == 0) {
            this.message = "重新发送验证码";
            this.flag = false;
            clearInterval(timer);
            Ms.style.color = "#00B131"
          }
        }, 1000);
      }
      myajax.axios({
        method: "post",
        url:
          "User_Account/SendLoginMobileVerifyCode?param.mobile=" +
          sessionStorage.phone,
        data: {},
        responseType: "json",
        success: data => {
          //console.log(data)
          // this.Number=data
          // console.log(data.Code)
        }
      });
    }
  }
};
