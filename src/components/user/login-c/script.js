import { mapState } from "vuex";
import myajax from "@/api/myajax";
import Vue from "vue";
import vuePickers from "vue-pickers";
import { DatetimePicker } from "mint-ui";
import moment from "moment";
import axios from "axios";
import { MessageBox } from "mint-ui";

export default {
  data() {
    return {
      canSubmit: true,
      radio: "1",
      dateTime: "",
      dateTime1: "",
      Radio: "",
      startTime: "",
      value1: new Date('1985/6/6'),
      value2: new Date('1985/6/6'),
      startDate: new Date('1950/1/1'),
      endDate: new Date()
    };
  },
  computed: {},
  watch: {
    value1() {
      let codeState = document.getElementsByClassName("textData");
      // console.log(codeState.length);
      if (codeState.length == 2) {
        this.codestate = "success";
        let nextBtn = document.getElementsByClassName("next")[0];
        let nextBtns = document.getElementsByClassName("nextBtn")[0];
        nextBtn.style.cssText = "border-color:#1AAE15";
        nextBtns.style.cssText = "color:#1AAE15";
      } else {
        this.codestate = "err";
        let nextBtn = document.getElementsByClassName("next")[0];
        let nextBtns = document.getElementsByClassName("nextBtn")[0];
        nextBtn.style.cssText = "border-color:#576166";
        nextBtns.style.cssText = "color:#576166";
      }
    }
  },
  mounted() {
    let box_ = document.getElementsByClassName("conmin")[0];
    box_.addEventListener('touchmove', function (event) { event.preventDefault(); }, false)
    window.alert = function(name) {
      var iframe = document.createElement("IFRAME");
      // console.log(iframe);
      iframe.style.display = "none";
      iframe.setAttribute("src", "data:text/plain,");
      document.documentElement.appendChild(iframe);
      window.frames[0].window.alert(name);
      iframe.parentNode.removeChild(iframe);
    };
    document.title = "完善个人信息";

    let dataTime = document.getElementsByClassName("fromData_")[0];
    let dataTime_ = document.getElementsByClassName("marryData_")[0];
    if (sessionStorage.getItem("birth")) {
      dataTime.innerHTML = moment(sessionStorage.getItem("birth")).format(
        "YYYY-MM-DD"
      );
    }
    if (sessionStorage.getItem("marry")) {
      dataTime_.innerHTML = moment(sessionStorage.getItem("marry")).format(
        "YYYY-MM-DD"
      );
    }

    //console.log(sessionStorage.getItem("sex") == 0);
    if (sessionStorage.getItem("sex")) {
      this.$refs.girl.checked = true;
    }
    if (sessionStorage.getItem("sex") == 1) {
      this.$refs.boy.checked = true;
    }
  },

  methods: {
    fromData() {
      this.$refs.fromData.open();
      //  console.log("111");
    },
    marryData() {
      this.$refs.marryData.open();
    },
    handle(data) {
      let dataTime = document.getElementsByClassName("fromData_")[0];
      let date = moment(data).format("YYYY-MM-DD");
      let Year = moment(data).format("YYYY");
      let Month = moment(data).format("M");
      this.dateTime = date;
      dataTime.innerHTML = this.dateTime;
    },
    handleConfirm(data) {
      let dataTime_ = document.getElementsByClassName("marryData_")[0];
      let date = moment(data).format("YYYY-MM-DD");
      let Year = moment(data).format("YYYY");
      let Month = moment(data).format("M");
      this.dateTime1 = date;
      dataTime_.innerHTML = this.dateTime1;
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
      let dataTime = document.getElementsByClassName("fromData_")[0];
      let formData = dataTime.innerHTML;
      let dataTime_ = document.getElementsByClassName("marryData_")[0];
      let marryData = dataTime_.innerHTML;
      //console.log(date);
      this.dateTime = formData;
      // if (formData.length == 0) {
      //   MessageBox.alert("请选择出生日期!");
      // }
      if (formData.length == 0) {
        var date = "";
      } else {
        var date = moment(formData).format("YYYY-MM-DD");
      }
      if (marryData.length == 0) {
        var date_ = "";
      } else {
        var date_ = moment(marryData).format("YYYY-MM-DD");
      }
      var radios = document.getElementsByName("sex");
      radios[0].checked;
      for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
          sessionStorage.setItem("sex", radios[i].value);
          this.Radio = radios[i].value;
          //console.log(radios[i].value);
        }
      }
      let _this = this;
      axios
        .post(//http://106.14.115.8:8008/api/
          // http://api.jzker.cn/api/
          "http://api.jzker.cn/api/User_Customer/UpdateDetaiAsync?param.openId=" + _this.$route.query.openId + "&param.birthday=" + date + "&param.weddingDay=" + date_ + "&param.sex=" + _this.Radio)
        .then(function(response) {
          switch (response.data.Code) {
            case "0":
              // MessageBox.confirm("信息未改动，是否保存").then(action => {
              sessionStorage.setItem("birth", date);
              sessionStorage.setItem("marry", date_);
              _this.$router.replace("/user/login-d?openId=" + _this.$route.query.openId + "&TranslateId=" + _this.$route.query.TranslateId + "&GuideId=" + _this.$route.query.GuideId);
              throw "信息未发生改动";
              // });
              //  throw response.data.Tips;
              //console.log(response.data.Code)
              break;
            case "1":
              // console.log(_this);
              //console.log(response.data.Code);
              sessionStorage.setItem("birth", date);
              sessionStorage.setItem("marry", date_);
              _this.$router.replace("/user/login-d?openId=" + _this.$route.query.openId + "&TranslateId=" + _this.$route.query.TranslateId + "&GuideId=" + _this.$route.query.GuideId);

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
          if ((err = "Error: Request failed with status code 500")) {
          } else {
            MessageBox.alert(err);
          }
        });
    }
  }
};
