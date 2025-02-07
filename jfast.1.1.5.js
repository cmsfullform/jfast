(function() {
    // Polyfill cho Set nếu cần (dành cho trình duyệt cũ)
    if (typeof Set !== 'function') {
        window.Set = function() {
            this.items = [];
        };
        Set.prototype.add = function(item) {
            if (this.items.indexOf(item) === -1) {
                this.items.push(item);
            }
            return this;
        };
        Set.prototype.has = function(item) {
            return this.items.indexOf(item) !== -1;
        };
        Set.prototype.delete = function(item) {
            var index = this.items.indexOf(item);
            if (index !== -1) {
                this.items.splice(index, 1);
                return true;
            }
            return false;
        };
        Set.prototype.clear = function() {
            this.items = [];
        };
        Object.defineProperty(Set.prototype, 'size', {
            get: function() {
                return this.items.length;
            }
        });
        Set.prototype.forEach = function(callback, thisArg) {
            for (var i = 0; i < this.items.length; i++) {
                callback.call(thisArg, this.items[i], this.items[i], this);
            }
        };
        console.warn('Polyfill Set has been applied. Some methods may not be fully supported yet.');
    }

    // Polyfill cho NodeList.prototype.forEach nếu cần
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }
})();

(function(global) {
    'use strict';

    /**
     * jFast constructor – cho phép khởi tạo dưới dạng jFast(selector) hoặc new jFast(selector)
     */
    var jFast = function(selector) {
        if (!(this instanceof jFast)) {
            return new jFast(selector);
        }
    
        if (!selector) {
            this.elements = [];
        } else if (typeof selector === 'string') {
            this.elements = document.querySelectorAll(selector);
        } else if (selector instanceof NodeList || Array.isArray(selector)) {
            this.elements = selector;
        } else if (selector instanceof HTMLElement || selector === window || selector === document) {
            this.elements = [selector];
        } else if (typeof selector === 'function') {
            // Document ready
            if (document.readyState === 'complete' || document.readyState !== 'loading') {
                selector();
            } else {
                document.addEventListener('DOMContentLoaded', selector);
            }
            this.elements = [];
        } else {
            this.elements = [];
        }
    };

    // Method hỗ trợ lặp qua các phần tử (chainable)
    jFast.prototype.each = function(callback) {
        Array.prototype.forEach.call(this.elements, callback);
        return this;
    };

    // ============================
    //  CSS & Attributes Functions
    // ============================
    jFast.prototype.addClass = function(className) {
        const classes = className.split(' ');
        return this.each(element => element.classList.add(...classes));
    };
    
    jFast.prototype.removeClass = function(className) {
        const classes = className.split(' ');
        return this.each(element => element.classList.remove(...classes));
    };

    jFast.prototype.toggleClass = function(className, state) {
        const classes = className.split(' ');
        return this.each(element => {
            classes.forEach(cls => {
                if (typeof state === 'boolean') {
                    element.classList.toggle(cls, state);
                } else {
                    element.classList.toggle(cls);
                }
            });
        });
    };

    jFast.prototype.hasClass = function(className) {
        return Array.prototype.some.call(this.elements, element => element.classList.contains(className));
    };

    jFast.prototype.attr = function(name, value) {
        if (value === undefined) {
            return this.elements[0] ? this.elements[0].getAttribute(name) : undefined;
        } else {
            return this.each(element => element.setAttribute(name, value));
        }
    };

    jFast.prototype.removeAttr = function(name) {
        return this.each(element => element.removeAttribute(name));
    };

    jFast.prototype.text = function(value) {
        if (value === undefined) {
            return this.elements[0] ? this.elements[0].textContent : '';
        } else {
            return this.each(element => element.textContent = value);
        }
    };

    jFast.prototype.html = function(value) {
        if (value === undefined) {
            return this.elements[0] ? this.elements[0].innerHTML : '';
        } else {
            return this.each(element => element.innerHTML = value);
        }
    };

    jFast.prototype.data = function(key, value) {
        if (value === undefined) {
            return this.elements[0] ? (this.elements[0].dataset[key] || this.elements[0].getAttribute('data-' + key)) : undefined;
        } else {
            return this.each(element => element.dataset[key] = value);
        }
    };

    jFast.prototype.css = function(property, value) {
        if (typeof property === 'string') {
            if (value === undefined) {
                return this.elements[0] ? getComputedStyle(this.elements[0])[property] : undefined;
            } else {
                return this.each(element => element.style[property] = value);
            }
        } else if (typeof property === 'object') {
            return this.each(element => {
                for (let prop in property) {
                    if (property.hasOwnProperty(prop)) {
                        element.style[prop] = property[prop];
                    }
                }
            });
        }
    };

    // ================================
    //  Xử lý DOM Manipulation
    // ================================
    jFast.prototype.before = function(content) {
        return this.each(element => {
            if (typeof content === 'string') {
                element.insertAdjacentHTML('beforebegin', content);
            } else if (content instanceof HTMLElement) {
                element.parentNode.insertBefore(content, element);
            } else if (content instanceof jFast || content instanceof NodeList || Array.isArray(content)) {
                Array.prototype.forEach.call(content.elements || content, child => {
                    element.parentNode.insertBefore(child, element);
                });
            }
        });
    };

    jFast.prototype.after = function(content) {
        return this.each(element => {
            if (typeof content === 'string') {
                element.insertAdjacentHTML('afterend', content);
            } else if (content instanceof HTMLElement) {
                element.parentNode.insertBefore(content, element.nextSibling);
            } else if (content instanceof jFast || content instanceof NodeList || Array.isArray(content)) {
                Array.prototype.forEach.call(content.elements || content, child => {
                    element.parentNode.insertBefore(child, element.nextSibling);
                });
            }
        });
    };

    jFast.prototype.append = function(content) {
        return this.each((element, index) => {
            if (typeof content === 'string') {
                element.insertAdjacentHTML('beforeend', content);
            } else if (content instanceof HTMLElement) {
                element.appendChild(index === 0 ? content : content.cloneNode(true));
            } else if (content instanceof jFast || content instanceof NodeList || Array.isArray(content)) {
                Array.prototype.forEach.call(content.elements || content, child => {
                    element.appendChild(index === 0 ? child : child.cloneNode(true));
                });
            }
        });
    };

    jFast.prototype.prepend = function(content) {
        return this.each((element, index) => {
            if (typeof content === 'string') {
                element.insertAdjacentHTML('afterbegin', content);
            } else if (content instanceof HTMLElement) {
                element.insertBefore(index === 0 ? content : content.cloneNode(true), element.firstChild);
            } else if (content instanceof jFast || content instanceof NodeList || Array.isArray(content)) {
                Array.prototype.forEach.call(content.elements || content, child => {
                    element.insertBefore(index === 0 ? child : child.cloneNode(true), element.firstChild);
                });
            }
        });
    };

    jFast.prototype.remove = function() {
        return this.each(element => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
    };

    jFast.prototype.empty = function() {
        return this.each(element => element.innerHTML = '');
    };

    // ================================
    //  Xử lý Dimensions & Position
    // ================================
    jFast.prototype.width = function(value) {
        if (value === undefined) {
            let elem = this.elements[0];
            return elem ? elem.getBoundingClientRect().width : undefined;
        } else {
            return this.each(element => element.style.width = typeof value === 'number' ? value + 'px' : value);
        }
    };

    jFast.prototype.height = function(value) {
        if (value === undefined) {
            let elem = this.elements[0];
            return elem ? elem.getBoundingClientRect().height : undefined;
        } else {
            return this.each(element => element.style.height = typeof value === 'number' ? value + 'px' : value);
        }
    };

    jFast.prototype.offset = function() {
        let elem = this.elements[0];
        if (!elem) return undefined;
        let rect = elem.getBoundingClientRect();
        return {
            top: rect.top + window.pageYOffset,
            left: rect.left + window.pageXOffset
        };
    };

    jFast.prototype.position = function() {
        let elem = this.elements[0];
        if (!elem) return undefined;
        return {
            top: elem.offsetTop,
            left: elem.offsetLeft
        };
    };

    jFast.prototype.scrollTop = function(value) {
        if (value === undefined) {
            let elem = this.elements[0];
            return elem ? elem.scrollTop : undefined;
        } else {
            return this.each(element => element.scrollTop = value);
        }
    };

    jFast.prototype.scrollLeft = function(value) {
        if (value === undefined) {
            let elem = this.elements[0];
            return elem ? elem.scrollLeft : undefined;
        } else {
            return this.each(element => element.scrollLeft = value);
        }
    };

    jFast.prototype.index = function(element) {
        if (!element) {
            let elem = this.elements[0];
            return (elem && elem.parentNode) ? Array.prototype.indexOf.call(elem.parentNode.children, elem) : -1;
        } else {
            return Array.prototype.indexOf.call(this.elements, element);
        }
    };

    jFast.prototype.eq = function(index) {
        return new jFast(this.elements[index] ? [this.elements[index]] : []);
    };

    jFast.prototype.first = function() {
        return this.eq(0);
    };

    jFast.prototype.last = function() {
        return this.eq(this.elements.length - 1);
    };

    // ================================
    //  Xử lý sự kiện
    // ================================

    // Sử dụng WeakMap để lưu trữ các event handler gắn với mỗi phần tử
    const eventHandlers = new WeakMap();

    // Hàm tiện ích kiểm tra selector với fallback cho IE cũ
    function matchesSelector(element, selector) {
        if (element && element.nodeType === 1) {
            return (element.matches || element.msMatchesSelector || element.webkitMatchesSelector).call(element, selector);
        }
        return false;
    }

    /**
     * .on(events, [selector], handler, [useCapture])
     * Hỗ trợ event delegation nếu truyền selector
     */
    jFast.prototype.on = function(events, selector, handler, useCapture) {
        if (typeof selector === 'function') {
            useCapture = handler;
            handler = selector;
            selector = null;
        }
        let eventList = events.split(/\s+/);
        return this.each(element => {
            eventList.forEach(event => {
                // Xây dựng key cho việc lưu trữ handler
                let key = event + (selector ? '_delegated' : '_direct');
                // Lấy danh sách handler đã lưu (nếu có)
                let handlers = eventHandlers.get(element) || {};
                // Tạo hàm listener chung
                let listener = function(e) {
                    if (selector) {
                        // Dùng closest để tìm phần tử phù hợp trong chuỗi tổ tiên của e.target
                        let delegateTarget = e.target.closest(selector);
                        if (delegateTarget && element.contains(delegateTarget)) {
                            // Cho phép truyền thêm data vào event (theo kiểu jQuery)
                            e.delegateTarget = delegateTarget;
                            handler.call(delegateTarget, e);
                        }
                    } else {
                        handler.call(element, e);
                    }
                };

                // Lưu lại handler để hỗ trợ off sau này
                if (!handlers[key]) {
                    handlers[key] = [];
                }
                handlers[key].push({ originalHandler: handler, listener: listener, useCapture: useCapture || false });
                eventHandlers.set(element, handlers);

                element.addEventListener(event, listener, useCapture || false);
            });
        });
    };

    /**
     * .one(events, [selector], handler)
     * Chỉ gọi handler một lần sau đó tự gỡ bỏ
     */
    jFast.prototype.one = function(events, selector, handler) {
        if (typeof selector === 'function') {
            handler = selector;
            selector = null;
        }
        let eventList = events.split(/\s+/);
        return this.each(element => {
            eventList.forEach(event => {
                const onceListener = function(e) {
                    if (selector) {
                        let delegateTarget = e.target.closest(selector);
                        if (delegateTarget && element.contains(delegateTarget)) {
                            e.delegateTarget = delegateTarget;
                            handler.call(delegateTarget, e);
                            element.removeEventListener(event, onceListener);
                        }
                    } else {
                        handler.call(element, e);
                        element.removeEventListener(event, onceListener);
                    }
                };
                element.addEventListener(event, onceListener, false);
            });
        });
    };

    /**
     * .off(events, [selector], [handler], [useCapture])
     */
    jFast.prototype.off = function(events, selector, handler, useCapture) {
        if (typeof selector === 'function') {
            useCapture = handler;
            handler = selector;
            selector = null;
        }
        let eventList = events.split(/\s+/);
        return this.each(element => {
            let handlers = eventHandlers.get(element);
            if (!handlers) return;
            eventList.forEach(event => {
                let key = event + (selector ? '_delegated' : '_direct');
                if (!handlers[key]) return;
                // Lặp qua các handler để tìm handler cần loại bỏ (nếu handler được cung cấp)
                for (let i = 0; i < handlers[key].length; i++) {
                    let hObj = handlers[key][i];
                    if (!handler || hObj.originalHandler === handler) {
                        element.removeEventListener(event, hObj.listener, hObj.useCapture);
                        handlers[key].splice(i, 1);
                        i--;
                    }
                }
                if (handlers[key].length === 0) {
                    delete handlers[key];
                }
            });
            // Nếu không còn handler nào gắn với phần tử thì xóa entry của phần tử
            if (Object.keys(handlers).length === 0) {
                eventHandlers.delete(element);
            } else {
                eventHandlers.set(element, handlers);
            }
        });
    };

    /**
     * .trigger(eventType, [detail])
     * Dùng CustomEvent để truyền thêm dữ liệu (detail) nếu cần
     */
    jFast.prototype.trigger = function(eventType, detail) {
        let evt;
        try {
            evt = new CustomEvent(eventType, { bubbles: true, cancelable: true, detail: detail });
        } catch (e) {
            // Fallback cho trình duyệt cũ
            evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(eventType, true, true, detail);
        }
        return this.each(element => element.dispatchEvent(evt));
    };

    // Các hàm tiện ích cho các event thông dụng (keydown, keyup, mouseover, …)
    ['click', 'change', 'keydown', 'keyup', 'keypress', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave'].forEach(eventName => {
        jFast.prototype[eventName] = function(handler) {
            if (typeof handler === 'function') {
                return this.on(eventName, handler);
            } else {
                return this.trigger(eventName);
            }
        };
    });

    // ================================
    //  Xử lý form: val, serialize, serializeArray, submit, prop
    // ================================
    jFast.prototype.val = function(value) {
        let elem = this.elements[0];
        if (value === undefined) {
            if (!elem) return undefined;
            if (elem.tagName === 'SELECT' && elem.multiple) {
                return Array.from(elem.options)
                    .filter(option => option.selected)
                    .map(option => option.value);
            } else if ((elem.type === 'checkbox' || elem.type === 'radio')) {
                return elem.checked ? elem.value : undefined;
            } else {
                return elem.value;
            }
        } else {
            return this.each(element => {
                if (element.tagName === 'SELECT' && element.multiple && Array.isArray(value)) {
                    Array.from(element.options).forEach(option => {
                        option.selected = value.indexOf(option.value) > -1;
                    });
                } else if ((element.type === 'checkbox' || element.type === 'radio')) {
                    if (typeof value === 'boolean') {
                        element.checked = value;
                    } else {
                        element.value = value;
                    }
                } else {
                    element.value = value;
                }
            });
        }
    };

    jFast.prototype.prop = function(name, value) {
        if (!name) {
            console.warn('jFast.prop: Property name is required.');
            return this;
        }
        if (value === undefined) {
            return this.elements[0] ? this.elements[0][name] : undefined;
        } else {
            return this.each(element => {
                if (typeof value === 'boolean') {
                    element[name] = value;
                } else {
                    element.setAttribute(name, value);
                }
            });
        }
    };

    jFast.prototype.serialize = function() {
        let form = this.elements[0];
        if (!form || form.tagName !== 'FORM') return '';
        let elements = form.elements, queryString = [];
        Array.from(elements).forEach(el => {
            if (!el.name || el.disabled || /^(file|reset|submit|button)$/i.test(el.type)) return;
            if (el.type === 'select-multiple') {
                Array.from(el.options).forEach(option => {
                    if (option.selected) {
                        queryString.push(encodeURIComponent(el.name) + '=' + encodeURIComponent(option.value));
                    }
                });
            } else if ((/^(checkbox|radio)$/i.test(el.type) && el.checked) || !/^(checkbox|radio)$/i.test(el.type)) {
                queryString.push(encodeURIComponent(el.name) + '=' + encodeURIComponent(el.value));
            }
        });
        return queryString.join('&');
    };

    jFast.prototype.serializeArray = function() {
        let form = this.elements[0];
        if (!form || form.tagName !== 'FORM') return [];
        let elements = form.elements, dataArray = [];
        Array.from(elements).forEach(el => {
            if (!el.name || el.disabled || /^(file|reset|submit|button)$/i.test(el.type)) return;
            if (el.type === 'select-multiple') {
                Array.from(el.options).forEach(option => {
                    if (option.selected) {
                        dataArray.push({ name: el.name, value: option.value });
                    }
                });
            } else if ((/^(checkbox|radio)$/i.test(el.type) && el.checked) || !/^(checkbox|radio)$/i.test(el.type)) {
                dataArray.push({ name: el.name, value: el.value });
            }
        });
        return dataArray;
    };

    jFast.prototype.submit = function() {
        return this.each(element => {
            let form;
            if (element.tagName === 'FORM') {
                form = element;
            } else if ((element.tagName === 'BUTTON' || element.tagName === 'INPUT') && element.type === 'submit') {
                form = element.closest('form');
            }
            if (form) {
                if (typeof form.requestSubmit === 'function') {
                    form.requestSubmit(element);
                } else {
                    let evt = document.createEvent('Event');
                    evt.initEvent('submit', true, true);
                    if (form.dispatchEvent(evt)) {
                        form.submit();
                    }
                }
            }
        });
    };

    // ================================
    //  DOM Traversal
    // ================================
    jFast.prototype.find = function(selector) {
        const foundElements = new Set();
        this.each(element => {
            element.querySelectorAll(selector).forEach(node => foundElements.add(node));
        });
        this.elements = Array.from(foundElements);
        return this;
    };

    jFast.prototype.closest = function(selector) {
        const matchedElements = [];
        this.each(element => {
            let closestElem = element.closest(selector);
            if (closestElem) {
                matchedElements.push(closestElem);
            }
        });
        this.elements = matchedElements;
        return this;
    };

    jFast.prototype.parent = function() {
        const parents = [];
        this.each(element => {
            if (element.parentNode) parents.push(element.parentNode);
        });
        this.elements = parents;
        return this;
    };

    jFast.prototype.parents = function() {
        const parents = [];
        this.each(element => {
            let parent = element.parentNode;
            while (parent) {
                parents.push(parent);
                parent = parent.parentNode;
            }
        });
        this.elements = parents;
        return this;
    };

    jFast.prototype.children = function() {
        let children = [];
        this.each(element => {
            children = children.concat(Array.from(element.children));
        });
        this.elements = children;
        return this;
    };

    jFast.prototype.next = function() {
        const nextElements = [];
        this.each(element => {
            if (element.nextElementSibling) nextElements.push(element.nextElementSibling);
        });
        this.elements = nextElements;
        return this;
    };

    jFast.prototype.prev = function() {
        const prevElements = [];
        this.each(element => {
            if (element.previousElementSibling) prevElements.push(element.previousElementSibling);
        });
        this.elements = prevElements;
        return this;
    };

    jFast.prototype.siblings = function() {
        const siblingsSet = new Set();
        this.each(element => {
            let parent = element.parentNode;
            if (!parent) return;
            Array.from(parent.children).forEach(sib => {
                if (sib !== element) siblingsSet.add(sib);
            });
        });
        this.elements = Array.from(siblingsSet);
        return this;
    };

    // ================================
    //  Hiệu ứng & Animation
    // ================================
    jFast.prototype.hide = function(duration) {
        if (duration) {
            return this.each(element => {
                element.style.transition = `opacity ${duration}ms`;
                element.style.opacity = 0;
                setTimeout(() => {
                    element.style.display = 'none';
                }, duration);
            });
        } else {
            return this.each(element => element.style.display = 'none');
        }
    };

    jFast.prototype.show = function(duration) {
        return this.each(element => {
            element.style.display = element.dataset.jFastDisplay || '';
            element.style.opacity = 0;
            if (duration) {
                element.style.transition = `opacity ${duration}ms`;
                setTimeout(() => element.style.opacity = 1, 10);
            } else {
                element.style.opacity = 1;
            }
        });
    };

    jFast.prototype.toggle = function(duration) {
        return this.each(element => {
            if (getComputedStyle(element).display === 'none') {
                $(element).show(duration);
            } else {
                $(element).hide(duration);
            }
        });
    };

    jFast.prototype.fadeIn = function(duration = 400) {
        return this.each(element => {
            element.style.opacity = 0;
            element.style.display = (getComputedStyle(element).display === 'none') ? '' : getComputedStyle(element).display;
            let last = +new Date();
            const tick = () => {
                let newOpacity = +element.style.opacity + (new Date() - last) / duration;
                element.style.opacity = newOpacity > 1 ? 1 : newOpacity;
                last = +new Date();
                if (+element.style.opacity < 1) {
                    (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
                } else {
                    element.style.opacity = '';
                }
            };
            tick();
        });
    };

    jFast.prototype.fadeOut = function(duration = 400) {
        return this.each(element => {
            element.style.opacity = 1;
            let last = +new Date();
            const tick = () => {
                let newOpacity = +element.style.opacity - (new Date() - last) / duration;
                element.style.opacity = newOpacity < 0 ? 0 : newOpacity;
                last = +new Date();
                if (+element.style.opacity > 0) {
                    (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
                } else {
                    element.style.opacity = '';
                    element.style.display = 'none';
                }
            };
            tick();
        });
    };

    jFast.prototype.slideUp = function(duration = 400) {
        return this.each(element => {
            const original = {
                height: element.style.height,
                paddingTop: element.style.paddingTop,
                paddingBottom: element.style.paddingBottom,
                marginTop: element.style.marginTop,
                marginBottom: element.style.marginBottom,
                overflow: element.style.overflow,
                transition: element.style.transition
            };
            element.style.height = element.offsetHeight + 'px';
            element.style.overflow = 'hidden';
            element.style.transition = `height ${duration}ms, padding ${duration}ms, margin ${duration}ms`;
            setTimeout(() => {
                element.style.height = '0';
                element.style.paddingTop = '0';
                element.style.paddingBottom = '0';
                element.style.marginTop = '0';
                element.style.marginBottom = '0';
            }, 10);
            setTimeout(() => {
                element.style.display = 'none';
                Object.assign(element.style, original);
            }, duration);
        });
    };

    jFast.prototype.slideDown = function(duration = 400) {
        return this.each(element => {
            if (getComputedStyle(element).display === 'none') {
                element.style.display = '';
            }
            const height = element.offsetHeight;
            const original = {
                height: element.style.height,
                paddingTop: element.style.paddingTop,
                paddingBottom: element.style.paddingBottom,
                marginTop: element.style.marginTop,
                marginBottom: element.style.marginBottom,
                overflow: element.style.overflow,
                transition: element.style.transition
            };
            element.style.height = '0';
            element.style.paddingTop = '0';
            element.style.paddingBottom = '0';
            element.style.marginTop = '0';
            element.style.marginBottom = '0';
            element.style.overflow = 'hidden';
            element.style.transition = `height ${duration}ms, padding ${duration}ms, margin ${duration}ms`;
            setTimeout(() => {
                element.style.height = height + 'px';
                element.style.paddingTop = '';
                element.style.paddingBottom = '';
                element.style.marginTop = '';
                element.style.marginBottom = '';
            }, 10);
            setTimeout(() => {
                Object.assign(element.style, original);
            }, duration);
        });
    };

    // ================================
    //  Các hàm tiện ích tĩnh
    // ================================
    jFast.each = function(collection, callback) {
        Array.prototype.forEach.call(collection, callback);
    };

    jFast.map = function(collection, callback) {
        return Array.prototype.map.call(collection, callback);
    };

    jFast.grep = function(array, callback) {
        return array.filter(callback);
    };

    jFast.inArray = function(item, array) {
        return array.indexOf(item) !== -1;
    };

    jFast.prototype.filter = function(selector) {
        this.elements = Array.prototype.filter.call(this.elements, element => matchesSelector(element, selector));
        return this;
    };

    // ================================
    //  AJAX
    // ================================
    jFast.ajax = function(options) {
        const xhr = new XMLHttpRequest();
        xhr.open(options.type || 'GET', options.url, options.async !== false);
        // Set header Content-Type
        if (options.contentType !== false) {
            xhr.setRequestHeader('Content-Type', options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8');
        }
        // Set header Accept nếu dataType là json
        if (options.dataType === 'json') {
            xhr.setRequestHeader('Accept', 'application/json');
        }
        // Set các header tuỳ chỉnh
        if (options.headers) {
            for (let header in options.headers) {
                if (options.headers.hasOwnProperty(header)) {
                    xhr.setRequestHeader(header, options.headers[header]);
                }
            }
        }
        xhr.onload = function() {
            const status = xhr.status;
            if ((status >= 200 && status < 300) || status === 304) {
                let response = xhr.responseText;
                if (options.dataType === 'json') {
                    try {
                        response = JSON.parse(response);
                    } catch (e) {
                        if (options.error) {
                            options.error(xhr, 'parsererror', e);
                        }
                        return;
                    }
                }
                if (options.success) {
                    options.success(response, status, xhr);
                }
            } else {
                if (options.error) {
                    options.error(xhr, status, xhr.statusText);
                }
            }
        };
        xhr.onerror = function() {
            if (options.error) {
                options.error(xhr, xhr.status, xhr.statusText);
            }
        };
        if (options.beforeSend) {
            options.beforeSend(xhr);
        }
        xhr.send(options.data || null);
    };

    // Gán jFast vào global ($)
    global.$ = jFast;
}(window));
