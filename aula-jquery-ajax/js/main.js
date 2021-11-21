function consultaCep(){
    $(".progress-bar").show();
    let cep = document.querySelector("#cep").value;

    $.ajax({
        url: `https://viacep.com.br/ws/${cep}/json`,
        type: "GET",
        success: function(response){
            // document.querySelector("#logradouro").innerHTML = response.logradouro;
            // document.querySelector("#bairro").innerHTML = response.bairro;
            // document.querySelector("#localidade").innerHTML = response.localidade;
            // document.querySelector("#uf").innerHTML = response.uf;
            $("#logradouro").html(response.logradouro);
            $("#bairro").html(response.bairro);
            $("#localidade").html(response.localidade);
            $("#uf").html(response.uf);
            $("#titleCep").html("CEP " + response.cep);
            $(".cep").show();
            $(".progress-bar").hide();
        }
    })
}
$(function(){
    $(".cep").hide();
    $(".progress-bar").hide();
})