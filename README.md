# Alternative Weather Website

A satirical weather website that now includes real weather data functionality while maintaining its humorous alternative weather descriptions.

## Features

- **Real Weather Data**: Get actual weather information for any US ZIP code using OpenWeatherMap API
- **Alternative Weather**: Satirical weather descriptions and fake weather data for entertainment
- **7-Day Forecast**: View both real and alternative weather forecasts
- **Interactive Weather Icons**: Click to cycle through different weather conditions
- **Responsive Design**: Modern, user-friendly interface

## Setup Instructions

### 1. Get OpenWeatherMap API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/)
2. Sign up for a free account
3. Navigate to "My API Keys" section
4. Copy your API key

### 2. Configure API Key

1. Open `js/index.js`
2. Find the line: `const WEATHER_API_KEY = 'YOUR_API_KEY_HERE';`
3. Replace `'YOUR_API_KEY_HERE'` with your actual API key
4. Save the file

### 3. Run the Website

1. Open `index.html` in a web browser
2. The website will load with alternative weather data by default
3. Enter a US ZIP code to get real weather for that location
4. Click "Back to Alternative Weather" to return to fake weather

## How It Works

- **Default State**: Shows humorous alternative weather with fake temperatures and descriptions
- **Real Weather Mode**: Enter a US ZIP code to get actual weather data from OpenWeatherMap
- **Weather Icons**: Click any weather icon to cycle through different conditions (sun, rain, snow)
- **API Integration**: Uses OpenWeatherMap's ZIP code geocoding and weather forecast APIs

## API Endpoints Used

- **ZIP Code Geocoding API**: Converts US ZIP codes to coordinates
- **5-Day Forecast API**: Gets weather data for current and upcoming days

## File Structure

```
AlternativeWeather/
├── index.html          # Main HTML file
├── css/
│   └── alternativeweather.css  # Styles
├── js/
│   └── index.js        # JavaScript functionality
├── img/                # Weather icons
└── README.md           # This file
```

## Browser Compatibility

- Modern browsers with ES6+ support
- Requires internet connection for real weather data
- Works offline for alternative weather display

## Notes

- The free OpenWeatherMap API has rate limits (1000 calls/day)
- Weather data is updated every 3 hours
- Alternative weather maintains the original satirical humor
- Real weather includes temperature, conditions, and 7-day forecast 