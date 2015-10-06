$(document).ready(function() {

	// Show Login Page
	$('.lock').bind ('click', function (e) {
		//e.preventDefault;

		$('.login-form').bPopup({
			positionStyle: 'fixed',
			opacity: 0.7,
			speed: 950,
			transition: 'slideDown',
			transitionClose: 'slideUp'
		});

	});

});