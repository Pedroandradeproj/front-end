
function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password");
    var visibilityIcon = document.getElementById("visibilityIcon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        visibilityIcon.textContent = "visibility_off";
    } else {
        passwordInput.type = "password";
        visibilityIcon.textContent = "visibility";
    }
}
