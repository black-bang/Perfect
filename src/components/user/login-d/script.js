import { mapState } from "vuex";
import myajax from "@/api/myajax";
import Vue from "vue";
import vuePickers from "vue-pickers";
import moment from "moment";
import { Field, Button, Cell } from "mint-ui";
import { Toast } from "mint-ui";
import axios from "axios";
import { MessageBox } from "mint-ui";

Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);
window.Toast = Toast;
export default {
  data() {
    return {
      nameState: "",
      name: ""
    };
  },
  computed: {},
  watch: {
    name() {
      let userInfo = document.getElementsByClassName("userInfo")[0];
      let nameState = document.getElementsByClassName("toastText")[0];
      let user_ = userInfo.value;
      if (user_.length >= 2) {
        this.phonenumstate = "success";
        nameState.style.display = "none";
        let nextBtn = document.getElementsByClassName("next")[0];
        let nextBtns = document.getElementsByClassName("nextBtn")[0];
        nextBtn.style.cssText = "border-color:#1AAE15";
        nextBtns.style.cssText = "color:#1AAE15";
      } else {
        this.phonenumstate = "error";
        nameState.style.display = "block";
        let nextBtn = document.getElementsByClassName("next")[0];
        let nextBtns = document.getElementsByClassName("nextBtn")[0];
        nextBtn.style.cssText = "border-color:#576166";
        nextBtns.style.cssText = "color:#576166";
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
    document.title = "完善姓名";
  },
  methods: {
    toBack() {
      this.$router.replace(
        "/user/login-c?openId="+
        this.$route.query.openId +
        "&TranslateId="+
        this.$route.query.TranslateId +
        "&GuideId=" +
        this.$route.query.GuideId
      );
    },
    toNext() {
      let userInfo = document.getElementsByClassName("userInfo")[0];
      let user_ = userInfo.value;
      if (user_.length < 2) {
       
      } else {
        let _this = this;
        axios
          .post(// http://106.14.115.8:8008/api/
            // http://api.jzker.cn/api/
            "http://api.jzker.cn/api/User_Customer/UpdateDetaiAsync?param.openId=" +
              _this.$route.query.openId +
              // "&param.openId=" +
              // this.$route.query.openId +
              "&param.birthday=" +
              sessionStorage.birth +
              "&param.weddingDay=" +
              sessionStorage.marry +
              "&param.sex=" +
              sessionStorage.sex +
              "&param.realName=" +
              user_)
          .then(function(response) {
            switch (response.data.Code) {
              case "0":
                alert("信息完善成功，谢谢");
                window.location.replace(`http://onlinecustomers.jzker.cn/#/GuideChat?openId=${_this.$route.query.openId}&TranslateId=${_this.$route.query.TranslateId}&GuideId=${_this.$route.query.GuideId}`);
                sessionStorage.removeItem("sex");
                sessionStorage.removeItem("Code");
                sessionStorage.removeItem("phone");
                sessionStorage.removeItem("marry");
                sessionStorage.removeItem("birth");
                break;
              case "1":
                if (user_.length >= 2) {
                  console.log(_this.$route);
                  alert("信息完善成功，谢谢");
                  window.location.replace(`http://onlinecustomers.jzker.cn/#/GuideChat?openId=${_this.$route.query.openId}&TranslateId=${_this.$route.query.TranslateId}&GuideId=${_this.$route.query.GuideId}`);
                  sessionStorage.removeItem("sex");
                  sessionStorage.removeItem("Code");
                  sessionStorage.removeItem("phone");
                  sessionStorage.removeItem("marry");
                  sessionStorage.removeItem("birth");
                }
                console.log(response.data.Code);
                break;
              case "-1":
                throw "网络超时";
                break;
              case "-2":
                throw "无权限,非法访问";
                break;
            }
          })
          .catch(err => {
            if (err == "Error: Request failed with status code 500") {
              MessageBox.alert("服务器开小差了...");
            } else {
              MessageBox.alert(err);
            }
          });
      }
    }
  }
};
