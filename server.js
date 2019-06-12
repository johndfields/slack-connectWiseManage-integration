// main server to work with slack
"use strict";

// created functions
const tokenizeSlashCommand = require('./commandTokenizer').tokened;
const slackCommands = require('./slackcommands');
const connectWiseConnect = require('./connectWiseConnect');

// req packages
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const server = express();

server.use(bodyParser.urlencoded({extended: false }));

server.post('/api-command/tickets', async (req, res) => {
    let incomingSlackRequest = tokenizeSlashCommand(req.body.text); // just get request text

    let ticketNum = incomingSlackRequest[0];

    let connectWiseResponse = await connectWiseConnect.getCWData(ticketNum);
    
    res.send(connectWiseResponse);
});

// take in request from user and do something
server.post('/api-command/notes', async (req, res) => {
    let incomingSlackRequest = tokenizeSlashCommand(req.body.text); // just get request text
    let slackUser = req.body.user_name;

    let ticketNum = incomingSlackRequest[0];

    let noteForTicket = slackCommands.getSlackRequestContent(incomingSlackRequest);
    connectWiseConnect.sendCWData(slackUser, ticketNum, noteForTicket);
    
    res.send(`Adding note to ticket ${ticketNum}`);
});

server.listen(port, () => {
    console.log(`[Server]: Running on ${port}`);
});