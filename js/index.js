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
var rainAdjustment = -10;
var snowAdjustment = -45;

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
    rain = new WeatherCondition ("rain", "./img/rain", -10),
    snow = new WeatherCondition ("snow", "./img/snow", -45)
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

function updateDescription(temp)
{
    var date = new Date();
    var hour = date.getHours();
    var weatherCondition = "clear";

    var imageDescription = document.getElementById("Image").alt;

    if (imageDescription == "rain.png")
    {
        weatherCondition = "rainy";
    }
    if (imageDescription == "snow.png")
    {
        weatherCondition = "snowy";
    }

    var dayTime = "day";

    if (hour < 7 || hour > 20)
    {
        dayTime = "night";
    }

    document.getElementById("Description").innerHTML="It is " + temp + " degrees with " + weatherCondition + " skies. Believe me, this weather is incredible!";
}

function loadIndex()
{
    dayList.forEach(displayDescription);
    dayList.forEach(displayTemperatures);
    dayList.forEach(displayImage);
}

function displayDescription(dayToSet)
{
    if (dayToSet.dayIndex == 0)
    {
        var date = new Date();

        if (date.isDaytime)
        {
            document.getElementById("Description").innerHTML = "It is " + dayToSet.currentTemperature + " degrees with sunny skies. This weather is the greatest!";
        }
        else
        {
            document.getElementById("Description").innerHTML = "It is " + dayToSet.lowTemperature + " degrees with clear skies. What a tremendous evening!";
        }
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

        if (date.isDaytime)
        {
            document.getElementById("Image").src = "./img/sun-large.png";
            document.getElementById("Image").alt = "sun.png";
            document.body.style.backgroundColor = "lightSteelBlue";
        }
        else
        {
            document.getElementById("Image").src = "./img/moon-large.png";
            document.getElementById("Image").alt = "moon.png";
            document.body.style.backgroundColor = "SteelBlue";
        }
    }
    else
    {
        var htmlId = "Image" + dayToSet.dayIndex;
        document.getElementById(htmlId).src = "./img/sun-small.png";
        document.getElementById(htmlId).alt = "sun.png";
    }
}

function changeWeather(elementId)
{
    alert("Change weather for " + elementId);

    //var dayToSet = dayList.

    var weatherConditionCount = weatherConditionList.length - 1;
    var currentConditionIndex = dayToSet.weatherConditionIndex;
    var newConditionIndex = 0;

    if ((currentConditionIndex + 1) <= weatherConditionCount)
    {
        newConditionIndex = currentConditionIndex + 1;
    }

    var newCondition = weatherConditionList[newConditionIndex];

    dayToSet.weatherConditionIndex = newConditionIndex;
    dayToSet.currentTemperature = idealTemp + newCondition.temperatureOffset;
    dayToSet.highTemperature = dayToSet.currentTemperature + highAdjustment;
    dayToSet.lowTemperature = dayToSet.currentTemperature + lowAdjustment;
    dayToSet.imageBase = newCondition.imageBase;
}