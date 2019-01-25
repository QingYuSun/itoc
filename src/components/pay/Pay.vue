<template>
 <div>
  <div class="sun-pay-warp" v-if="loads == 1">
    <div class="sun-pay-hint">
    	<span>温馨提示</span>
    	<p><i></i>欢迎您订购“智慧校园”业务，主要功能包含智慧校园和微信通知（功能详情请参考家长通知书）帮助您更好地了解孩子在校情况，鼓励学生尽量多地与家长沟通，推动平安、和谐校园建设。</p>
    	<p><i></i>本服务资费为每学年￥100元／学生。</p>
   		<p><i></i>本服务“开通自愿、取消自主”，不会有手机乱扣费现象，家长自主进行微信缴费，请在确认信息后完成支付。</p>
   		<p><i></i>如要修改接收短信号码或其他问题，请联系班主任。</p>
   		<p><i></i>如有其他疑问可致电智慧校园客服专线：4001088114</p>
    </div>
    <div v-if="chooserolepay == 0" class="sun-pay-order-warp">
    	<div class="sun-pay-order" v-for="(item,index) in items">
    		<div class="detailed-name">
    			<p>学生姓名：{{item.userName}}</p>
    			<p>学生班级：{{item.departName}}</p>
    			<p>入学日期：{{item.joinDate}}</p>
    			<p>所在学校：{{item.schoolName}}</p>
    		</div>
    		<div class="order-status">
    			<p v-if="item.status == 0">状态：待支付{{item.money}}元</p>
    			<p v-if="item.status == 1">状态：已支付 到期时间：{{newtime(item.endTime)}}</p>
    		</div>
    	</div>
    </div>
    <div v-if="chooserolepay == 1" class="sun-pay-order-warp">
    	<div class="sun-pay-order" v-for="(item,index) in items">
    		<div class="detailed-name">
    			<p>学生姓名：{{item.studentName}}</p>
    			<p>入学日期：{{item.joinDate}}</p>
    			<p>所在学校：{{item.schoolName}}</p>
    		</div>
    		<div class="order-status">
    			<p>状态：待支付{{item.money}}元</p>
    		</div>
    	</div>
    </div>
    <div class="addup">
    	<span>合计：{{addup}}元</span>
    </div>
    <div class="affirm-pay">
    	<a @click="tyof">确认支付</a>
    </div>
  </div>
  <div class="sun-pay-warp" v-if="loads == 0">
  	<div class="filximg">
      <img src="../../assets/loadimg.gif">
    </div>
  </div>
 </div>
</template>

<script>
  import md5 from 'js-md5';
  import axios from 'axios';
  import moment from 'moment';
  import { MessageBox } from 'mint-ui';
    export default{
        data(){
            return{
            	items:[],
                userserid:'',  //链接带过来的个人userid
                schoolobjectid:'',//链接带过来的个人学校id
                icobjType:'',//链接带过来用户类型
                param:'', //签名
                goodsappID:'',
                goodsprepayid:'',
                goodsnonceStr:'',
                urlcode:'',
                checkArr:[],
                shoole:'',
                loads:0,
                chooserolepay:0,
                sweeptelephone:[],
                sweepstudentName:[],
                Datemonment:'',
                monmentyes:'',
                addup:100
            }
        },
        created(){
        	document.title = '平安智慧校园服务';
            //获取链接
            let that = this;

          	that.chooserolepay = sessionStorage.getItem("role") ? sessionStorage.getItem("role") : 0;
          	if (that.chooserolepay == 1) {
          		that.sweeppay();
          	}else{
          		that.processurl();
          	}
        },
        methods: {
            newtime:function(el){
                return moment(el).format('YYYY年MM月DD日')
            },
            gotime:function(){
                return moment().format('YYYY/MM/DD')
            },
            packageno(num){
            	//处理签名
                let stringA=num.join("&");
                let stringSignTemp=`${ stringA }&key=91B0929B3C1137BDC976BC8164D0C470`;
                let sign = md5(stringSignTemp).toUpperCase();
                return sign
            },
            sweeppay(){
            	let that = this;
            	let alerturl =  window.location.href;
              	let url = location.search;  //获取url中"?"符后的字串
               	let urlRequest = new Object();
               	if (url.indexOf("?") != -1) {
                  	let str = url.substr(1);
                  	let strs = str.split("&");
                  	for(let i = 0; i < strs.length; i ++) {
                     	urlRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
                  	}
               	}
               	let sweepstates = urlRequest.state
               	let sweeplist = sweepstates.split("_");
               	that.sweeptelephone = sweeplist[0].split(",");
            	let studentName = sweeplist[1];
            	let Name = decodeURI(decodeURI(studentName));
            	that.sweepstudentName = Name.split(",");
            	that.urlcode = urlRequest.code;
               	that.Sweepgetrequest();
            },
            processurl(){
            	let that = this;
            	let alerturl =  window.location.href;
              	let url = location.search;  //获取url中"?"符后的字串
               	let urlRequest = new Object();
               	if (url.indexOf("?") != -1) {
                  	let str = url.substr(1);
                  	let strs = str.split("&");
                  	for(let i = 0; i < strs.length; i ++) {
                     	urlRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
                  	}
               	}
               	let states = urlRequest.state
               	let list = states.split("_");
               	that.userserid = list[0];
            	that.schoolobjectid = list[1];
            	that.urlcode = urlRequest.code;
            	that.shoole = list[2];
               	that.GetRequest();
            },
            Sweepgetrequest(){
            	let that = this;
	            if (that.chooserolepay == 1) {
	              let sweeprequesturl   = 'wxpay-ssm/insertOrder';
	              const params = new URLSearchParams();
	              for (var i = 0; i < that.sweeptelephone.length; i++) {
	              	params.append(`students[${i}].telephoneNumber`, that.sweeptelephone[i]);
	              }
	              for (var i = 0; i < that.sweepstudentName.length; i++) {
	              	params.append(`students[${i}].studentName`, that.sweepstudentName[i]);
	              }
	              params.append('code', that.urlcode)

	              axios.post(sweeprequesturl,params)
	              .then(function (response) {
	                let data = response.data;
                	if (data.status == "SUCCEED") {
                		that.loads = 1;
	                    that.items = data.data.students;
	                    that.goodsappID = data.data.appId;
	                    that.goodsprepayid = data.data.packager;
	                    that.goodsnonceStr = data.data.nonceStr;
	                    that.addup = data.data.money
                	}else if (data.status == "MOBILE") {
                    MessageBox({
                      title: '',
                      message: '针对移动用户的线上支付通道已于2018年11月19日关闭 即日起移动用户将以话费扣取的方式收取平安智慧校园服务费用（10元/月）',
                      showCancelButton: false,
                      showConfirmButton:true,
                      confirmButtonClass:'sure'
                    }).then(action => {
                      that.$router.push('/choose');
                    })
                  }else{
                		alert(data.msg);
                	}
	              })
	              .catch(function (error) {
	                  alert(error);
	              });
	            }
            },
            //获取链接后面数据
            GetRequest:function() {
            	let that = this;
                let urlrrr     = `wxpay-ssm/saveOrder?code=${that.urlcode}&userid=${that.userserid}&objectid=${that.schoolobjectid}&studentlist=${that.shoole}`;
                axios.get(urlrrr)
                .then(function (response) {
                	let data = response.data;
                	if (data.status == "SUCCEED"){
                		that.loads = 1;
	                    that.items = data.data.student;
	                    that.goodsappID = data.data.appId;
	                    that.goodsprepayid = data.data.packager;
	                    that.goodsnonceStr = data.data.nonceStr;
                      that.addup = data.data.money
                	}else if (data.status == "MOBILE") {
                    MessageBox({
                      title: '',
                      message: '针对移动用户的线上支付通道已于2018年11月19日关闭 即日起移动用户将以话费扣取的方式收取平安智慧校园服务费用（10元/月）',
                      showCancelButton: false,
                      showConfirmButton:true,
                      confirmButtonClass:'sure'
                    }).then(action => {
                      that.$router.push('/choose');
                    });
                  }
                })
                .catch(function (error) {
                    alert(error);
                });
            },
            affirm(){
            	let that = this;
            	let affirmurl     = `wxpay-ssm/updateOrderStatus?out_trade_no=${that.items[0].outTradeNo}`;
                axios.get(affirmurl)
                .then(function (response) {
                	let data = response.data
                	if (data.status == "SUCCEED") {
                		that.$router.push('/finish');
                	}else{
                		alert('支付失败');
                	}
                })
                .catch(function (error) {
                    alert(error);
                });
            },
            sweepaffirm(){
            	let that = this;
	            if (that.chooserolepay == 1) {
	              let sweepaffirmurl   = 'wxpay-ssm/updateOrderStatusAndsaveOrder';
	              const params = new URLSearchParams();

	              for (var i = 0; i < that.sweeptelephone.length; i++) {
	              	params.append(`students[${i}].telephoneNumber`, that.sweeptelephone[i]);
	              }
	              for (var i = 0; i < that.sweepstudentName.length; i++) {
	              	params.append(`students[${i}].studentName`, that.sweepstudentName[i]);
	              }

	              axios.post(sweepaffirmurl,params)
	              .then(function (response) {
	                let data = response.data;
	                if (data.status == "SUCCEED") {
	                	that.$router.push('/finish');
	                }else{
	                	alert('支付失败');
	                }
	              })
	              .catch(function (error) {
	                  alert(error);
	              });
	            }
            },
            onBridgeReady(){
            	let that = this;
            	let timestamp = Math.round(new Date().getTime()/1000).toString();

            	let qqUnicode=[`timeStamp=${ timestamp }`,`appId=${that.goodsappID}`,`nonceStr=${that.goodsnonceStr}`,`package=${that.goodsprepayid}`,'signType=MD5'];
            	let aa = qqUnicode.sort();
            	let urladd = this.packageno(aa);
            	//支付接口
				WeixinJSBridge.invoke(
				    'getBrandWCPayRequest', {
				        "appId":that.goodsappID,     //公众号名称，由商户传入     
				        "timeStamp":timestamp,         //时间戳，自1970年以来的秒数     
				        "nonceStr":that.goodsnonceStr, //随机串     
				        "package":`${that.goodsprepayid}`,     
				        "signType":"MD5",         //微信签名方式：     
				        "paySign":urladd //微信签名 
				    },
				    function(res){
				      	if(res.err_msg == "get_brand_wcpay_request:ok" ){
				      	// 使用以上方式判断前端返回,微信团队郑重提示：
				        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
				        if (that.chooserolepay == 1) {
			          		that.sweepaffirm();
			          	}else{
			          		that.affirm();
			          	}
				    }
				}); 
			},
			tyof(){
				if (typeof WeixinJSBridge == "undefined"){
				   	if( document.addEventListener ){
				       	document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
				   	}else if (document.attachEvent){
				       	document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady); 
				       	document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
				   	}
				}else{
				   	this.onBridgeReady();
				}
			}
        }
    }
</script>

<style>
  .sun-pay-hint{
  	padding: 15px 15px 0 15px;
  	background-color: #eee;
  }
  .sun-pay-hint span{
  	letter-spacing:2px;
  	padding-bottom: 0.15rem;
  	color: #727373;
  }
  .sun-pay-hint p{
  	padding: 0 0 6px 10px;
  	position: relative;
  	color: #727373;
  }
  .sun-pay-hint p i{
  	display: inline-block;
  	width: 6px;
  	height: 6px;
  	background-color: #000;
  	border-radius: 3px;
  	margin-right: 5px;
  	position: absolute;
  	left: 0;
  	top: 8px;
  }
  .sun-pay-order-warp{
  	width: 100%;
  	border-bottom: 3px solid #e0e0e0;
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
  	padding-left: 0.25rem;
  }
  .order-status{
  	background-color: #fff;
  	text-align: right;
  	padding-right: 0.19rem;
  }
  .order-status p{
  	line-height: 0.55rem;
  	color: red;
  }
  .affirm-pay{
  	width: 100%;
  	margin: 0.5rem 0;
  	text-align: center;
  }
  .affirm-pay a{
  	display: inline-block;
  	width: 80%;
  	line-height: 0.88rem;
  	background-color: #16b65a;
  	color: #fff;
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
.addup{
	text-align: right;
	padding: 0.4rem 0.19rem 0.4rem 0;
}
.addup span{
	color: #000;
}
@media screen and (max-width: 321px) {
	.sun-pay-hint span{
      font-size: 12px;
    }
    .sun-pay-hint p{
    	font-size: 11px;
    }
    .detailed-name p{
    	font-size: 14px;
    }
    .order-status p{
    	font-size: 15px;
    }
    .affirm-pay a{
    	font-size: 21px;
    }
    .addup span{
    	font-size: 19px;
    }
}

@media screen and (min-width: 321px) and (max-width:400px) {
  .sun-pay-hint span{
      font-size: 13px;
    }
    .sun-pay-hint p{
    	font-size: 12px;
    }
    .detailed-name p{
    	font-size: 15px;
    }
    
    .order-status p{
    	font-size: 16px;
    }
    .affirm-pay a{
    	font-size: 22px;
    }
    .addup span{
    	font-size: 20px;
    }
}

@media screen and (min-width: 400px) {
	.sun-pay-hint span{
      font-size: 15px;
    }
    .sun-pay-hint p{
    	font-size: 14px;
    }
    .detailed-name p{
    	font-size: 17px;
    }
    .order-status p{
    	font-size: 18px;
    }
    .affirm-pay a{
    	font-size: 24px;
    }
    .addup span{
    	font-size: 22px;
    }
}
</style>
