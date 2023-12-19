
document.addEventListener('DOMContentLoaded', function () {
    var nomeInput = document.getElementById('nome');
    var emailInput = document.getElementById('email');
    var telefoneInput = document.getElementById('telefone');
    var senhaInput = document.getElementById('senha');
    var confirmarSenhaInput = document.getElementById('confirmar-senha');

    // Adicionando evento ao campo de nome para formatar para maiúsculas
    nomeInput.addEventListener('input', function () {
        corrigirFormatoNome(nomeInput);
        validarNome(nomeInput.value.trim());
    });

    emailInput.addEventListener('input', function () {
        validarEmail(emailInput.value.trim());
    });

    telefoneInput.addEventListener('input', function () {
        formatarTelefone(telefoneInput);
        validarTelefone(telefoneInput.value.trim());
    });

    senhaInput.addEventListener('input', function () {
        validarSenha(senhaInput.value);
    });

    confirmarSenhaInput.addEventListener('input', function () {
        validarConfirmarSenha(confirmarSenhaInput.value, senhaInput.value);
    });
});

function corrigirFormatoNome(nomeInput) {
    var nomeArray = nomeInput.value.split(' ');

    for (var i = 0; i < nomeArray.length; i++) {
        nomeArray[i] = nomeArray[i].charAt(0).toUpperCase() + nomeArray[i].slice(1).toLowerCase();
    }

    var nomeCorrigido = nomeArray.join(' ');

    nomeInput.value = nomeCorrigido;
}

function validarNome(nome) {
    var regex = /^[a-zA-ZÀ-ÿ\s']+$/;
    var mensagemErroNome = document.getElementById('mensagemErroNome');

    if (nome.trim() === "") {
        mensagemErroNome.textContent = '';
        mensagemErroNome.classList.remove('error-message');
        mensagemErroNome.classList.remove('success-message');
    } else if (!regex.test(nome)) {
        mensagemErroNome.textContent = 'O nome deve conter apenas letras.';
        mensagemErroNome.classList.remove('success-message');
        mensagemErroNome.classList.add('error-message');
    } else {
        mensagemErroNome.textContent = '';
        mensagemErroNome.classList.remove('error-message');
        mensagemErroNome.classList.add('success-message');
    }
}

function validarEmail(email) {
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var mensagemErroEmail = document.getElementById('mensagemErroEmail');

    if (email.trim() === "") {
        mensagemErroEmail.textContent = '';
        mensagemErroEmail.classList.remove('error-message');
        mensagemErroEmail.classList.remove('success-message');
    } else if (!regexEmail.test(email)) {
        mensagemErroEmail.textContent = 'O e-mail inserido não é válido.';
        mensagemErroEmail.classList.remove('success-message');
        mensagemErroEmail.classList.add('error-message');
    } else {
        mensagemErroEmail.textContent = '';
        mensagemErroEmail.classList.remove('error-message');
        mensagemErroEmail.classList.add('success-message');
    }
}


function validarTelefone(telefone) {
    var regexTelefone = /^(\d{9}|\d{11})$/;
    var mensagemErroTelefone = document.getElementById('mensagemErroTelefone');

    var telefoneLimpo = telefone.replace(/\D/g, '');

    if (telefone.trim() === "") {
        mensagemErroTelefone.textContent = '';
        mensagemErroTelefone.classList.remove('error-message');
        mensagemErroTelefone.classList.remove('success-message');
    } else if (!regexTelefone.test(telefoneLimpo)) {
        mensagemErroTelefone.textContent = 'O telefone deve ter 9 ou 11 dígitos numéricos.';
        mensagemErroTelefone.classList.remove('success-message');
        mensagemErroTelefone.classList.add('error-message');
    } else {
        mensagemErroTelefone.textContent = '';
        mensagemErroTelefone.classList.remove('error-message');
        mensagemErroTelefone.classList.add('success-message');
    }
}

function validarSenha(senha) {
    var condicoesAtendidas = 0;

    condicoesAtendidas += validarTamanhoMinimo(senha);
    condicoesAtendidas += validarLetraMaiuscula(senha);
    condicoesAtendidas += validarCaractereEspecial(senha);
    

    if (senha.trim() === "") {
        limparMensagensErroSenha();
        return;
    }
    else if (condicoesAtendidas === 3) {
        setTimeout(function () {
            var mensagemErroTamanho = document.getElementById('mensagemErroTamanho');
            var mensagemErroMaiuscula = document.getElementById('mensagemErroMaiuscula');
            var mensagemErroEspecial = document.getElementById('mensagemErroEspecial');

            mensagemErroTamanho.textContent = '';
            mensagemErroMaiuscula.textContent = '';
            mensagemErroEspecial.textContent = '';

            mensagemErroTamanho.classList.remove('error-message');
            mensagemErroMaiuscula.classList.remove('error-message');
            mensagemErroEspecial.classList.remove('error-message');

            mensagemErroTamanho.classList.remove('success-message');
            mensagemErroMaiuscula.classList.remove('success-message');
            mensagemErroEspecial.classList.remove('success-message');
        }, 3000);
    } else {
        var mensagemErroTamanho = document.getElementById('mensagemErroTamanho');
        var mensagemErroMaiuscula = document.getElementById('mensagemErroMaiuscula');
        var mensagemErroEspecial = document.getElementById('mensagemErroEspecial');

        mensagemErroTamanho.style.display = 'block';
        mensagemErroMaiuscula.style.display = 'block';
        mensagemErroEspecial.style.display = 'block';

        validarSenha();
    }
}
// Adicione esta função para limpar as mensagens de erro do campo de senha
function limparMensagensErroSenha() {
    var mensagemErroTamanho = document.getElementById('mensagemErroTamanho');
    var mensagemErroMaiuscula = document.getElementById('mensagemErroMaiuscula');
    var mensagemErroEspecial = document.getElementById('mensagemErroEspecial');

    mensagemErroTamanho.textContent = '';
    mensagemErroMaiuscula.textContent = '';
    mensagemErroEspecial.textContent = '';

    mensagemErroTamanho.classList.remove('error-message');
    mensagemErroMaiuscula.classList.remove('error-message');
    mensagemErroEspecial.classList.remove('error-message');

    mensagemErroTamanho.classList.remove('success-message');
    mensagemErroMaiuscula.classList.remove('success-message');
    mensagemErroEspecial.classList.remove('success-message');
}

function validarTamanhoMinimo(senha) {
    var mensagem = 'Mínimo de 8 caracteres.<br>';
    var condicaoAtendida = senha.length >= 8;

    atualizarMensagemEstilo('mensagemErroTamanho', mensagem, condicaoAtendida);

    return condicaoAtendida ? 1 : -1;
}

function validarLetraMaiuscula(senha) {
    var mensagem = 'Letra maiúscula.<br>';
    var condicaoAtendida = /[A-Z]/.test(senha);

    atualizarMensagemEstilo('mensagemErroMaiuscula', mensagem, condicaoAtendida);

    return condicaoAtendida ? 1 : -1;
}

function validarCaractereEspecial(senha) {
    var mensagem = 'Pelo menos 1 caractere especial.<br>';
    var condicaoAtendida = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

    atualizarMensagemEstilo('mensagemErroEspecial', mensagem, condicaoAtendida);

    return condicaoAtendida ? 1 : -1;
}

function atualizarMensagemEstilo(elementId, mensagem, condicaoAtendida) {
    var elemento = document.getElementById(elementId);

    elemento.innerHTML = mensagem;

    if (condicaoAtendida) {
        elemento.classList.remove('error-message');
        elemento.classList.add('success-message');
    } else {
        elemento.classList.remove('success-message');
        elemento.classList.add('error-message');
    }
}

function validarConfirmarSenha(confirmarSenha, senha) {
    var mensagemErroConfirmarSenha = document.getElementById('mensagemErroConfirmarSenha');

    if (confirmarSenha.trim() === "") {
        mensagemErroConfirmarSenha.textContent = '';
        mensagemErroConfirmarSenha.classList.remove('error-message');
        mensagemErroConfirmarSenha.classList.remove('success-message');
    } else if (confirmarSenha !== senha) {
        mensagemErroConfirmarSenha.textContent = 'As senhas não coincidem.';
        mensagemErroConfirmarSenha.classList.remove('success-message');
        mensagemErroConfirmarSenha.classList.add('error-message');
    } else {
        mensagemErroConfirmarSenha.textContent = '';
        mensagemErroConfirmarSenha.classList.remove('error-message');
        mensagemErroConfirmarSenha.classList.add('success-message');
    }
}

function formatarTelefone(telefoneInput) {
    var value = telefoneInput.value.replace(/\D/g, '');
    var regexTelefone = /^(\d{0,2})(\d{0,5})(\d{0,4})$/;

    telefoneInput.value = value.replace(regexTelefone, function (regex, grupo1, grupo2, grupo3) {
        var formatted = grupo1;

        if (grupo2) {
            formatted += '-' + grupo2;
        }
        if (grupo3) {
            formatted += '-' + grupo3;
        }

        return formatted;
    });
}
function togglePasswordVisibilityCadastro() {
    var senhaInput = document.getElementById("senha");
    var visibilityIconCadastro = document.getElementById("visibilityIconCadastro");

    if (senhaInput.type === "password") {
        senhaInput.type = "text";
        visibilityIconCadastro.textContent = "visibility_off";
    } else {
        senhaInput.type = "password";
        visibilityIconCadastro.textContent = "visibility";
    }
}

function toggleConfirmarSenhaVisibilityCadastro() {
    var confirmarSenhaInput = document.getElementById("confirmar-senha");
    var visibilityIconConfirmarCadastro = document.getElementById("visibilityIconConfirmarCadastro");

    if (confirmarSenhaInput.type === "password") {
        confirmarSenhaInput.type = "text";
        visibilityIconConfirmarCadastro.textContent = "visibility_off";
    } else {
        confirmarSenhaInput.type = "password";
        visibilityIconConfirmarCadastro.textContent = "visibility";
    }
}