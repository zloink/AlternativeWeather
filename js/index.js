// OpenWeatherMap API Configuration
const WEATHER_API_KEY = config.WEATHER_API_KEY; // Get from config file
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEOCODING_API_BASE_URL = 'https://api.openweathermap.org/geo/1.0';

// Weather data storage
let realWeatherData = null;
let currentLocation = '';
let savedLocations = [];

// Update day headers in forecast table
function updateDayHeaders() {
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        
        const dayName = futureDate.toLocaleDateString('en-US', { weekday: 'long' });
        const month = futureDate.getMonth() + 1;
        const day = futureDate.getDate();
        
        document.getElementById(`MonthDay${i}`).innerHTML = `${dayName} ${month}/${day}`;
    }
}

// Initialize the app
function loadIndex() {
    loadSavedLocations();
    checkURLForLocation();
    updateDayHeaders();
}

// Load saved locations from localStorage
function loadSavedLocations() {
    const saved = localStorage.getItem('weatherLocations');
    if (saved) {
        savedLocations = JSON.parse(saved);
        displaySavedLocations();
    }
}

// Save locations to localStorage
function saveLocations() {
    localStorage.setItem('weatherLocations', JSON.stringify(savedLocations));
}

// Display saved locations
function displaySavedLocations() {
    const container = document.getElementById('savedLocations');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (savedLocations.length === 0) {
        container.innerHTML = '<p class="no-locations">No saved locations yet. Search for a location to get started!</p>';
        return;
    }
    
    savedLocations.forEach((location, index) => {
        const locationDiv = document.createElement('div');
        locationDiv.className = 'saved-location';
        locationDiv.innerHTML = `
            <span class="location-name">${location.name}</span>
            <button onclick="loadLocation('${location.name}')" class="load-btn">Load</button>
            <button onclick="removeLocation(${index})" class="remove-btn">×</button>
        `;
        container.appendChild(locationDiv);
    });
}

// Add location to saved list
function addLocationToSaved(locationName) {
    if (!savedLocations.find(loc => loc.name === locationName)) {
        savedLocations.push({ name: locationName, timestamp: Date.now() });
        saveLocations();
        displaySavedLocations();
    }
}

// Remove location from saved list
function removeLocation(index) {
    savedLocations.splice(index, 1);
    saveLocations();
    displaySavedLocations();
}

// Load a saved location
function loadLocation(locationName) {
    document.getElementById('locationInput').value = locationName;
    searchWeather(new Event('submit'));
}

// Check URL for location parameter
function checkURLForLocation() {
    const urlParams = new URLSearchParams(window.location.search);
    const location = urlParams.get('location');
    if (location) {
        document.getElementById('locationInput').value = location;
        searchWeather(new Event('submit'));
    }
}

// Update URL with current location
function updateURL(location) {
    const url = new URL(window.location);
    url.searchParams.set('location', location);
    window.history.pushState({}, '', url);
}

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

// Remove all the fake weather related functions and variables
// Keep only the real weather functionality

// Weather condition mapping for icons
const weatherIconMap = {
    'clear': './img/sun',
    'clouds': './img/sun', // Use sun for cloudy (closest match)
    'rain': './img/rain',
    'drizzle': './img/rain',
    'snow': './img/snow',
    'thunderstorm': './img/rain',
    'mist': './img/sun',
    'smoke': './img/sun',
    'haze': './img/sun',
    'dust': './img/sun',
    'fog': './img/sun',
    'sand': './img/sun',
    'ash': './img/sun',
    'squall': './img/rain',
    'tornado': './img/rain'
};

// Get weather icon based on weather condition
function getWeatherIcon(weatherType) {
    const icon = weatherIconMap[weatherType.toLowerCase()];
    return icon || './img/sun'; // Default to sun if unknown
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
    
    // Check if API key is set
    if (!validateAPIKey()) {
        return;
    }
    
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
            addLocationToSaved(currentLocation); // Save the location
            updateURL(currentLocation); // Update URL with current location
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
    
    console.log('Full weather data received:', realWeatherData);
    
    // Show current weather section
    document.getElementById('currentWeather').style.display = 'block';
    
    // Update current day weather
    const currentWeather = realWeatherData.list[0];
    const currentTemp = Math.round(currentWeather.main.temp);
    const weatherMain = currentWeather.weather[0].main.toLowerCase();
    
    console.log('Current weather:', {
        temp: currentTemp,
        weather: weatherMain,
        location: currentLocation
    });
    
    // Update temperature display
    document.getElementById('Temperature').innerHTML = currentTemp + '&deg';
    
    // Update weather image based on conditions
    updateWeatherImage(weatherMain, 0);
    
    // Update description
    document.getElementById('Description').innerHTML = 
        `It is ${currentTemp} degrees with ${weatherMain} conditions in ${currentLocation}`;
    
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
    
    console.log('Raw forecast data:', realWeatherData.list);
    
    // Group forecast data by actual calendar days
    const dailyForecasts = {};
    
    realWeatherData.list.forEach(forecast => {
        const date = new Date(forecast.dt * 1000); // Convert timestamp to Date
        const dayKey = date.toISOString().split('T')[0]; // Get YYYY-MM-DD format
        
        if (!dailyForecasts[dayKey]) {
            dailyForecasts[dayKey] = {
                temps: [],
                weather: [],
                date: date
            };
        }
        
        dailyForecasts[dayKey].temps.push(forecast.main.temp);
        dailyForecasts[dayKey].weather.push(forecast.weather[0].main);
    });
    
    console.log('Daily forecasts grouped:', dailyForecasts);
    
    // Get the next 7 days (excluding today)
    const today = new Date();
    const next7Days = [];
    
    for (let i = 1; i <= 7; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        const dayKey = futureDate.toISOString().split('T')[0];
        
        if (dailyForecasts[dayKey]) {
            next7Days.push({
                dayIndex: i,
                data: dailyForecasts[dayKey]
            });
        }
    }
    
    console.log('Next 7 days to display:', next7Days);
    
    // Update each day's forecast
    next7Days.forEach(day => {
        const dayIndex = day.dayIndex;
        const dayData = day.data;
        
        // Calculate daily high/low from all temperature readings
        const highTemp = Math.round(Math.max(...dayData.temps));
        const lowTemp = Math.round(Math.min(...dayData.temps));
        
        // Get most common weather condition for the day
        const weatherCounts = {};
        dayData.weather.forEach(weather => {
            weatherCounts[weather] = (weatherCounts[weather] || 0) + 1;
        });
        const mostCommonWeather = Object.keys(weatherCounts).reduce((a, b) => 
            weatherCounts[a] > weatherCounts[b] ? a : b
        );
        
        console.log(`Day ${dayIndex}: High=${highTemp}, Low=${lowTemp}, Weather=${mostCommonWeather}`);
        
        // Update temperatures
        document.getElementById(`High${dayIndex}`).innerHTML = `High: ${highTemp}&deg`;
        document.getElementById(`Low${dayIndex}`).innerHTML = `Low: ${lowTemp}&deg`;
        
        // Update weather image
        updateWeatherImage(mostCommonWeather.toLowerCase(), dayIndex);
    });
}

// API Key Validation
function validateAPIKey() {
    if (!WEATHER_API_KEY || WEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
        console.error('API key not configured. Please create config.js with your OpenWeatherMap API key.');
        return false;
    }
    return true;
}