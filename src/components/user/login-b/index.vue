<template>
  <div class="conmin">
      <div class="tota">
        <p @click="toBack()"><span class="back" ></span>上一步</p>
   </div>
 
   <div class="number">
  <span>手机号:</span>
  <p class="Number"></p>
  </div>

    <button class="numState"  @click="setCode()" :disabled="isDisable"><div class="Ms">{{ message }}</div></button>
    <div class="Code">
    <div class="security-code-wrap">
 <label for="code">
  <ul class="security-code-container">
  <li class="field-wrap" v-for="(item, index) in number" :key="index"   >
   <i class="char-field">{{value[index] || placeholder }}</i>
  </li>
  </ul>
 </label>
 <input ref="input" class="input-code" @keyup="handleInput($event)" v-model="value"
   id="code" name="code" type="tel"  :maxlength="number" 
   autocorrect="off" autocomplete="off" autocapitalize="off" autofocus="autofocus">
 </div>
    </div>
   <div class="err"> <p class="errText" style="display:none"></p></div>
    <div class="nextBtn" @click="toNext()"><span class="next"></span>下一步</div>

     <div class="stepState">
       <div class="span_wrap">
         <span class="nowState">1</span>
        <span class="one_l"></span>
        <span  class="nowState">2</span>
        <span class="two_l"></span>
        <span>3</span>
        <span class="tree_l"></span>
        <span>4</span>
       </div>
     </div>
  </div>
 
</template>

<script src="./script.js"></script>

<style lang="scss" src = "./style.scss" scoped></style>
