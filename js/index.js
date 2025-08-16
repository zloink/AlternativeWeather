// OpenWeatherMap API Configuration
const WEATHER_API_KEY = '4a47274ba197832cef2f28679963ccc8'; // Replace with your actual API key
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEOCODING_API_BASE_URL = 'https://api.openweathermap.org/geo/1.0';

// Weather data storage
let realWeatherData = null;
let currentLocation = '';

Date.prototype.addDays = function(days)
{
    var date = new Date();
    date.setDate(date.getDate() + days);
    return date;

    //return this.setDate(this.getDate() + days);
}

Date.prototype.isDaytime = function()
{
    var date = new Date();
    var hour = date.getHours();

    if (hour < 7 || hour > 19)
    {
        return false;
    }

    return true;
}

class Day
{
    constructor(index)
    {
        var date = new Date();

        this.dayIndex = index;
        this.dateString = date.addDays(this.dayIndex);
        this.monthDayDescription = getDayMonth (this.dateString, this.dayIndex);
        this.currentTemperature = idealTemp;
        this.lowTemperature = this.currentTemperature + lowAdjustment;
        this.highTemperature = this.currentTemperature + highAdjustment;
        this.weatherConditionIndex = 0;
        this.imageBase = "./img/sun";
    }
}

class WeatherCondition
{
    constructor(desc, image, tempOffset)
    {
        this.description = desc;
        this.imageBase = image;
        this.temperatureOffset = tempOffset;
    }
}

var idealTemp = 75;
var highAdjustment = 3;
var lowAdjustment = -10;
//var rainAdjustment = -10;
//var snowAdjustment = -45;

var dayList =
[
    day0 = new Day (0),
    day1 = new Day (1),
    day2 = new Day (2),
    day3 = new Day (3),
    day4 = new Day (4),
    day5 = new Day (5),
    day6 = new Day (6),
    day7 = new Day (7)
];

var weatherConditionList =
[
    clear = new WeatherCondition ("clear", "./img/sun", 0),
    rain = new WeatherCondition ("rainy", "./img/rain", -10),
    snow = new WeatherCondition ("snowy", "./img/snow", -45)
];

var weatherDescriptionList =
[
    "This weather is the greatest!",
    "This weather is tremendous!",
    "Believe me, this weather is going to be fabulous!",
    "You can't get anything better than this weather!",
    "Let's make weather great again!",
    "I understand weather better than anybody, and let me tell you, this weather is the greatest!",
    "This weather is phenomenal. I mean, just phenomenal!",
    "Is the weather great here? Yes, of course it is. You're welcome!",
    "You wouldn't believe this weather!",
    "That other weather site you visit is FAKE WEATHER!",
    "This weather is huge!",
    "I've studied weather better than anybody. This is the best weather!"
];

function getDayMonth (date)
{
    var dayNum = date.getDay();
    var dayName;
    var month = date.getMonth() + 1;
    var dayOfMonth = date.getDate();

    switch (dayNum)
    {
        case 1:
            dayName = "Monday ";
            break;
        case 2:
            dayName = "Tuesday ";
            break;
        case 3:
            dayName = "Wednesday ";
            break;
        case 4:
            dayName = "Thursday ";
            break;
        case 5:
            dayName = "Friday ";
            break;
        case 6:
            dayName = "Saturday ";
            break;
        default:
            dayName = " Sunday ";
    }

    return dayName + month + "/" + dayOfMonth;
}

function loadIndex()
{
    dayList.forEach(displayAll);
}

function displayAll(dayToSet)
{
    displayImage(dayToSet);
    displayTemperatures(dayToSet);
    displayDescription(dayToSet);
}

function displayDescription(dayToSet)
{
    var descriptionListLength = weatherDescriptionList.length;
    var randomIndex = Math.floor(Math.random() * descriptionListLength);
    var weatherDescription = weatherDescriptionList[randomIndex];

    if (dayToSet.dayIndex == 0)
    {
        document.getElementById("Description").innerHTML = "It is " + dayToSet.currentTemperature + " degrees with " + weatherConditionList[dayToSet.weatherConditionIndex].description + " skies. " + weatherDescription;
    }
    else
    {
        var monthDay = "MonthDay" + dayToSet.dayIndex;
        var monthDayDescription = dayToSet.monthDayDescription;

        document.getElementById(monthDay).innerHTML = monthDayDescription;
    }
}

function displayTemperatures(dayToSet)
{
    if (dayToSet.dayIndex == 0)
    {
        document.getElementById("Temperature").innerHTML = dayToSet.currentTemperature + "&deg";
    }
    else
    {
        var highHtmlId = "High" + dayToSet.dayIndex;
        var lowHtmlId = "Low" + dayToSet.dayIndex;

        document.getElementById(highHtmlId).innerHTML = "High: " + dayToSet.highTemperature + "&deg";
        document.getElementById(lowHtmlId).innerHTML = "Low: " + dayToSet.lowTemperature + "&deg"; 
    }
}

function displayImage(dayToSet)
{
    if (dayToSet.dayIndex == 0)
    {
        var date = new Date();

        if (dayToSet.weatherConditionIndex == 0)
        {
            if (date.isDaytime)
            {
                document.getElementById("Image").src = "./img/sun-large.png";
                document.body.style.backgroundColor = "lightSteelBlue";
            }
            else
            {
                document.getElementById("Image").src = "./img/moon-large.png";
                document.body.style.backgroundColor = "SteelBlue";
            }
        }
        else
        {
            document.getElementById("Image").src = dayToSet.imageBase + "-large.png";
        }
    }
    else
    {
        var htmlId = "Image" + dayToSet.dayIndex;
        document.getElementById(htmlId).src = dayToSet.imageBase + "-small.png";
    }
}

function changeWeather(elementId)
{
    var index = 0;

    if (elementId != "Image")
    {
        var length = elementId.length;

        var index = elementId.substring(length - 1, length);
    }

    var dayToChange = dayList[index];

    var weatherConditionCount = weatherConditionList.length - 1;
    var currentConditionIndex = dayToChange.weatherConditionIndex;
    var newConditionIndex = 0;

    if ((currentConditionIndex + 1) <= weatherConditionCount)
    {
        newConditionIndex = currentConditionIndex + 1;
    }

    var newCondition = weatherConditionList[newConditionIndex];

    dayToChange.weatherConditionIndex = newConditionIndex;
    dayToChange.currentTemperature = idealTemp + newCondition.temperatureOffset;
    dayToChange.highTemperature = dayToChange.currentTemperature + highAdjustment;
    dayToChange.lowTemperature = dayToChange.currentTemperature + lowAdjustment;
    dayToChange.imageBase = newCondition.imageBase;

    displayAll(dayToChange);
}

// Real Weather Functions
async function testAPIKey() {
    try {
        // Test with a simple API call to verify the key works
        const testUrl = `${WEATHER_API_BASE_URL}/weather?q=London&appid=${WEATHER_API_KEY}&units=imperial`;
        console.log('Testing API key with:', testUrl);
        
        const response = await fetch(testUrl);
        console.log('Test response status:', response.status);
        
        if (response.status === 401) {
            console.error('API key is invalid or not activated yet');
            return false;
        } else if (response.ok) {
            console.log('API key is working correctly');
            return true;
        } else {
            console.error('API test failed with status:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Error testing API key:', error);
        return false;
    }
}

async function searchWeather(event) {
    event.preventDefault();
    
    const locationInput = document.getElementById('locationInput');
    const searchStatus = document.getElementById('searchStatus');
    const input = locationInput.value.trim();
    
    if (!input) {
        searchStatus.innerHTML = 'Please enter a ZIP code or city name.';
        return;
    }
    
    searchStatus.innerHTML = 'Testing API connection...';
    
    // First test if the API key is working
    const apiKeyValid = await testAPIKey();
    if (!apiKeyValid) {
        searchStatus.innerHTML = 'API key error. Please check your OpenWeatherMap API key.';
        return;
    }
    
    searchStatus.innerHTML = 'Searching for weather data...';
    
    try {
        let coords = null;
        
        // Check if input looks like a ZIP code (5 digits)
        if (/^\d{5}$/.test(input)) {
            // Try ZIP code lookup first
            coords = await getCoordinatesByZip(input);
            
            // If ZIP code fails, try city name search as fallback
            if (!coords) {
                searchStatus.innerHTML = 'ZIP code not found, trying city name search...';
                coords = await getCoordinatesByCity(input);
            }
        } else {
            // Input is not a ZIP code, try city name search directly
            coords = await getCoordinatesByCity(input);
        }
        
        if (!coords) {
            searchStatus.innerHTML = 'Location not found. Please try a different ZIP code or city name.';
            return;
        }
        
        // Then get weather data
        const weatherData = await getWeatherData(coords.lat, coords.lon);
        if (weatherData) {
            realWeatherData = weatherData;
            // Build a better location string
            let locationParts = [coords.name];
            if (coords.state && coords.state !== 'Unknown State') {
                locationParts.push(coords.state);
            }
            if (coords.country && coords.country !== 'US') {
                locationParts.push(coords.country);
            }
            currentLocation = locationParts.join(', ');
            displayRealWeather();
            searchStatus.innerHTML = `Weather data loaded for ${currentLocation}!`;
        } else {
            searchStatus.innerHTML = 'Failed to load weather data. Please try again.';
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        searchStatus.innerHTML = 'Error loading weather data. Please check your internet connection.';
    }
}

async function getCoordinatesByZip(zipCode) {
    try {
        const apiUrl = `${GEOCODING_API_BASE_URL}/zip?zip=${zipCode},US&appid=${WEATHER_API_KEY}`;
        console.log('Calling ZIP API:', apiUrl);
        
        const response = await fetch(apiUrl);
        console.log('ZIP API response status:', response.status);
        
        if (response.status === 401) {
            console.error('API key authentication failed for ZIP lookup');
            throw new Error('API key authentication failed');
        } else if (response.status === 404) {
            console.error('ZIP code not found in database');
            return null;
        } else if (!response.ok) {
            const errorText = await response.text();
            console.error('ZIP API Response not OK:', response.status, errorText);
            throw new Error(`ZIP API request failed: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        console.log('ZIP API Response data:', data);
        console.log('ZIP API Response fields:', {
            name: data.name,
            state: data.state,
            country: data.country,
            lat: data.lat,
            lon: data.lon
        });
        
        if (data && data.lat && data.lon) {
            // Try to get state from multiple possible fields
            let state = data.state;
            if (!state && data.country === 'US') {
                // For US locations, try to extract state from other fields
                if (data.name && data.name.includes(',')) {
                    const nameParts = data.name.split(',');
                    if (nameParts.length > 1) {
                        state = nameParts[1].trim();
                    }
                }
            }
            
            return {
                lat: data.lat,
                lon: data.lon,
                name: data.name,
                state: state || 'Unknown State',
                country: data.country
            };
        }
        
        console.error('Invalid ZIP API response structure:', data);
        return null;
    } catch (error) {
        console.error('Error getting coordinates by ZIP:', error);
        return null;
    }
}

async function getCoordinatesByCity(cityName) {
    try {
        const apiUrl = `${GEOCODING_API_BASE_URL}/direct?q=${cityName},US&limit=1&appid=${WEATHER_API_KEY}`;
        console.log('Calling City API:', apiUrl);
        
        const response = await fetch(apiUrl);
        console.log('City API response status:', response.status);
        
        if (response.status === 401) {
            console.error('API key authentication failed for city lookup');
            throw new Error('API key authentication failed');
        } else if (!response.ok) {
            const errorText = await response.text();
            console.error('City API Response not OK:', response.status, errorText);
            throw new Error(`City API request failed: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        console.log('City API Response data:', data);
        
        if (data && data.length > 0) {
            return {
                lat: data[0].lat,
                lon: data[0].lon,
                name: data[0].name,
                state: data[0].state,
                country: data[0].country
            };
        }
        
        console.error('Invalid City API response structure:', data);
        return null;
    } catch (error) {
        console.error('Error getting coordinates by city:', error);
        return null;
    }
}

async function getWeatherData(lat, lon) {
    try {
        const response = await fetch(
            `${WEATHER_API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
        );
        
        if (!response.ok) {
            throw new Error('Weather API request failed');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting weather data:', error);
        return null;
    }
}

function displayRealWeather() {
    if (!realWeatherData) return;
    
    // Show reset button
    document.getElementById('resetButton').style.display = 'inline-block';
    
    // Update current day weather
    const currentWeather = realWeatherData.list[0];
    const currentTemp = Math.round(currentWeather.main.temp);
    const weatherMain = currentWeather.weather[0].main.toLowerCase();
    
    // Update temperature display
    document.getElementById('Temperature').innerHTML = currentTemp + '&deg';
    
    // Update weather image based on conditions
    updateWeatherImage(weatherMain, 0);
    
    // Update description
    const randomDescription = weatherDescriptionList[Math.floor(Math.random() * weatherDescriptionList.length)];
    document.getElementById('Description').innerHTML = 
        `It is ${currentTemp} degrees with ${weatherMain} conditions in ${currentLocation}. ${randomDescription}`;
    
    // Update 7-day forecast
    updateForecast();
}

function updateWeatherImage(weatherType, dayIndex) {
    let imageSrc = './img/sun';
    
    if (weatherType.includes('rain') || weatherType.includes('drizzle')) {
        imageSrc = './img/rain';
    } else if (weatherType.includes('snow')) {
        imageSrc = './img/snow';
    } else if (weatherType.includes('cloud')) {
        imageSrc = './img/sun'; // Use sun for cloudy (closest match)
    }
    
    if (dayIndex === 0) {
        document.getElementById('Image').src = imageSrc + '-large.png';
    } else {
        document.getElementById(`Image${dayIndex}`).src = imageSrc + '-small.png';
    }
}

function updateForecast() {
    if (!realWeatherData) return;
    
    // Group forecast data by day (every 8th item = 24 hours)
    const dailyData = [];
    for (let i = 0; i < realWeatherData.list.length; i += 8) {
        if (dailyData.length < 7) {
            dailyData.push(realWeatherData.list[i]);
        }
    }
    
    // Update each day
    dailyData.forEach((dayData, index) => {
        if (index === 0) return; // Skip today (index 0)
        
        const dayIndex = index;
        const highTemp = Math.round(dayData.main.temp_max);
        const lowTemp = Math.round(dayData.main.temp_min);
        const weatherMain = dayData.weather[0].main.toLowerCase();
        
        // Update temperatures
        document.getElementById(`High${dayIndex}`).innerHTML = `High: ${highTemp}&deg`;
        document.getElementById(`Low${dayIndex}`).innerHTML = `Low: ${lowTemp}&deg`;
        
        // Update weather image
        updateWeatherImage(weatherMain, dayIndex);
    });
}

function resetToFakeWeather() {
    realWeatherData = null;
    currentLocation = '';
    
    // Hide reset button
    document.getElementById('resetButton').style.display = 'none';
    
    document.getElementById('searchStatus').innerHTML = 'Showing alternative weather data.';
    loadIndex(); // Reload fake weather
}