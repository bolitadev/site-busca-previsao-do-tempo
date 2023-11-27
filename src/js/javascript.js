const chaveDaApi = "400c494a8d9a44c986a172909232411";

const botaoDeBusca = document.querySelector(".btn-busca");
const campoDeBusca = document.getElementById("input-busca");

botaoDeBusca.addEventListener("click", async () => {
    const cidade = campoDeBusca.value;
    const dados = await buscarDadosDaCidade(cidade);
    preencherDadosNaTela(dados, cidade);
});

campoDeBusca.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
        const cidade = campoDeBusca.value;
        const dados = await buscarDadosDaCidade(cidade);
        preencherDadosNaTela(dados, cidade);
    }
});

async function buscarDadosDaCidade(cidade) {
    const apiurl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}&q=${cidade}&aqi=no&lang=pt`;

    try {
        const response = await fetch(apiurl);
        const dados = await response.json();

        console.log(dados);
        
        return dados;
    } catch (error) {
        
        return null;
    }
}

function preencherDadosNaTela(dados, cidade) {
    const temperatura = dados.current.temp_c;
    const condicao = dados.current.condition.text;
    const humidade = dados.current.humidity;
    const velocidadeDoVento = dados.current.wind_kph;
    const iconeCondicao = dados.current.condition.icon;

    document.getElementById("cidade").textContent = cidade;
    document.getElementById("temperatura").textContent = dados.current.temp_c + "°C";
    document.getElementById("condicao").textContent = dados.current.condition.text;
    document.getElementById("humidade").textContent = dados.current.humidity + "%";
    document.getElementById("velocidade-do-vento").textContent = dados.current.wind_kph + " km/h";
    // Aqui, você pode definir a lógica para a imagem baseada nos dados recebidos
    document.getElementById("icone-condicao").src = dados.current.condition.icon;
}
