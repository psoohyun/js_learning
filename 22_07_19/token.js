var CaverExtKAS = require("caver-js-ext-kas")
var caver = new CaverExtKAS()

var accesskey = "KASK63YTAS4DB520FO9TA5GY"
var secretaccesskey = "zrmpG4ihE0I55KaK8vN3uKGBptFyrtdzNKy8dgHf"
var chainId = 1001 //test net, 8217번이 메인넷
caver.initKASAPI(chainId, accesskey, secretaccesskey)  // KAS 초기화

var keyringContainer = new caver.keyringContainer()
var keyring = keyringContainer.keyring.createFromPrivateKey("0x93484adbb925d40925602f290e06b20ce99c703dddc116913dfd2364f6857b4b")
keyringContainer.add(keyring)    // 새로운 월렛 추가(KAS 지갑주소가 아닌 외부의 지갑 주소를 등록)

async function create_token(){
    var kip7 = await caver.kct.kip7.deploy({
        name : "ourmemory2",     // 토큰의 이름
        symbol : "OM2",          // 토큰의 심볼
        decimals : 0,            // 토큰 소수점자리
        initialSupply : 1000000  // 토큰 발행량
    }, keyring.address, keyringContainer)
    console.log(kip7._address)
}
create_token()