/*!
 * RADAR Core Form JS
 *
 * http:radar.coxbusiness.com
 *
 */
$(document).ready(function() {
    validateform();
});

function validateform() {

    jQuery.validator.addMethod("email", function(value, element) {
        return /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/.test(value);
    }, "Please enter a valid phone number using the format nnn-nnnn");

    jQuery.validator.addMethod("areacode", function(value, element) {
        return /^[2-9]{1}[0-9]{2}$/.test(value);
    }, "Please enter a valid phone number using the format nnn-nnnn");

    jQuery.validator.addMethod("phone", function(value, element) {
        return /^(\(?[2-9]{1}[0-9]{2}\)?[\s\.-]?){1}([0-9]{4})$/.test(value);
    }, "Please enter a valid phone number using the format nnn-nnnn");

    jQuery.validator.addMethod("zipcode", function(value, element) {
        return /^\d{5}$/.test(value);
    }, "Please enter a valid 6 digit zipcode");

    // validatation
    $("#radarleadForm").validate({

        errorPlacement: function(error, element) {
            //Using a class to show errors instead of messages
        },
        highlight: function(element, errorClass, validClass) {
            $(element).parent().addClass('error');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parent().removeClass('error');
        },
        rules: {
            fname: "required",
            lname: "required",
            phone: "phone",
            market_state: "required",
            company: "required",
            zip: 'zipcode',
            areacode: 'areacode',
            email: {
                required: true,
                email: true
            },
        },
        //submit form
        submitHandler: function(form) {
            console.log('test');
            sendform();
        }
    });
}

function sendform() {
    var formData = $('#radarleadForm').serialize();
    $.ajax({
        type: 'POST',
        url: 'https://ssl.hostingplatform.com/radar2.coxbusiness.com/getSubmissions/process-ajax-requests.php',
        data: formData,
        dataType: 'json',
        success: function(resp) {
            if (resp.success === true) {
                console.log(resp.success + 'Successful');
            } else {
                console.log(resp.success + 'Failure');
                //++++++++++++++++++Add failure code here+++++++++++++++++++++++++
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            }
        }
    });
}