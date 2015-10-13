// Using module pattern
var myFormAction = (function() {
	//private module area
	
	return {
		//public methods
		showForm: function() {
			var pwd = $('.pwd-label');
			$('.login-form').bPopup({
					opacity: 0.7,
					speed: 950,
					transition: 'slideDown',
					transitionClose: 'slideUp',
					onClose: function() { window.location.href = '/'; }
				});

			if (!Modernizr.input.placeholder) {
				$('input, textarea').placeholder();
				// Using Label as placeholder for IE<9
				// TODO: hide/display on change focus
				pwd.addClass('show-label');
				pwd.on('click', function() {
					pwd.removeClass('show-label');
				});
			}

		}, // showForm

		isFormValid: function() {
			// Default - form is valid
			var isValid = true;
			$("form  :input").each(function() {
				var input = $(this),
					id = $(this).attr('id');
				// Debug info:
				console.log("Field: " + id + " | Value: " + input.val());
				//check for empty string!
				if (input.val() === "") {
					//Show Tip
					myFormAction.showQtip(id);	
					$('#' + id).keydown(function() {
						$('#' + id).removeClass('error');
					});
					isValid = false;
				}
			});
			return isValid;
		}, //isFormValid

		validateForm: function(myForm) {
			var _this = this;
			myForm.on('submit', function(event) {
				if (_this.isFormValid()) {
					// Validation complete
					return;
				} else {
					event.preventDefault();
				};
			});
		}, //validateForm
		
		createQtip: function (el, tipPos, tipTxt) {
			if (tipPos === 'right') {
				position = {
					my: 'left center',
					at: 'right center'
				};
			} else {
				position = {
					my: 'right center',
					at: 'left center'
				};
			}
			// Create tip
			el.qtip({
				content: {
					text: function() {
						return tipTxt;
					}
				},
				show: {
					event: 'show'
				},
				hide: {
					event: 'keydown hideTooltip'
				},
				position: position,
				style: {
					classes: 'qtip-rounded my-qtip-class',
					tip: {
            			corner: true,
            			height: 9,
            			width: 10
        			}
				}
			}).trigger('show');
			el.addClass('error');
		}, //creqteQtip

		// ShowTip
		showQtip: function (id) {
			var el = $('#' + id),
				tipPos = el.attr('qtip-position'),
				tipContent = el.attr('qtip-content');
			
			this.createQtip(el, tipPos, tipContent);
		}, // ShowTip

		init: function(myForm) {
			console.log('Init of module');
			var _this = this;
			// Show Login Page
			_this.showForm();
			_this.validateForm(myForm);
			//this.validateForm();
		} // init 

	} // return	
} ());

$(document).ready(function() {
	myFormAction.init($('form'));
});	