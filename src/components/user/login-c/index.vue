<template>
  <div class="conmin">
      <div class="tota">
        <p @click="toBack()"><span class="back" ></span>上一步</p>
   </div>
 
<div class="userInfo">
<div class="fromData">
    <p>请选择您的生日</p>
    <div class="text"><span class="textData fromData_" @click="fromData()">
       </span>
          <mt-datetime-picker
        type="date"
        ref="fromData"
        v-model="value1"
        year-format="{value} 年"
        month-format="{value}月"
          date-format="{value} 日"
          @confirm="handle"
         :startDate="startDate"
          :endDate="endDate"
       >
       </mt-datetime-picker>
       <i class="to"></i></div>
      
</div>
<div class="marryData">
 <p>请选择您的结婚纪念日</p>
    <div class="text"><span class="textData marryData_" @click="marryData()"></span>
         <mt-datetime-picker
        type="date"
        ref="marryData"
         v-model="value2"
        year-format="{value} 年"
        month-format="{value}月"
        date-format="{value} 日"
        @confirm="handleConfirm"
        :startDate="startDate"
      :endDate="endDate"

       >
       </mt-datetime-picker>
    <i class="to"></i></div>

</div>
<div class="sex">
 <p>请选择您的性别</p>

    <div class="text sex_text">
   <span> <input type="radio" name="sex" id="boy" value="1" ref="boy" checked/><label for="boy"></label>男
       <input type="radio" name="sex" id="girl" value="0" ref="girl"/><label for="girl"></label>女</span>
    <i class="to"></i></div>
</div>
</div>


    <div class="nextBtn" @click="toNext()"><span class="next"></span>下一步</div>

     <div class="stepState">
     <div class="span_wrap">
         <span class="nowState">1</span>
        <span class="one_l"></span>
        <span class="nowState" >2</span>
        <span class="two_l"></span>
        <span  class="nowState">3</span>
        <span class="tree_l"></span>
        <span>4</span>
     </div>
     </div>
  </div>
 
</template>

<script src="./script.js"></script>

<style lang="scss" src = "./style.scss" scoped></style>
<style lang="scss">
    .fromData {
        .text{
           .textData {
            .el-date-editor{
              width:100%;
              padding:0;      
              .el-input__inner {
                    border:none;
                      padding:0;
                      text-align:right;
                      font-size:0.16rem;
                  }
                  .el-input__prefix{
                    display:none;
                  }
                   .el-input__suffix-inner{
          display:none;
        }
              }
              }
            }
              }
  .marryData {
   .text{
    .textData {
      .el-date-editor{
        width:100%;
        padding:0;
            .el-input__inner {
              padding:0;
              border: none;
              text-align:right;
              font-size:0.16rem;
                                    }
              .el-input__prefix{
          display:none;
        }
        .el-input__suffix-inner{
          display:none;
        }
              }
              }
            }
              }
</style>
