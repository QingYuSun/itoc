<template>
  <div class="sun-pay-warp">
    <div class="sun-pay-renew">
    	<div class="sun-pay-hello" v-for="(item,index) in items">
            <span>{{item.studentName}}家长，您好！</span>
            <p>您已于{{newtime(item.startTime)}}成功购买“平安智慧校园”（一学年）服务，本服务将于本学年结束日到期。谢谢您的使用！</p>
        </div>
    </div>
    <div class="affirm-pay">
    	<a @click="gomain">确认</a>
    </div>
    <div class="yiwcen">
      <span>客服热线：<a href="tel:4001088114">4001088114</a></span>
    </div>
  </div>
</template>
<script>
    import axios from 'axios';
    export default{
        data(){
            return{
                userserid:'',  //链接带过来的个人userid
                schoolobjectid:'',//链接带过来的个人学校id
                items:[]
            }
        },
        created(){
            document.title = '平安智慧校园服务';
            
            this.userserid = sessionStorage.getItem("userid");
            this.schoolobjectid = sessionStorage.getItem("objectid");
            this.renewdata();
        },
        methods:{
            newtime:function(el){
                return moment(el).format('YYYY年MM月DD日')
            },
            gomain(){
                this.$router.push('/Main');
            },
            renewdata(){
                let that = this;
                let renewurl     = `wxpay-ssm/queryOldTime?userid=${that.userserid}&objectid=${that.schoolobjectid}`;
                axios.get(renewurl)
                .then(function (response) {
                    let data = response.data;
                    that.items = data.data;
                })
                .catch(function (error) {
                    alert(error);
                });
            }
        }
    }
</script>
<style>
    .sun-pay-renew{
        border-top: 5px solid #eee;
    }
    .sun-pay-hello{
        padding: 10px 15px;
        border-bottom: 5px solid #eee;
    }
    .sun-pay-hello span{
        display: block;
        font-size: 15px;
        padding-bottom: 6px;
    }
    .sun-pay-hello p{
        font-size: 14px;
        text-indent: 2em;
    }
    .yiwcen{
        width: 100%;
        text-align: center;
        margin-top: -1rem;
    }
    .yiwcen span{
        line-height: 30px;
    }
</style>