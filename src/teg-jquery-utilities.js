/* TEG jQuery Utilities
 * A few handy extensions for jQuery.
 *
 * Copyright © 2020, PMG / The Production Management Group, Ltd.
 * Released under the MIT license.
 *
 * The Engage Group <engage@engageyourcause.com>
 */

/* add universal getter and setter since some fields
 * can quite sensibly be many types. Assume that
 * radio buttons are a list of nodes and all others
 * are single HTML elements.
 *
 */

(function ($) {
	/**
	 * between
	 * Determine if the value of an input field is in a specified range.
	 *
	 * @param {Integer} minimum: lowest allowed value
	 * @param {Integer} maximum: highest allowed value
	 * @param {Boolean} inclusive: if True, include the
	 * minimum and maximum as allowable values
	 * @returns {boolean} True if the value of THIS is a
	 * number in the specified range.
	 */
	$.fn.between = function (minimum, maximum, inclusive) {
		return $.between((isNaN(parseFloat(this.val())) ? 0 : +this.val()), minimum, maximum, (inclusive || false));
	}; // end $.fn.between()

	//
	/**
	 * fieldType
	 * Get type of input field even if it's not actually an input field.
	 *
	 * @returns {string|*} input field type or node name if not an input field
	 */
	$.fn.fieldType = function () {
		let returnVal = '';

		// if it's an empty set, return an empty string
		if (this.length === 0) {
			return '';
		}

		// if it's an input field at all
		if (typeof this[0].type === 'undefined') {
			returnVal = this[0].nodeName.toLowerCase();

		} else {
			returnVal = this[0].type;
		}
		return returnVal;
	}; // end fieldType()

	/**
	 * getAny
	 * Get the value of an input field without knowning what kind it is.
	 *
	 * @returns {jQuery|string} the value of the input field, if any
	 */
	$.fn.getAny = function () {
		let returnValue = '';

		switch (this.fieldType()) {
			case 'radio':
				/* Radio buttons are a funny case. Also,
				 * don't return undefined.
				 */
				returnValue = this.filter(':checked').val() || '';
				break;

			case 'checkbox':
				/* Checkboxes are a funny case. Also,
				 * don't return undefined.
				 */
				returnValue = this.filter(':checked').val() || '';
				break;

			default:
				// Dnn't return undefined.
				returnValue = this.val() || '';
		}

		return returnValue;
	}; // end getAny()

	/**
	 * setAny
	 * Set the value of an input field without knowing what type of field it is.
	 *
	 * @param {String} value, any value which the field can accept
	 * @returns {jQuery} the jQuery object
	 */
	$.fn.setAny = function (value) {

		/* Return true if successfully set and trigger the
		 * onChange handler while we're at it.
		 */
		switch (this.fieldType()) {
			case 'radio':
				this.filter('[value="' + value + '"]').click();
				break;

			case 'checkbox':
				/* This is weird, but we must ensure that any
				 * event listeners are triggered.
				 */
				if (value &&
						this.val() === value) {
					this.prop('checked', false).click();

				} else {
					this.prop('checked', true).click();
				}
				break;

			default:
				this.val(value)
						.change();
		}

		return this;
	}; // end setAny()

	/**
	 * addCMSLandmarks
	 * Add role attributes using a CMS's ability to add class names.
	 *
	 * @param {String} prefix, CSS class name prefix to use for role attribute value
	 * @param {Array} allowed, list of allowed rote attribute values
	 */
	$.fn.addCMSLandmarks = function (prefix = 'aria-landmark-', allowed = ['banner', 'complementary', 'contentinfo', 'form', 'main', 'navigation', 'region',
		'search', 'alert', 'log', 'marquee', 'status', 'timer']) {
		for (let counter = 0; counter < this.length; counter++) {
			let element = this[counter];
			element.classList.forEach(function (item) {
				const roleValue = item.substring(item.indexOf('aria-landmark-') + 14);

				if (element.getAttribute('role') === null &&
						allowed.includes(roleValue)) {
					element.setAttribute('role', roleValue)
				}
			});
		}
		return this;
	}; // end addCMSLandmarks()

	/**
	 * getPath
	 * Recursively generate the CSS selector path of an HTML element.
	 *
	 * @param path {string} path of child object, empty if beginning of search
	 * @returns {string|*|string} completed path
	 */
	$.fn.getCSSPath = function (path = '') {

		// If this element is <html> we've reached the end of the path.
		if (this.is('html')) return `html${path}`;

		// Shortcut for ID
		const id = this.attr('id');

		if (typeof id !== 'undefined') return `#${id}${path}`;

		let cur = this.get(0).nodeName.toLowerCase();
		const className = this.attr('class');

		// Add class names, if any
		if (typeof className !== 'undefined') cur += '.' + className.split(/[\s\n]+/).join('.');

		// add nth-child if there's more than one like this
		if (document.querySelectorAll(cur).length > 1) cur += `:nth-child(${this.index() + 1})`;

		// check for uniqueness and shortcut
		if (document.querySelectorAll(`${cur}${path}`).length === 1) return `${cur}${path}`;

		// Recursion 'cuz memory is cheap. >8)
		return this.parent().getCSSPath(` > ${cur}${path}`);
	}; // end getCSSPath()

	/* Allow window size flags to auto update and fire a callback.
	 * This feature must be specifically initialized.
	 */
	$.extend({
		/**
		 * $.between
		 * Reurns TRUE if value is between minimum and maximum.
		 *
		 * @param {Integer} value, number to test
		 * @param {Integer} minimum, lowest point of accetptable range
		 * @param {Integer} maximum, highest point of acceptable range
		 * @param {boolean} inclusive, whether to include the end points as acceptable values
		 * @returns {boolean} TRUE if value is between minimum and maximum
		 */
		between: function (value, minimum, maximum, inclusive) {
			// bulletproof the arguments
			const btwnValue = value || 0,
					getMinimum = minimum || 0,
					getMaximum = maximum || 0,
					btwnMinimum = Math.min(getMinimum, getMaximum),
					btwnMaximum = Math.max(getMinimum, getMaximum),
					btwnInclusive = inclusive || false;

			// if inclusive, do inclusive comparison
			if (btwnInclusive) {
				return btwnValue >= btwnMinimum && btwnValue <= btwnMaximum;

			} else {
				// otherwise, do exclusive comparison
				return btwnValue > btwnMinimum && btwnValue < btwnMaximum;
			}
		}, // end between()

		/**
		 * windowSize
		 * An object to monitor the size of the viewable browser window.
		 */
		windowSize: {
			options: {
				mobileMaxWidth: 600,
				tabletMinWidth: 599,
				tabletMaxWidth: 961,
				desktopMinWidth: 968,
				tallMinHeight: 820,
				// allow customizable callback
				afterWindowSize: function () {

					if (console) {
						console.log('%c$.afterWindowSize.afterWindowSize() %cdefault does nothing.', 'font-weight: bold; color: yellow;', 'font-weight: bold; color: white;');
						console.log('%c this.mobileMaxWidth', 'font-weight: bold; color: white;');
						console.dir(this.mobileMaxWidth)
						console.log('%c this.tabletMinWidth', 'font-weight: bold; color: white;');
						console.dir(this.tabletMinWidth)
						console.log('%c this.tabletMaxWidth', 'font-weight: bold; color: white;');
						console.dir(this.tabletMaxWidth)
						console.log('%c this.desktopMinWidth', 'font-weight: bold; color: white;');
						console.dir(this.desktopMinWidth)
						console.log('%c this.tallMinHeight', 'font-weight: bold; color: white;');
						console.dir(this.tallMinHeight)
					} // end log
					return false;
				}, // end afterWindowSize()
			}, // end options

			// window size flags
			isMobile: false,
			isTablet: false,
			isDesktop: false,
			isTall: false,

			/**
			 * init
			 * Initialize a new windowSize member object.
			 *
			 * @param {Collection} Options; a collection of window
			 * size specifications for each device type. See options
			 * collection above.
			 */
			init: function (Options) {
				// load optional options, optionally
				$.extend($.windowSize.options, Options || {});
				$.windowSize.update();
			}, // end init()

			/**
			 * update
			 * Updates the window size flags above based upon the
			 * specifications in options above. Ment to attach to
			 * window.onResize.
			 */
			update: function () {
				$.windowSize.isMobile = (window.innerWidth < $.windowSize.options.mobileMaxWidth);
				$.windowSize.isTablet = (window.innerWidth > $.windowSize.options.tabletMinWidth &&
						window.innerWidth < $.windowSize.options.tabletMaxWidth);
				$.windowSize.isDesktop = (window.innerWidth > $.windowSize.options.desktopMinWidth);
				$.windowSize.isTall = (window.innerHeight > $.windowSize.options.tallMinHeight);
				// run the post-update function
				$.windowSize.options.afterWindowSize();
			}, // end update()
		}, // end $.windowSize

		/**
		 * debounce
		 * Wait to run a function until a certain time has passed since the last call.
		 *
		 * @param {Function} originalFunction, original function
		 * @param {Number} timeout, timeout in milliseconds for setTimout() call
		 * @param {Array} otherArgs, an array of any other arguments needed by the function
		 * @returns {Function} a wrapper around originalFunction that limits execution
		 */
		debounce: function (originalFunction, timeout, otherArgs) {
			let timer;
			// make otherArgs optional
			otherArgs = otherArgs || [];

			return function () {
				// ignore all calls until there aren't any for the specified period
				clearTimeout(timer);
				// set a new timeout for the specified delay
				timer = setTimeout(function () {
					// call the function in context and with additional arguments
					originalFunction.apply(this, otherArgs);
				}, timeout);
			}; // return the function wrapped in a setTimeout structure
		}, // end debounce()

		/**
		 * throttle
		 * Don't run a function more often than a certain period of time.
		 *
		 * @param {Function} originalFunction, original function
		 * @param {Number} timeout, timeout in milliseconds for setTimout() call
		 * @param {Array} [otherArgs], an array of any other arguments needed by the function
		 * @returns {Function} a wrapper around originalFunction that limits execution
		 */
		throttle: function (originalFunction, timeout, otherArgs) {
			let needInvoke = true;
			// make otherArgs optional
			otherArgs = otherArgs || [];

			return function () {
				if (!needInvoke) return;

				// prevent next run
				needInvoke = false;
				// call the function in context and with additional arguments
				originalFunction.apply(this, otherArgs);
				// try again after the timeout
				setTimeout(function () { needInvoke = true; }, timeout);
			}; // end throttling wrapper
		}, // end throttle()

		/**
		 * preloadImages
		 * Allow preload of images for faster update of display.
		 *
		 * @param {String[, String, ...]} arguments, one or more strings containing valid image URLs
		 * @returns {jQuery} a jQuery object containing the preloaded images
		 */
		preloadImages: function () {
			let returnImages = jQuery('<img id="preloadImagesPlaceholder" />');

			for (let offset in arguments) {
				returnImages = returnImages.add(jQuery('<img />').prop('src', arguments[offset]));
			}

			return returnImages.filter(':not(#preloadImagesPlaceholder)');
		},
	}); // end $.extend()
})(jQuery); // end IIFE
