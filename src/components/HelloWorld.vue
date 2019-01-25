<template>
<div class="sun-main-warp">
      <div class="sun-main-img">
          <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item,index) in items" v-if="index < 3"><a :href="item.address"><img :src="item.img"></a></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="sun-nice">
        <div class="sun-nice-one">
          <ul>
            <li>
              <router-link to="/expect">
                <img src="../assets/icon3.png">
                <span>健康数据</span>
              </router-link> 
            </li>
            <li>
              <router-link to="/live">
                <img src="../assets/icon4.png">
                <span>校园直播</span>
              </router-link> 
            </li>
            <li>
              <a @click="ztengyoujiao">
                <img src="../assets/icon5.png">
                <span>在线课堂</span>
             </a>
            </li>
            <li>
              <router-link to="/expect">
                <img src="../assets/icon6.png">
                <span>课程报名</span>
              </router-link> 
            </li>
            <li>
              <router-link to="/choose">
                <img src="../assets/icon7.png">
                <span>付费服务</span>
              </router-link> 
            </li>
            <li>
             <a @click="buka">
                <img src="../assets/icon10.png">
                <span>补卡申请</span>
              </a>
            </li>
            <li v-if="benobjectid == 'oIjuneWxmasDpslkIdone'">
              <router-link to="/checkon">
                <img src="../assets/kec.png">
                <span>考勤打卡</span>
              </router-link>
            </li>
            <li v-if="benobjectid == 'oIjuneWxmasDpslkIdone'">
              <router-link to="/integral">
                <img src="../assets/liwu.png">
                <span>积分兑换</span>
              </router-link>
            </li>
          </ul>
      </div>
    </div>
    <div class="news-warp" 
  v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
      <div class="news-title">
        <span>新闻中心</span>
      </div>
      <div class="news" v-for="(item,index) in items">
        <a :href="item.address">
        <img :src="item.img">
        <div class="news-word">
          <span>{{item.title}}</span>
          <p>{{item.content}}</p>
        </div>
        </a>
      </div>
      <div class="news-lading">
        <span v-if="loading == 0">加载中...</span>
        <span v-if="loading == 1">加载完了</span>
      </div>
    </div>
    <!-- <div class="sun-title">
      <span>智慧校园椒江运营中心</span>
    </div> -->
</div>
</template>

<script>
  import md5 from 'js-md5';
  import axios from 'axios';
    export default{
        data(){
            return{
              title:"九宫格",
              Request:[],
              items:[],
              newspage:1,
              newsrows:1,
              loading:0,
              isloading:0,
              benuserid:'',
              benobjectid:'',
              benobjType:''
            }
        },
        created(){
            //获取链接
            document.title = '运营中心';
            this.GetRequest();
            this.newsdata();
        },
        methods: {
            //获取链接后面数据
            GetRequest:function() {
              let that = this;
              var alerturl =  window.location.href;
              var url = location.search;  //获取url中"?"符后的字串
               var theRequest = new Object();
               if (url.indexOf("?") != -1) {
                  var str = url.substr(1);
                  var strs = str.split("&");
                  for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
                  }
              }
              that.Request = theRequest;

              if (that.Request.userid !==undefined || that.Request.objectid !== undefined) {
                sessionStorage.setItem('userid', that.Request.userid);
                sessionStorage.setItem('objectid', that.Request.objectid);
                sessionStorage.setItem('objType', that.Request.objType);
                that.benuserid = that.Request.userid;
                that.benobjectid = that.Request.objectid;
                that.benobjType = that.Request.objType;

              }
            },
            newsdata(){
              let that = this;
              that.isloading = 0;
              let newsurl = 'wxpay-ssm/queryAllNews';
              let shooleurl = 'wxpay-ssm/queryJustTimeVideoList2';
              const params = new URLSearchParams();
              params.append('page', that.newspage);
              params.append('rows', 5);

              axios.post(newsurl,params).then(function (response) {
                let data = response.data;
                  if (data.status == "SUCCEED") {
                  that.items = that.items.concat(data.data.rows);
                  that.newspage++;
                  that.newsrows = Math.ceil(data.data.total/5);
                  that.isloading = 1;
                }
              }).catch(function (error) {
                    alert(error);
              });
            },
            loadMore(){
              let that = this;
              if (that.isloading == 1) {
                if (that.newsrows >= that.newspage) {
                  that.newsdata();
                }else{
                  that.loading = 1;
                }
              }
            },
            ztengyoujiao(){
              window.location.href=`http://www.ztengit.com:8088?objectid=${this.benobjectid}&objType=${this.benobjType}&userid=${this.benuserid}`;
            },
            buka(){
              window.location.href="http://www.ztengit.com/pay/index2.html";
            }
        }
    }
</script>

<style scoped>
.sun-main-img{
  width: 100%;
  height: 4.86rem;
  border-top: 3px solid #e0e0e0;
  border-bottom: 3px solid #e0e0e0;
}
.sun-main-img img{
  width: 100%;
  height: 100%;
  display: block;
}
.sun-nice{
  width: 100%;
}
.sun-nice-one ul{
  text-align: center;
  margin: 0 auto;
  overflow: hidden;
}
.sun-nice-one ul li{
  float: left;
  width: 2.5rem;
  margin: 0.4rem 0;
}
.sun-nice-one ul li img{
  width: 1.2rem;
  height: 1.2rem;
  display: block;
  margin: 0 auto;
}
.sun-title{
  position: fixed;
  bottom: 27px;
  text-align: center;
  width: 100%;
}
.sun-title span{
  color: #585858;
  display: inline-block;
  font-size: 14px;
  height: 35px;
  line-height: 35px;
  padding-left: 40px;
  background-repeat: no-repeat;
  background-image: url(../assets/icon9.png);
  background-size: 20%;
}
.news-title{
  border-top: 3px solid #e0e0e0;
  border-bottom: 3px solid #e0e0e0;
}
.news-title span{
  line-height: 0.5rem;
  color: #22b4ae;
  padding-left: 38px;
  background-image: url(../assets/news.png);
  background-repeat: no-repeat;
  background-size: 23% 100%;
  background-position: 10px 0;
}
.news{
  padding: 5px;
  border-bottom: 3px solid #e0e0e0;
  overflow: hidden;
}
.news img{
  width: 2.95rem;
  height: 2.38rem;
  float: left;
  border-radius: 5px;
}
.news-word{
  margin-left: 3.2rem;
}
.news-word span{
  color: #5b5a5a;
  line-height: 30px;
  margin-bottom: 0.1rem;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
}
.news-word p{
  color: #5b5a5a;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
}
.news-lading{
  text-align: center;
  padding: 20px 0;
}
@media screen and (max-width: 321px) {
  .news-title span{
    font-size: 14px;
  }
  .news-word span{
    font-size: 13px;
  }
  .news-word p{
    font-size: 11px;
  }
}
@media screen and (min-width: 321px) and (max-width:400px) {
  .news-title span{
    font-size: 15px;
  }
  .news-word span{
    font-size: 14px;
  }
  .news-word p{
    font-size: 12px;
  }
}
@media screen and (min-width: 400px) {
  .news-title span{
    font-size: 17px;
  }
  .news-word span{
    font-size: 16px;
  }
  .news-word p{
    font-size: 14px;
  }
}
</style>
