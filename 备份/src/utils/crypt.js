import cryptoJs from 'crypto-js'

// 生成guid()
function newGuid() {
  return 'xxxxxxxx-xxxx-yxxx-yxxx-xyxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// aes加密
function aesEncrypt(word, keyVal) {
  var key = cryptoJs.enc.Utf8.parse(keyVal)
  var srcs = cryptoJs.enc.Utf8.parse(word)
  var encrypted = cryptoJs.AES.encrypt(srcs, key, {
    mode: cryptoJs.mode.ECB,
    padding: cryptoJs.pad.Pkcs7
  })
  return encrypted.toString()
}

// aes解密
// function aesDecrypt(word, keyVal) {
//   var key = cryptoJs.enc.Utf8.parse(keyVal)
//   var decrypt = cryptoJs.AES.decrypt(word, key, {
//     mode: cryptoJs.mode.ECB,
//     padding: cryptoJs.pad.Pkcs7
//   })
//   return cryptoJs.enc.Utf8.stringify(decrypt).toString()
// }

export default {
  newGuid,
  aesEncrypt
}
