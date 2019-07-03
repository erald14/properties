!(function($, e, n) {
  var i = void 0 === e.App ? (e.App = {}) : e.App;
  void 0 === i.Utils && (i.Utils = {}),
    (i.Utils.Envoirment = function() {
      (this.$body = $("body")),
        (this.$document = $(document)),
        (this.$html = $("html")),
        (this.$window = $(e));
      var n = document.documentElement.style,
        i = !!("flexWrap" in n || "WebkitFlexWrap" in n || "msFlexWrap" in n),
        o = !!(
          "ontouchstart" in e ||
          (e.DocumentTouch && document instanceof DocumentTouch)
        ),
        t = e.history && "pushState" in e.history,
        a = navigator.userAgent;
      (-1 === a.indexOf("Android 2.") && -1 === a.indexOf("Android 4.0")) ||
        -1 === a.indexOf("Mobile Safari") ||
        -1 !== a.indexOf("Chrome") ||
        -1 !== a.indexOf("Windows Phone") ||
        (t = !1);
      var s = !!(
        "serviceWorker" in navigator &&
        "undefined" != typeof Cache &&
        Cache.prototype.addAll
      );
      return {
        $window: this.$window,
        $body: this.$body,
        $document: this.$document,
        flexbox: i,
        touch: o,
        history: t,
        sw: s
      };
    });
})(jQuery, window),
  (function($, e, n) {
    function i() {
      var e = $("#holder-nav-toggle"),
        n = $(".header-main");
      e.on("click", function() {
        n.toggleClass("nav-open");
      });
    }
    function o() {
      var e = $("#hero-slider");
      if (e.length) {
        for (
          var n = e.find(".hero-slides"),
            i = e.find(".arrow-prev"),
            o = e.find(".arrow-next"),
            t = e.find(".hero-slide").length,
            a = $(document.createDocumentFragment()),
            s = 0;
          s < t;
          s++
        )
          a.append('<div class="hero-bullet" />');
        var r = e.find(".hero-bullets");
        r.append(a);
        var d = r.find(".hero-bullet"),
          l = !1,
          c = 5,
          f = n.slick({
            dots: !1,
            infinite: !0,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: !0,
            pauseOnFocus: !0,
            autoplay: !0,
            autoplaySpeed: 5e3
          });
        d.first().addClass("active"),
          f.on("beforeChange", function(e, n, i, o) {
            d.removeClass("active"), d.eq(o).addClass("active");
          }),
          i.on("click", function(e) {
            f.slick("slickPrev");
          }),
          o.on("click", function(e) {
            f.slick("slickNext");
          }),
          d.on("click", function(e) {
            var n = d.index(e.currentTarget);
            $.isNumeric(n) && f.slick("slickGoTo", n);
          }),
          e.on({
            mouseenter: function() {
              l = !0;
            },
            mouseleave: function() {
              l = !1;
            }
          });
      }
    }
    function t() {
      var e = $(".clock");
      e.length &&
        e.each(function(e, n) {
          a(n);
        });
    }
    function a(e) {
      var n = $(e),
        i = n.find(".hours-hand"),
        o = n.find(".minutes-hand"),
        t = n.find(".seconds-hand"),
        a = n.data("datetime"),
        s = moment()
          .utc()
          .tz(a),
        r = s.format("ss"),
        d = s.format("mm"),
        l = s.format("hh");
      t.addClass("sh-" + r), o.addClass("mh-" + d), i.addClass("hh-" + l);
    }
    function s() {}
    function r() {
      if (g.length)
        if (p)
          g.each(function(e, n) {
            var i = d(n);
            b.push(i);
          });
        else {
          $.each(b, function(e, n) {
            n.destroy(!0);
          });
          var e = $(".js-has-mobile-slider");
          e.find(".mobile-slider-arrow").remove(),
            e.find(".mobile-slider-dots").remove();
        }
    }
    function d(e) {
      var n = $(e),
        i = n.children().length,
        o,
        t,
        a,
        s;
      (o = n.parent(".js-has-mobile-slider")),
        (t = $("<div />")
          .addClass("mobile-slider-arrow arrow-left")
          .fadeOut(0)),
        (a = $("<div />").addClass("mobile-slider-arrow arrow-right")),
        (s = $("<div />").addClass("mobile-slider-dots"));
      for (var r = 0; r < i; r++)
        s.append($("<div />").addClass("mobile-slider-dot"));
      var d = s.find(".mobile-slider-dot");
      d.first().addClass("active");
      var l = new Siema({
        selector: e,
        duration: 200,
        easing: "ease-out",
        perPage: 1,
        startIndex: 0,
        draggable: !0,
        multipleDrag: !0,
        threshold: 20,
        loop: !1,
        onInit: function() {
          o.append(t)
            .append(a)
            .append(s);
        },
        onChange: function() {
          var e = l.currentSlide;
          d.removeClass("active"),
            d.eq(e).addClass("active"),
            0 === e ? t.fadeOut(300) : t.fadeIn(300),
            e === i - 1 ? a.fadeOut(300) : a.fadeIn(300);
        }
      });
      return (
        t.on("click", function() {
          l.prev();
        }),
        a.on("click", function() {
          l.next();
        }),
        l
      );
    }
    function l() {
      v.length &&
        (v.each(function(e, n) {
          var i = $(n),
            o = i.text().replace(/\s\s+/g, " ");
          i.data("text", o);
        }),
        c());
    }
    function c() {
      function e(e) {
        var n = $(e),
          i = n.data("text"),
          o = i.indexOf(" ", 76),
          t =
            i.substring(0, o) +
            '<span class="toggle">... <a href="#">READ FULL BIO</a></span>';
        n.html(t),
          n
            .find(".read-more")
            .removeClass("js-hidden")
            .slideUp(0);
      }
      p
        ? (v.each(function(n, i) {
            e(i);
          }),
          v.on("click", ".toggle", function(e) {
            e.preventDefault();
            var n = $(e.target).closest(v),
              i = n.data("text");
            n.html(i);
          }))
        : (v.each(function(e, n) {
            var i = $(n);
            i.html(i.data("text"));
          }),
          v.off("click", ".toggle"));
    }
    var f = void 0 === e.App ? (e.App = {}) : e.App,
      u = $(document),
      h = $(e),
      m = $("body"),
      p = !(h.width() <= 770),
      v,
      g,
      b = [],
      C = { disclaimerUrl: "disclaimer.html" };
    e.gsSettings && $.extend(C, e.gsSettings),
      $(function() {
        (v = $(".js-team-p-bio")),
          (g = $(".js-mobile-slider")),
          i(),
          o(),
          t(),
          s(),
          l(),
          h
            .on("resize", function() {
              var e = h.width() <= 770;
              e !== p && ((p = e), c(), r());
            })
            .trigger("resize");
      });
  })(jQuery, window);
//# sourceMappingURL=./app.min.js.map
