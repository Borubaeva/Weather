const input=document.querySelector('input')
const btn=document.querySelector('button')
const city=document.getElementById('city')
const temp=document.getElementById('temp')
const weather=document.getElementById('weather')
const wind=document.getElementById('wind')
const humidity=document.getElementById('humidity')
const img=document.getElementById('img')

const url='https://api.openweathermap.org/data/2.5/weather?q='
const apiKey='f631ea87daddf959f8d7a12c30009e4c'
const imgUrl='https://openweathermap.org/img/wn/'

async function getCity(name) {
    try {
        const response=await fetch(url+name+'&appid='+apiKey);
        const data=await response.json();

        if(response){
            showCity(data);
        }else{
            showError('Город не найден. Пожалуйста, введите действительное название города');
        }
    } catch(error){
        console.log(error);
        showError('Ошибка');
    }
}

function showCity(obj){
    city.innerHTML=obj.name
    temp.innerHTML=`${Math.round(obj.main.temp-273.15)}  °C`
    weather.innerHTML=obj.weather[0].main
    wind.innerHTML=`Wind: ${obj.wind.speed} km/h`
    humidity.innerHTML=`Humidity: ${obj.main.humidity}`
    img.src=`${imgUrl+obj.weather[0].icon}@2x.png`
}

function showError(message) {
    city.innerHTML='';
    temp.innerHTML='';
    weather.innerHTML='';
    wind.innerHTML='';
    humidity.innerHTML='';
    img.src='';

    city.innerHTML=message;
}

btn.onclick=()=>{
    getCity(input.value)
}
