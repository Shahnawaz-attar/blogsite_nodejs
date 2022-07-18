

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
            if (data.success == "already_exist") {
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

$('.newsletter').on('submit',(e)=>{
    e.preventDefault();
    let email =  $('.newsletter').find('[name="email"]').val();
    $this = $('.newsletter');
    newsletter = {
        start: function() {
            $this.find(".icon").addClass("spin");
            $this.find(".icon i").removeClass("ion-ios-email-outline");
            $this.find(".icon i").addClass("ion-load-b");
            $this.find(".icon h1").html("Please wait ...");
            $this.find(".btn").attr("disabled", true);
            $this.find(".email").attr("disabled", true);
        },
        end: function() {
            $this.find(".icon").removeClass("spin");
            $this.find(".icon").addClass("success");
            $this.find(".icon i").addClass("ion-checkmark");
            $this.find(".icon i").removeClass("ion-load-b");
            $this.find(".icon h1").html("Thank you!");
            $this.find(".email").val("");				
            $this.find(".btn").attr("disabled", false);
            $this.find(".email").attr("disabled", false);
        
        },
    }

    $.ajax({
        url: '/save_newslatter',
        type: "POST",
        data: {email:email},
        dataType: 'json',
        beforeSend: function () {
            
                newsletter.start();
       
        }
        ,
        success: function (data) {
            if (data.status) {
                
            
            setTimeout(function(){
                newsletter.end();
            }   , 1000);

            setTimeout(()=>{
                $.toast({
                    text: "Thanks for subscribing!",
                    position: 'bottom-right',
                    bgcolor: '#E01A31',
                    icon: 'success',
                    heading: 'Newsletter',
                    loader: false
                },2000);
            })


        }else{
            $.toast({
                text: "Failed, network error. Please try again!",
                position: 'bottom-right',
                icon: 'error',
                heading: 'Newsletter',
                loader: false
            });

           
        }
    }
       


})
});


//search
// $('.search-form').on('submit',(e)=>{
//     e.preventDefault();
//     // through GET method
//     let search =  $('.search-form').find('[name="search"]').val();

//     $.ajax({
//         url: '/search-result/'+search,
//         type: "GET",
//         dataType: 'json',

//         success: function (data) {
//             console.log(data);
//             if (data.status) {
//                 console.log(data.data);
            
//             }else{
//                 $.toast({
//                     text: "Failed, network error. Please try again!",
//                     position: 'bottom-right',
//                     icon: 'error',
//                     heading: 'Newsletter',
//                     loader: false
//                 });

               
//             }
//         }
        


//     })
    



// });
