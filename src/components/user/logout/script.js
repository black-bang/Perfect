import Vue from 'vue'
import { Field,Button,Cell, Toast  } from 'mint-ui';
import myajax from '@/api/myajax'
import baseUrl from '@/api/config'

Vue.component(Field.name, Field);
Vue.component(Button.name, Button);
Vue.component(Cell.name, Cell);

export default {
   
    data () {
        return {
            account:'',
            password:'',
            plantFrom:'1',
            translateId:'1',
        }
    },
    // watch: {
       

    //     phonenum(){
    //         if(/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.phonenum)){
    //             this.phonenumstate = "success"
    //         }else{
    //             this.phonenumstate = "error"
    //         }
    //     },
    //     password(){
    //         if(this.password.length >= 6){
    //           this.passwordstate = "success"
    //         }else{
    //           this.passwordstate = "error"
    //         }
    //     }
    // },


    methods: {
        testarea(){
           
        },
        // 登陆
        login(){
            this.$router.replace('/user/login?accountId='+
            this.$route.query.accountId)
        }
}
}