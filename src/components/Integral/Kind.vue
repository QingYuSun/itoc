<template>
	<div class="kin-warp">
		<ul>
			<li v-for="(item,index) in kinitems">
				<div v-if="isrecord == 0">
					<router-link :to="{ name: 'outs', params: { id: item.id }}">
					<img :src="item.image">
					<div class="kin-word">
						<span>{{item.title}}</span>
						<b>{{item.price}}积分</b>
					</div>
					<i></i>
					</router-link>
				</div>
				<div v-if="isrecord == 1">
					
						<img :src="item.image">
						<div class="kin-word kin-success">
							<h6>兑换成功</h6>
							<p>您于{{timedata(item.created)}}兑换了{{item.itemTitle}}</p>
						</div>
						<i></i>
					
				</div>
			</li>
		</ul>
	</div>
</template>
<style type="text/css">
	.kin-warp{
		width: 100%;
	}
	.kin-warp ul{
		overflow: hidden;
		clear: both;
	}
	.kin-warp ul li{
		position: relative;
		padding: 0.3rem 0;
		border-bottom: 1px solid #F0F0F0;
	}
	.kin-warp ul li img{
		float: left;
		display: inline-block;
		width: 2rem;
		height: 2rem;
		margin-left: 0.2rem;
		border-radius: 5px;
	}
	.kin-word{
		height: 2rem;
		margin-left: 3.4rem;
	}
	.kin-word span{
		display: block;
		padding-top: 0.58rem;
		color: #323232;
		font-size: 15px;
	}
	.kin-word b{
		font-size: 15px;
		color: #5870E6;
		font-weight: 400;
		padding-top: 10px;
	}
	.kin-warp ul li i{
	    display: block;
	    position: absolute;
	    width: 0.4rem;
	    height: 0.8rem;
	    right: 0.4rem;
	    background-size: contain;
	    background-repeat: no-repeat;
	    top: 1rem;
		background-image: url(../../assets/right.png);
	}
	.kin-success{
		margin-left: 2.5rem;
	}
	.kin-success h6{
		font-size: 15px;
		color: #323232;
	}
	.kin-success p{
		width: 80%;
		font-size: 15px;
		color: #868686;
		overflow: hidden;
		text-overflow:ellipsis;
		margin-top: 0.4rem;
	}
</style>
<script>
	import axios from 'axios';
	export default{
		data(){
			return{
				title:'物品',
				isrecord:0,
				kinitems:[]
			}
		},
		created(){
			var _this = this
			let record = parseInt(_this.$route.params.id);
			if (record === 5) {
				document.title = '兑换记录';
				_this.isrecord = 1

				let userid = sessionStorage.getItem("userid");
				let kinurl   = '/courseArrangementSystem/order/queryOrders';
				const params = new URLSearchParams();
					params.append('teacherId', userid)

				axios.post(kinurl,params).then(function(response){
					if (response.data.status === 0) {
						_this.kinitems = response.data.data
					}
				}).catch(function(error){
					alert(error);
				})
			}else{
				_this.isrecord = 0
				if (record === 4) {
					document.title = '最新礼品';
					let kinurl2   = '/courseArrangementSystem/item/queryNewItems';

					axios.post(kinurl2).then(function(response){
						if (response.data.status === 0) {
							_this.kinitems = response.data.data
						}
					}).catch(function(error){
						alert(error);
					})
				}else{
					if (record == 1) {
						document.title = '实物礼品';
					}else{
						document.title = '卡券礼品';
					}
					
					let kinurl3   = '/courseArrangementSystem/item/queryItems';
					const params = new URLSearchParams();
						params.append('category', record)

					axios.post(kinurl3,params).then(function(response){
						if (response.data.status === 0) {
							_this.kinitems = response.data.data
						}
					}).catch(function(error){
						alert(error);
					})
				}
			}
		},
		methods:{
			timedata(el){
				return moment(el).format('YYYY年MM月DD日')
			}
		}
	}
</script>