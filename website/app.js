/* Global Variables */
const apiKey = ',us&appid=d430d84c1b9d23f01807b51708c17158';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let zipCode=0;
let feelings='';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Listener to get data when button is pressed
document.querySelector('#generate').addEventListener('click',()=>{
    zipCode = document.querySelector('#zip').value;
    if(!zipCode){
        return alert("input a valid Zipcode!");
    }
    feelings = document.querySelector('#feelings').value;
    if(!feelings){
        return alert("you need to input your feelings!");
    }
    let data ={
        feelings : feelings,
        date : newDate,
    }
    //request data from the weather website
    getData(zipCode)
    .then((data2) =>{
        //store temp in our data variable and send it to our server
        data.temp = data2.main.temp;
        postData('/postData', data).then(
            //update our UI 
            updateUI()
        );
    });
});

//fetch data from this url's web API
const getData= async (zipCode)=>{
    //fetch
    console.log(baseURL+zipCode+apiKey);
    const response = await fetch (baseURL+zipCode+apiKey+'&units=metric');
    try{
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log('error', error);
    }
}

//POST data to server to store it
const postData = async (url = '', data={}) =>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try{
        const newData = await response.json();
        console.log(newData);
        return newData;
    }
    catch(error){
        console.log("error",error);
    }
}

// UI update
const updateUI = async () =>{
    const reqeust = await fetch ('/addWeatherData');
    try{
        const data = await reqeust.json();
        console.log(data);
        document.querySelector('#date').innerHTML = data.date;
        document.querySelector('#temp').innerHTML = data.temp;
        document.querySelector('#content').innerHTML = data.feelings;
    }
    catch(error){
        console.log('error',error);
    }
}