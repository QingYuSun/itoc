<template>
<div>
  <div class="sun-pay-warp">
    <div class="sun-search-warp">
      <input type="text" name="souso" v-model="value">
      <i v-if="change"></i>
      <i v-else class="search3" @click="search"></i>
    </div>
  </div>
  <div class="sun-affirm-search">
    <a @click="search">搜索</a>
  </div>
  <div class="sun-appoint">
    <p>输入指定内容</p>
    <span class="sun-bor">学生姓名</span>
    <span>预留手机号</span>
  </div>
  </div>
</div>
</template>

<script>
    export default{
        data(){
            return{
              title:"搜索",
              value:'',
              change:true
            }
        },
        watch:{
          value(){
            if (this.value !== '') {
              this.change = false;
            }else{
              this.change = true;
            }
          }
        },
        created(){
          document.title = '平安智慧校园服务';
          let  schoolName= decodeURI(this.GetQueryString('schoolName'));
          sessionStorage.setItem('schoolName', schoolName);
        },
        methods: {
          GetQueryString(param) { //param为要获取的参数名 注:获取不到是为null
            var currentUrl = window.location.href; //获取当前链接
            var arr = currentUrl.split("?");//分割域名和参数界限
            if (arr.length > 1) {
                arr = arr[1].split("&");//分割参数
                for (var i = 0; i < arr.length; i++) {
                    var tem = arr[i].split("="); //分割参数名和参数内容
                    if (tem[0] == param) {
                        return tem[1];
                    }
                }
                return null;
            }
            else {
                return null;
            }
          },
          newtime:function(el){
            return moment(el).format('YYYY年MM月DD日');
          },
          search:function() {
            	let that = this;
              if (that.value.length == 0) {
                alert('请输入学生姓名或预留手机号');
              }else{
                sessionStorage.setItem('role', 1);
                sessionStorage.setItem('search', that.value);
                that.$router.push('/choose');
              }
            }
        }
    }
</script>

<style>
  .sun-search-warp{
    width: 90%;
    margin: 0 auto;
    margin-top: 0.7rem;
    border-bottom: 1px solid #16b65a;
    position: relative;
  }
  .sun-search-warp input{
    width: 80%;
    outline:none;
    border:0px;
    cursor: pointer;
    color: #020202;

  }
  .sun-search-warp .search3{
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    right: 0.1rem;
    bottom: 0;
    background-image: url(../../assets/search3.png);
    background-size: 100%;
  }
  .sun-search-warp i{
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    right: 0.1rem;
    bottom: 0;
    background-image: url(../../assets/search2.png);
    background-size: 100%;
  }
  .sun-affirm-search{
    width: 100%;
    margin: 0.6rem 0;
    text-align: center;
  }
  .sun-affirm-search a{
    display: inline-block;
    width: 90%;
    line-height: 0.88rem;
    background-color: #16b65a;
    color: #fff;
    border-radius: 10px;
    letter-spacing: 1em;
    text-indent:1em;
  }
  .sun-appoint{
    text-align: center;
  }
  .sun-appoint p{
    color: #c9cbca;
    font-size: 13px;
    margin-bottom: 0.36rem;
  }
  .sun-appoint span{
    padding: 0 10px;
    color: #16b65a;
  }
  .sun-bor{
    border-right: 1px solid #ccc;
  }
  @media screen and (max-width: 321px) {
    .sun-search-warp input{
      font-size: 16px;
    }
    .sun-affirm-search a{
      font-size: 21px;
    }
    .sun-appoint p{
      font-size: 15px;
    }
    .sun-appoint span{
      font-size: 14px;
    }
}

@media screen and (min-width: 321px) and (max-width:400px) {
    .sun-search-warp input{
      font-size: 17px;
    }
    .sun-affirm-search a{
      font-size: 22px;
    }
    .sun-appoint p{
      font-size: 16px;
    }
    .sun-appoint span{
      font-size: 15px;
    }
}

@media screen and (min-width: 400px) {
    .sun-search-warp input{
      font-size: 19px;
    }
    .sun-affirm-search a{
      font-size: 24px;
    }
    .sun-appoint p{
      font-size: 18px;
    }
    .sun-appoint span{
      font-size: 17px;
    }
}
</style>
