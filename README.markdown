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
3. Invoke `$.gwfselect` on the input.

Example
----------------------------------------------------------------------

View the index.html file in this repository for an example of the plugin in use.
