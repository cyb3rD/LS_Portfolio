// Using module pattern
var myFormAction = (function() {
	//private module area

	return {
		//public
		showForm: function() {
			$('.login-form').bPopup({
					opacity: 0.7,
					speed: 950,
					transition: 'slideDown',
					transitionClose: 'slideUp',
					onClose: function() { window.location.href = '/'; }
				});
		}, //showForm
		
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
			// change background of input field !!! change placholder style color
			//el.css({'background': '#fdd5d2', 'border':'1px solid #F97E76'});
			el.addClass('error');
		}, //creqteQtip

		// ShowTip
		showQtip: function (id) {
			var el = $('#' + id),
				tipPos = el.attr('qtip-position'),
				tipContent = el.attr('qtip-content');
			
			this.createQtip(el, tipPos, tipContent);
		},

		init: function() {
			console.log('Init of module');
			// Show Login Page
			this.showForm();
		}// init 

	} // return	
} ());

// ===================
myFormAction.init();
// ===================

var isFormValid = function() {
	// For each input
	var isValid = true;
	$("form  :input").each(function() {
		var input = $(this),
			id = $(this).attr('id');

		console.log("Field: " + id + " | Value: " + input.val());
		//check for empty string!
		if (input.val() === "") {
			//alert('ShowQtip on field: ' + id);
			myFormAction.showQtip(id);	
			$('#' + id).keydown(function() {
				$('#' + id).removeClass('error');
			});
			isValid = false;
		}
	});
	return isValid;
}

//TODO:
// Return standart submit after isFormValid() - true
$("form").submit(function (e) {
	e.preventDefault();
	if (isFormValid()) {
		alert('Validation COMPLETE!');
		// Here need to fire-up standart submit
	};
});

// Show placeholder for the old IE
$(document).ready(function() {

	if (!Modernizr.input.placeholder) {
		$('input, textarea').placeholder();
		//Label as placeholder for IE<9
		$('.pwd-label').addClass('show-label');
		$('.pwd-label').on('click', function() {
			$('.pwd-label').removeClass('show-label');
		});
	}
	
});	