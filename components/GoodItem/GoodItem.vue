<template>
	<view class="goods-item-container">
		<image class="goods-img" :src=mainUrl mode="aspectFit"></image>
		<view class="goods-info">
			<view class="goods-title">
				{{title}}
			</view>
			<view class="goods-price">
				￥{{price}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "GoodItem",
		props: {
			mainUrl: String,
			title: String,
			price: String
		},
		data() {
			return {

			};
		}
	}
</script>

<style scoped>
	.goods-item-container {
		box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
	}

	.goods-img {
		height: 300rpx;
		width: 100%;
	}

	.goods-info {
		padding: 20rpx;
		margin-top: -30rpx;
	}

	.goods-title {
		color: #272727;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		word-break: break-all;
		overflow: hidden;
	}

	.goods-price {
		color: #df4a36;
		font-size: 35rpx;
	}
</style>
