# TEG jQuery Utilities #

A few handy utilities for a jQuery project.

## Requires ##

[jQuery 3.6+]( https://releases.jquery.com/)

## Methods ##

### jQuery.between() ###

Usage:

```javascript
jQuery.between( value, minimum, maximum, inclusive );
```

| parameter | type | required | default |
|---|---|---|---|
| value | numeric | required |  |
| minimum | numeric | required |  |
| maximum | numeric | required |  |
| inclusive | boolean | optional | false |

Returns `true` if `value` is inside the range specified by `minimum` and `maximum`. If `inclusive` is `true` then the minimum and maximum values are included in the range comparison.

The implementation contains a little bullet proofing to defend against badly formed parameters. It is best not to rely on that.

## .between() ###

Usage:

```javascript
jQuery( selector ).between( minimum, maximum, inclusive );
```

Example:

```html
<input type="text" name="foo" value="3" />
```

```javascript
jQuery('[name="foo"]').between(2, 5);
```


| parameter | type | is required | default |
|---|---|-------------|---|
| minimum | numeric | required    |  |
| maximum | numeric | required    |  |
| inclusive | boolean | optional    | false |

As above but this version pulls the `value` from the first HTML element represented by the jQuery object. This will return `false` if the value is non-numeric.

 Since this function returns a value, it bust be at the end of any chain of calls.

```javascript
jQuery('input')
   .filter('[type="text"]')
   .between(5, 15, false);
```

### .fieldType() ###

Usage:

```javascript
jQuery( selector ).fieldType();
```

Returns a string which indicates the type form field represented by the first element in the jQuery object. If the HTML element is not a form field, this returns the tag name. This is a shortcut to `node.type` and then to `node.nodeName`.

 Since this function returns a value, it bust be at the end of any chain of calls.

### .getAny() ###

Usage:

```javascript
jQuery( selector ).getAny();
```

Returns the current value of the form field represented by the first HTML element in the jQuery object. If the element is not a form field, returns an empty string. This allows us to get around filtering for the selected radio button or checkbox. We don't have to know how the client has altered the configuration of the form field.

 Since this function returns a value, it must be at the end of any chain of calls.

### .setAny() ###

Usage:

```javascript
jQuery( selector ).setAny( value );
```

| parameter | type | is required |
|---|---|-------------|
| value | any | required    |

Sets the value of the form field represented by the first HTML element in the jQuery object. If the element is not a form field, this will silently fail. This function will select a radio button in a radio button group that has a matching value. The same goes for a matching select option. If the parameter is "truthy," a checkbox will be checked. Any other field type will simply have the `value` attribute set.

For radio buttons and check boxes, the `onClick` event handler will be triggered. For all other HTML element types, the `onChange` event handler will be triggered.

### .addCMSLandmarks()

Usage:

```javascript
jQuery( selector ).addCMSLandmarks( prefix, allowed )
```

| parameter | type | is required | default |
|---|------|---|-------------|
| prefix | string | optional    | "aria-landmark-" |
| allowed | array of string | optional | ['banner', 'complementary', 'contentinfo', 'form', 'main', 'navigation', 'region', 'search', 'alert', 'log', 'marquee', 'status', 'timer'] |
|

For each HTML element in the array, adds a `role` attribute with the value specified by a class name starting with the optional `prefix`. Only those values specified in the optional `allowed` array will be set. Additionally, an existing `role` attribute will not be changed. For example:

```javascript
jQuery('[class*="aria-landmark-"]').addCMSLandmarks();
```

. . .will change the following:

```html
<div class="foo aria-landmark-region">...</div>
<div class="bar aria-landmark-search" role="banner">...</div>
```

. . .to this:

```html
<div class="foo aria-landmark-region" role="region">...</div>
<div class="bar aria-landmark-search" role="banner">...</div>
```

The first `div` is updated with the role specified by `aria-landmark-region`. The second `div` is not modified since the `role` attribute already exists. Multiple, `aria-landmark-` classes are ignored.

### <span id="getPath"></span>.getCSSPath()

Usage:
```javascript
jQuery( selector ).getCSSPath()
```

For a single item in the array, generate a unique CSS selector path. For when the HTML cannot be altered but an element must be uniquely identified. This will end with the `html` element or the closest element with an `id` attribute.

### <span id="windowSize"></span>jQuery.windowSize()

Usage:

Initialize with window size breakpoints and method to run after window size changes.

```javascript
jQuery.windowSize.init({options});
```
| parameter | type         | required | default |
|---|--------------|---|---|
| options | plain object | optional | see below |

| option | type | required | default |
|---|---|---|---|
| mobileMaxWidth | number | optional | 600 |
| tabletMinWidth | number | optional | 599 |
| tabletMaxWidth | number | optional | 961 |
| desktopMinWidth | number | optional | 968 |
| tallMinHeight | number | optional | 820 |
| afterWindowSize | function | optional | The default simply logs the option values. |

Update window size flags.

```javascript
jQuery.windowSize.update();
```

Updates a set of flags indicating the window size based upon the options above.

| flag | type | default |
|---|---|---|
| isMobile | boolean | false |
| isTablet | boolean | false |
| isDesktop | boolean | false |
| isTall | boolean | false |

#### Recommended

Use (`throttle()`)[#throttle] on the `update()` method if attaching to a `window.onResize` listener.

### <span id="debounce"></span>jQuery.debounce()

Usage:

```javascript
jQuery.debounce( originalFunction, timeout, [otherArguments]);
```

| parameter | type | required | default |
|---|---|---|---|
| originalFunction | function | required |  |
| timeout | numeric | required |  |
| otherArguments | array | optional |  |

Prevents a function from running until a specified time period has elapsed since the last call. The function provided will be `apply`ed with the current context as well as the `[other arguments]` array as parameters.

### <span id="throttle"></span>jQuery.throttle()

Usage:

```javascript
jQuery.throttle( originalFunction, timeout, [otherArguments]);
```

| parameter | type | required | default |
|---|---|---|---|
| originalFunction | function | required |  |
| timeout | numeric | required |  |
| otherArguments | array | optional |  |

Prevents a function from more often than a specified time period. The function provided will be `apply`ed with the current context as well as the `[other arguments]` array as parameters.

### <span id="preloadImages"></span>jQuery.preloadImages()

Usage:

```javascript
jQuery.preloadImages( URL[, URL, ...]);
```

| parameter | type | required | default |
|---|---|---|---|
| URL | string | required |  |

Fetches one or more images in the background. Arguments should be valid URLs from the context of the web page that makes the call.
