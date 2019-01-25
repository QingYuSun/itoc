<template>
	<div class="live-warp">
		<div class="live">
			<mt-swipe :auto="4000">
			  <mt-swipe-item v-for="(item,index) in items" v-if="index < 3">
				<a :href="item.address">
				  	<img :src="item.img2">
				  	<div class="all-live-img live-on-word" v-if="item.webstates == 0">
						<i></i>
						<span>直播中</span>
					</div>
					<div class="all-live-img live-on-word" v-if="item.webstates == 1">
						<span>即将直播</span>
					</div>
				</a>
			  </mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="live-content-warp">
			<div class="live-content clearup" v-for="(item,index) in items" v-if="index >= 3">
				<a :href="item.address">
				<div class="all-live-status">
					<img :src="item.img">
					<div class="all-live-img" v-if="item.webstates == 0">
						<i></i>
						<span>直播中</span>
					</div>
					<div class="all-live-img" v-if="item.webstates == 1">
						<span>即将直播</span>
					</div>
				</div>
				<div class="live-content-title">
					<span>{{item.content}}</span>
					<p>直播时间：{{newtime(item.startTime)}}</p>
				</div>
				</a>
			</div>
			<div class="nothingall" v-if="livenothingall == 0">
				<img src="../../assets/noting.png">
				<span>暂无直播内容</span>
			</div>
		</div>
	</div>
</template>
<style>
	.live-warp{
		width: 100%;
		border-top: 0.06rem solid #e0e0e0;
	}
	.live{
		width: 100%;
		height: 3rem;
		position: relative;
	}
	.live img{
		width: 100%;
		height: 100%;
	}
	.live-content-warp{
		width: 100%;
	}
	.live-content{
		padding: 0.12rem 0.08rem;
		height: 100%;
		position: relative;
		border-bottom: 0.06rem solid #e0e0e0;
	}
	.all-live-status{
		float: left;
		width: 3rem;
		height: 2.4rem;
		position: relative;
	}
	.all-live-status img{
		width: 100%;
		height: 100%;
	}
	.all-live-img{
		position: absolute;
		top: 6px;
		left: 6px;
		line-height: 20px;
		padding: 0 5px;
		background-color: rgba(0,0,0,0.4);
		border: 1px solid rgba(255,255,255,0.7);
		border-radius: 8px;
	}
	.all-live-img i{
		display: block;
		float: left;
		width: 13px;
		height: 13px;
		background-color: #0cb181;
		line-height: 0.35rem;
		margin-top: 4px;
		margin-right: 4px;
		border-radius: 50%;
	}
	.all-live-img span{
		color: #fefefe;
	}
	.live-content-title{
		margin-left: 3.16rem;
		padding-top: 0.11rem;
		height: 100%;
	}
	.live-content-title span{
		color: #5b5a5a;
	}
	.live-content-title p{
		position: absolute;
		bottom: 0.12rem;
	}
	.nothingall{
	text-align: center;
}
.nothingall img{
	width: 60%;
	padding-top: 0.5rem;
}
.nothingall span{
	display: block;
	color: #5b5a5a;
	padding-top: 0.5rem;
}
@media screen and (max-width: 321px) {
	.live-on-word span{
		font-size: 14px;
	}
	.live-content-title span{
		font-size: 13px;
	}
	.live-content-title p{
		font-size: 12px;
	}
	.all-live-img span{
		font-size: 9px;
	}
	.nothingall span{
		font-size: 17px;
	}
}

@media screen and (min-width: 321px) and (max-width:400px) {
	.live-on-word span{
		font-size: 15px;
	}
	.live-content-title span{
		font-size: 14px;
	}
	.live-content-title p{
		font-size: 13px;
	}
	.all-live-img span{
		font-size: 10px;
	}
	.nothingall span{
		font-size: 18px;
	}
}

@media screen and (min-width: 400px) {
	.live-on-word span{
		font-size: 17px;
	}
	.live-content-title span{
		font-size: 16px;
	}
	.live-content-title p{
		font-size: 15px;
	}
	.all-live-img span{
		font-size: 12px;
	}
	.nothingall span{
		font-size: 20px;
	}
}
</style>
<script>
	import axios from 'axios';
	export default{
		data(){
			return{
				title:'直播页面',
				items:[],
				itemsto:[],
				livenothingall:0
			}
		},
		created(){
			document.title = '直播';
			this.liveing();
		},
		methods:{
			newtime:function(el){
                return moment(el).format('YYYY年MM月DD日 HH时')
            },
			liveing(){
				let that = this;
              	let liveimgurl = 'wxpay-ssm/queryJustTimeVideoList';
              	axios.get(liveimgurl).then(function (response) {
                	let data = response.data;
                	if (data.status == "SUCCEED") {
                	that.items = data.data
                	
                	for (var i = 0; i < that.items.length; i++) {
                		let jsonarray = that.items[i];
                		jsonarray.webstates = 0;
                		that.items[i] = jsonarray;
                	}
                	that.beaboutto();
                }
              	}).catch(function (error) {
                  	alert(error);
              	});
			},
			beaboutto(){
				let that = this;
              	let liveimgurl = 'wxpay-ssm/queryAfterTimeVideoList';
              	axios.get(liveimgurl).then(function (response) {
                	let data = response.data;
                	if (data.status == "SUCCEED") {
                	that.itemsto = data.data

                	for (var i = 0; i < that.itemsto.length; i++) {
                		let jsonarrayto = that.itemsto[i];
                		jsonarrayto.webstates = 1;
                		that.itemsto[i] = jsonarrayto;
                	}

                	that.items = that.items.concat(that.itemsto);

                	if (that.items.length !== 0) {
                		that.livenothingall = 1;
                	}
                }
              	}).catch(function (error) {
                  	alert(error);
              	});
			}
		}
	}
</script>