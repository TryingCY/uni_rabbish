<template>
	<view class="content">
		<uni-nav-bar fixed :status-bar="true" @clickLeft="goLeft" backgroundColor="#6AC039">
			<block slot="left"><uni-icon type="arrowleft" color="#FFF" size="25" /></block>
			<view class="tac">公司简介</view>
		</uni-nav-bar>
		<view class="page-content">
			<view class="rich">
				<!-- 富文本 -->
				<rich-text :nodes="companyInfo"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
import uniIcon from '@/components/uni-icon/uni-icon.vue'
import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
import { apiGetCompany } from '@/apis/api.js'
export default {
	components: {
		uniIcon,
		uniNavBar
	},
	data() {
		return {
			companyInfo: ''
		}
	},
	onLoad(options) {
		this.onCompanyTap()
		this.getCompany()
	},
	methods: {
		goLeft() {
			uni.navigateBack({
				delta: 1
			})
		},
		// 显示 loading 提示框, 需主动调用 uni.hideLoading 才能关闭提示框
		getCompany() {
			uni.showLoading({
				title: '加载中'
			})
		},
		// 获取公司简介信息
		onCompanyTap() {
			apiGetCompany()
				.then(res => {
					// console.log(res)
					if (res.code === 200) {
						// 将后台数据转换为富文本渲染出来
						let str = res.response[0].data
						str = str.replace(/(\\)/g, '') // 去掉\  渲染富文本
						this.companyInfo = str.replace(/\< img src="/gi, '< img src="https://www.xxweifeitong.cn')
						// 4张图片在另外一个服务器
						// console.log(this.companyInfo)
					}
					uni.hideLoading()
				})
				.catch(err => {
					uni.hideLoading()
					console.log(err)
				})
		}
	}
}
</script>

<style lang="scss">
page {
	font-size: 28rpx;
	background: #eceff8;
}
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.tac {
		flex: 1;
		text-align: center;
		color: #fff;
	}
}
.page-content {
	.rich {
		width: 92%;
		margin: 55rpx auto 0 auto;
		color: #7f7e7e;
	}
	img {
		width: 40rpx !important;
	}
}
</style>
