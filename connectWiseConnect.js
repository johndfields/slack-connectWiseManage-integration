// connect to ConnectWise and Query
const fetch = require('node-fetch');
const Users = require('./Models/Users.json');

// create http GET request to get ticket notes
// Can get up to the last 100 notes
async function getConnectWiseData(ticketNum) { 
    var cwURL = `https://api-na.myconnectwise.net/v4_6_release/apis/3.0/service/tickets/${ticketNum}/notes?pageSize=100`;
    var cwToken = '{YOUR TOKEN HERE}';

    let mostRecentNote = await fetch(cwURL, {
        method: 'GET',
        headers: {
            'Authorization' : 'Basic ' + cwToken,
            'Content-Type':'application/json'
        },
    }).then((request) => {
        return request.json();
    });
    
    let ticketLength = mostRecentNote.length-1;
    let authorAndNote = `${mostRecentNote[ticketLength]['createdBy']}: ${mostRecentNote[ticketLength]['text']}`
    return authorAndNote;
}

// create http POST request to update ticket
async function sendConnectWise(slackUser, ticketNum, noteForTicket) {
    var cwURL = `https://api-na.myconnectwise.net/v4_6_release/apis/3.0/service/tickets/${ticketNum}/notes`;
    var cwToken = '{YOUR TOKEN HERE}';
    let cwUser = findMatchingCWSlackUser(slackUser, Users);

    await fetch(cwURL, {
        method: 'POST',
        body: JSON.stringify({
                "ticketId": ticketNum,
                "text": noteForTicket,
                "detailDescriptionFlag": true,
                "internalAnalysisFlag": false,
                "resolutionFlag": false,
                "member": {
                  "identifier": cwUser,
                },
                "processNotifications":true,
          }),
        headers: {
            'Authorization' : 'Basic ' + cwToken,
            'Content-Type':'application/json'
        },
    }).then((response) => {
        return response.text()
    }).catch((err) => {
        console.log(err)
    });
}

function findMatchingCWSlackUser(slackUser, file){
    let matchingCWUser = ""
    file = JSON.stringify(file);
    let jsonData = JSON.parse(file);
    jsonData.forEach(user => {
        if (slackUser === user.slackName){
            matchingCWUser = user.CWName;
        }
    });
    return matchingCWUser;
}

module.exports = {
    getCWData: getConnectWiseData,
    sendCWData: sendConnectWise
}

