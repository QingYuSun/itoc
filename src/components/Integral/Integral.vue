<template>
	<div class="in-bj-warp">
		<div class="di-cen">
			<div class="in-jifen">
				<div class="jilu">
					<span>我的积分</span>
					<div class="jilu-bj">
						<router-link to="/integral/5">兑换记录</router-link>
					</div>
				</div>
				<span class="twothousand">{{allprice}}</span>
			</div>
		</div>
		<div class="Kind-warp">
			<div class="Kind">
				<ul>
					<li><router-link to="/integral/1"><i></i><span>实物礼品</span></router-link></li>
					<li><router-link to="/integral/2"><i></i><span>卡券礼品</span></router-link></li>
					<li><router-link to="/integral/4"><i></i><span>最新礼品</span></router-link></li>
				</ul>
			</div>
		</div>
		<div class="in-all-warp">
			<div class="in-all">
				<span>全部礼品</span>
			</div>
			<div class="in-all-one">
				<ul>
					<!-- <li>
						<img src="../../assets/kindimg.png">
						<span>888元优惠券</span>
						<b>1000积分</b>
					</li>
					<li>
						<img src="../../assets/kindimg.png">
						<span>888元优惠券</span>
						<b>1000积分</b>
					</li>
					<li>
						<img src="../../assets/kindimg.png">
						<span>888元优惠券</span>
						<b>1000积分</b>
					</li> -->
					<li v-for="(item,index) in items">
						<router-link :to="{ name: 'outs', params: { id: item.id }}">
							<img :src="item.image">
							<span>{{item.title}}</span>
							<b>{{item.price}}积分</b>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<style type="text/css">
	.in-bj-warp{
		width: 100%;
		height: 100%;
		background-color: #EFEFEF;
	}
	.di-cen{
		width: 100%;
		height: 4rem;
		background-image: url(../../assets/inbj.png);
		background-size: 100%;
		background-repeat: no-repeat;
		position: relative;
	}
	.in-jifen{
		width: 94%;
		height: 3.8rem;
		position: absolute;
		left: 3%;
		top: 0.6rem;
		border-radius: 10px;
		background: -webkit-linear-gradient(left top, #44DA9B ,  #1FB1B1);
		background: -o-linear-gradient(bottom right, #44DA9B,  #1FB1B1);
		background: -moz-linear-gradient(bottom right, #44DA9B,  #1FB1B1);
		background: linear-gradient(to bottom right, #44DA9B ,  #1FB1B1);
	}
	.jilu{
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
	}
	.jilu span{
		padding-left: 0.5rem;
		margin-left: 0.3rem;
		background-size: 23%;
		background-repeat: no-repeat;
		background-image: url(../../assets/jifen.png);
		color: #fff;
		font-size: 15px;
	}
	.jilu-bj{
		margin-top: -0.1rem;
		padding: 0.1rem 0;
		background: -webkit-linear-gradient(left, #1FB1B1 ,  #44DA9B);
		background: -o-linear-gradient(right, #1FB1B1,  #44DA9B);
		background: -moz-linear-gradient(right, #1FB1B1,  #44DA9B);
		background: linear-gradient(to right, #1FB1B1 ,  #44DA9B);
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
	}
	.jilu-bj a{
		display: inline-block;
		line-height: 20px;
		padding-left: 0.5rem;
		margin-left: 0.3rem;
		background-size: 23%;
		background-repeat: no-repeat;
		line-height: 20px;
		background-image: url(../../assets/duihuan.png);
		color: #fff;
		font-size: 15px;
		padding-right: 5px;
	}
	.twothousand{
		display: block;
		text-align: center;
		font-size: 50px;
		color: #fff;
		margin-top: 20px;
	}
	.Kind-warp{
		width: 100%;
		margin-top: 50px;
		margin-bottom: 0.18rem;
	}
	.Kind{
		width: 96%;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 6px;
	}
	.Kind ul{
		display: flex;
		justify-content: space-around;
	}
	.Kind ul li{
		float: left;
		text-align: center;
	}
	.Kind ul li i{
		display: block;
		width: 0.85rem;
		height: 0.85rem;
		background-image: url(../../assets/kind.png);
		background-size: contain;
		margin-top: 0.4rem;
	}
	.Kind ul li span{
		display: inline-block;
		padding: 0.2rem 0 0.3rem 0;
		font-size: 13px;
		color:  #363636 ;
	}
	.in-all-warp{
		width: 96%;
		margin: 0 auto;
		background-color: #fff;
	}
	.in-all {
		width: 100%;
		border-radius: 6px;
	}
	.in-all span{
		display: inline-block;
		line-height: 0.8rem;
		height: 0.8rem;
		padding-left: 10px;
		font-size: 16px;
		color:  #272727 ;
	}
	.in-all-one ul{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.in-all-one ul li{
		width: 2.2rem;
		margin: 0.1rem;
		text-align: center;
	}
	.in-all-one ul li img{
		display: inline-block;
		width: 100%;
		height: 1.65rem;
		border-radius: 5px;
	}
	.in-all-one ul li span{
		display: block;
		width: 100%;
		font-size: 12px;
		color: #454545;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.in-all-one ul li b{
		color: #5870E6;
		font-size: 11px;
		font-weight: 400;
	}
</style>
<script>
	import axios from 'axios'
	import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				title:'积分',
				items:[],
				allprice:null
			}
		},
		created(){
			var _this = this
			document.title = '积分兑换';
			_this.allgift()
			let userid = sessionStorage.getItem("userid");
			let inurl   = '/courseArrangementSystem/teacher/queryBonusPoint';
			const params = new URLSearchParams();
				params.append('teacherId', userid)

			axios.post(inurl,params).then(function(response){
				if (response.data.status === 0) {
					_this.allprice = response.data.data
				}else{
					MessageBox({
                          title: '',
                          message: '无权限',
                          showCancelButton: false,
                          showConfirmButton:true,
                          confirmButtonClass:'sure'
                        }).then(action => {
                            _this.$router.push('/main');
                        })
				}
			}).catch(function(error){
				alert(error);
			})
		},
		methods:{
			allgift(){
				var _this = this
				let userid = sessionStorage.getItem("userid");
				let inurl   = '/courseArrangementSystem/item/queryItems';
				axios.post(inurl).then(function(response){
					if (response.data.status === 0) {
						_this.items = response.data.data
					}
				}).catch(function(error){
					alert(error);
				})
			}
		}
	}
</script>