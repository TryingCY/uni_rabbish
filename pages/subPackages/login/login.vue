<template>
	<view>
		<uni-nav-bar fixed :status-bar="true" @clickLeft="goLeft" backgroundColor="#6AC039">
			<block slot="left"><uni-icon type="arrowleft" color="#FFF" size="25" /></block>
			<view class="tac">登录页</view>
		</uni-nav-bar>
		<form class="login">
			<view class="cu-form-group margin-top">
				<view class="title">账号</view>
				<input placeholder="请输入账号" type="username" v-model="account"></input>
			</view> 
			<view class="cu-form-group margin-top">
				<view class="title">密码</view>
				<input placeholder="请输入密码" v-model="password" :type="!eyeStatus ? 'password':'text'"></input>
				<text class="lg text-gray " :class="eyeStatus?'cuIcon-attention':'cuIcon-attentionforbid'" @click="eyeAction"></text>
			</view> 
			<view class="padding">
				<button class="cu-btn block bg-blue margin-tb-sm lg" disabled type="" @click="goLogin">登录</button>	
				<button class="cu-btn block bg-grey margin-tb-sm lg" disabled type="" @click="enrollment
">注册</button>	
				</view>
		</form>
	</view>
</template>

<script>
export default {
	data() {
		return {
			account:'',
			password: '',
			eyeStatus:false
		}
	},
	methods: {
		goLeft() {
			uni.navigateBack({
				delta: 1
			})
		},
		// 密码睁闭眼动作
		eyeAction(){
		this.eyeStatus=! this.eyeStatus
		}
	}
}
</script>

<style lang="scss">
	.login{
		
		.cu-form-group{
			min-width: calc(4em + 15px);
			width: 92%;
			margin:0 auto;
			margin-top: 30rpx;
			border-radius: 5%;
		}
	}
.tac {
	flex: 1;
	text-align: center;
	color: #fff;
}
</style>
