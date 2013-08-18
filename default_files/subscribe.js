// JavaScript Document

$(document).ready(function(){
// You may modify the messages that the user receives below
	var invalidEmailError	= "You have entered an invalid e-mail address";
	var duplicateEmailError	= "E-mail address already subscribed";
	var serverError			= "An error occurred. Please try again";
	var successMessage		= "Thanks for signing up!";

	$(".userMessage").hide();
	$(".ajaxLoadImg").hide();
	
    $('form#notify').bind('submit', function(e){
		$(".userMessage").hide();
		$(".ajaxLoadImg").show();
		var emailtext  = $('input#emailtext').val();
        e.preventDefault();
		
		$.ajax({
			type: 'POST',
			url: 'php/subscribe.php?emailtext='+emailtext,
			data: '',
			success: function(submissionResult){
				$(".userMessage").fadeIn("slow");
				$(".userMessage").animate({opacity: 1.0}, 3000);
				$(".userMessage").fadeOut(1500);
				
				if (submissionResult == 1) {
					$(".userMessage").html(successMessage);
				}
				if (submissionResult == 2) {
					$(".userMessage").html(invalidEmailError);
				}
				if (submissionResult == 3) {
					$(".userMessage").html(duplicateEmailError);
				}
				$(".ajaxLoadImg").hide();
			},
			error: function(){
				$(".userMessage").html(serverError);
				$(".ajaxLoadImg").hide();
			}		
		});
	});
			
});