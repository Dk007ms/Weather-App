const search_bar=document.querySelector("#search_bar");
const search_btn=document.querySelector(".search-icon-btn");
const loader=document.querySelector(".loader");
const sunnyimage=document.querySelector(".sunny");
const cloudyimage=document.querySelector(".cloudy");
const rainimage=document.querySelector(".rain");
const thunderimage=document.querySelector(".thunder");
const smokeimage=document.querySelector(".smoke");
const haze=document.querySelector(".haze");
const snowimage=document.querySelector(".snow");
const allweather=document.querySelector(".allweather");
const fog=document.querySelector(".fog");
const tempratue=document.querySelector(".tempratue");
const cityname=document.querySelector(".cityname");
const humidlevel=document.querySelector("[humidity]");
const aqi=document.querySelector("[aqi]");
const speed=document.querySelector("[speed]");
const aqi_remark=document.querySelector("[aqi_remark]");
const notfound=document.querySelector(".not_found");
const footer_windspeed_aqi_humidity=document.querySelector(".footer-windspeed-aqi-humidity");
const weather_names=['Haze','Sunny','Cloudy','Fog','Rain','Thunderstorm','Snow'];
const weather_text=document.querySelector(".weather_text");
let slider_box = document.querySelector(".slider_box");
let slider = document.querySelector(".slider");
let placeholder = document.querySelector(".placeholder");
const myLocate=document.querySelector(".Locate_me");
const temp_name_container=document.querySelector(".temp-name-container");

getLocation().then((position)=>{
	let longitude=position.coords.longitude;
	let latitude=position.coords.latitude;
  startapp(longitude,latitude);
});
getLocation().catch(err=>alert(err));

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1f21af647dmshd754685e945c686p13c8ddjsn91cbe03e84f1',
		'X-RapidAPI-Host': 'the-weather-api.p.rapidapi.com'
	}
};
async function weather(mycity) {
	temp_name_container.style.display="none";
	footer_windspeed_aqi_humidity.style.display="none";
	weather_text.style.display="none";
	notfound.style.display="none";
	sunnyimage.style.display="none";
	haze.style.display="none";
	cloudyimage.style.display="none";
	fog.style.display="none";
	rainimage.style.display="none";
	thunderimage.style.display="none";
	snowimage.style.display="none";
	smokeimage.style.display="none";
	allweather.style.display="none";
	loader.style.display="flex";
	try{
        const response = await fetch(`https://the-weather-api.p.rapidapi.com/api/weather/${mycity}`, options);
	    const result = await response.json();
		console.log(result);
		weather_text.textContent=result.data.current_weather;
	    tempratue.textContent=result.data.temp + "'C";
		speed.textContent=result.data.wind;
		humidlevel.textContent=result.data.humidity;
		aqi.textContent=result.data.aqi +"ppm";
		aqi_remark.textContent=result.data.aqi_remark;
		cityname.textContent=mycity;
		const aqi1=parseInt(result.data.aqi);
		const weather=result.data.current_weather;
		loader.style.display="none";
		weather_text.style.display="block";
		temp_name_container.style.display="flex";
		footer_windspeed_aqi_humidity.style.display="flex";

		
		if(weather.includes(weather_names[0])){
            haze.style.display="flex";
		}
		else if(weather.includes(weather_names[1])){
            sunnyimage.style.display="flex";
		}
		else if(weather.includes(weather_names[2])){
            cloudyimage.style.display="flex";
		}
		else if(weather.includes(weather_names[3])){
            fog.style.display="flex";
		}
		else if(weather.includes(weather_names[4])){
            rainimage.style.display="flex";
		}
		else if(weather.includes(weather_names[5])){
            thunderimage.style.display="flex";
		}
		else if(weather.includes(weather_names[6])){
            snowimage.style.display="flex";
		}

		else if(aqi1>=300 || weather=='Smoke'){
			smokeimage.style.display="flex";
		}


		else{
			allweather.style.display="flex";
		}

    }
    catch(e){
        notfound.style.display="block";
    }


}

function getLocation() {
	if (navigator.geolocation) {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve,(error)=>showError(error));
		});
	} 
	else { 
	  alert("Geolocation not Supported please change your browser or enter location manually in");
	}
}
  

function showError(error) {
	switch(error.code) {
	  case error.PERMISSION_DENIED:
		reject("User denied the request for Geolocation.");
		break;
	  case error.POSITION_UNAVAILABLE:
		reject("Location information is unavailable.");
		break;
	  case error.TIMEOUT:
		reject("The request to get user location timed out.");
		break;
	  case error.UNKNOWN_ERROR:
		reject("An unknown error occurred.");
		break;
	}
}


async function cityteller(longitude_my,latitude_my){
	const response=await fetch(`https://geocode.maps.co/reverse?lat=${latitude_my}&lon=${longitude_my}`);
	const result=await response.json();
	console.log(result.address.state);
	mycity=result.address.state;
	console.log(mycity);
	return mycity;
}

async function startapp(longitude,latitude){	
	let town=await cityteller(longitude,latitude);
	weather(town);
}

myLocate.addEventListener("click",()=>{
	getLocation().then((position)=>{
		let longitude=position.coords.longitude;
		let latitude=position.coords.latitude;
	  startapp(longitude,latitude);
	});
	getLocation().catch(err=>alert(err));
})

search_bar.addEventListener('keyup',(e)=>{
	if(e.keyCode===13){
		weather(search_bar.value);
	}
})

search_btn.addEventListener('click',(e)=>weather(search_bar.value));


let list = ["New Delhi" , "New York" , "London" , "Tokyo","Berlin","Colombo","Sydney","Paris","Mexico","Dubai","Brussels","Budapest","Vienna","Jakarta","Seoul","Baku","Jerusalem"];
let i = 0;
let intervals = "";
text_animation();
setintervals();

// This below javascript line is give height to slider_box class. It won't get its inner element height (slider class), because it set to position absolute.
slider_box.style.height = slider.clientHeight + "px";

// Functionality to hide custom placeholder when input field is focused or it has value inside it.
search_bar.onfocus = function(){
    placeholder.style.display = "none";
    clearInterval(intervals);
}

search_bar.addEventListener("focusout",()=>{
	if(search_bar.value == ""){
        placeholder.style.display = "flex";
        i = 0;
		setintervals();
        text_animation();
        
    }
});

// text_animation functrion call above is calling text_animation initially to avoid delay.

// Functionality to animate the text;

function setintervals(){
    intervals = setInterval(() => {
        text_animation();
        // console.log("started");
    }, 2500);
}
// text_animation here get keep calling after every 2.5 sec to give animation effect.

function text_animation(){
    i++;
    slider.innerHTML = list[i - 1];
    slider.style.opacity = "1";
    slider.style.left = "0px";
    setTimeout(() => {
     slider.style.opacity = "0";
     slider.style.left = "-5px";
    }, 2000);
    if(list.length == i){
        i = 0;
    }
}
