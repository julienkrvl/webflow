/* RANGESLIDER SCRIPT */
// TEST

/*! rangeslider.js - v0.3.7 | (c) 2014 @andreruffert | MIT license | https://github.com/andreruffert/rangeslider.js */ ! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function(a) {
    "use strict";

    function b() {
        var a = document.createElement("input");
        return a.setAttribute("type", "range"), "text" !== a.type
    }

    function c(a, b) {
        var c = Array.prototype.slice.call(arguments, 2);
        return setTimeout(function() {
            return a.apply(null, c)
        }, b)
    }

    function d(a, b) {
        return b = b || 100,
            function() {
                if (!a.debouncing) {
                    var c = Array.prototype.slice.apply(arguments);
                    a.lastReturnVal = a.apply(window, c), a.debouncing = !0
                }
                return clearTimeout(a.debounceTimeout), a.debounceTimeout = setTimeout(function() {
                    a.debouncing = !1
                }, b), a.lastReturnVal
            }
    }

    function e(a) {
        return 0 !== a.offsetWidth || 0 !== a.offsetHeight ? !1 : !0
    }

    function f(a) {
        for (var b = [], c = a.parentNode; e(c);) b.push(c), c = c.parentNode;
        return b
    }

    function g(a, b) {
        var c = f(a),
            d = c.length,
            e = [],
            g = a[b];
        if (d) {
            for (var h = 0; d > h; h++) e[h] = c[h].style.display, c[h].style.display = "block", c[h].style.height = "0", c[h].style.overflow = "hidden", c[h].style.visibility = "hidden";
            g = a[b];
            for (var i = 0; d > i; i++) c[i].style.display = e[i], c[i].style.height = "", c[i].style.overflow = "", c[i].style.visibility = ""
        }
        return g
    }

    function h(b, e) {
        if (this.$window = a(window), this.$document = a(document), this.$element = a(b), this.options = a.extend({}, m, e), this._defaults = m, this._name = i, this.startEvent = this.options.startEvent.join("." + i + " ") + "." + i, this.moveEvent = this.options.moveEvent.join("." + i + " ") + "." + i, this.endEvent = this.options.endEvent.join("." + i + " ") + "." + i, this.polyfill = this.options.polyfill, this.onInit = this.options.onInit, this.onSlide = this.options.onSlide, this.onSlideEnd = this.options.onSlideEnd, this.polyfill && l) return !1;
        this.identifier = "js-" + i + "-" + k++, this.min = parseFloat(this.$element[0].getAttribute("min") || 0), this.max = parseFloat(this.$element[0].getAttribute("max") || 100), this.value = parseFloat(this.$element[0].value || this.min + (this.max - this.min) / 2), this.step = parseFloat(this.$element[0].getAttribute("step") || 1), this.toFixed = (this.step + "").replace(".", "").length - 1, this.$fill = a('<div class="' + this.options.fillClass + '" />'), this.$handle = a('<div class="' + this.options.handleClass + '" />'), this.$range = a('<div class="' + this.options.rangeClass + '" id="' + this.identifier + '" />').insertAfter(this.$element).prepend(this.$fill, this.$handle), this.$element.css({
            position: "absolute",
            width: "1px",
            height: "1px",
            overflow: "hidden",
            opacity: "0"
        }), this.handleDown = a.proxy(this.handleDown, this), this.handleMove = a.proxy(this.handleMove, this), this.handleEnd = a.proxy(this.handleEnd, this), this.init();
        var f = this;
        this.$window.on("resize." + i, d(function() {
            c(function() {
                f.update()
            }, 300)
        }, 20)), this.$document.on(this.startEvent, "#" + this.identifier + ":not(." + this.options.disabledClass + ")", this.handleDown), this.$element.on("change." + i, function(a, b) {
            if (!b || b.origin !== i) {
                var c = a.target.value,
                    d = f.getPositionFromValue(c);
                f.setPosition(d)
            }
        })
    }
    var i = "rangeslider",
        j = [],
        k = 0,
        l = b(),
        m = {
            polyfill: !0,
            rangeClass: "rangeslider",
            disabledClass: "rangeslider--disabled",
            fillClass: "rangeslider__fill",
            handleClass: "rangeslider__handle",
            startEvent: ["mousedown", "touchstart", "pointerdown"],
            moveEvent: ["mousemove", "touchmove", "pointermove"],
            endEvent: ["mouseup", "touchend", "pointerup"]
        };
    h.prototype.init = function() {
        this.onInit && "function" == typeof this.onInit && this.onInit(), this.update()
    }, h.prototype.update = function() {
        this.handleWidth = g(this.$handle[0], "offsetWidth"), this.rangeWidth = g(this.$range[0], "offsetWidth"), this.maxHandleX = this.rangeWidth - this.handleWidth, this.grabX = this.handleWidth / 2, this.position = this.getPositionFromValue(this.value), this.$element[0].disabled ? this.$range.addClass(this.options.disabledClass) : this.$range.removeClass(this.options.disabledClass), this.setPosition(this.position)
    }, h.prototype.handleDown = function(a) {
        if (a.preventDefault(), this.$document.on(this.moveEvent, this.handleMove), this.$document.on(this.endEvent, this.handleEnd), !((" " + a.target.className + " ").replace(/[\n\t]/g, " ").indexOf(this.options.handleClass) > -1)) {
            var b = this.getRelativePosition(a),
                c = this.$range[0].getBoundingClientRect().left,
                d = this.getPositionFromNode(this.$handle[0]) - c;
            this.setPosition(b - this.grabX), b >= d && b < d + this.handleWidth && (this.grabX = b - d)
        }
    }, h.prototype.handleMove = function(a) {
        a.preventDefault();
        var b = this.getRelativePosition(a);
        this.setPosition(b - this.grabX)
    }, h.prototype.handleEnd = function(a) {
        a.preventDefault(), this.$document.off(this.moveEvent, this.handleMove), this.$document.off(this.endEvent, this.handleEnd), this.onSlideEnd && "function" == typeof this.onSlideEnd && this.onSlideEnd(this.position, this.value)
    }, h.prototype.cap = function(a, b, c) {
        return b > a ? b : a > c ? c : a
    }, h.prototype.setPosition = function(a) {
        var b, c;
        b = this.getValueFromPosition(this.cap(a, 0, this.maxHandleX)), c = this.getPositionFromValue(b), this.$fill[0].style.width = c + this.grabX + "px", this.$handle[0].style.left = c + "px", this.setValue(b), this.position = c, this.value = b, this.onSlide && "function" == typeof this.onSlide && this.onSlide(c, b)
    }, h.prototype.getPositionFromNode = function(a) {
        for (var b = 0; null !== a;) b += a.offsetLeft, a = a.offsetParent;
        return b
    }, h.prototype.getRelativePosition = function(a) {
        var b = this.$range[0].getBoundingClientRect().left,
            c = 0;
        return "undefined" != typeof a.pageX ? c = a.pageX : "undefined" != typeof a.originalEvent.clientX ? c = a.originalEvent.clientX : a.originalEvent.touches && a.originalEvent.touches[0] && "undefined" != typeof a.originalEvent.touches[0].clientX ? c = a.originalEvent.touches[0].clientX : a.currentPoint && "undefined" != typeof a.currentPoint.x && (c = a.currentPoint.x), c - b
    }, h.prototype.getPositionFromValue = function(a) {
        var b, c;
        return b = (a - this.min) / (this.max - this.min), c = b * this.maxHandleX
    }, h.prototype.getValueFromPosition = function(a) {
        var b, c;
        return b = a / (this.maxHandleX || 1), c = this.step * Math.round(b * (this.max - this.min) / this.step) + this.min, Number(c.toFixed(this.toFixed))
    }, h.prototype.setValue = function(a) {
        a !== this.value && this.$element.val(a).trigger("change", {
            origin: i
        })
    }, h.prototype.destroy = function() {
        this.$document.off(this.startEvent, "#" + this.identifier, this.handleDown), this.$element.off("." + i).removeAttr("style").removeData("plugin_" + i), this.$range && this.$range.length && this.$range[0].parentNode.removeChild(this.$range[0]), j.splice(j.indexOf(this.$element[0]), 1), j.length || this.$window.off("." + i)
    }, a.fn[i] = function(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("plugin_" + i);
            d || (c.data("plugin_" + i, d = new h(this, b)), j.push(this)), "string" == typeof b && d[b]()
        })
    }
});

/* EDIT SLIDER PARAMETERS */

    $('#ranger').change(function(){
      //console.log($('#ranger').val())
      if($('#ranger').val() < 6){
          
        // $('#ranger').prop('step', 1);
        
        $('.pricing-card').removeClass('active-1 active-2 active-3 active-4 active-5 active-6 display-hidden');
        
        $('.pricing-card').addClass('active-1');
        
        
      } else if($('#ranger').val() > 7 && $('#ranger').val() < 500){
          
        // $('#ranger').prop('step', 10);
        
        $('.pricing-card').removeClass('active-1 active-2 active-3 active-4 active-5 active-6');
        $('.pricing-card').addClass('active-2 display-hidden');
        
      } else if($('#ranger').val() > 501 && $('#ranger').val() < 1500){
          
        // $('#ranger').prop('step', 100);
        
        $('.pricing-card').removeClass('active-1 active-2 active-3 active-4 active-5 active-6');
        $('.pricing-card').addClass('active-3 display-hidden');
        
     } else if($('#ranger').val() > 1501 && $('#ranger').val() < 5000){
        
        // $('#ranger').prop('step', 100);

        $('.pricing-card').removeClass('active-1 active-2 active-3 active-4 active-5 active-6');
        $('.pricing-card').addClass('active-4 display-hidden');
         
     } else if($('#ranger').val() > 5001 && $('#ranger').val() < 15000){
        
        // $('#ranger').prop('step', 500);
        
        $('.pricing-card').removeClass('active-1 active-2 active-3 active-4 active-5 active-6');
        $('.pricing-card').addClass('active-5 display-hidden');

      } else if($('#ranger').val() > 15001 && $('#ranger').val() <= 40000){
          
        // $('#ranger').prop('step', 1000);
        
        $('.pricing-card').removeClass('active-1 active-2 active-3 active-4 active-5 active-6');
        $('.pricing-card').addClass('active-6 display-hidden');
      }
     
    })
    
    
  $( document ).ready(function() {
  // Handler for .ready() called.
    $('.slide').removeClass('active');
  });
  $('input[type="range"]').rangeslider({
      polyfill: false,
      rangeClass: 'rangeslider',
      fillClass: 'rangeslider__fill',
      handleClass: 'rangeslider__handle',
      onInit: function() {

      },
      onSlide: function(position, value) {
          $('.rangeslider__handle').attr('data-content', value);
          $('.done').removeClass('active');
          $('.slide').addClass('active');
      },
      onSlideEnd: function(position, value) {
        $('.done').addClass('active');
        $('.slide').removeClass('active');
      }
  });
