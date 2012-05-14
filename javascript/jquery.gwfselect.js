(function ($) {
    var GWFFonts = [];
    var loadedFonts = {};
    var fontFetch = (function () {
        var fontURL = 'https://www.googleapis.com/webfonts/v1/webfonts',
            callbacks = [],
            fetching = false;
        var fetch = function () {
            $.getJSON(fontURL, function (data, status, req) {
                $.each(data.items, function () { GWFFonts.push(this.family); });
                $.each(callbacks, function () { this.call(null); });
                console.log(GWFFonts);
            });
            fetching = true;
        };
        return {
            init: function (fn) {
                callbacks.push(fn);
                fetching || fetch();
            }
        };
    })();
    $.widget('mlg.gwfselect', {
        options: {
            // None yet...
        },
        destroy: function () {
            this.fontList.remove();
            this.toggle.remove();
            this.element
                .removeClass('gwf-input')
                .removeAttr('readonly')
                .unbind('click.gwf')
                .unwrap();
            $('html').unbind('click.gwf');
            $.Widget.prototype.destroy.call(this);
        },
        randomize: function () {
            var fonts = this.fontList.find('li');
            var index = Math.floor(Math.random() * fonts.length);
            var randomFont = $(fonts.get(index));
            this._selectFontListItem(randomFont);
        },
        _create: function () {
            var self = this,
                opt = this.options,
                el = this.element,
                useFonts = opt.fonts || GWFFonts;
            el.addClass('gwf-input')
                .attr('readonly', 'readonly')
                .wrap($('<div/>').addClass('gwf-wrapper'));
            this.wrapper = el.closest('.gwf-wrapper');
            var createFontList = function () {
                el.after(self._createFontList(useFonts).hide());
                self._selectFontByName(el.val());
                self.toggle = $('<div/>')
                    .addClass('ui-icon ui-icon-triangle-1-s')
                    .insertAfter(el);
                self._bindHandlers();
            };
            useFonts.length ?
                createFontList(useFonts) :
                fontFetch.init(createFontList);
        },
        _bindHandlers: function () {
            var self = this,
                loadTimeout = null;
            $('html').bind('click.gwf', function (event) {
                self._toggleFontList(false);
            });
            var openFontList = function (event) {
                self._toggleFontList(true);
                event.stopPropagation();
            };
            this.element.bind('click.gwf', openFontList);
            this.toggle.bind('click.gwf', openFontList);
            this.fontList.bind('scroll.gwf', function (event) {
                window.clearTimeout(loadTimeout);
                loadTimeout = window.setTimeout(function () {
                    self._loadVisibleFonts();
                }, 250);
            }).bind('click.gwf', function (event) {
                var target = $(event.target);
                if (!target.is('li')) { return; }
                self._selectFontListItem(target);
            });
        },
        _selectFontListItem: function (li) {
            if (li.hasClass('selected')) { return; }
            this.fontList.find('li.selected').removeClass('selected');
            li = $(li).addClass('selected');
            var fontName = li.data('fontName');
            var styles = this._fontNameToStyle(fontName);
            this.element
                .val(fontName)
                .css(styles)
                .trigger('change');
            this._trigger('change', null, styles);
            this._loadFonts([fontName]);
            this._toggleFontList(false);
        },
        _selectFontByName: function (name) {
            var fonts = this.fontList.find('li');
            var match = $.grep(fonts, function (li, i) {
                return ($(li).data('fontName') == name);
            });
            if (match.length) {
                this._selectFontListItem($(match).first());
                return true;
            }
            return false;
        },
        _createFontList: function (useFonts) {
            this.fontList = $('<ul/>').addClass('gwf-list');
            var self = this;
            $.each(useFonts, function (i, fontName) {
                $('<li/>')
                    .html(fontName)
                    .data('fontName', fontName)
                    .css(self._fontNameToStyle(fontName))
                    .appendTo(self.fontList);
            });
            return this.fontList;
        },
        _fontNameReadable: function (fontName) {
            return fontName.replace(/[\+|:]/g, ' ');
        },
        _fontNameToStyle: function (fontName) {
            var t = fontName.split(':');
            return {
                'font-family': this._fontNameReadable(t[0]),
                'font-weight': (t[1] || 400)
            };
        },
        _toggleFontList: function (bool) {
            if (bool) {
                this.wrapper.css({ 'z-index': 999999 });
                this.fontList.show();
                this._loadVisibleFonts();
                var selectedFont = this.fontList.find('li.selected');
                if (selectedFont.length) {
                    this.fontList.scrollTop(selectedFont.position().top);
                }
            } else {
                this.wrapper.css({ 'z-index': 'auto' });
                this.fontList.hide();
            }
        },
        _loadVisibleFonts: function () {
            if (!this.fontList.is(':visible')) { return; }
            var self = this,
                listTop = this.fontList.scrollTop(),
                listHeight = this.fontList.height(),
                listBottom = listTop + listHeight,
                fonts = this.fontList.find('li'),
                fontsToLoad = [];
            $.each(fonts, function (i, font) {
                font = $(font);
                var fontTop = font.position().top,
                    fontBottom = fontTop + font.outerHeight();
                if ((fontBottom >= 0) && (fontTop < listHeight)) {
                    fontsToLoad.push(font.data('fontName'));
                }
            });
            this._loadFonts(fontsToLoad);
        },
        _loadFonts: function (fontArray) {
            fontArray = $.grep(fontArray, function (fontName) {
                return loadedFonts[fontName];
            }, true);
            if (!fontArray.length) { return; }
            $.each(fontArray, function (i, fontName) {
                loadedFonts[fontName] = true;
            });
            WebFont.load({ google: { families: fontArray } });
        }
    });
})(jQuery);
