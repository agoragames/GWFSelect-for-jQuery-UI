jQuery UI widget: Google WebFont selector
======================================================================

Based very loosely on Tom Moor's [plugin](https://github.com/tommoor/fontselect-jquery-plugin)
for selecting Google's hosted fonts from a dynamically-generated drop-down list. This version
uses jQuery UI's widget factory to provide the standard tools for accessing and manipulating
the plugin's state programmatically.

Usage
----------------------------------------------------------------------

1. Include jQuery, jQuery UI, and the [Google WebFont loader](http://code.google.com/apis/webfonts/docs/webfont_loader.html) on your page.
2. Create a regular text input to use as the font selector (it may be prefilled with the name of a font).
3. Invoke `$.gwfselect` on the input. You can call this with no arguments to allow all available Google web fonts to be selected, or pass a config object with a `fonts` array to specify an explicit font list, e.g. `{ fonts: ['Amaranth', 'Artifika', 'Averia Libre'] }`. [View available fonts...](http://www.google.com/webfonts)

Example
----------------------------------------------------------------------

View the index.html file in this repository for examples of the plugin in use.

Changelog
----------------------------------------------------------------------

* 2012-01-13 -- Initial public release (no version number).
* 2012-05-14 -- Version 1.1; lazily loads font list from Google's servers when it is first required by a widget.

Author
----------------------------------------------------------------------

© 2012-2014 Jack Letourneau. See LICENSE.txt for license info.
