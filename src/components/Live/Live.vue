<template>
	<div class="sun-pay-warp">
		<div class="live-list">
			<div class="common all-live">
				<a :class="{active : cur == 0}" @click="livecur(0)">全部直播</a>
			</div>
			<div class="common me-live">
				<a :class="{active : cur == 1}" @click="livecur(1)">本校直播</a>
			</div>
		</div>
		<div v-if="cur == 0">
			<live-all></live-all>
		</div>
		<div v-if="cur == 1">
			<live-my></live-my>
		</div>
	</div>
</template>
<style>
	.common{
		float: left;
		width: 50%;
	}
	.common a{
		line-height: 0.7rem;
	}
	.active{
		color: #0cb181;
	}
	.live-list{
		overflow: hidden;
		line-height: 0.7rem;
	}
	.all-live{
		text-align: right;
	}
	.all-live a{
		margin-right: 10px;
	}
	.me-live{
		text-align: left;
	}
	.me-live a{
		width: 20px;
		margin-left: 10px;
	}
	@media screen and (max-width: 321px) {
		.common a{
			font-size: 17px;
		}
	}

	@media screen and (min-width: 321px) and (max-width:400px) {
		.common a{
			font-size: 18px;
		}
	}

	@media screen and (min-width: 400px) {
		.common a{
			font-size: 20px;
		}
	}
</style>
<script>
	import LiveAll from './LiveAll.vue';
	import LiveMy from './LiveMy.vue';

	export default{
		data(){
			return{
				cur: 0
			}
		},
		created(){
			document.title = '直播';
		},
		methods:{
			livecur(unm){
				this.cur = unm;
			}
		},
		components:{
			'live-all':LiveAll,
			'live-my':LiveMy
		}
	}
</script>