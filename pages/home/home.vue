<template>
	<view class="home-container">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<!-- 循环渲染轮播图的 item 项 -->
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<view class="swiper-item">
					<!-- 动态绑定图片的 src 属性 -->
					<image :src="item.image_src"></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 分类标签 -->
		<u-sticky bgColor="#fff">
			<u-tabs :list="list" ref="uTabs" lineWidth="30" lineColor="#d74635" :activeStyle="{
				    color: '#d74635',
			        fontWeight: 'bold',
		            transform: 'scale(1.05)'
				}" :inactiveStyle="{
		            color: '#606266',
		            transform: 'scale(1)'
				}" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;" :current="current" @change="tabsChange">
			</u-tabs>
		</u-sticky>
		<swiper class="goods-swiper" :current="swiperCurrent" @change="transition">
			<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
				<scroll-view scroll-y style="width: 100%; height: 100%;" @scrolltolower="onreachBottom">
					<view class="goods-box">
						<GoodItem v-for="item in itemList" :mainUrl="item.mainUrl" :title="item.name"
							:price="item.price"></GoodItem>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图数据列表
				swiperList: [{
						// 单双层卡槽制作
						image_src: 'https://guanzhouguanggao.oss-cn-hangzhou.aliyuncs.com/%E5%8D%95%E5%8F%8C%E5%B1%82%E5%8D%A1%E6%A7%BD%E5%88%B6%E4%BD%9C/%E4%B8%BB%E5%9B%BE1.jpg'
					},
					{
						// 黑底布
						image_src: 'https://guanzhouguanggao.oss-cn-hangzhou.aliyuncs.com/%E9%AB%98%E6%B8%85%E5%96%B7%E7%BB%98/%E9%BB%91%E5%BA%95%E5%B8%83/%E4%B8%BB%E5%9B%BE1.jpg'
					},
					{
						// 油画布
						image_src: 'https://guanzhouguanggao.oss-cn-hangzhou.aliyuncs.com/%E9%AB%98%E6%B8%85%E5%96%B7%E7%BB%98/%E6%B2%B9%E7%94%BB%E5%B8%83/%E4%B8%BB%E5%9B%BE1.jpg'
					},
					{
						// 户外磨砂贴
						image_src: 'https://guanzhouguanggao.oss-cn-hangzhou.aliyuncs.com/%E6%88%B7%E5%A4%96%E5%86%99%E7%9C%9F/%E6%88%B7%E5%A4%96%E7%A3%A8%E7%A0%82%E8%B4%B4/%E8%AF%A6%E6%83%851.jpg'
					}
				],

				// 分类标签数据列表
				swiperCurrent: 0,
				current: 0,
				list: [{
						name: '单双层卡槽制作',
						url: 'danshuangcengkacaozhizuo'
					},
					{
						name: '覆板类',
						url: 'fubanlei'
					},
					{
						name: '高清卷材',
						url: 'gaoqingjuancai'
					},
					{
						name: '高清喷绘',
						url: 'gaoqingpenhui'
					},
					{
						name: '户外写真',
						url: 'huwaixiezhen'
					},
					{
						name: '卡布灯箱',
						url: 'kabudengxiang'
					},
					{
						name: '平板UV雕刻',
						url: 'pinbanuvdiaoke'
					},
					{
						name: '墙纸材料',
						url: 'qiangzhicailiao'
					},
					{
						name: '室内写真',
						url: 'shineixiezhen'
					},
					{
						name: '五米喷绘',
						url: 'wumipenhui'
					},
					{
						name: '雪弗板字制作',
						url: 'xuefubanzizhizuo'
					},
					{
						name: '亚克力水晶字制作',
						url: 'yakelishuijinzizhizuo'
					},
					{
						name: '亚克力水晶字加雪弗板字制作',
						url: 'yakelishuijizijiaxuefubanzizhizuo'
					}
				],
				itemList: [],
				goodsList: []
			};
		},
		onLoad() {
			this.getItemList('/danshuangcengkacaozhizuo/list', 0)
		},
		watch: {
			current(newVal, oldVal) {
				if (this.goodsList[newVal] == undefined) {
					let url = '/' + this.list[newVal].url + '/list'
					this.getItemList(url, newVal)
				} else {
					this.itemList = this.goodsList[newVal]
				}
			}
		},
		methods: {
			async getItemList(url, index) {				
				const {
					data: res
				} = await uni.$http.get(url)
				if (res.code !== 200) return uni.$showMsg()
				this.itemList = res.data
				this.goodsList[index] = this.itemList
				console.log(this.goodsList)
			},

			// tabs通知swiper切换
			tabsChange(e) {
				// let index = e.index;
				this.swiperCurrent = e.index
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				this.current = e.detail.current
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				// console.log(11111111111)
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
	}
</style>

<style lang="scss">
	.home-container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	// 轮播图
	swiper {

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.goods-box {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20rpx;
		padding: 20rpx;
	}

	.goods-swiper {
		flex: 1;
		height: 100%;
		padding: 20rpx 0 0;
	}
</style>
