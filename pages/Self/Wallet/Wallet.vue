<!-- 我的钱包 -->
<template>
	<view class="wallet">
		<view class="head">
			<view class="credit">
				<view class="small">Aha币</view>
				<view class="h3">{{ahaCredit}}</view>
				<view class="function">
					<view class="ctr" @click="isShowPay=true">
						<text class="iconfont icon-qian"></text>
						<text>充值</text>
					</view>
					<view class="ctr" @click="undo">
						<text class="iconfont icon-zengsong"></text>
						<text>赠送</text>
					</view>
				</view>
			</view>
			<view class="point">
				<view class="small">Aha点</view>
				<view class="h3">{{ahaPoint}}</view>
				<view class="function">
					<view class="ctr" @click="isShowConversion=true">
						<text class="iconfont icon-duihuan"></text>
						<text>兑换码</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 卡片操作 -->
		<view class="card" @click="withdrawDeposit">
			<text class="logo iconfont icon-tixian"></text>
			<text class="name">Aha币提现</text>
			<text class="explain">实名认证后才可提现</text>
		</view>
		<navigator 
			class="card"
			url="Orders">
			<text class="logo iconfont icon-zhangdan"></text>
			<text class="name">账单信息</text>
			<text class="right iconfont icon-right"></text>
		</navigator>
		
		<PayAha v-if="isShowPay" @close="isShowPay=false"></PayAha>
		<GivePoint v-if="isShowGive" @close="isShowGive=false" @finish="upDate"></GivePoint>
		<Conversion v-if="isShowConversion" @close="isShowConversion=false" @finish="upDate"></Conversion>
	</view>
</template>

<script>
import GivePoint from "./components/GivePoint.vue"
import PayAha from "./components/PayAha.vue"
import Conversion from "./components/Conversion.vue"
export default {
	data() {
		return {
			ahaCredit: 0,
			ahaPoint: 0,
			isShowGive: false,
			isShowPay: false,
			isShowConversion: false
		}
	},
	components: {
		GivePoint,
		PayAha,
		Conversion
	},
	onShow() {
		this.upDate()
	},
	methods: {
		/* 重新更新余额和贡献点 */
		upDate()
		{
			this.gGetMeInfo()
			.then(res => {
				this.ahaCredit = res.ahaCredit
				this.ahaPoint = res.ahaPoint
				// console.log(res);
			})
			this.isShowGive = false
			this.isShowPay = false
			this.isShowConversion = false
		},
		/* 提现，判断是否实名认证，若未实名认证则跳转实名认证 */
		withdrawDeposit()
		{
			uni.navigateTo({
				url: "/pages/Self/Number/Authentication",
				success: () => {
					this.gToastError("请先实名认证")
				}
			})
		},
		undo()
		{
			this.gToastMsg("功能开发中")
		}
	}
}
</script>

<style lang="stylus" scoped>
.wallet
	min-height 100vh
	background-color var(--white1)
	.head
		padding 20px 0
		text-align center
		display flex
		justify-content space-around
		.dian
			margin-right 10px
		.small
			color var(--gray2)
			font-size 22rpx
		.h3
			margin 5px 0
			font-size 50rpx
		.function
			display flex
			.ctr
				margin 0 5px
				font-size 24rpx
				background-color #FFFFFF
				padding 0 10px
				border-radius 22px
				.iconfont
					margin-right 5px
				.icon-duihuan
					color var(--origin1)
				.icon-qian
					color var(--origin2)
				.icon-zengsong
					color #e86452
	/* 操作卡片 */
	.card
		margin 5px 2.5%
		padding 10px
		background-color #FFFFFF
		border-radius 8px
		display flex
		align-items center
		.name
			flex 1
			margin-left 10px
		.logo
			width 40px
			height 40px
			line-height 40px
			border-radius 50%
			text-align center
			font-size 40rpx
		.icon-tixian
			color #5ad8a6
			background-color rgba(90,216,166,0.2)
		.icon-zhangdan
			color #f8b86b
			background-color rgba(248,184,107,0.2)
		.explain
			font-size 24rpx
			color var(--gray2)
		.right
			margin-left 10px
			font-size 42rpx
			color var(--origin2)
</style>
