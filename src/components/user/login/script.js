import { mapState } from "vuex";
import myajax from "@/api/myajax";
import axios from "axios";
import Vue from "vue";
import { Field, Button, Cell, Toast, Indicator, MessageBox } from "mint-ui";

Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);
export default {
  data() {
    this.isMount = true
    return {
      phonenumstate: "",
      phonenum: "",
      code: "",
      Number: "",
      flag:true,
      isDisable: false,
      isDisabled:false
   
     
    };
  },
  watch: {
    phonenum() {
      let numState = document.getElementsByClassName("numState")[0];
      let phoneNumber = document.getElementsByClassName("phoneNumber")[0];
      // console.log(phoneNumber.value.length);
      let res = /^1\d{10}$/;
      if (res.test(phoneNumber.value)) {
        this.phonenumstate = "success";
        numState.style.display = "none";
        let nextBtn = document.getElementsByClassName("nextBtn")[0];
        let CodeBtn = document.getElementsByClassName("CodeBtn")[0];
        CodeBtn.style.cssText = "color:#1AAE15";
        nextBtn.style.cssText = "background:#1AAE15";
      } else {
        this.phonenumstate = "error";
        let nextBtn = document.getElementsByClassName("nextBtn")[0];
        nextBtn.style.cssText = "background:#BCBCBC";
        let CodeBtn = document.getElementsByClassName("CodeBtn")[0];
        CodeBtn.style.cssText = "color:#aaa";
        numState.style.display = "block";
      }
    }
  },
  computed: {},
  beforeDestroy(){
    this.isMoumt = false;
  },
  mounted() {
    if (this.flag == false) {
  
      return false
    }
    window.alert = function (name) {
      var iframe = document.createElement("IFRAME");
      //console.log(iframe);
      iframe.style.display = "none";
      iframe.setAttribute("src", "data:text/plain,");
      document.documentElement.appendChild(iframe);
      window.frames[0].window.alert(name);
      iframe.parentNode.removeChild(iframe);
    };
    //console.log (this.$route.query)
    document.title = "绑定手机号";
    //返回调值
    let phoneNumber_ = document.getElementsByClassName("phoneNumber")[0];
    let Number = phoneNumber_.value;
    if (sessionStorage.getItem("phone")) {
      phoneNumber_.value = sessionStorage.getItem("phone");
      //  console.log(phoneNumber_.value)
      // console.log(phoneNumber_.value.length);
      if (phoneNumber_) {
        // this.phonenumstate = "success";
        //  console.log(phoneNumber_.value)
        let nextBtn = document.getElementsByClassName("nextBtn")[0];
        let CodeBtn = document.getElementsByClassName("CodeBtn")[0];
        CodeBtn.style.cssText = "color:#1AAE15";
        nextBtn.style.cssText = "background:#1AAE15";
      }
    }
  },
  methods: {
    ToCode() {
      Indicator.open({
        spinnerType: 'snake'
      });
      setTimeout(() => {
        Indicator.close();
      }, 450)
      let phoneNumber = document.getElementsByClassName("phoneNumber")[0];
      //console.log(phoneNumber.value)
      let Number = phoneNumber.value;
      let res = /^1\d{10}$/;
      if (res.test(phoneNumber.value)) {
        let _this = this;
        myajax.axios({
          method: "get",
          url:
            "User_Account/IsExistCustomerMobileAsync?param.openId=" +
            this.$route.query.openId +
            "&param.mobile=" +
            Number,
          data: {},
          responseType: "json",
          success: data => {
            _this.$router.replace(
              "/user/login-b?openId=" +
                _this.$route.query.openId +
                "&TranslateId=" +
                _this.$route.query.TranslateId +
                "&GuideId=" +
              _this.$route.query.GuideId + '&mobile=' + Number
            );
            sessionStorage.setItem("phone", Number);
            this.isDisable = true
            setTimeout(() => {
              this.isDisable = false
            }, 450)
          },
          error(err) {
            if (err == "手机号已经在该平台绑定,请重新输入!操作失败") {
              MessageBox.alert("手机号已绑定! 请重新输入");
            } else {
              // alert(err);
              throw err;
            }
          }
        });
      } else {
        let numState = document.getElementsByClassName("numState")[0];
        numState.style.display = "block";
        setTimeout(() => {
          MessageBox.alert("请输入正确的手机号");
        }, 300);
      }
    },
    send() {
      Indicator.open({
        spinnerType: 'snake'
      });
      setTimeout(() => {
        Indicator.close();
      }, 450)
      let phoneNumber = document.getElementsByClassName("phoneNumber")[0];
      if (phoneNumber.value.length == 11) {
        let phoneNumber = document.getElementsByClassName("phoneNumber")[0];
        let Number = phoneNumber.value;
        myajax.axios({
          method: "get",
          url:
            "User_Account/IsExistCustomerMobileAsync?param.openId=" +
            this.$route.query.openId +
            "&param.mobile=" +
            Number,
          data: {},
          responseType: "json",
          success: data => {
            if (data.Code == 1) {
              let phoneNumber = document.getElementsByClassName("phoneNumber")[0];
              let Number = phoneNumber.value;
              myajax.axios({
                method: "post",
                url:
                  "User_Account/SendLoginMobileVerifyCode?param.mobile=" +
                  Number,
                data: {},
                responseType: "json",
                success: data => {
                  this.Number = data;
                  sessionStorage.setItem("phone", Number);
                
                }
              });
            }
            setTimeout(() => {
              this.$router.replace(
                "/user/login-b?openId=" +
                this.$route.query.openId +
                "&TranslateId=" +
                this.$route.query.TranslateId +
                "&GuideId=" +
                this.$route.query.GuideId + '&mobile=' + Number
              );
            }, 300);
            this.isDisable = true
            setTimeout(() => {
              this.isDisable = false
            }, 450)
          },
          error(err) {
            if (err == "手机号已经在该平台绑定,请重新输入!操作失败") {
              MessageBox.alert("手机号已绑定! 请重新输入")
            } else {
              throw err
            }
          }
        });
      } else {
        let numState = document.getElementsByClassName("numState")[0];
        numState.style.display = "block";
        setTimeout(() => {
          MessageBox.alert("请输入正确的手机号");
        }, 300);
      }
    }
  }
};
