async function buscaEndereco(cep) {
    var mensagemErroCEP = document.getElementById('erroCEP');
    mensagemErroCEP.innerHTML = "";

    var mensagemErroEndereco = document.getElementById('erroEndereco');
    mensagemErroEndereco.innerHTML = "";

    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }
        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');

        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        mensagemErroCEP.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        mensagemErroEndereco.innerHTML = `<p>Endereço inválido. Tente novamente!</p>`
        console.log(erro);
    }
}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));
