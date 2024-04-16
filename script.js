document.querySelector('.busca').addEventListener('submit', async(event)=>{

    //impede o comportamento padrão, que seria recarregar a página
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    //console.log(input);

    //Essa condicional impede que você mande dados vazios, ou seja, precisa digitar algo para enviar os dados.
    if (input !== ''){

        showWarning('Buscando...');
        

        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&units=metric&lang=pt_br&appid=b65e87334c58ded192d78a45c1a2cfe0
        `)

        let json = await results.json();

        //console.log(json);

        if (json.cod === 200){
            showInfo({
                name : json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }else{
            showWarning('Cidade não encontrada!');
        }

    }
})


function showInfo(json){
    showWarning('');


    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;

    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;

    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', ` https://openweathermap.org/img/wn/${json.tempIcon}.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    
    //alterando o display do elemento .aviso para que ele seja exibido na tela
    document.querySelector('.resultado').style.display ='block';
}


function showWarning(msg){

    document.querySelector('.aviso').innerHTML = msg;


}