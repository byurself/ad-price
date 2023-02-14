module.exports = {
	devServer: {
		disableHostCheck: true,
		proxy: {
			'/api': {
				target: "https://www.guanzhouguanggao.cn",
				changeOrigin: true,
			},
		},
		headers:{
			"Access-Control-Allow-Origin": "*"
		}
	}
}
