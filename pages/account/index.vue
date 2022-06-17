<template>
	<view class="box">
		<uni-nav-bar fixed :status-bar="true" backgroundColor="#6AC039" color="#fff"><view class="tac">我的</view></uni-nav-bar>
		<view class="login" @click="goLogin">
			<image class="img" src="../../static/image/account/notLogin.png"></image>
			<!-- <button class="cu-btn margin-tb-sm lg" style="background-color: #6ac039;">请登录</button> -->
			<view class="txt">请登录</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {
		// 点击跳转到登录页
		goLogin() {
			uni.navigateTo({
				url: '../subPackages/login/login'
			})
		}
	}
}
</script>

<style lang="scss">
.tac {
	flex: 1;
	text-align: center;
}
.login {
	width: 100rpx;
	height: 100rpx;
	line-height: 100%;
	margin: 10% auto;
	text-align: center;
	.img {
		width: 100rpx;
		height: 100rpx;
	}
	.txt {
		margin-top: 5px;
	}
}
</style>
