<template>
	<view v-if="goods_info.name">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<image :src="item" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 价格 -->
			<view class="price">￥{{goods_info.price}}</view>
			<!-- 信息主体 -->
			<view class="goods-info-body">
				<view class="goods-name">{{goods_info.name}}</view>
				<view v-if="goods_info.guige" class="goods-guige">规格：{{goods_info.guige}}</view>
				<view v-if="goods_info.remark" class="goods-remark">备注：{{goods_info.remark}}</view>
				<view v-if="goods_info.scope" class="goods-scope">应用范围：</view>
				<view v-if="goods_info.scope" class="goods-scope-txt">{{goods_info.scope}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_info: {},
				path: '',
				swiperList: []
			};
		},
		onLoad(options) {
			const id = options.id
			this.path = options.url
			this.getGoodsDetail(id)
		},
		methods: {
			async getGoodsDetail(id) {
				let url = '/' + this.path + '/getInfo/' + id
				const {
					data: data
				} = await uni.$http.get(url)
				if (data.code !== 200) return uni.$showMsg()
				this.goods_info = data.data

				let index = 0;
				this.swiperList[index++] = this.goods_info.mainUrl
				if (this.goods_info.url1 != null) this.swiperList[index++] = this.goods_info.url1
				if (this.goods_info.url2 != null) this.swiperList[index++] = this.goods_info.url2
				if (this.goods_info.url3 != null) this.swiperList[index++] = this.goods_info.url3
				if (this.goods_info.url4 != null) this.swiperList[index++] = this.goods_info.url4
				if (this.goods_info.url5 != null) this.swiperList[index++] = this.goods_info.url5
			},
			preview(i) {
				uni.previewImage({
					current: i,
					urls: this.swiperList
				})
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	// 商品信息区域的样式
	.goods-info-box {
		padding: 10rpx;
		padding-right: 0;

		.price {
			color: #df4a36;
			font-size: 42rpx;
			margin: 10rpx 0;
		}

		.goods-info-body {
			.goods-name {
				font-size: 36rpx;
				font-weight: bold;
			}
			.goods-guige{
				color: #5b5b5b;
				padding: 10rpx 0;
			}
			.goods-remark{
				padding: 10rpx 0;
			}
			.goods-scope{
				font-weight: 500;
				padding: 10rpx 0;
			}
			.goods-scope-txt{
				line-height: 1.5;
			}
		}
	}
</style>
