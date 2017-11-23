import common from './common'
/**
 * @apply dom操作
 * @reference http://youmightnotneedjquery.com/
 */
function getStyle (elem, key) {
  // 如果该属性存在于style[]中，则它最近被设置过(且就是当前的)
  if (elem.style[key]) {
    return elem.style[key]
  } else if (elem.currentStyle) { // 否则，尝试IE的方式
    return elem.currentStyle[key]
  } else if (document.defaultView && document.defaultView.getComputedStyle) { // 或者W3C的方法，如果存在的话
    // 它使用传统的"text-Align"风格的规则书写方式，而不是"textAlign"
    key = key.replace(/([A-Z])/g, '-$1')
    key = key.toLowerCase()
      // 获取style对象并取得属性的值(如果存在的话)
    var s = document.defaultView.getComputedStyle(elem, '')
    return s && s.getPropertyValue(key)
      // 否则，就是在使用其它的浏览器
  } else { return null }
}

function setStyle (elem, style) {
  Object.assign(elem.style, style)
}
/* 获取文本节点 */
function getInnerText (element) {
  return (typeof element.textContent === 'string') ? element.textContent : element.innerText
}

/* 设置文本节点 */
function setInnerText (element, text) {
  if (typeof element.textContent === 'string') {
    element.textContent = text
  } else {
    element.innerText = text
  }
}

function siblings (element) {
  var siblings = Array.prototype.slice.call(element.parentNode.children)
  for (var i = siblings.length; i--;) {
    if (siblings[i] === element) {
      siblings.splice(i, 1)
      break
    }
  }
  return siblings
}

function removeClass (el, className) {
  if (el.classList) { el.classList.remove(className) } else { el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ') }
}

function addClass (el, className) {
  if (el.classList) { el.classList.add(className) } else { el.className += ' ' + className }
}

function hasClass (el, className) {
  if (el.classList) { return el.classList.contains(className) } else { return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className) }
}

function before (el, reference) {
  el.parentNode.insertBefore(el, reference)
}

function after (newElement, targetElement) {
  var parent = targetElement.parentNode
  if (parent.lastChild === targetElement) {
    parent.appendChild(newElement)
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling)
  }
}

/**
 * 触发事件(暂时只支持鼠标事件)
 * @param eventName
 * @param el
 */
function trigger (eventName, el) {
  let e = document.createEvent('MouseEvent')
  e.initEvent(eventName, false, false)
  el.dispatchEvent(e)
}

/* next辅助函数（不导出） */
function nextElementSibling (el) {
  do { el = el.nextSibling } while (el && el.nodeType !== 1)
  return el
}

function next (el) {
  return el.nextElementSibling || nextElementSibling(el)
}

/* prev辅助函数（不导出） */
function previousElementSibling (el) {
  do { el = el.previousSibling } while (el && el.nodeType !== 1)
  return el
}

function prev (el) {
  return el.previousElementSibling || previousElementSibling(el)
}

function text (el) {
  return common.trim(el.textContent || el.innerText)
}

function parent (el) {
  return el.parentNode
}

export default {
  getStyle,
  setStyle,
  getInnerText,
  setInnerText,
  siblings,
  removeClass,
  addClass,
  hasClass,
  before,
  after,
  trigger,
  next,
  prev,
  text,
  parent
}
