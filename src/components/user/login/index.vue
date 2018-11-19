 <template>
  <div class="conmin">
   <div class="tota">
        <p>忘记密码或者账号有异常,可以通过手机号寻回密码</p>
   </div>
 
   <div class="number">
    <span>+86</span>
    <input class="phoneNumber" label="+86" placeholder="请输入手机号" type="tel" v-model="phonenum" :state="phonenumstate">
    </input>
  </div>

    <div class="num-State"><span class="numState" style="display:none">请输入正确的手机号</span></div>
    <button class="nextBtn" @click="send()" :disabled="isDisable">发送验证码</button>
    <button class="Coded"><span class="CodeBtn" @click="ToCode()" :disabled="isDisabled">我已有验证码</span></button>

     <div class="stepState">
       <div class="span_wrap">
         <span class="nowState">1</span>
        <span class="one_l"></span>
        <span>2</span>
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
