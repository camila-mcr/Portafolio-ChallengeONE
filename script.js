const nameContact = document.getElementById("name_contact");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const textArea = document.getElementById("message");
const button = document.querySelector("[data-form-btn]");
const inputs = document.querySelectorAll("input");


// MENSAJES PERSONALIZADOS-------------------

const errorType = [
    "valueMissing",
    "customError",
    "typeMismatch",
];

const errorMessage = {
    name_contact: {
        valueMissing: "Este campo no puede estar vacío.",
        customError: "Debe contener máximo 50 caracteres."
    },
    email: {
        valueMissing: "Este campo no puede estar vacío.",
        typeMismatch: "Debe incluir un '@' seguido de un dominio o proveedor seguido de un punto(.). Ejemplo: texto@texto.com"
    },
    subject: {
        valueMissing: "Este campo no puede estar vacío.",
        customError: "Debe contener máximo 50 caracteres."
    },
    message: {
        valueMissing: "Este campo no puede estar vacío.",
        customError: "Debe contener máximo 300 caracteres."
    }
}

// VALIDACIÓN DE DATOS-------------------------------


inputs.forEach( (input) => {
    input.addEventListener("blur", (input) => {
        validate(input.target);
    });
});


textArea.addEventListener("blur", (input) => {
    validate(input.target);
});


function validarNombre(input) {
    let mensaje = "";
    if (input.value.length > 50){
        mensaje = "Máximo 50 caracteres.";
    };

    input.setCustomValidity(mensaje);
};


function validarMensaje(input) {
    let mensaje = "";
    if (input.value.length > 300){
        mensaje = "Máximo 300 caracteres.";
    };

    input.setCustomValidity(mensaje);
};


function validate(input){
    const inputType = input.id;

    if (validators[inputType]) {
        validators[inputType](input);
    };


    if (input.validity.valid === false) {
        input.parentElement.classList.add("error");
        input.parentElement.querySelector(".error__message").innerHTML = showErrorMessage(inputType, input);
    } else {
        input.parentElement.classList.remove("error");
        input.parentElement.querySelector(".error__message").innerHTML = "";
    };
};


const validators = {
    name_contact: (input) => validarNombre(input),
    message: (input) => validarMensaje(input),
};


function showErrorMessage(inputType, input){
    let message = "";
    errorType.forEach(error =>{
        if (input.validity[error]) {
            message = errorMessage[inputType][error];
        };
    });

    return message;
};

