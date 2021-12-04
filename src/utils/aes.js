import CryptoJS from 'crypto-js'

// 加密
export function jsEncrypt(word, key, iv) {
  var keyParse = CryptoJS.enc.Utf8.parse(key || '3d4ab4b0bb42dd54')
  var ivParse = CryptoJS.enc.Utf8.parse(iv || '262ef81aafa7a095')
  var srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, keyParse, {
    iv: ivParse,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
// 解密
export function jsDecrypt(word, key, iv) {
  var newkey = CryptoJS.enc.Utf8.parse(key || '3d4ab4b0bb42dd54')
  var newiv = CryptoJS.enc.Utf8.parse(iv || '262ef81aafa7a095')
  var decrypt = CryptoJS.AES.decrypt(word, newkey, {
    iv: newiv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}
