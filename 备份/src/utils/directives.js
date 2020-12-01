/**
 * description:  弹窗拖拽/横向菜单富导航重置定位
 * author: liyanm
 * createdDate: 2020-2-28
*/

import Vue from 'vue';

// v-dialogDrag: 弹窗拖拽
Vue.directive('dialogDrag', {

    bind(el, binding, vnode, oldVnode) {

        const dialogHeaderEl = el.querySelector('.el-dialog__header')
        const dragDom = el.querySelector('.el-dialog')
        dialogHeaderEl.style.cssText += ';cursor:move;'
        dragDom.style.cssText += ';top:0px;'
        vnode.elm.childNodes[0].dataset.totoHeight = 0

        Vue.nextTick(() => {
            const bodyHight = document.body.clientHeight
            if (vnode.elm.childNodes[0].clientHeight !== 0 && vnode.elm.childNodes[0].dataset.totoHeight !== 0 && vnode.elm.childNodes[0].clientHeight > vnode.elm.childNodes[0].dataset.totoHeight) {
                if (bodyHight > (vnode.elm.childNodes[0].clientHeight)) {
                    el.querySelector('.el-dialog').style.marginTop = ((bodyHight - (vnode.elm.childNodes[0].clientHeight)) / 2) + 'px'
                } else {
                    el.querySelector('.el-dialog').style.marginTop = 5 + 'px'
                }
                vnode.elm.childNodes[0].dataset.totoHeight = vnode.elm.childNodes[0].clientHeight
            }

        })

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const getStyle = (function () {
            if (window.document.currentStyle) {
                return (dom, attr) => dom.currentStyle[attr]
            } else {
                return (dom, attr) => getComputedStyle(dom, false)[attr]
            }
        })()




        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft
            const disY = e.clientY - dialogHeaderEl.offsetTop

            const dragDomWidth = dragDom.offsetWidth
            const dragDomHeight = dragDom.offsetHeight

            const screenWidth = document.body.clientWidth
            const screenHeight = document.body.clientHeight

            const minDragDomLeft = dragDom.offsetLeft
            const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

            const minDragDomTop = dragDom.offsetTop
            const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight

            // 获取到的值带px 正则匹配替换
            let styL = getStyle(dragDom, 'left')
            let styT = getStyle(dragDom, 'top')

            if (styL.includes('%')) {
                styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
                styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
            } else {
                styL = +styL.replace(/\px/g, '')
                styT = +styT.replace(/\px/g, '')
            }

            document.onmousemove = function (e) {
                let top = e.clientY - disY
                if (dragDomHeight < screenHeight) {
                    // 边界处理
                    if (-(top) > minDragDomTop) {
                        top = -minDragDomTop
                    } else if (top > maxDragDomTop) {
                        top = maxDragDomTop
                    }
                }
                // 通过事件委托，计算移动的距离
                let left = e.clientX - disX

                // 边界处理
                if (-(left) > minDragDomLeft) {
                    left = -minDragDomLeft
                } else if (left > maxDragDomLeft) {
                    left = maxDragDomLeft
                }

                // 移动当前元素
                dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`

                // emit onDrag event
                vnode.child.$emit('dragDialog')
            }

            document.onmouseup = function (e) {
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    },
    componentUpdated(el, binding, vnode, oldVnode) {

        Vue.nextTick(() => {
            const bodyHight = document.body.clientHeight
            Vue.nextTick(() => {
                if (vnode.elm.childNodes[0].clientHeight !== 0 && vnode.elm.childNodes[0].dataset.totoHeight !== 0 && vnode.elm.childNodes[0].clientHeight > vnode.elm.childNodes[0].dataset.totoHeight) {
                    if (bodyHight > (vnode.elm.childNodes[0].clientHeight)) {
                        el.querySelector('.el-dialog').style.marginTop = ((bodyHight - (vnode.elm.childNodes[0].clientHeight)) / 2) + 'px'
                    } else {
                        el.querySelector('.el-dialog').style.marginTop = 5 + 'px'
                    }
                    vnode.elm.childNodes[0].dataset.totoHeight = vnode.elm.childNodes[0].clientHeight
                }
            })
        })

    }
})
// v-siderBarHeight: 横向菜单富导航重置定位
Vue.directive('siderBarHeight', {

    bind(el, binding, vnode, oldVnode) {
        Vue.nextTick(() => {

            if (vnode.context.item !== undefined) {
                if (vnode.context.item.IdType === 0) {
                    vnode.elm.parentNode.parentElement.dataset.name = 'resectTop'
                    vnode.elm.parentNode.parentElement.dataset.idMenu = vnode.context.item.menuId

                }
            }
        })
    },
    inserted(el, binding, vnode, oldVnode) {
        Vue.nextTick(() => {
            if (vnode.context.item !== undefined) {
                if (vnode.context.item.IdType === 0) {
                    if (vnode.context.menuStyle.isHorizontal) {
                        vnode.context.$el.lastChild.lastChild.style.marginLeft = -(vnode.context.$el.offsetWidth + 6) + 'px'

                    }
                }
            }
        })
    },
    componentUpdated(el, binding, vnode, oldVnode) {
        // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
        Vue.nextTick(() => {
            if (vnode.context.item !== undefined) {
                if (vnode.context.item.IdType === 0) {
                    const secondMenu = document.querySelectorAll(
                        "div[data-id-menu='" + vnode.context.item.menuId + "']"
                    );
                    if (vnode.context.menuStyle.isHorizontal) {
                        secondMenu[0].style.marginLeft = -(vnode.context.$el.offsetWidth + 6) + 'px'
                    } else {
                        secondMenu[0].style.marginLeft = 0 + 'px'

                    }
                }
            }
        })
    }
})
