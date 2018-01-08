(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth > 400 && clientWidth <= 500) {
                clientWidth = 400;
            }
            if (clientWidth > 500) {
                clientWidth = 500;
            }
            var fontSize = 8 * (clientWidth / 375);
            docEl.style.fontSize = fontSize + 'px';

            var dpi = window.devicePixelRatio;
            var viewport = document.querySelector('meta[name="viewport"]');

            docEl.setAttribute('data-dpi', dpi);
            var scale = 1 / dpi;
        };
    if (!doc.addEventListener) return;
    recalc()
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
