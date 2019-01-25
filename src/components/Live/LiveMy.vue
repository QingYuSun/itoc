<template>
	<div class="live-warp">
		<div class="ourschool">
			<div class="ourschool-live">
				<span class="ourschool-name">{{schoolname}}</span>
				<div class="nothing" v-if="livenothing == 0">
					<img src="../../assets/noting.png">
					<span>暂无直播内容</span>
				</div>
				<div class="liveword" v-for="(item,index) in items">
					<a :href="item.address">
						<span class="live-time">{{newtimes(item.startTime)}}</span>
						<div class="live-status">
							<img :src="item.img">
							<div class="status-img">
								<i></i>
								<span>直播中</span>
							</div>
						</div>
						<p class="live-substance">{{item.title}}</p>
					</a>
				</div>
				<div class="liveword" v-for="(item,index) in itemsbeto">
					<a :href="item.address">
						<span class="live-time">{{newtimes(item.startTime)}}</span>
						<div class="live-status">
							<img :src="item.img">
							<div class="status-img">
								<span>即将直播</span>
							</div>
						</div>
						<p class="live-substance">{{item.title}}</p>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>
<style>
.ourschool{
	padding: 0.6rem 0.15rem 1rem 0.15rem;
}
.ourschool-name{
	color: #5b5a5a;
	padding-left: 0.18rem;
}
.nothing{
	text-align: center;
}
.nothing img{
	width: 60%;
	padding-top: 2rem;
}
.nothing span{
	display: block;
	color: #5b5a5a;
	padding-top: 0.5rem;
}
.live-time{
	padding-left: 0.18rem;
	color: #9e9d9d;
	line-height: 40px;
}
.live-status{
	position: relative;
	margin: 0.2rem 0 0.75rem;
}
.live-substance{
	color: #5b5a5a;
	padding-left: 0.18rem;
}
.status-img{
	position: absolute;
	top: 10px;
	left: 15px;
	line-height: 20px;
	background-color: rgba(0,0,0,0.4);
	padding: 0 5px;
	border-radius: 8px;
	border: 1px solid rgba(255, 255, 255, 0.6)
}
.status-img i{
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
.status-img span{
	color: #fff;
}
.live-status img{
	width: 100%;
}
@media screen and (max-width: 321px) {
	.ourschool-name{
		font-size: 17px;
	}
	.nothing span{
		font-size: 17px;
	}
	.live-time{
		font-size: 15px;
	}
	.status-img span{
		font-size: 9px;
	}
	.live-substance{
		font-size: 18px;
	}
	.live-substance{
		font-size: 17px;
	}
}

@media screen and (min-width: 321px) and (max-width:400px) {
	.ourschool-name{
		font-size: 18px;
	}
	.nothing span{
		font-size: 18px;
	}
	.live-time{
		font-size: 16px;
	}
	.status-img span{
		font-size: 10px;
	}
}

@media screen and (min-width: 400px) {
	.ourschool-name{
		font-size: 20px;
	}
	.nothing span{
		font-size: 20px;
	}
	.live-time{
		font-size: 18px;
	}
	.status-img span{
		font-size: 12px;
	}
	.live-substance{
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
				livenothing:0,
				aboutobjectid:'',
				items:[],
				itemsbeto:[],
				schoolname:''
			}
		},
		created(){
			document.title = '直播';
			let that = this;
			that.aboutobjectid = sessionStorage.getItem("objectid");
			that.shooleliveing();
			that.shoolbeaboutto();
		},
		methods:{
			newtimes:function(el){
                return moment(el).format('YYYY-MM-DD HH:MM')
            },
			shooleliveing(){
				let that = this;
              	let shooleurl = 'wxpay-ssm/queryJustTimeVideoList2';
              	const params = new URLSearchParams();
              	params.append('objectId', that.aboutobjectid);
              	axios.post(shooleurl,params).then(function (response) {
                	let data = response.data;
                	if (data.status == "SUCCEED") {
                	that.items = data.data.listVideo,
                	that.schoolname = data.data.schoolName

                	if (that.items.length !== 0) {
                		that.livenothing = 1
                	}
                }
              	}).catch(function (error) {
                  	alert(error);
              	});
			},
			shoolbeaboutto(){
				let that = this;
              	let shooleurl = 'wxpay-ssm/queryAfterTimeVideoList2';
              	const params = new URLSearchParams();
              	params.append('objectId', that.aboutobjectid);
              	axios.post(shooleurl,params).then(function (response) {
                	let data = response.data;
                	if (data.status == "SUCCEED") {
                	that.itemsbeto = data.data.listVideo

                	if (that.itemsbeto.length !== 0) {
                		that.livenothing = 1
                	}
                }
              	}).catch(function (error) {
                  	alert(error);
              	});
			}
		}
	}
</script>