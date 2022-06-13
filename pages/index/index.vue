<template>
	<view>
		<!-- 首页轮播图 -->
		<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item, index) in swiperList" :key="index"><image :src="url + item.image" mode="aspectFill"></image></swiper-item>
		</swiper>
		<!-- 咨询 -->
		<view class="notify">
			<view class="txt-box">
				<view class="txt">祥兴</view>
				<view class="txt">咨讯</view>
			</view>
			<uni-notice-bar class="notify-bar" :show-icon="true" :scrollable="true" :single="true" backgroundColor="#6AC039" color="#000" :text="newsList" speed="20" />
		</view>
		<!-- 产品列表 -->
		<form class="form">
			<view class="subTitle">
				<text class="txt">产品类别</text>
				<text class="text-right">《危险废物法律法规》</text>
			</view>
			<view class="info">
				<view class="item-info" v-for="(item, index) in goodsList" :key="index"><image class="item-info-img" :src="url + item.image" mode="aspectFit"></image></view>
			</view>
			<view class="subTitle">
				<text class="txt">公司简介</text>
				<text class="txt-right">《如何正确处理危废》</text>
			</view>
			<view class="introduction" @tap="onCompanyTap">
				<image class="introduction-img" src="../../static/image/company.jpg" mode="scaleToFill"></image>
				<text class="txt">闽ICP备2021013336号</text>
			</view>
		</form>
	</view>
</template>

<script>
import { apiGetSwiper, apiGetConsult, apiGetGoodsList } from '@/apis/api.js'
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
export default {
	components: {
		uniNoticeBar
	},
	data() {
		return {
			swiperList: [],
			url: 'http://114.132.234.122:3000/',
			newsList: [],
			goodsList: []
		}
	},
	onLoad() {
		this.apiGetSwiper()
		this.apiGetConsult()
		this.apiGetGoodsList()
	},
	methods: {
		/* makeImgUrl(path) {
			return +'http://114.132.234.122:3000/' + path
		}, */
		// 获取轮播图
		apiGetSwiper() {
			apiGetSwiper()
				.then(res => {
					// console.log(res)
					if (res.code === 200) {
						this.swiperList = res.response
					}
				})
				.catch(err => {
					console.log(err)
				})
		},
		// 获取咨询信息
		apiGetConsult() {
			apiGetConsult()
				.then(res => {
					// console.log(res)
					if (res.code === 200) {
						this.newsList = res.response[0].news
					}
				})
				.catch(err => {
					console.log(err)
				})
		},
		// 获取产品列表
		apiGetGoodsList() {
			apiGetGoodsList()
				.then(res => {
					// console.log(res)
					if (res.code === 200) {
						this.goodsList = res.response
					}
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
}
</script>

<style lang="scss">
.notify {
	width: 90%;
	display: flex;
	align-items: center;
	margin-top: 20rpx;
	.txt-box {
		font-size: 28rpx;
		font-weight: 700;
		color: #028f4b;
		text-align: center;
		.txt {
			width: 100rpx;
		}
	}
	.notify-bar {
		width: 92%;
		margin: 0;
		flex: 1;
	}
}
.form {
	.subTitle {
		padding: 20rpx;
		font-size: 32rpx;
		font-weight: 700;
		display: flex;
		justify-content: space-between;
		.txt {
			position: relative;
			padding-left: 20rpx;
			&:before {
				content: '';
				width: 10rpx;
				height: 30rpx;
				background-color: #028f4b;
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				margin: auto;
			}
		}
	}
	.info {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		.item-info {
			width: 40%;
			height: 200rpx;
			border-radius: 30rpx;
			margin: 30rpx;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			.item-info-img {
				border-radius: 30rpx;
				height: 100%;
			}
			.txt {
				color: red;
				position: absolute;
				right: 30rpx;
				bottom: 8rpx;
			}
		}
	}
	.introduction {
		width: 90%;
		height: 300rpx;
		// background: #ffffff;
		border-radius: 30rpx;
		margin: 20rpx auto 140rpx auto;
		text-align: center;
		.introduction-img {
			// width: 300rpx;
			height: 300rpx;
			border-radius: 30rpx;
		}
		.txt {
			display: block;
		}
	}
}
</style>
