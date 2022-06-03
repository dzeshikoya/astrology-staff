
var Astrology = function(connectionObject){
    //On class initiation
    this.init(connectionObject);
};

Astrology.prototype.xhrAndLoadJsonToDataArray = function(url, variable){
    //XHR request help method for loading the data

    var _that = this,
        xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                var response = xhr.response;
                _that.zodiacSignsData[variable] = response[variable];
            }
        }
    };
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();
};

Astrology.prototype.addMonth = function(monthNumberOrMonthName){
    //Add the month name or number

    var monthNumber = 0,
        parsedNumber;

    if(typeof monthNumberOrMonthName === "number"){
        monthNumber = monthNumberOrMonthName;
    }
    else if(typeof  monthNumberOrMonthName === "string"){

        var monthNameLowerCase = monthNumberOrMonthName.toLowerCase();

        switch(monthNameLowerCase){
            case "январь":case "января":
                monthNumber = 1;
                break;

            case "февраль":case "февраля":
                monthNumber = 2;
                break;

            case "март":case "марта":
                monthNumber = 3;
                break;

            case "апрель":case "апреля":
                monthNumber = 4;
                break;

            case "май":
                monthNumber = 5;
                break;

            case "июнь":case "июня":
                monthNumber = 6;
                break;

            case "июль":case "июля":
                monthNumber = 7;
                break;

            case "август":case "августа":
                monthNumber = 8;
                break;

            case "сентябрь":case "сентября":
                monthNumber = 9;
                break;

            case "октябрь":case "октября":
                monthNumber = 10;
                break;

            case "ноябрь":case "ноября":
                monthNumber = 11;
                break;

            case "декабрь":case "декабрь":
                monthNumber = 12;
                break;

            default:
                parsedNumber = parseInt(monthNumberOrMonthName, 10);
                if(parsedNumber !== NaN){
                    if(parsedNumber > 0 && parsedNumber <= 12){
                        monthNumber = parsedNumber;
                    }
                    else{
                        this.sendToConsole('Did not enter a valid month value. Valid values include the name of month or its corresponding number');
                    }
                }
                else {
                    this.sendToConsole('Did not enter a valid month value. Valid values include the name of month or its corresponding number');
                }
        }
    }
    this.currentSearch.monthNumber = monthNumber;
    return monthNumber;
};

Astrology.prototype.addDay = function(date){
    // Add the day of the month as a number between 1-31

    if(typeof date === "string"){
        try {
            var dateNumber = parseInt(date, 10);

            //Lets control so the date is within the range 1-31
            if(dateNumber > 0 && dateNumber <= 31){
                this.currentSearch.date = dateNumber;
            } else {
                dateNumber = 31;
                this.sendToConsole('Error must provide a valid day of the month which means a number between 1-31. Now date is set to the last in the month (31)');
            }
        } catch(e){
            this.sendErrorMessageToConsole('We threw and error the date we tried to set is NOT a string that could be parsed into a number', e);
        }
    }
    this.currentSearch.date = dateNumber;

    //var what = 'addDay';
    return dateNumber;
};

Astrology.prototype.addToday = function(today){
    // Add the day of the month as a number between 1-31

    if(typeof date === "string"){
        try {
            var dateNumber = parseInt(today, 10);

            //Lets control so the date is within the range 1-31
            if(dateNumber > 0 && dateNumber <= 31){
                this.currentSearch.today = dateNumber;
            } else {
                dateNumber = 31;
                this.sendToConsole('Error must provide a valid day of the month which means a number between 1-31. Now date is set to the last in the month (31)');
            }
        } catch(e){
            this.sendErrorMessageToConsole('We threw and error the date we tried to set is NOT a string that could be parsed into a number', e);
        }
    }
    this.currentSearch.today = dateNumber;
    var what = 'addToDay';
    return what;
};

Astrology.prototype.addFullDateString = function(dateString){
    // Lets just parse out the month and the day from the full date string and then use the methods
    // we already have created so we can reuse the code we already have, awesomeness ;)

    var dateStringArray = dateString.split('-');
    if(dateStringArray.length === 3 && dateStringArray[0].length === 4) {
        //Lets try parsing the month and day, if they are strings lets proceed adding the date as a current date
        if(typeof dateStringArray[1] === 'string' && typeof dateStringArray[2] === 'string'){
            this.addMonth(dateStringArray[1]);
            this.addDay(dateStringArray[2]);
        } else {
            this.sendToConsole('Wrong date format sent to the addFullDateString method, needs to be a string with the format YYYY-MM-DD')
        }
    } else{
        this.sendToConsole('Wrong date format sent to the addFullDateString method, needs to be a string with the format YYYY-MM-DD')
    }
};


Astrology.prototype.fetchToday = function(){
    //var today = this.currentSearch.today,
    
    
    var day = new Date(),
    today = "",
    returnTodays = "",
    todays = this.zodiacSignsData.todays,
    zodiacSign = this.fetchZodiacSign();
    //what = "oh no";
    
    //var dd = String(day.getDate()).padStart(2, '0');
    //var mm = String(day.getMonth() + 1).padStart(2, '0'); //January is 0!
    //var yyyy = day.getFullYear();
    //day = dd + '/' + mm + '/' + yyyy;

    var anotherDay = new Date();
   
   

        
        /*switch(zodiacSign)
        {
            case "Дева":
                anotherDay.setDate(day.getDate() + 0);
                break;
            case "Весы":
                anotherDay.setDate(day.getDate() + 1);
                break;
            case "Скорпион":
                anotherDay.setDate(day.getDate() + 2);
                break;
            case "Стрелец":
                anotherDay.setDate(day.getDate() + 3);
                break;
            case "Козерог":
                 anotherDay.setDate(day.getDate() + 4);
                break;
            case "Водолей":
                anotherDay.setDate(day.getDate() + 5);
                break;
            case "Рыбы":
                anotherDay.setDate(day.getDate() + 6);
                break;
             case "Овен":
                 anotherDay.setDate(day.getDate() + 7);
                break;
            case "Телец":
                 anotherDay.setDate(day.getDate() + 8);
                 break;
             case "Близнецы":
                anotherDay.setDate(day.getDate() + 9);
                break;
            case "Рак":
                anotherDay.setDate(day.getDate() + 10);
                 break;
            case "Лев":
                 anotherDay.setDate(day.getDate() + 11);
                 break;
            default:
                anotherDay.setDate(day.getDate() + 0);
                break;


        }*/

    

    
    
    today = String(day.getDate()).padStart(2, '0');
    
   for(var i = 0, length = todays.length; i < length; i++){

        if(todays[i].Day === today){

            switch(zodiacSign)
            {
                case "Дева":
                    returnTodays = todays[i].today;
                    break;
                case "Весы":
                    if ((i+1)<=todays.length) returnTodays = todays[i+1].today;
                    else returnTodays = todays[i-1].today;
                    break;
                case "Скорпион":
                    if ((i+2)<=todays.length) returnTodays = todays[i+2].today;
                    else returnTodays = todays[i-2].today;
                    break;
                case "Стрелец":
                    if ((i+3)<=todays.length) returnTodays = todays[i+3].today;
                    else returnTodays = todays[i-3].today;
                    break;
                case "Козерог":
                    if ((i+4)<=todays.length) returnTodays = todays[i+4].today;
                    else returnTodays = todays[i-4].today;
                    break;
                case "Водолей":
                    if ((i+5)<=todays.length) returnTodays = todays[i+5].today;
                    else returnTodays = todays[i-5].today;
                    break;
                case "Рыбы":
                    if ((i+6)<=todays.length) returnTodays = todays[i+6].today;
                    else returnTodays = todays[i-6].today;
                    break;
                 case "Овен":
                    if ((i+7)<=todays.length) returnTodays = todays[i+7].today;
                    else returnTodays = todays[i-7].today;
                    break;
                case "Телец":
                    if ((i+8)<=todays.length) returnTodays = todays[i+8].today;
                    else returnTodays = todays[i-8].today;
                     break;
                 case "Близнецы":
                    if ((i+9)<=todays.length) returnTodays = todays[i+9].today;
                    else returnTodays = todays[i-9].today;
                    break;
                case "Рак":
                    if ((i+10)<=todays.length) returnTodays = todays[i+10].today;
                    else returnTodays = todays[i-10].today;
                     break;
                case "Лев":
                    if ((i+11)<=todays.length) returnTodays = todays[i+11].today;
                    else returnTodays = todays[i-11].today;
                     break;
                default:
                    returnTodays = todays[i].today;
                    break;
    
    
            }
            

        }
    }
    //returnTodays = zodiacSign;

    //returnDates = String(today.getDate()).padStart(2, '0');
    return returnTodays;

}

Astrology.prototype.fetchZodiacSign = function(){
    //Fetches the zodiac sign from the data that has been loaded into the class object
    //and the data provided by the user

    var monthNumber = this.currentSearch.monthNumber,
        date = this.currentSearch.date,
        twoSignsArray = [],
        zodiacSign = '',
        zodiacNumber = 0,
        zodiacSigns = this.zodiacSignsData.signs;

    for(var i = 0, length = zodiacSigns.length; i < length; i++){
        //  First lets compare the months, will always just be two possible months that can
        //  be passed in to the two arrays

        if(monthNumber === zodiacSigns[i].start.monthNumber || monthNumber === zodiacSigns[i].end.monthNumber){
            //If the months end or start in the specific month number we have a go and should
            //save the date in our temporary array awesomeness ;)
            twoSignsArray.push(zodiacSigns[i]);
        }
    }

    //Ok now lets check the two different signs
    for(var j = 0, length = twoSignsArray.length; j < length; j++){
        //First lets see if the month is in the start or in the end

        if(twoSignsArray[j].start.monthNumber === monthNumber){
            if(date >= twoSignsArray[j].start.date){
                zodiacSign = twoSignsArray[j].zodiacName;
                zodiacNumber = twoSignsArray[j].zodiacNumber;
            }
        }

        else if(twoSignsArray[j].end.monthNumber === monthNumber){
            if(date <= twoSignsArray[j].end.date){
                zodiacSign = twoSignsArray[j].zodiacName;
                zodiacNumber = twoSignsArray[j].zodiacNumber;
            }
        }
    }
    return zodiacSign;
};

Astrology.prototype.fetchZodiacSignDescription = function(){
    //Fetches the zodiac sign description
    var zodiacSign = this.fetchZodiacSign(),
        returnDescription = "",
        descriptions = this.zodiacSignsData.descriptions;

    if(typeof zodiacSign === "number"){
        //A number lets fetch the description through a zodiacNumber check
        for(var i = 0, length = descriptions.length; i < length; i++){
            if(descriptions[i].zodiacNumber === zodiacSign){
                returnDescription = descriptions[i].description;
            }
        }
    } else {
        //We have a string we are checking against lets do this ;)
        for(var i = 0, length = descriptions.length; i < length; i++){
            if(descriptions[i].zodiacName === zodiacSign){
                returnDescription = descriptions[i].description;
            }
        }
    }
    return returnDescription;
};



Astrology.prototype.sendToConsole = function(message){
    //Helper message method

    var consoleMessage =  "=================================" + "\n";
        consoleMessage += "# Astrology" + "\n";
        consoleMessage += "# Version: " + this.classData.version + " \n";
        consoleMessage += "# Message: " + message + " \n";
        consoleMessage += "=================================" + "\n";
    console.log(consoleMessage);
};

Astrology.prototype.sendErrorMessageToConsole = function(message, error){
    //Helper message method

    var consoleMessage =  "=================================" + "\n";
        consoleMessage += "# Astrology" + "\n";
        consoleMessage += "# Version: " + this.classData.version + " \n";
        consoleMessage += "# Error: " + message + " \n";
        consoleMessage += "=================================" + "\n";
    console.log(consoleMessage);
    console.log(error);
};

Astrology.prototype.initConnectionObject = function(connectionObject){
    //Lets initiate the connectionObject

    var dateDataUrl = '/js/astrology_data/astrology_data.json',
        descriptionDataUrl =  '/js/astrology_data/astrology_data.json',
        daysDataUrl =  '/js/astrology_data/astrology_data.json',
        returnObject;

        returnObject = {
            dateDataUrl: dateDataUrl,
            daysDataUrl: daysDataUrl,
            descriptionDataUrl: descriptionDataUrl
        };

    try{
        if(connectionObject === undefined){
            //Lets do nothing since we have already defined the paths to where to
        }
        else {
            returnObject.dateDataUrl = connectionObject.dateDataUrl || dateDataUrl;
            returnObject.descriptionDataUrl = connectionObject.descriptionDataUrl || descriptionDataUrl;
            returnObject.daysDataUrl = connectionObject.daysDataUrl || daysDataUrl;
        }
    } catch(e){
        //Do nothing since we already have the object instantiated with default values
    }
    return returnObject;
}

Astrology.prototype.init = function(connectionObject){
    //The init function, does the work and sets up the rest of the instantiated class object

    //Setup the connectionObject
    var connectionObjectModified = this.initConnectionObject(connectionObject);

    //Declare some objects and variables used within the instantiated class
    this.connectionObject = {
        dateDataUrl: connectionObjectModified.dateDataUrl,
        daysDataUrl: connectionObjectModified.daysDataUrl,
        descriptionDataUrl: connectionObjectModified.descriptionDataUrl
    };

    this.classData = {
        version:'0.4'
    };

    this.zodiacSignsData = {
        signs: [],
        descriptions: [],
        todays: []

    };

    this.currentSearch = {
        date:0,
        monthNumber:'',
        zodiacName:'',
        zodiacNumber:0,
        today:''

    };

    //Load the data
    this.xhrAndLoadJsonToDataArray(this.connectionObject.descriptionDataUrl, 'descriptions');
    this.xhrAndLoadJsonToDataArray(this.connectionObject.dateDataUrl, 'signs');
    this.xhrAndLoadJsonToDataArray(this.connectionObject.daysDataUrl, 'todays');

    //Print an instantiation message to the console
    this.sendToConsole('Object instantiated with dateData url ' +  this.connectionObject.dateDataUrl + ' and descriptionData url: ' +  this.connectionObject.descriptionDataUrl);
};
