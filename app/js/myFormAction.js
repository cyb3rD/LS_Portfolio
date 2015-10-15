// Using module pattern
var myFormAction = (function() {
	//private module area
	var _closeProject = $('.close-project'),
		_formProject = $('.add-project-form');
		_pwdPlaceholder = $('.pwd-label'),
		_addProjectField = $('.new'),
		_inputPlaceholder = $('input, textarea');
	
	function _closeForm(myForm) {
		_closeProject.on('click', function(event) {
			event.preventDefault();
			console.log('Close "Add Project" Form');
			_formProject.bPopup().close(); 
			myForm.trigger('reset');
			$('input[type=text], textarea').each(function() {
				var input = $(this);
				console.log('Clear "Add Project" Data');
				input.val('');
			});
		});
	}; // closeform

	function _showForm(myForm) {
		//AddProject Form
		_addProjectField.bind('click', function(e){
 			e.preventDefault();
			_formProject.bPopup({
				modalClose: false,
				opacity: 0.7,
				speed: 950,
				transition: 'slideDown',
				transitionClose: 'slideUp',
				onClose: function() {
					_clearForm(myForm);
				}
			});
		});

		if (!Modernizr.input.placeholder) {
			_inputPlaceholder.placeholder();
			// Using Label as placeholder for IE<9
			// TODO: hide/display on change focus
			_pwdPlaceholder.addClass('show-label');
			_pwdPlaceholder.on('click', function() {
				_pwdPlaceholder.removeClass('show-label');
			});
		}

	}; // showForm

	function _isFormValid() {
		// Default - form is valid
		var isValid = true;
		$("form  :input").each(function() {
			var input = $(this),
				id = $(this).attr('id');
			// Debug info:
			console.log("Field: " + id + " | Value: " + input.val());
			//check for empty string!
			if ((input.val() === "") && (id !== "upload-file")) {
				//Show Tip
				_showQtip(id);	
				console.log(id);
				$('#' + id).keydown(function() {
					$('#' + id).removeClass('error');
				});
				isValid = false;
			}
		});
		return isValid;
	}; // isFormValid

	function _validateForm(myForm) {
		//var _this = this;
		myForm.on('submit', function(event) {
			if (_isFormValid()) {
				// Validation complete
				return;
			} else {
				event.preventDefault();
			};
		});
	}; // validateForm
	
	function _clearForm(myForm, isFormClosed) {
		//var isFormClosed = false;
		myForm.on('reset', function() {
			console.log('Clear Form!');
			//TODO: Refactor
			myForm.find('input, textarea').trigger('hideTooltip');
			myForm.find('input, textarea').removeClass('error');
		});
	}; // clearForm
	
	function _fileUpload(myForm) {
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
	}; // fileUpload

	function _createQtip(el, tipPos, tipTxt) {
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
	}; // creqteQtip

	function _showQtip(id) {
		var el = $('#' + id),
			tipPos = el.attr('qtip-position'),
			tipContent = el.attr('qtip-content');
		
		_createQtip(el, tipPos, tipContent);
	}; // ShowTip

	return {
		//public methods
		init: function(myForm) {
			//var _this = this;
			console.log('Init of module');
			_showForm(myForm);
			_validateForm(myForm);
			_clearForm(myForm);
			_fileUpload(myForm);
			_closeForm(myForm);
		} // init 

	} // return	
} ());

$(document).ready(function() {
	// call public method 
	myFormAction.init($('form'));
});	