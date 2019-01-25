<template>
<div>
  <div class="sun-pay-warp" v-if="load == 1">
    <div class="sun-pay-order-warp">
    	<div v-if="chooserole == 0 && chooserole !== 1" class="sun-pay-order" v-for="(item,index) in items">
    		<div :class="['detailed-name',{active: item.status == 1}]">
    			<p>学生姓名：{{item.userName}}</p>
    			<p>学生班级：{{item.departName}}</p>
    			<p>入学日期：{{item.joinDate}}</p>
    			<p>所在学校：{{item.schoolName}}</p>
    		</div>
    		<div class="order-status">
    			<p v-if="item.status == 0">状态：待支付</p>
    			<p v-if="item.status == 1">状态：已支付 到期时间：{{newtime(item.endTime)}}</p>
    		</div>
        <div v-if="tacit == 0">
      	<div class="icheckbox_flat-blue" aria-checked="false" aria-disabled="false" v-if="item.status == 0">
            <input type="checkbox" :id="index" class="chk_1" :value="item.studentId" v-model="checkArr" />
            <label :for="index">
              <span class="choosepay">选择支付对象</span>
          </label>
        </div>
        </div>
    	</div>

      <div v-if="chooserole == 1" class="sun-pay-order" v-for="(item,index) in items">
        <div :class="['detailed-name',{active: item.status == 1}]">
          <p>学生姓名：{{item.studentName}}</p>
          <p>学生班级：{{item.className}}</p>
          <p>入学日期：{{item.joinDate}}</p>
          <p>所在学校：{{item.schoolName}}</p>
          <p>预留手机号码：{{item.telephoneNumber}}</p>
        </div>
        <div class="order-status">
          <p v-if="item.status == 1">状态：已支付 到期时间：{{newtime(item.endTime)}}</p>
          <p v-else>状态：待支付</p>
        </div>
        <div v-if="tacit == 0">
        <div class="icheckbox_flat-blue" aria-checked="false" aria-disabled="false" v-if="item.status !== '1'">
          <input type="checkbox" :id="index" class="chk_1" :value="item" v-model="checkArr" />
          <label :for="index">
            <span class="choosepay">选择支付对象</span>
          </label>
          
        </div>
        </div>
      </div>
    </div>
    <div class="affirm-pay">
    	<a @click="gotyof" v-if="unbind">下一步</a>
      <a v-else style="background-color: #ccc;">下一步</a>
    </div>
  </div>
  <div class="sun-pay-warp" v-if="load == 0">
    <div class="filximg">
      <img src="../../assets/loadimg.gif">
    </div>
  </div>
  <div class="sun-load2" v-if="load == 2">
    <p>没有相关学生信息</p>
    <p>请重新输入或联系学校</p>
  </div>
</div>
</template>

<script>
  import md5 from 'js-md5';
  import axios from 'axios';
  import { MessageBox } from 'mint-ui';
    export default{
        data(){
            return{
            	items:[],
              urlcode:'',
              checkArr:[],
              aboutuserid:'',
              aboutobjectid:'',
              load:0,
              unbind:false,
              values:'',
              chooserole:0,
              tacit:0
            }
        },
        watch:{
          checkArr(){
            if (this.checkArr.length !== 0) {
              this.unbind = true;
            }else{
              this.unbind = false;
            }
          }
        },
        created(){
          let that = this;
          that.chooserole = sessionStorage.getItem("role") ? sessionStorage.getItem("role") : 0;
          document.title = '平安智慧校园服务';
          that.aboutuserid = sessionStorage.getItem("userid");
          that.aboutobjectid = sessionStorage.getItem("objectid");

          if (that.chooserole == 1) {
            that.sweep();
          }else{
            that.GetRequestdata();
          }
        },
        methods: {
          newtime:function(el){
            return moment(el).format('YYYY年MM月DD日');
          },
          sweep(){
            let that = this;
            if (that.chooserole == 1) {
              that.values = sessionStorage.getItem("search");
              let getschoolName = sessionStorage.getItem("schoolName");
              let sweepurl   = 'wxpay-ssm/searchAllStudent';
              const params = new URLSearchParams();

              params.append('schoolName', getschoolName)
              params.append('searchName', that.values)

              axios.post(sweepurl,params)
              .then(function (response) {
                let data = response.data;
                if (data.status == "SUCCEED") {
                  that.items = [];
                  var ys = data.data.YstudentList;
                  var fs = data.data.FstudentList;
                  that.items = ys.concat(fs);
                  
                  if (that.items.length == 0) {
                    that.load = 2;
                  }else{
                    that.load = 1;
                  }
                  if (that.items.length == 1 && that.items[0].status =='0') {
                    that.checkArr.push(that.items[0]);
                    that.tacit = 1;
                  }
                  console.log(that.items);
                }
              })
              .catch(function (error) {
                  alert(error);
              });
            }
          },
        	gotyof(){
            let that = this;
            if (that.chooserole == 1) {
              let telephone=[];
              let studentName=[];

              for (var i = 0; i < that.checkArr.length; i++) {
                telephone.push(that.checkArr[i].telephoneNumber);
                studentName.push(that.checkArr[i].studentName);

              }
              var phonenull = false;
              for (var i = 0; i < telephone.length; i++) {
                if (telephone[i] == null ||telephone[i] == '') {
                  alert('请添加预留手机号或联系学校')
                  phonenull = true;
                }
              }
              if (!phonenull) {
                let telephonestring = telephone.join(',');
                let studentNamestring = encodeURI(encodeURI(studentName.join(',')));

              window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx65a12c5d58e3e29e&redirect_uri=http%3A%2F%2Fwww.ztengit.com%2Fpay%2Findex.html&response_type=code&scope=snsapi_base&state=${telephonestring}_${studentNamestring}#wechat_redirect`;
              }
            }else{
              let shoole = that.checkArr.join(',');
              window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx65a12c5d58e3e29e&redirect_uri=http%3A%2F%2Fwww.ztengit.com%2Fpay%2Findex.html&response_type=code&scope=snsapi_base&state=${that.aboutuserid}_${that.aboutobjectid}_${shoole}#wechat_redirect`;
            }
        	},
          GetRequestdata:function() {
            	let that = this;
              that.items = [];
              let urlrrr  = `wxpay-ssm/queryStudentByUserId?userid=${that.aboutuserid}&objectid=${that.aboutobjectid}`;
              /*let urlrrr = 'pay/wxpay-ssm/queryStudentByUserId?userid=utPJu5yTun8done&objectid=LeGRXQHjlL4done';*/
                axios.get(urlrrr)
                .then(function (response) {
                	let data = response.data;
                	if (data.status == "SUCCEED") {
	                    that.items = data.data;
                      that.load = 1;
                      if (data.data == null) {
                        alert(data.msg);
                        that.$router.push('/main');
                      }else{
                        if (that.items.length !== null) {
                        var ilength = that.items.length-1;
                      }else{
                        alert('请重新加载')
                      }
                      if (that.items.length == 1&&that.items[0].status =='0') {
                        that.checkArr.push(that.items[0].studentId);
                        that.tacit = 1;
                      }
                      for (var i = 0; i < that.items.length; i++) {
                        if (that.items[i].status == 0) {
                          break;
                        }else{
                          if (i == ilength) {
                            that.$router.push('/renew');
                          }
                        }
                      }
                      }
                	}
                })
                .catch(function (error) {
                    alert(error);
                });
            }
        }
    }
</script>

<style>
  .sun-pay-order-warp{
  	width: 100%;
  	border-bottom: 5px solid #e0e0e0;
  }
  .sun-pay-order{
  	position: relative;
  }
  .detailed-name{
  	background-color: #f1f1f1;
  	padding: 6px 0;
  	border-top: 3px solid #e0e0e0;
  }
  .detailed-name p{
  	line-height: 22px;
  	padding-left: 0.24rem;
    color: #727373;
  }
  .order-status{
  	background-color: #fff;
  	text-align: right;
  	padding-right: 0.19rem;
  }
  .order-status p{
  	line-height: 0.55rem;
  	color: #fe0000;
  }
  .affirm-pay{
  	width: 100%;
  	margin: 1.5rem 0;
  	text-align: center;
  }
  .affirm-pay a{
  	display: inline-block;
  	width: 80%;
  	line-height: 0.88rem;
  	background-color: #16b65a;
  	color: #fdfefd;
  	border-radius: 10px;
  }

    .icheckbox_flat-blue {
    	position: absolute;
    	right: 0.8rem;
    	top: 40%;
    	transform: translateY(-50%);
    }
    .chk_1 { 
    display: none; 
	} 
 
.chk_1 + label {
    background-position: 0 0;
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    padding: 0;
    width: 0.36rem;
    height: 0.36rem;
    cursor: pointer;
    border: 1px solid #000;
    border-radius: 11px;
} 
.chk_1:checked + label {
    background: url(../../assets/go.png) no-repeat;
    content:"";
    display:inline-block;
    height:0.4rem;
    width:0.4rem;
    border:none;
    background-size: 100%;
}
.filximg{
  -ms-flex-align: center;
    -webkit-box-align: center;
    align-items: center;
    margin: 0 auto;
    position: fixed;
    display: flex;
    text-align: center;
    width: 100%;
    height: 100%;
}
.filximg img{
  margin: 0 auto;
}
.sun-load2{
  text-align: center;
  width: 100%;
  margin-top: 1.7rem;
}
.sun-load2 p{
  color: #5d5d5d;
}
.active p{
  color: #bfbdbd !important;
}
.chk_1 + label .choosepay{
position: absolute;
    display: inline-block;
    top: 100%;
    left: -0.55rem;
    overflow: hidden;
    white-space: nowrap;
    padding-top: 5px;
    color: #727373;
}
.chk_1:checked + label .choosepay{
position: absolute;
    display: none;
    top: 100%;
    left: -0.55rem;
    overflow: hidden;
    white-space: nowrap;
    padding-top: 5px;
    color: #727373;
}
.sure{
  color: #16b65a;
}
@media screen and (max-width: 321px) {
    .sun-load2 p{
      font-size: 15px;
    }
    .detailed-name p{
      font-size: 14px;
    }
    .affirm-pay a{
      font-size: 16px;
    }
    .order-status p{
      font-size: 15px;
    }
    .choosepay{
      font-size:12px;
    }
}

@media screen and (min-width: 321px) and (max-width:400px) {
  .sun-load2 p{
      font-size: 17px;
    }
    .detailed-name p{
      font-size: 15px;
    }
    .affirm-pay a{
      font-size: 17px;
    }
    .order-status p{
      font-size: 16px;
    }
    .choosepay{
      font-size: 13px;
    }
}

@media screen and (min-width: 400px) {
  .sun-load2 p{
      font-size: 19px;
    }
    .detailed-name p{
      font-size: 17px;
    }
    .affirm-pay a{
      font-size: 19px;
    }
    .order-status p{
      font-size: 18px;
    }
    .choosepay{
      font-size: 15px;
    }
}
</style>
