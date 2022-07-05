




$(document).on('change', '#Multifileupload', function () {
    var MultifileUpload = document.getElementById("Multifileupload");

    if (typeof (FileReader) != "undefined") {
        var MultidvPreview = document.getElementById("MultidvPreview");
        MultidvPreview.innerHTML = "";

        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
        for (var i = 0; i < MultifileUpload.files.length; i++) {
            var file = MultifileUpload.files[i];
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = document.createElement("IMG");
                img.height = "100";
                img.width = "100";

                img.src = e.target.result;
                img.id = "Multifileupload_image";
                MultidvPreview.appendChild(img);
                $("#Multifileupload_button").show();
            }
            reader.readAsDataURL(file);
        }
    } else {
        alert("This browser does not support HTML5 FileReader.");
    }
});


$(function () {
    $("#Formuser2").on('submit', function (e) {
        e.preventDefault();

        var formData = new FormData($("#Formuser2")[0]);




        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger mr-2'
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Submit it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: $("#Formuser2").attr('action'),
                    type: 'post',

                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        console.log(response);
                        if (response.status == 'success') {
                            toastr["success"](response.message);
                            $('#Formuser2')[0].reset();
                            $('.login-form').modal('hide')
                            window.setTimeout(function () {
                                window.location = base_url + response.url;
                            }, 2000);
                        } else {
                            toastr["error"](response.message);

                        }

                    }
                });
            }

        });

    });
});
$(function () {
    $(".upload_data").on('submit', function (e) {
        e.preventDefault();

        var formData = new FormData($(".upload_data")[0]);



        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger mr-2'
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Submit it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: $(".upload_data").attr('action'),
                    type: "POST",
                    data: formData,
                    contentType: false,
                    processData: false,
                    dataType: 'json',
                    success: function (response) {
                        if (response.status) {
                            toastr["success"](response.msg);
                            $('.upload_data')[0].reset();

                            window.setTimeout(function () {
                                window.location = response.url;
                            }, 2000);
                        } else {
                            alert()
                            toastr["error"](response.msg);

                        }

                    }
                });
            }

        });

    });
});

$('.deleteuni').on('click', function (e) {
    e.preventDefault();
    // delete by get method
    $.ajax({
        url: $(this).attr('href'),
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.status) {
                toastr["success"](response.msg);
                window.setTimeout(function () {
                    window.location = response.url;
                }, 2000);
            } else {
                toastr["error"](response.msg);
            }
        }

    });
    
    

})
