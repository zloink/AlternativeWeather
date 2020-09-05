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