// Using module pattern
var myFormAction = (function() {
	//private module area
	
	return {
		//public methods
		closeForm: function(myForm) {
			$('.close-project').on('click', function(event) {
				event.preventDefault();
				console.log('Close "Add Project" Form');
				$('.add-project-form').bPopup().close(); 
				myFormAction.clearForm(myForm);
			});
		}, // closeform

		showForm: function(myForm) {
			var pwd = $('.pwd-label');
			//Login Form
			$('.login-form').bPopup({
					opacity: 0.7,
					speed: 950,
					transition: 'slideDown',
					transitionClose: 'slideUp',
					onClose: function() { 
						myFormAction.clearForm(myForm);
						window.location.href = '/'; }
				});
			//AddProject Form
			$('.new').bind('click', function(e){
	 			e.preventDefault();
				$('.add-project-form').bPopup({
					modalClose: false,
					opacity: 0.7,
					speed: 950,
					transition: 'slideDown',
					transitionClose: 'slideUp',
					onClose: function() {
						myFormAction.clearForm(myForm);
					}
				});
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
			//var _this = this;
			myForm.on('submit', function(event) {
				if (myFormAction.isFormValid()) {
					// Validation complete
					return;
				} else {
					event.preventDefault();
				};
			});
		}, //validateForm
		
		clearForm: function(myForm) {
			myForm.on('reset', function() {
				console.log('Clear Form!');
				//TODO: Refactor
				myForm.find('input, textarea').trigger('hideTooltip');
				myForm.find('input, textarea').removeClass('error');
			});
		},
		
		fileUpload: function(myForm) {
			$('#upload-file').on('change', function() {			
				var input = $(this), 
					// IE:
					// need to use $(this).val() 
					// instead input[0].files[0].name,
					// TODO: remove fakepath with RegExp
					fileName = input.val(),
					fakeInput = $('#fake-upload');
				console.log('Выбран файл: ' + fileName);
				fakeInput.val(fileName);
			});
		},

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
			
			myFormAction.createQtip(el, tipPos, tipContent);
		}, // ShowTip

		init: function(myForm) {
			var _this = this;
			console.log('Init of module');
			_this.showForm(myForm);
			_this.validateForm(myForm);
			_this.clearForm(myForm);
			_this.fileUpload(myForm);
			_this.closeForm(myForm);
		} // init 

	} // return	
} ());

$(document).ready(function() {
	myFormAction.init($('form'));
});	