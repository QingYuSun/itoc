<template>
	<div class="ou-warp">
		<div class="ou" v-if="kinsu == 0">
			<div class="ou-tu">
				<img :src="ouitems.image">
			</div>
			<div class="ou-datas">
				<div class="ou-datas-title">
					<p>{{ouitems.title}}</p>
					<span>{{ouitems.price}}积分</span>
				</div>
				<div class="ou-rule">
					<span>兑换积分：{{ouitems.price}}积分</span>
					<span>领取规则：{{ouitems.rule}}</span>
				</div>
				<div class="ou-surplus">
					<span>库存数量</span>
					<i>{{ouitems.num}}</i>
				</div>
			</div>
			<div class="ou-exchange" @click="exchange">
				<a>立即兑换</a>
			</div>
		</div>
		<div class="su" v-if="kinsu == 1">
			<div class="su-img">
				<img src="../../assets/success.png">
				<span>积分兑换成功</span>
			</div>
			<div class="su-word">
				<span>积分物品编号：{{successitem.itemId}}</span>
				<span>花费积分：<em style="color: #FF4444">{{successitem.price}}积分</em></span>
				<span>剩余积分：{{successitem.remainingPoint}}积分</span>
			</div>
			<span class="su-way">领取方式：{{successitem.rule}}</span>
			<div class="su-goon">
				<router-link to="/integral">继续兑换积分</router-link>
				<router-link to="/main">退出</router-link>
			</div>
		</div>
	</div>
</template>
<style>
	.ou{
		height: 100%;
		background-color:#EFEFEF;
		padding-bottom: 50px;
	}
	.ou-warp{
		height: 100%;
	}
	.su{
		background-color: #fff;
	}
	.ou-tu{
		width: 100%;
		display: flex;
		height: 4.28rem;
		background-color: #fff;
		text-align: center;
		justify-content: center;
	}
	.ou-tu img{
		width: 40%;
		height: 2.5rem;
		margin-top: 0.5rem;
		border-radius: 5px;
	}
	.ou-datas{
		position: relative;
		width: 90%;
		height: 5.9rem;
		margin: 0 auto;
		margin-top: -0.4rem;
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 0 10px #ccc;
	}
	.ou-datas-title{
		width: 90%;
		text-align: center;
		padding: 0.26rem;
		border-bottom: 1px solid #eee;
		margin: 0 auto;
	}
	.ou-datas-title p{
		color: #454545;
		font-size: 15px;
	}
	.ou-datas-title span{
		display: inline-block;
		font-size: 14px;
		color: #5870E6;
		padding-top: 6px;
	}
	.ou-rule{
		padding-left:0.4rem;
	}
	.ou-rule span{
		display: block;
		padding-top: 0.3rem;
		color: #333;
		font-size: 15px;
	}
	.ou-surplus{
		position: absolute;
		width: 100%;
		left: 0;
		bottom: 0.78rem;
	}
	.ou-surplus span{
		float: left;
		margin-left: 0.4rem;
		color: #8E8E8E;
		font-size: 14px;
	}
	.ou-surplus i{
		display: block;
		float: right;
		font-style: normal;
		width: 1.28rem;
		height: 0.4rem;
		line-height: 0.4rem;
		text-align: center;
		border:1px solid #ccc;
		margin-right: 0.4rem;
	}
	.ou-exchange{
		width: 80%;
		height: 0.88rem;
		margin: 0 auto;
		margin-top: 0.6rem;
		border-radius: 50px;
		background: -webkit-linear-gradient(left top, #44DA9B ,  #1FB1B1);
		background: -o-linear-gradient(bottom right, #44DA9B,  #1FB1B1);
		background: -moz-linear-gradient(bottom right, #44DA9B,  #1FB1B1);
		background: linear-gradient(to bottom right, #44DA9B ,  #1FB1B1);
		text-align: center;
		margin-bottom: 50px;
	}
	.ou-exchange a{
		display: inline-block;
		line-height: 0.88rem;
		font-size: 18px;
		color: #fff;
		font-weight: 100;
	}
	.su-img{
		width: 100%;
		text-align: center;
		margin-top: 0.9rem;
	}
	.su-img img{
		width: 1.37rem;
		height: 1.37rem;
	}
	.su-img span{
		display: block;
		margin-top: 0.5rem;
		font-size: 15px;
		color: #080808;
	}
	.su-word{
		width: 92%;
		margin: 0 auto;
		padding: 0.45rem 0;
		border-bottom: 1px solid #EAEAEA;
	}
	.su-word span{
		display: block;
		font-size: 15px;
		color: #686868;
		line-height: 0.6rem;
	}
	.su-way{
		display: block;
		font-size: 15px;
		color: #686868;
		margin: 0.27rem;
	}
	.su-goon{
		margin-top: 2.46rem;
		padding-bottom: 50px;
	}
	.su-goon a{
		display: block;
		width: 80%;
		height: 0.88rem;
		margin: 0 auto;
		margin-top: 0.6rem;
		border-radius: 50px;
		text-align: center;
		border:1px solid #D1D1D1;
		line-height: 0.88rem;
		font-size: 18px;
		color: #686868;
		font-weight: 100;
		font-weight: 400;

	}
	.su-goon a:nth-last-child(1){
		color: #fff;
		font-weight: 200;
		background: -webkit-linear-gradient(left top, #44DA9B ,  #1FB1B1);
		background: -o-linear-gradient(bottom right, #44DA9B,  #1FB1B1);
		background: -moz-linear-gradient(bottom right, #44DA9B,  #1FB1B1);
		background: linear-gradient(to bottom right, #44DA9B ,  #1FB1B1);
	}
</style>
<script>
	import axios from 'axios';
	import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				title:"兑换页面",
				ouitems:'',
				kinsu:0,
				successitem:[]
			}
		},
		created(){
			document.title = '礼品详情';
			this.queryItem();
		},
		methods:{
			exchange(){
				var _this = this
				var byId2 = parseInt(_this.$route.params.id);
				let ouuserid = sessionStorage.getItem("userid");
				let ouurl   = '/courseArrangementSystem/order/createOrder';
				const params = new URLSearchParams();
					params.append('teacherId', ouuserid)
					params.append('itemId', byId2)

				axios.post(ouurl,params).then(function(response){
					if (response.data.status === 0) {
						_this.successitem = response.data.data
						MessageBox({
	                      title: '',
	                      message: '兑换成功',
	                      showCancelButton: false,
	                      showConfirmButton:true,
	                      confirmButtonClass:'sure'
	                    }).then(action => {
	                      _this.kinsu = 1
	                    })
						
					}else{
						MessageBox({
	                      title: '',
	                      message: response.data.msg,
	                      showCancelButton: false,
	                      showConfirmButton:true,
	                      confirmButtonClass:'sure'
	                    }).then(action => {
	                    })
					}
				}).catch(function(error){
					alert(error);
				})
			},
			queryItem(){
			var _this = this
			var byId = parseInt(_this.$route.params.id);
			let ouurl   = '/courseArrangementSystem/item/queryItem';
			const params = new URLSearchParams();
				params.append('itemId', byId)

			axios.post(ouurl,params).then(function(response){
				if (response.data.status === 0) {
					_this.ouitems = response.data.data
				}
			}).catch(function(error){
				alert(error);
			})
			}
		}
	}
	
</script>