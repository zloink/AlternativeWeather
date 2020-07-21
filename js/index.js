Date.prototype.addDays = function(days)
{
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getDayMonth(date)
{
	return (date.getMonth() + 1) + "/" + date.getDate();
}

function setTemperature(temperature)
{
	document.getElementById("Temperature").innerHTML= temperature + "&deg";
}

function getMaximumTemperature(idealTemperature)
{
	var rand = Math.random()*3;
	var modifier = Math.floor(rand + 1);
	
	if(Math.random() < .5)
	{
		return idealTemperature - modifier;
	}
	
	return idealTemperature + modifier;
}

function getMinimumTemperature(maxTemp)
{
	return maxTemp - 10;
}

function loadIndex() {
	var date = new Date();
	var hour = date.getHours();
	var day = date.getDay();
	
	var idealTemp = 75;
	var maxTemp = getMaximumTemperature(idealTemp);
	var minTemp = getMinimumTemperature(maxTemp);
	
	if(hour < 7 || hour > 20)
	{
		document.getElementById("Description").innerHTML="It is " + minTemp + " degrees with clear skies. What a tremendous evening!";
		setTemperature(minTemp);
		document.getElementById("Image").src = "./img/moon-large.png";
		document.getElementById("Image").alt = "moon-large.png";
		document.body.style.backgroundColor = "SteelBlue";
	}
	else
	{
		document.getElementById("Description").innerHTML="It is " + maxTemp + " degrees with sunny skies. This weather is the greatest!";
		setTemperature(maxTemp);
		document.getElementById("Image").src = "./img/sun-large.png";
		document.getElementById("Image").alt = "sun-large.png";
	}
	
	switch(day) {
	case 1:
        document.getElementById("Day1").innerHTML="Tuesday " + getDayMonth(date.addDays(1));
        document.getElementById("Day2").innerHTML="Wednesday " + getDayMonth(date.addDays(2));
        document.getElementById("Day3").innerHTML="Thursday " + getDayMonth(date.addDays(3));
        document.getElementById("Day4").innerHTML="Friday " + getDayMonth(date.addDays(4));
        document.getElementById("Day5").innerHTML="Saturday " + getDayMonth(date.addDays(5));
        document.getElementById("Day6").innerHTML="Sunday " + getDayMonth(date.addDays(6));
        document.getElementById("Day7").innerHTML="Monday " + getDayMonth(date.addDays(7));
        break;
    case 2:
        document.getElementById("Day7").innerHTML="Tuesday " + getDayMonth(date.addDays(7));
        document.getElementById("Day1").innerHTML="Wednesday " + getDayMonth(date.addDays(1));
        document.getElementById("Day2").innerHTML="Thursday " + getDayMonth(date.addDays(2));
        document.getElementById("Day3").innerHTML="Friday " + getDayMonth(date.addDays(3));
        document.getElementById("Day4").innerHTML="Saturday " + getDayMonth(date.addDays(4));
        document.getElementById("Day5").innerHTML="Sunday " + getDayMonth(date.addDays(5));
        document.getElementById("Day6").innerHTML="Monday " + getDayMonth(date.addDays(6));
        break;
    case 3:
        document.getElementById("Day6").innerHTML="Tuesday " + getDayMonth(date.addDays(6));
        document.getElementById("Day7").innerHTML="Wednesday " + getDayMonth(date.addDays(7));
        document.getElementById("Day1").innerHTML="Thursday " + getDayMonth(date.addDays(1));
        document.getElementById("Day2").innerHTML="Friday " + getDayMonth(date.addDays(2));
        document.getElementById("Day3").innerHTML="Saturday " + getDayMonth(date.addDays(3));
        document.getElementById("Day4").innerHTML="Sunday " + getDayMonth(date.addDays(4));
        document.getElementById("Day5").innerHTML="Monday " + getDayMonth(date.addDays(5));
        break;
    case 4:
        document.getElementById("Day5").innerHTML="Tuesday " + getDayMonth(date.addDays(5));
        document.getElementById("Day6").innerHTML="Wednesday " + getDayMonth(date.addDays(6));
        document.getElementById("Day7").innerHTML="Thursday " + getDayMonth(date.addDays(7));
        document.getElementById("Day1").innerHTML="Friday " + getDayMonth(date.addDays(1));
        document.getElementById("Day2").innerHTML="Saturday " + getDayMonth(date.addDays(2));
        document.getElementById("Day3").innerHTML="Sunday " + getDayMonth(date.addDays(3));
        document.getElementById("Day4").innerHTML="Monday " + getDayMonth(date.addDays(4));
        break;
    case 5:
        document.getElementById("Day4").innerHTML="Tuesday " + getDayMonth(date.addDays(4));
        document.getElementById("Day5").innerHTML="Wednesday " + getDayMonth(date.addDays(5));
        document.getElementById("Day6").innerHTML="Thursday " + getDayMonth(date.addDays(6));
        document.getElementById("Day7").innerHTML="Friday " + getDayMonth(date.addDays(7));
        document.getElementById("Day1").innerHTML="Saturday " + getDayMonth(date.addDays(1));
        document.getElementById("Day2").innerHTML="Sunday " + getDayMonth(date.addDays(2));
        document.getElementById("Day3").innerHTML="Monday " + getDayMonth(date.addDays(3));
        break;
    case 6:
        document.getElementById("Day3").innerHTML="Tuesday " + getDayMonth(date.addDays(3));
        document.getElementById("Day4").innerHTML="Wednesday " + getDayMonth(date.addDays(4));
        document.getElementById("Day5").innerHTML="Thursday " + getDayMonth(date.addDays(5));
        document.getElementById("Day6").innerHTML="Friday " + getDayMonth(date.addDays(6));
        document.getElementById("Day7").innerHTML="Saturday " + getDayMonth(date.addDays(7));
        document.getElementById("Day1").innerHTML="Sunday " + getDayMonth(date.addDays(1));
        document.getElementById("Day2").innerHTML="Monday " + getDayMonth(date.addDays(2));
        break;
    default:
        document.getElementById("Day2").innerHTML="Tuesday " + getDayMonth(date.addDays(2));
        document.getElementById("Day3").innerHTML="Wednesday " + getDayMonth(date.addDays(3));
        document.getElementById("Day4").innerHTML="Thursday " + getDayMonth(date.addDays(4));
        document.getElementById("Day5").innerHTML="Friday " + getDayMonth(date.addDays(5));
        document.getElementById("Day6").innerHTML="Saturday " + getDayMonth(date.addDays(6));
        document.getElementById("Day7").innerHTML="Sunday " + getDayMonth(date.addDays(7));
        document.getElementById("Day1").innerHTML="Monday " + getDayMonth(date.addDays(1));
	}
	
	var high1 = getMaximumTemperature(idealTemp);
	document.getElementById("High1").innerHTML="High: " + high1 + "&deg";
	document.getElementById("Low1").innerHTML="Low: " + getMinimumTemperature(high1) + "&deg";
	
	var high2 = getMaximumTemperature(idealTemp);
	document.getElementById("High2").innerHTML="High: " + high2 + "&deg";
	document.getElementById("Low2").innerHTML="Low: " + getMinimumTemperature(high2) + "&deg";
	
	var high3 = getMaximumTemperature(idealTemp);
	document.getElementById("High3").innerHTML="High: " + high3 + "&deg";
	document.getElementById("Low3").innerHTML="Low: " + getMinimumTemperature(high3) + "&deg";
	
	var high4 = getMaximumTemperature(idealTemp);
	document.getElementById("High4").innerHTML="High: " + high4 + "&deg";
	document.getElementById("Low4").innerHTML="Low: " + getMinimumTemperature(high4) + "&deg";
	
	var high5 = getMaximumTemperature(idealTemp);
	document.getElementById("High5").innerHTML="High: " + high5 + "&deg";
	document.getElementById("Low5").innerHTML="Low: " + getMinimumTemperature(high5) + "&deg";
	
	var high6 = getMaximumTemperature(idealTemp);
	document.getElementById("High6").innerHTML="High: " + high6 + "&deg";
	document.getElementById("Low6").innerHTML="Low: " + getMinimumTemperature(high6) + "&deg";

	var high7 = getMaximumTemperature(idealTemp);
	document.getElementById("High7").innerHTML="High: " + high7 + "&deg";
	document.getElementById("Low7").innerHTML="Low: " + getMinimumTemperature(high7) + "&deg";
}
