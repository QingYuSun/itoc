<template>
	<div class="bj-0">
		<div class="bj-warp clearup">
			<div class="bj-1">
				<div class="bj-2"></div>
			</div>
			<div class="sd-r-warp">
				<span class="sd-r"><i>{{checitem.arrived}}</i></br>实到人数</span>
				<div class="sd-w">
					<span><i>{{checitem.late.length}}</i></br>迟到人数</span>
					<span><i>{{checitem.not_arrived.length}}</i></br>未到人数</span>
				</div>
			</div>
			
		</div>
		<div class="lie">
			<div class="lie-ci">
				<div class="ci-title" @click="vision(0)">
					<span>迟到名单</span>
					<i></i>
				</div>
				<div class="l-quan">
					<ul :class="{activequan: belatefor === true}">
						<li v-for="(item, key) in checitem.late"><span>{{item}}</span></li>
					</ul>
				</div>
			</div>
			<div class="lie-ci">
				<div class="ci-title" @click="vision(1)">
					<span>未到名单</span>
					<i></i>
				</div>
				<div class="l-quan">
					<ul :class="{activequan: nonarrival === true}">
						<li v-for="(item, index) in checitem.not_arrived" key="index"><span>{{item}}</span></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<style type="text/css">
.bj-0{
	background-color: #F7F7F7;
}
	.bj-warp{
		width: 100%;
		position: relative;
	}
	.bj-1{
		float:left;
	    position:relative;
	    left:50%;
	    clear:both;
	    width: 150%;
	}
	.bj-2{
	    position:relative;
	    left:-50%;
		background-color: red;
		width: 100%;
	    height: 190px;
	    background: -moz-linear-gradient(#44DA9B, #1FB1B1);
	    background: linear-gradient(#44DA9B, #1FB1B1);
	    border-bottom-left-radius: 50%;
	    border-bottom-right-radius: 50%;
	}
	.sd-r-warp{
		position: absolute;
	    top: 35px;
	    left: 5%;
	    width: 90%;
	    height: 3.86rem;
	    margin: 0 auto;
	    background-image: url(../../assets/sd.png);
	    background-size: 120% 120%;
	    background-position: center;
	    box-shadow: 1px 1px 5px #bdbbbb;
	}
	.sd-r{
		display: block;
		text-align: center;
		color: #8E8E8E;
		font-size: 17px;
		padding-top: 0.6rem;
	}
	.sd-r i{
		font-style: normal;
		font-size: 40px;
		color: #252525;
	}
	.sd-w{
		position: absolute;
	    display: flex;
	    bottom: 0;
	    left: 0;
	    text-align: center;
	    width: 100%;
	}
	.sd-w span{
		flex: 1;
		color:  #8E8E8E;
		font-size: 15px;
		padding-bottom: 0.2rem;
	}
	.sd-w span i{
		font-style: normal;
		color: #252525;
		font-size: 30px;
	}
	.lie{
		margin-top: 50px;
	}
	.lie-ci{
		background-color: #ffff;
	    border-radius: 5px;
	    width: 98%;
	    margin: 0 auto;
	    box-shadow: 1px 1px 1px #2F2B751A;
	    margin-top: 5px;
	}
	.ci-title{
		display: flex;
	    justify-content: space-between;
	    align-items: center;
	}
	.ci-title:hover i{
		-moz-animation:myfirst 1s;
		-webkit-animation:myfirst 1s;
		-o-animation:myfirst 1s;
		animation-fill-mode:forwards;
	}
    
	.ci-title span{
		font-size: 15px;
	    color: #000;
	    line-height: 0.96rem;
	    padding-left: 0.28rem
	}
	@keyframes myfirst
	{
	from {
		transform:rotate(0deg);
		-ms-transform:rotate(0deg);
		-moz-transform:rotate(0deg);
		-webkit-transform:rotate(0deg);
		-o-transform:rotate(0deg);
	}
	to {
		transform:rotate(90deg);
		-ms-transform:rotate(90deg);
		-moz-transform:rotate(90deg);
		-webkit-transform:rotate(90deg);
		-o-transform:rotate(90deg);
		}
	}

	@-moz-keyframes myfirst /* Firefox */
	{
	from {transform:rotate(0deg);
		-ms-transform:rotate(0deg);
		-moz-transform:rotate(0deg);
		-webkit-transform:rotate(0deg);
		-o-transform:rotate(0deg);}
	to {
		transform:rotate(90deg);
		-ms-transform:rotate(90deg);
		-moz-transform:rotate(90deg);
		-webkit-transform:rotate(90deg);
		-o-transform:rotate(90deg);
		}
	}

	@-webkit-keyframes myfirst /* Safari and Chrome */
	{
	from {transform:rotate(0deg);
		-ms-transform:rotate(0deg);
		-moz-transform:rotate(0deg);
		-webkit-transform:rotate(0deg);
		-o-transform:rotate(0deg);}
	to {
		transform:rotate(90deg);
		-ms-transform:rotate(90deg);
		-moz-transform:rotate(90deg);
		-webkit-transform:rotate(90deg);
		-o-transform:rotate(90deg);
		}
	}

	@-o-keyframes myfirst /* Opera */
	{
	from {transform:rotate(0deg);
		-ms-transform:rotate(0deg);
		-moz-transform:rotate(0deg);
		-webkit-transform:rotate(0deg);
		-o-transform:rotate(0deg);}
	to {
		transform:rotate(90deg);
		-ms-transform:rotate(90deg);
		-moz-transform:rotate(90deg);
		-webkit-transform:rotate(90deg);
		-o-transform:rotate(90deg);
		}
	}
	@keyframes myquan
	{
	from {
		height: 0;
	}
	to {
		height: 100%;
		}
	}

	@-moz-keyframes myquan
	{
	from {
		height: 0;
	}
	to {
		height: 100%;
		}
	}

	@-webkit-keyframes myquan
	{
	from {
		height: 0;
	}
	to {
		height: 100%;
		}
	}

	@-o-keyframes myquan
	{
	from {
		height: 0;
	}
	to {
		height: 100%;
		}
	}
	.ci-title i{
		display: block;
	    width: 22px;
	    height: 27px;
	    background-repeat: no-repeat;
	    background-size: contain;
	    margin-right: 10px;
		background-image: url(../../assets/right.png);
	}
	.activequan{
		-moz-animation:myquan 3s;
		-webkit-animation:myquan 3s;
		-o-animation:myquan 3s;
		animation-fill-mode:forwards;
	}
	.l-quan ul{
		height: 0;
		overflow: hidden;
	}
    .l-quan ul li{
    	width: 95%;
	    margin: 0 auto;
	    line-height: 0.96rem;
	    border-top: 1px solid #f2f2f2;
    }
    .l-quan ul li span{
    	color: #666;
    	font-size: 15px;
    	padding-left: 5px;
    }
</style>
<script type="text/javascript">
	import axios from 'axios';
    import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				belatefor:false,
				nonarrival: false,
                checitem:{
                     arrived:0,
                     late:[],
                     not_arrived:[]
                }
			}
		},
		created(){
			var that = this
            let checuserid = sessionStorage.getItem("userid");
            let checobjectid = sessionStorage.getItem("objectid");
			let checkonurl   = `/attendance/getAttnInfoByTeacher?schoolId=${checobjectid}&teacherId=${checuserid}`;
			axios.get(checkonurl)
            .then(function (response) {
                let data = response.data;
                if (data.code == 0) {
                    that.checitem = data.data
                    console.log(that.checitem.late.length)
                }else{
                    MessageBox({
                          title: '',
                          message: data.msg,
                          showCancelButton: false,
                          showConfirmButton:true,
                          confirmButtonClass:'sure'
                        }).then(action => {
                            that.$router.push('/main');
                        })
                }
              })
              .catch(function (error) {
                  alert(error);
              });
		},
		methods:{
			vision(em){
				if (em == 0) {
					this.belatefor = true
					this.nonarrival = false
				}else{
					this.belatefor = false
					this.nonarrival = true
				}
			}
		}
	}
</script>