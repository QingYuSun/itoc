<template>
  <div class="sun-pay-warp">
    <div class="sun-pay-finish">
        <img src="../../assets/icon2.png">
        <span>支付完成</span>
    </div>
    <div class="sun-finish" v-if="chooserolefin == 0">
    	<a @click="skip">完成</a>
    </div>
  </div>
</template>
<script>
    export default{
        data(){
            return{
                title:"完成",
                chooserolefin:0
            }
        },
        created(){
            document.title = '平安智慧校园服务';
            
            history.pushState(null, null, document.URL); 
              window.addEventListener('popstate', function() { 
                history.pushState(null, null, document.URL); 
            });
            this.chooserolefin = sessionStorage.getItem("role") ? sessionStorage.getItem("role") : 0;
        },
        methods:{
            skip(){
                this.$router.push('/renew');
            }
        }
    }
</script>
<style>
.sun-pay-finish{
    position: fixed;
    left: 0;
    top: 2rem;
    right: 0;
    width: 100%;
    text-align: center;
}
.sun-pay-finish img{
    width: 25%;
}
.sun-pay-finish span{
    display: block;
    font-size: 16px;
}
.sun-finish{
    position: fixed;
    left: 0;
    bottom: 2.5rem;
    right: 0;
    width: 100%;
    text-align: center;
}
.sun-finish a{
    display: inline-block;
    width: 80%;
    line-height: 40px;
    background-color: #16b65a;
    color: #fff;
    font-size: 18px;
    border-radius: 20px;
}
</style>