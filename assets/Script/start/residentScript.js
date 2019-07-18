cc.Class({
	extends: cc.Component,
	properties: {
		bgMusic: {
			default: null,
			type: cc.AudioClip,
		},
	},
	onLoad() {
		cc.game.addPersistRootNode(this.node);
		this.isnew = 0;
		// 是否付费
		this.paid = 0;
		// 是否在游戏中
		this.playing = 0;
		// 复活
		this.resurgence = 0;
		// 玩家列表
		this.userList = [];
		// 进入的列表
		this.joinList = [];
		// 展示付费金额
		this.fee = 0;
		//离开定时器
		this.leaveTimer = null;
		// 玩家信息
		this.player1 = {};
		this.player2 = {};
		this.player3 = {};
		this.player4 = {};
		this.player1Score = {
			once: 0,	//接到的数量
			sum: 0,		//提交的金额
			coin: 0,
			yb: 0,
			silver: 0
		};
		this.player2Score = {
			once: 0,
			sum: 0,
			coin: 0,
			yb: 0,
			silver: 0
		};
		this.player3Score = {
			once: 0,
			sum: 0,
			coin: 0,
			yb: 0,
			silver: 0
		};
		this.player4Score = {
			once: 0,
			sum: 0,
			coin: 0,
			yb: 0,
			silver: 0
		};
		this.roomId = this.getUrlParam('rid');
		this.pttoken = this.getUrlParam('pttoken');
		// 判断链接
		if(window.location.href.indexOf('ceshi') != -1) {
			this.host = "http://ceshi.putaohudong.com/api/coin/";
			this.wsURL = "ws://ceshi.putaohudong.com:8088/wscoin?rid=" + this.roomId + "&pttoken=" + this.pttoken;
		} else if(window.location.href.indexOf('test') != -1) {
			this.host = "http://test.putaohudong.com/api/coin/";
			this.wsURL = "ws://test.putaohudong.com:8088/wscoin?+rid=" + this.roomId + "&pttoken=" + this.pttoken;
		} else {
			this.host = "http://games.putaohudong.com/api/coin/";
			this.wsURL = "ws://games.putaohudong.com:8088/wscoin?+rid=" + this.roomId + "&pttoken=" + this.pttoken;
		}
	},
	start() {
		cc.audioEngine.play(this.bgMusic, false, 1);
		this.kmWs();
		this.LinkWS(this);
	},
	// 处理ajax接口
	dealHost(name) {
		var baseUrl = this.host + name + "?rid=" + this.roomId + "&pttoken=" + this.pttoken;
		return baseUrl;
	},
	LinkWS(obj) {
		var webSocket = new WebSocket(obj.wsURL);
		let wsinterval = false;
		webSocket.onopen = function(event) {
			console.log('撒币大行动链接打开');
		};
		//收到消息进行处理
		webSocket.onmessage = function(val) {
			// 重设时间
			clearTimeout(obj.leaveTimer);
			obj.leaveTimer = setTimeout(()=>{
				obj.fenPinEndGame();
			},16000);
			var data = JSON.parse(val.data);
			if(data.action == "open") {
				console.log('openWS!');
				wsinterval = setInterval(function() {
					webSocket.send('{"action":"heart","data":{"time":"' + Math.round(new Date()) + '"}}');
				}, 10000);
			}
			if(data.action == "enter") {
				obj.enterList(data.data);
			}
			if(data.action == "start") {
				obj.startGame(data.data);
			}
			if(data.action == "users") {
				obj.everyOne(data.data);
			}
			if (data.action == 'peng') {//碰撞返回 不储存
				cc.find('resident').emit('showPeng',data.data);
			}
			if(data.action == "leave") {
				obj.removePlayer(data.data);
			}
			if(data.action == "got") {
				cc.find('resident').emit('goEnd',data.data);
			}
			if(data.action == 'userpay') {
				cc.find('resident').emit('moveToAgain',data.data);
			}
		};
		webSocket.onclose = function() {
			console.log("撒币大行动链接关闭");
		};
		cc.find('resident').on('upCoin', function(obj) {
			webSocket.send('{"action":"coin","pttoken":"' + cc.find('resident').getComponent('residentScript').pttoken +
				'","rid":"' + cc.find('resident').getComponent('residentScript').roomId +
				'","data":{"coin":"' + obj.score +
				'","openid":"' + obj.id +
				'"}}');
		});
		cc.find('resident').on('upAttack', function(data) {
			webSocket.send('{"action":"attack","pttoken":"' + cc.find('resident').getComponent('residentScript').pttoken +
				'","rid":"' + cc.find('resident').getComponent('residentScript').roomId +
				'","data":{"coin":"' + 25 +
				'","openid":"' + data +
				'"}}');
		});
		cc.find('resident').on('upAnimals', function(data) {
			webSocket.send('{"action":"animals","pttoken":"' + cc.find('resident').getComponent('residentScript').pttoken +
				'","rid":"' + cc.find('resident').getComponent('residentScript').roomId +
				'","data":'+ JSON.stringify(data) + '}');
		});
	},
	// 加入头像显示
	enterList(data) {
		data.openid = data.user.openid;
		data.avatar = data.user.avatar;
		data.nickname = data.user.nickname;
		if(this.joinList.length == 0) {
			this.joinList.push(data);
		}
		var bol = false;
		for(let i = 0; i < this.joinList.length; i++) {
			if(data.openid == this.joinList[i].openid) {
				bol = true;
				this.joinList[i] = data;
			}
		}
		if(!bol) {
			this.joinList.push(data);
		}
		cc.find('resident').emit('homeHeadShow', this.joinList);
	},
	// 控制开始游戏
	startGame(data) {
		// 先收到start
		data.tool = data.t;
		if(this.userList.length == 0) {
			this.userList.push(data);
		}
		// 判断数组中有没有此用户
		let bol = true;
		for(let i = 0; i < this.userList.length; i++) {
			if(data.user.openid == this.userList[i].user.openid) {
				bol = false;
			}
		}
		if(bol) {
			this.userList.push(data);
		}
		cc.find('resident').emit('startGame', data);
	},
	// 玩家的位置信息 (替换属性)收到users前 必收到start
	everyOne(data) {
		// 不可能为空
		for(let j = 0; j < this.userList.length; j++) {
			for(let i = 0; i < data.length; i++) {
				//对用户进行更新
				if(data[i].user.openid == this.userList[j].user.openid) {
					this.userList[j].x = data[i].x;
					this.userList[j].y = data[i].y;
					this.userList[j].n = data[i].n;
					this.userList[j].t = data[i].t;
					this.userList[j].ck = data[i].ck;
				}
			}
		}
		switch(this.userList.length) {
			case 1:
				this.player1 = this.userList[0];
				break;
			case 2:
				this.player2 = this.userList[1];
				break;
			case 3:
				this.player3 = this.userList[2];
				break;
			case 4:
				this.player4 = this.userList[3];
				break;
			default:
				break;
		}
		cc.find('resident').emit('usersAdv', this.userList);
	},
	// 删除玩家
	removePlayer(data) {
		// 删除操作
		for(let i = 0; i < this.userList.length; i++) {
			if(data.openid == this.userList[i].user.openid) {
				this.userList.splice(i, 1); 
				cc.find('resident').emit('userLeave', this.userList);
			} 
		}
	},
	// 连接分屏
	kmWs() {
		let barcode = "";
		startGameToScreen();
		window.addEventListener("message", function(e) {
			var data = JSON.parse(e.data)
			var source = e.source
			/*请求绑定码回调*/
			if(data["cmdid"] == "cb_getBarcode") {
				barcode = data["data"]["barcode"];
			}
			if(data["cmdid"] == "notifyBarcodeChange") {
				barcode = data["data"]["barcode"];
			}
			if(data["cmdid"] == "cb_keepAlive") {
				console.log('收到KM心跳响应');
			}
		})
		function startGameToScreen(){
			window.parent.postMessage(JSON.stringify({
				"cmdid" : "setArea",
				"sessionid" : "",
				"data" : {
					'area' : '0,0,1280,720',
					'mvarea' : '0,96,900,528',
				},
			}), '*');
		}
		function sendKeepAlive() {
			window.parent.postMessage(JSON.stringify({
				"cmdid": "keepAlive",
				"sessionid": "",
				"data": {}
			}), '*');
		}
		//定时发送keepalive
		setInterval(() => {
			sendKeepAlive();
		}, 3000);
	},
	// 对获取的到的用户列表进行操作
	getPacketText() {
		var str = '';
		if(this.isnew == 0) {
			str = '财神的聚宝盆红包';
		} else {
			// 红包发送者信息
			str = '的聚宝盆红包';
		}
		return str;
	},
	// 保留两位小数
	toDecimal2(x) {
		var f = Math.round(x * 100) / 100;
		var s = f.toString();
		var rs = s.indexOf('.');
		if(rs < 0) {
			rs = s.length;
			s += '.';
		}
		while(s.length <= rs + 2) {
			s += '0';
		}
		return s.toFixed(2);
	},
	// 获取url的键名
	getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if(r != null) return unescape(r[2]);
		return null; //返回参数值
	},
	// 生成二维码
	changeQRcode(url, node) {
		var qrcode = new QRCode(-1, QRErrorCorrectLevel.H);
		qrcode.addData(url);
		qrcode.make();
		var ctx = node.addComponent(cc.Graphics);
		var tileW = node.width / qrcode.getModuleCount();
		var tileH = node.height / qrcode.getModuleCount();

		// draw in the Graphics
		for(var row = 0; row < qrcode.getModuleCount(); row++) {
			for(var col = 0; col < qrcode.getModuleCount(); col++) {
				// ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
				if(qrcode.isDark(row, col)) {
					ctx.fillColor = cc.Color.BLACK;
				} else {
					ctx.fillColor = cc.Color.WHITE;
				}
				var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
				var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
				ctx.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
				ctx.fill();
			}
		}
	},
	fenPinEndGame() {
		window.parent.postMessage(JSON.stringify({
			"cmdid": "stopGame",
			"sessionid": "",
			"data": {}
		}), '*');
	}
});