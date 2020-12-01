import Cookies from 'js-cookie'

const TokenKey = 'token'
const OrgInfoKey = 'orgInfo'
const LangKey = 'wadapp.current.curlang'
const CurTokenKey = 'wadapp.current.token'
const CurUserKey = 'wadapp.current.user'
const SecondaryVerification = 'secondaryVerification'
const mpPlatformDir = 'mpplatform' // 兼容MP2平台，写入Cookie
const pwdIsRuleKey = 'pwRKey'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  // Cookies.set(TokenKey, token, { path: '/' + mpPlatformDir })
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  // Cookies.remove(TokenKey, { path: '/' + mpPlatformDir })
  return Cookies.remove(TokenKey)
}

export function getLang() {
  return Cookies.get(LangKey)
}

export function setLang(lang) {
  Cookies.set(LangKey, lang, { path: '/' + mpPlatformDir })
  return Cookies.set(LangKey, lang)
}

export function removeLang() {
  Cookies.remove(LangKey, { path: '/' + mpPlatformDir })
  return Cookies.remove(LangKey)
}

export function getCurToken() {
  return Cookies.get(CurTokenKey)
}

export function setCurToken(curToken) {
  Cookies.set(CurTokenKey, curToken, { path: '/' + mpPlatformDir })
  return Cookies.set(CurTokenKey, curToken)
}

export function removeCurToken() {
  Cookies.remove(CurTokenKey, { path: '/' + mpPlatformDir })
  return Cookies.remove(CurTokenKey)
}

export function getCurUser() {
  return Cookies.get(CurUserKey + '$' + window.location.host)
}

export function setCurUser(curUser) {
  Cookies.set(CurUserKey + '$' + window.location.host, curUser, { path: '/' + mpPlatformDir })
  return Cookies.set(CurUserKey + '$' + window.location.host, curUser, { path: '/' })
}

export function removeCurUser() {
  Cookies.remove(CurUserKey + '$' + window.location.host, { path: '/' + mpPlatformDir })
  return Cookies.remove(CurUserKey + '$' + window.location.host, { path: '/' })
}

export function getOrgInfoCookie() {
  var info = Cookies.get(OrgInfoKey)
  return info || ''
}

export function setOrgInfoCookie(orgInfo) {
  return Cookies.set(OrgInfoKey, orgInfo)
}

export function removeOrgInfoCookie() {
  return Cookies.remove(OrgInfoKey)
}

export function getSecondaryVerification() {
  var info = Cookies.get(SecondaryVerification)
  return info || ''
}

export function setSecondaryVerification(isVerification) {
  return Cookies.set(SecondaryVerification, isVerification)
}

export function removeSecondaryVerification() {
  return Cookies.remove(SecondaryVerification)
}

export function getPwdIsRule() {
  var info = Cookies.get(pwdIsRuleKey)
  return info || '1'
}

export function setPwdIsRule(isRule) {
  return Cookies.set(pwdIsRuleKey, isRule)
}

export function removePwdIsRule() {
  return Cookies.remove(pwdIsRuleKey)
}
