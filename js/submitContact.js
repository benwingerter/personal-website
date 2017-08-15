document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var message = document.getElementById("message").value.trim();
    var checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(checkEmail.test  (email) && name !== "" && message !== "") {
        var data = {
            name: name,
            email: email,
            message: message
        }
        if(phone !== "") {
            data.phone = phone
        }

        $.ajax({
            url: "/api/contact/submitContact",
            method: "POST",
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function() {
            console.log("success");
            document.getElementById("formContainer").style.display="none";
            document.getElementById("successMessage").style.display="block";
        }).fail(function() {
            console.log("FAIL");
            showErrorMessage("Oops. The server had an error");
        });
    } else {
        showErrorMessage("Please enter valid data");
    }
});

function showErrorMessage(message) {
    var errorMessage = document.getElementById("errorMessage")
    errorMessage.innerHTML=message;
    errorMessage.style.display="block";
}
