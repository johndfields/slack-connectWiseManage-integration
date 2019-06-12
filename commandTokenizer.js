// Take in string and create a tokened array

function tokenizeSlashCommand(incomingSlackRequest){
    return  incomingSlackRequest.match(/\S+/gi);   
}

module.exports = {
    tokened : tokenizeSlashCommand
}