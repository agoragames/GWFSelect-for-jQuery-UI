(function ($) {
    // FIXME: there's got to be a better way of getting the list of available
    // fonts than hard-coding it into the plugin.
    var fonts = [
        "Aclonica",
        "Allan",
        "Annie Use Your Telescope",
        "Anonymous Pro",
        "Allerta Stencil",
        "Allerta",
        "Amaranth",
        "Anton",
        "Architects Daughter",
        "Arimo",
        "Artifika",
        "Arvo",
        "Asset",
        "Astloch",
        "Bangers",
        "Bentham",
        "Bevan",
        "Bigshot One",
        "Bowlby One",
        "Bowlby One SC",
        "Brawler",
        "Buda:300",
        "Cabin",
        "Calligraffitti",
        "Candal",
        "Cantarell",
        "Cardo",
        "Carter One",
        "Caudex",
        "Cedarville Cursive",
        "Cherry Cream Soda",
        "Chewy",
        "Coda",
        "Coming Soon",
        "Copse",
        "Corben:700",
        "Cousine",
        "Covered By Your Grace",
        "Crafty Girls",
        "Crimson Text",
        "Crushed",
        "Cuprum",
        "Damion",
        "Dancing Script",
        "Dawning of a New Day",
        "Didact Gothic",
        "Droid Sans",
        "Droid Sans Mono",
        "Droid Serif",
        "EB Garamond",
        "Expletus Sans",
        "Fontdiner Swanky",
        "Forum",
        "Francois One",
        "Geo",
        "Give You Glory",
        "Goblin One",
        "Gravitas One",
        "Gruppo",
        "Hammersmith One",
        "Holtwood One SC",
        "Homemade Apple",
        "Inconsolata",
        "Indie Flower",
        "IM Fell DW Pica",
        "IM Fell DW Pica SC",
        "IM Fell Double Pica",
        "IM Fell Double Pica SC",
        "IM Fell English",
        "IM Fell English SC",
        "IM Fell French Canon",
        "IM Fell French Canon SC",
        "IM Fell Great Primer",
        "IM Fell Great Primer SC",
        "Irish Grover",
        "Irish Growler",
        "Istok Web",
        "Josefin Sans",
        "Josefin Slab",
        "Judson",
        "Jura",
        "Jura:500",
        "Jura:600",
        "Just Another Hand",
        "Just Me Again Down Here",
        "Kameron",
        "Kenia",
        "Kranky",
        "Kreon",
        "Kristi",
        "La Belle Aurore",
        "Lato:100",
        "Lato:100italic",
        "Lato:300",
        "Lato",
        "Lato:bold",
        "Lato:900",
        "League Script",
        "Lekton",
        "Limelight",
        "Lobster",
        "Lobster Two",
        "Lora",
        "Love Ya Like A Sister",
        "Loved by the King",
        "Luckiest Guy",
        "Maiden Orange",
        "Mako",
        "Maven Pro",
        "Maven Pro:500",
        "Maven Pro:700",
        "Maven Pro:900",
        "Meddon",
        "MedievalSharp",
        "Megrim",
        "Merriweather",
        "Metrophobic",
        "Michroma",
        "Miltonian Tattoo",
        "Miltonian",
        "Modern Antiqua",
        "Monofett",
        "Molengo",
        "Mountains of Christmas",
        "Muli:300",
        "Muli",
        "Neucha",
        "Neuton",
        "News Cycle",
        "Nixie One",
        "Nobile",
        "Nova Cut",
        "Nova Flat",
        "Nova Mono",
        "Nova Oval",
        "Nova Round",
        "Nova Script",
        "Nova Slim",
        "Nova Square",
        "Nunito:light",
        "Nunito",
        "OFL Sorts Mill Goudy TT",
        "Old Standard TT",
        "Open Sans:300",
        "Open Sans",
        "Open Sans:600",
        "Open Sans:800",
        "Open Sans Condensed:300",
        "Orbitron",
        "Orbitron:500",
        "Orbitron:700",
        "Orbitron:900",
        "Oswald",
        "Over the Rainbow",
        "Reenie Beanie",
        "Pacifico",
        "Patrick Hand",
        "Paytone One",
        "Permanent Marker",
        "Philosopher",
        "Play",
        "Playfair Display",
        "Podkova",
        "PT Sans",
        "PT Sans Narrow",
        "PT Sans Narrow:regular,bold",
        "PT Serif",
        "PT Serif Caption",
        "Puritan",
        "Quattrocento",
        "Quattrocento Sans",
        "Radley",
        "Raleway:100",
        "Redressed",
        "Rock Salt",
        "Rokkitt",
        "Ruslan Display",
        "Schoolbell",
        "Shadows Into Light",
        "Shanti",
        "Sigmar One",
        "Six Caps",
        "Slackey",
        "Smythe",
        "Sniglet:800",
        "Special Elite",
        "Stardos Stencil",
        "Sue Ellen Francisco",
        "Sunshiney",
        "Swanky and Moo Moo",
        "Syncopate",
        "Tangerine",
        "Tenor Sans",
        "Terminal Dosis Light",
        "The Girl Next Door",
        "Tinos",
        "Ubuntu",
        "Ultra",
        "Unkempt",
        "UnifrakturCook:bold",
        "UnifrakturMaguntia",
        "Varela",
        "Varela Round",
        "Vibur",
        "Vollkorn",
        "VT323",
        "Waiting for the Sunrise",
        "Wallpoet",
        "Walter Turncoat",
        "Wire One",
        "Yanone Kaffeesatz",
        "Yanone Kaffeesatz:300",
        "Yanone Kaffeesatz:400",
        "Yanone Kaffeesatz:700",
        "Yeseva One",
        "Zeyada"
    ];
    var loadedFonts = {};
    $.widget('mlg.gwfselect', {
        options: {
            // None yet...
        },
        randomize: function () {
            var fonts = this.fontList.find('li');
            var index = Math.floor(Math.random() * fonts.length);
            var randomFont = $(fonts.get(index));
            this._selectFontListItem(randomFont);
        },
        _debug: function (info) {
            console && console.log(info);
        },
        _create: function () {
            var opt = this.options,
                el = this.element;
            el.addClass('gwf-input')
                .attr('readonly', 'readonly')
                .wrap($('<div/>').addClass('gwf-wrapper'));
            this.wrapper = el.closest('.gwf-wrapper');
            el.after(this._createFontList().hide());
            this.toggle = $('<div/>')
                .addClass('ui-icon ui-icon-triangle-1-s')
                .insertAfter(el);
            this._selectFontByName(el.val());
            this._bindHandlers();
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
        _createFontList: function () {
            this.fontList = $('<ul/>').addClass('gwf-list');
            var self = this;
            $.each(fonts, function (i, fontName) {
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
                this.fontList.show();
                this._loadVisibleFonts();
                var selectedFont = this.fontList.find('li.selected');
                if (selectedFont.length) {
                    this.fontList.scrollTop(selectedFont.position().top);
                }
            } else {
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
        },
        destroy: function () {
            this.fontList.remove();
            this.element
                .removeClass('gwf-input')
                .removeAttr('readonly')
                .unbind('click.gwf')
                .unwrap();
            $('html').unbind('click.gwf');
            $.Widget.prototype.destroy.call(this);
        }
    });
})(jQuery);
