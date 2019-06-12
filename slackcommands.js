// Get the content of the slack request

function getSlackRequestContent(slackReq){
    // Remove first element
    slackReq = slackReq.slice(1); 
    let slackContent = '';
    slackReq.forEach((element) => {
        slackContent += element + ' ';        
    });

    return slackContent;
}

module.exports = {
    getSlackRequestContent: getSlackRequestContent
}
