function mostrarContraseña(idPassword,idIcon){
    let inputPassword = document.getElementById(idPassword);
    let icon = document.getElementById(idIcon);

    if(inputPassword.type == "password" && icon.classList.contains("fa-eye")){
        inputPassword.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
        
    }else{
        inputPassword.type = "password";
        icon.classList.replace("fa-eye-slash","fa-eye");
    }
}


function convierteMayusc(elemento){
    if (elemento.value != "") {
        elemento.value = elemento.value.toUpperCase();
    } else {
        Swal.fire(
            'DATO INVALIDO',
            'Proporcione un dato valido!!!'
        );
    }
}

function fechaActual() {
    var date = new Date();/*.toLocaleDateString();*/
    var year = date.getFullYear();
    var month =date.getMonth() + 1;
    var day = date.getDate();

    if (month < 10 || day < 10){
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        } 
        var fechActRecib = year + "-" + month + "-" + day;
    }else{
        var fechActRecib = year + "-" + month + "-" + day;
    }

    return fechActRecib;    
}
