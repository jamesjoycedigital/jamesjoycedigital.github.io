$(function () {    

    // when the form is submitted
    $('#contact-form').on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "/home/contact";        
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data) {

                    if (data === 'success') {
                        $('#myModalLabel').html('<span style ="color:green;"><em>Message sent successfully.</em></span>');
                        $('#contact-form')[0].reset();
                    }
                    else {
                        console.log(data);
                        $('#myModalLabel').html('<span style ="color:red;">An error has occured.</span>');                        
                    } 
                    
                    //$('#modelcontact').modal('hide');
                }
            });

            
            return false;
        }
    })
});