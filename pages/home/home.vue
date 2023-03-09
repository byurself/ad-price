<template>
	<view>
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
		<swiper class="goods-swiper" :style="{height: swiperHeight + 'px' }" :current="swiperCurrent"
			@change="transition">
			<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
				<view :id="'goods-box' + index" class="goods-box">
					<GoodItem v-for="item in itemList" :item="item" @click.native="gotoDetail(item)"></GoodItem>
				</view>
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
						image_src: 'https://guanzhouguanggao.oss-cn-hangzhou.aliyuncs.com/%E8%BD%AE%E6%92%AD%E5%9B%BE/swiper1.jpg'
					},
					{
						image_src: 'https://guanzhouguanggao.oss-cn-hangzhou.aliyuncs.com/%E8%BD%AE%E6%92%AD%E5%9B%BE/swiper2.jpg'
					},
					{
						image_src: 'https://guanzhouguanggao.oss-cn-hangzhou.aliyuncs.com/%E8%BD%AE%E6%92%AD%E5%9B%BE/swiper3.jpg'
					},
					{
						image_src: 'https://guanzhouguanggao.oss-cn-hangzhou.aliyuncs.com/%E8%BD%AE%E6%92%AD%E5%9B%BE/swiper4.jpg'
					},
					{
						image_src: 'https://guanzhouguanggao.oss-cn-hangzhou.aliyuncs.com/%E8%BD%AE%E6%92%AD%E5%9B%BE/swiper5.jpg'
					}
				],

				// 分类标签数据列表
				swiperCurrent: 0,
				swiperHeight: 0,
				current: 0,
				list: [
					{
						name: '五米高清喷绘',
						url: 'gaoqingpenhui'
					},
					{
						name: '室内写真',
						url: 'shineixiezhen'
					},
					{
						name: '户外写真',
						url: 'huwaixiezhen'
					},
					{
						name: '平板UV雕刻',
						url: 'pinbanuvdiaoke'
					},
					{
						name: '高清卷材UV',
						url: 'gaoqingjuancai'
					},
					{
						name: '亚克力水晶字制作',
						url: 'yakelishuijinzizhizuo'
					},
					{
						name: '亚克力水晶字加雪弗板字制作',
						url: 'yakelishuijizijiaxuefubanzizhizuo'
					},
					{
						name: '雪弗板字制作',
						url: 'xuefubanzizhizuo'
					},
					{
						name: '卡布灯箱',
						url: 'kabudengxiang'
					},
					{
						name: '单双层卡槽',
						url: 'danshuangcengkacaozhizuo'
					},
					{
						name: '墙纸材料',
						url: 'qiangzhicailiao'
					}
				],
				itemList: [],
				goodsList: [],
				index: 0
			};
		},
		async onLoad() {
			await this.getItemList('/gaoqingpenhui/list')
			this.$nextTick(() => {
				this.handlerSwiperHeight()
			})
		},
		watch: {
			async current(newVal, oldVal) {
				this.index = newVal
				if (this.goodsList[newVal] == undefined) {
					let url = '/' + this.list[newVal].url + '/list'
					await this.getItemList(url)
				} else {
					this.itemList = this.goodsList[newVal]
				}
				this.$nextTick(() => {
					this.handlerSwiperHeight()
				})
			}
		},
		methods: {
			handlerSwiperHeight() {
				let query = uni.createSelectorQuery().in(this);
				query.select('#goods-box' + this.current).boundingClientRect();
				query.exec(res => {
					if (res && res[0]) {
						this.swiperHeight = res[0].height;
					}
				})

			},
			async getItemList(url) {
				const {
					data: res
				} = await uni.$http.get(url)
				if (res.code !== 200) return uni.$showMsg()
				this.itemList = res.data
				this.goodsList[this.index] = this.itemList
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
			},

			// 查看商品详情
			gotoDetail(item) {
				let url = this.list[this.index].url
				uni.navigateTo({
					url: '/pages/goods_detail/goods_detail?id=' + item.id + '&url=' + url
				})
			}

		},
		// 下拉刷新
		onPullDownRefresh() {
			this.goodsList = []
			let url = '/' + this.list[this.index].url + '/list'
			this.getItemList(url)
		}
	}
</script>

<style>
	page {
		height: 100%;
	}
</style>

<style lang="scss">
	// 轮播图
	swiper {

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-box {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20rpx;
		padding: 20rpx;
	}

	.goods-swiper {
		height: 100%;
		padding: 20rpx 0 0;
	}
</style>
