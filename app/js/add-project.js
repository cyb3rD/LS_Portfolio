$(document).ready(function() {
	
	// Show Login Page
	$('.new').bind('click', function(e){
	 	e.preventDefault();
		$('.add-project-form').bPopup({
			opacity: 0.7,
			speed: 950,
			transition: 'slideDown',
			transitionClose: 'slideUp'
		});
	});	
		
});