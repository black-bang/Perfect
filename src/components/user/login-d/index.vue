<template>
  <div class="conmin">
      <div class="tota">
        <p @click="toBack()"><span class="back" ></span>上一步</p>
   </div>
 
<input class="userInfo" v-model="name" :nameState="nameState" autofocus="autofocus" placeholder="请输入您的真实姓名">
</input>
<div class="toast"><span class="toastText" style="display:block">2至24个字符</span></div>
    <div class="nextBtn" @click="toNext()"><span class="next"></span>完成，谢谢</div>

     <div class="stepState">
      <div class="span_wrap">
         <span class="nowState">1</span>
        <span class="one_l"></span>
        <span class="nowState" >2</span>
        <span class="two_l"></span>
        <span class="nowState"  >3</span>
        <span class="tree_l"></span>
        <span class="nowState">4</span>
      </div>
     </div>
  </div>
 
</template>

<script src="./script.js"></script>

<style lang="scss" src = "./style.scss" scoped></style>
