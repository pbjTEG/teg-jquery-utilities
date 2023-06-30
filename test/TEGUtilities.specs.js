describe('TEGUtilities', function() {

	describe('between()', function() {

		// jQuery.between()
		it('jQuery.between: value 5 should be between 1 and 10', function() {
			expect(jQuery.between(5, 1, 10)).toBe(true);
		});

		it('jQuery.between: value 10 should not be between 1 and 10 when inclusve is false', function() {
			expect(jQuery.between(10, 1, 10)).toBe(false);
		});

		it('jQuery.between: value 10 should be between 1 and 10 when inclusve is true', function() {
			expect(jQuery.between(10, 1, 10, true)).toBe(true);
		});

		// jQuery.fn.between()
		it('jQuery.fn.between: value of input field (5) should be between 1 and 10', function() {
			expect(jQuery('#betweenField').between(1, 10)).toBe(true);
		});

		it('jQuery.fn.between: value of input field (10) should not be between 1 and 10 when inclusive is false', function() {
			expect(jQuery('#betweenFieldNotInclusive').between(1, 10)).toBe(false);
		});

		it('jQuery.fn.between: value of input field (10) should be between 1 and 10 when inclusive is true', function() {
			expect(jQuery('#betweenFieldNotInclusive').between(1, 10, true)).toBe(true);
		});
	}); // end describe('between()')

	describe('fieldType()', function() {

		it('should be button', function() {
			expect(jQuery('#button').fieldType()).toBe('button');
		});

		it('should be checkbox', function() {
			expect(jQuery('#checkbox').fieldType()).toBe('checkbox');
		});

		it('should be div', function() {
			expect(jQuery('#div').fieldType()).toBe('div');
		});

		it('should be hidden', function() {
			expect(jQuery('#hidden').fieldType()).toBe('hidden');
		});

		it('should be radio', function() {
			expect(jQuery('[name="radio"]').fieldType()).toBe('radio');
		});

		it('should be select-one', function() {
			expect(jQuery('#select-one').fieldType()).toBe('select-one');
		});

		it('should be select-multiple', function() {
			expect(jQuery('#select-multiple').fieldType()).toBe('select-multiple');
		});

		it('should be text', function() {
			expect(jQuery('#text').fieldType()).toBe('text');
		});

		it('should be textarea', function() {
			expect(jQuery('#textarea').fieldType()).toBe('textarea');
		});

		it('should be submit', function() {
			expect(jQuery('#buttonButton').fieldType()).toBe('submit');
		});
	}); // end describe('fieldType()')

	describe('getAny()', function() {

		it('#button should be "Button"', function() {
			expect(jQuery('#button').val('Button').getAny()).toBe('Button');
		});

		it('#checkbox be "checkbox"', function() {
			expect(jQuery('#checkbox').val('checkbox').prop('checked', true).getAny()).toBe('checkbox');
		});

		it('#div should be empty string', function() {
			expect(jQuery('#div').prop('value', '').getAny()).toBe('');
		});

		it('#hidden should be "hidden value"', function() {
			expect(jQuery('#hidden').val('hidden value').getAny()).toBe('hidden value');
		});

		it('[name="radio"] should be "radio01"', function() {
			jQuery('#radio01').click();
			expect(jQuery('[name="radio"]').getAny()).toBe('radio01');
		});

		it('#select-one should be "anoption"', function() {
			expect(jQuery('#select-one').val('anoption').getAny()).toBe('anoption');
		});

		it('#select-multiple should be ["anoption", "anotheroption"]', function() {
			expect(jQuery('#select-multiple').val(['anoption', 'anotheroption']).getAny()).toEqual(['anoption', 'anotheroption']);
		});

		it('getAny #text should be "text"', function() {
			expect(jQuery('#text').val('text').getAny()).toBe('text');
		});

		it('#textarea should be textarea', function() {
			expect(jQuery('#textarea').val('This is a text area.').getAny()).toBe('This is a text area.');
		});

		it('#buttonButton should be empty string', function() {
			expect(jQuery('#buttonButton').prop('value', '').getAny()).toBe('');
		});
	}); // end describe('getAny()')

	describe('setAny()', function() {

		it('#button should be "foo"', function() {
			expect(jQuery('#button').setAny('foo').val()).toBe('foo');
		});

		it('#checkbox should be true if "checkbox" and false if "foo"', function() {
			expect(jQuery('#checkbox').setAny('checkbox').is(':checked')).toBeTrue();
			expect(jQuery('#checkbox').setAny('foo').is(':checked')).toBeFalse();
		});

		it('#div should be "foo"', function() {
			expect(jQuery('#div').setAny('foo').val()).toBe('foo');
		});

		it('#hidden should be "new hidden value"', function() {
			expect(jQuery('#hidden').setAny('new hidden value').val()).toBe('new hidden value');
		});

		it('setAny "radio02" on [name="radio"] should be should select #radio02', function() {
			jQuery('[name="radio"]').setAny('radio02');
			expect(jQuery('#radio02').is(':checked')).toBeTrue();
		});

		it('#select-one should be "Another option"', function() {
			expect(jQuery('#select-one').setAny('Another option').val()).toBe('Another option');
		});

		it('setAny ["anotheroption", "athirdoption"] on #select-multiple should be ["anotheroption", "athirdoption"]', function() {
			expect(jQuery('#select-multiple').setAny(['anotheroption', 'athirdoption']).val()).toEqual(['anotheroption', 'athirdoption']);
		});

		it('setAny #text should be "new text"', function() {
			expect(jQuery('#text').setAny('new text').val()).toBe('new text');
		});

		it('#textarea should be "new text"', function() {
			expect(jQuery('#textarea').setAny('new text').val()).toBe('new text');
		});

		it('#buttonButton should be "foo"', function() {
			expect(jQuery('#buttonButton').setAny('foo').val()).toBe('foo');
		});
	}); // end describe('setAny()')

	describe('windowSize', function() {
		beforeEach(function() {
			jQuery.windowSize.init({
				                       mobileMaxWidth  : 600,
				                       tabletMinWidth  : 599,
				                       tabletMaxWidth  : 961,
				                       desktopMinWidth : 968,
				                       tallMinHeight   : 820,
				                       // allow customizable callback
				                       afterWindowSize : function() {
					                       return 'afterWindowSize() has run';
				                       }, // end afterWindowSize()
			                       });
		});

		it('should initialize', function() {
			expect(jQuery.windowSize.options.afterWindowSize()).toBe('afterWindowSize() has run');
			expect(jQuery.windowSize.options.mobileMaxWidth).toBe(600);
			expect(jQuery.windowSize.options.tabletMinWidth).toBe(599);
			expect(jQuery.windowSize.options.tabletMaxWidth).toBe(961);
			expect(jQuery.windowSize.options.desktopMinWidth).toBe(968);
			expect(jQuery.windowSize.options.tallMinHeight).toBe(820);
		});

		it('should update', function() {
			jQuery.windowSize.options.mobileMaxWidth = window.innerWidth + 10;
			jQuery.windowSize.options.tabletMinWidth = window.innerWidth * 2;
			jQuery.windowSize.options.tabletMaxWidth = window.innerWidth * 2;
			jQuery.windowSize.options.desktopMinWidth = window.innerWidth * 2;
			jQuery.windowSize.options.tallMinHeight = window.innerHeight * 2;
			jQuery.windowSize.update();
			expect(jQuery.windowSize.isMobile).toBeTrue();
			expect(jQuery.windowSize.isTablet).toBeFalse();
			expect(jQuery.windowSize.isDesktop).toBeFalse();
			expect(jQuery.windowSize.isTall).toBeFalse();
		});
	}); // end describe('windowSize')

	describe('debounce() and throttle()', function() {
		window.runCount = 0;
		window.debounceCount = 0;
		window.throttleCount = 0;
		window.timer;

		window.spiedUpon = {
			debounced : jQuery.debounce(function() {
				                            debounceCount++;
				                            if (window.runCount < 300) {
					                            window.timer = setTimeout(spiedUpon.debounced, 200);
					                            runCount++;
				                            }
			                            },
			                            4000),
			throttled : jQuery.throttle(function() {
				                            throttleCount++;
				                            if (window.runCount < 300) {
					                            window.timer = setTimeout(spiedUpon.throttled, 200);
					                            runCount++;
				                            }
			                            },
			                            4000),
		};

		beforeAll(function() {
			jasmine.clock().install();
			spyOn(spiedUpon, 'debounced').and.callThrough();
			spyOn(spiedUpon, 'throttled').and.callThrough();
		}); // end beforeEach()

		afterAll(function() {
			jasmine.clock().uninstall();
		});

		it('should be a function debounced', function() {
			window.runCount = 0;
			clearTimeout(window.timer);
			spiedUpon.debounced();
			jasmine.clock().tick(5000);
			expect(spiedUpon.debounced).toHaveBeenCalledTimes(2);
			expect(window.debounceCount).toBe(1);
		}); // it 'should be function debounced'

		it('should be a function throttled', function() {
			window.runCount = 0;
			clearTimeout(window.timer);
			spiedUpon.throttled();
			jasmine.clock().tick(5000);
			expect(spiedUpon.throttled).toHaveBeenCalledTimes(2);
			expect(window.throttleCount).toBe(1);
		}); // it 'should be function debounced'

	}); // end describe('debounce() and throttle())

	describe('preloadImages()', function() {

		it('should be preloaded', function() {
			let isLoaded  = true,
			    loadedSrc = [];

			// run the preloader and check if all the elements in the returned array have a source in the list of images
			jQuery.preloadImages('preloadImages/carousel-defenders1.jpg', 'preloadImages/ff-20.jpg', 'preloadImages/hero-tscl-2.jpg')
			      .each(function() {
				      let thisSrc = jQuery(this).attr('src');
				      loadedSrc.push(thisSrc);

				      if (!['preloadImages/carousel-defenders1.jpg', 'preloadImages/ff-20.jpg', 'preloadImages/hero-tscl-2.jpg'].includes(thisSrc)) {
					      isLoaded = false;
				      }
			      });

			// check if all members of the list of images are in the array taken from the generated img elements
			['preloadImages/carousel-defenders1.jpg', 'preloadImages/ff-20.jpg', 'preloadImages/hero-tscl-2.jpg']
				.forEach(function(currentSrc) {

					if (!loadedSrc.includes(currentSrc)) {
						isLoaded = false;
					}
				});
			expect(isLoaded).toBeTrue();
		});
	}); // end describe('preloadImages()')

	describe('addCMSLandmarks', () => {
		beforeAll(() => {
			jQuery('[class*="aria-landmark-"]').addCMSLandmarks();
		})
		it('should add a role for valid landmark values', () => {
			expect(jQuery('[role="banner"]').length).toBe(1);
			expect(jQuery('[role="navigation"]').length).toBe(1);
			expect(jQuery('[role="contentinfo"]').length).toBe(1);
		}); // end it('should add a role for valid landmark values')
		it('should exclude invalid landmarks', () => {
			expect(document.querySelector('[role="header"]')).toBeNull();
		}); // end it('should exclude invalid landmarks')
	}); // end describe('addCMSLandmarks')

	describe('getCSSPath', () => {
		it('should get the path of an element', () => {
			expect(jQuery('label[for="text"]').getCSSPath()).toBe('label:nth-child(21)');
			expect(jQuery('#select-multiple').getCSSPath()).toBe('#select-multiple');
			expect(jQuery('.aria-landmark-navigation').getCSSPath()).toBe('div.aria-landmark-navigation');
		}); // end it('should get the path of an element')
	})
}); // end describe('specs')
