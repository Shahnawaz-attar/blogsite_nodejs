

// admin login just serialize the form and send it to the server
$('.checklogin_form').on('submit', function (e) {
    e.preventDefault();

    var btn = $(this).find('[type="submit"]');
    var post = $(this).serialize();
    $.ajax({
        url: $(this).attr('action'),
        type: "POST",
        data: post,
        dataType: 'json',
        beforeSend: function () {
            btn.html("Loading...");
        }
        ,
        success: function (data) {
            console.log(data)
            if (data.success == "fail") {
                $.each(data.errors, (index, value) => {
                    $.each(value, (index, value) => {
                        $('.checklogin_form').find('[name="' + value.param + '"]').parents('.form-group').find('.error').html(value.msg).css('color', 'red').fadeIn().delay(3000).fadeOut();
                    })
                })
                
            }
            if (data.success == "not_found") {
                $('.checklogin_form').find('.cust-error-show').removeAttr('hidden').html(data.msg).fadeIn().delay(3000).fadeOut();
            }
            if (data.success == "success") {
                window.location = data.url
            }
        }
        ,
        complete: function (data) {
            btn.html("Login");
        }


    });



});

