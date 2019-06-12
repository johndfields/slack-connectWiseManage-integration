# Slack to ConnectWise Interface
This integration is used to allow users in slack to update their tickets and notes on ConnectWise. Built using ConnectWise API\
*Current Commands*:\
    **/notes** *[ticket Number] [note for ticket]* : add note to a ticket\
    **/tickets** *[ticket Number]* : get last update from a ticket\

### Slack
We want to set up a new application in Slack to communicate to ConnectWise.\
Create an app in Slack. *Note: this will send an HTTP POST style Request*\
Under **Building Apps for Slack** click on **Slash Commands**.\
Click on **Create New Command** and set up the following:\
    - **Command**: /nameOfCommand <= how you would use it in the chat in slack\
    - **Request URL**: Public URL of the webserver that you build with Node.js\
    - **Short Description**: Explanation of the command\
    - **Usage Hint**: What format the user will interact with it\
        Ex: /notes [ticket Number] [note for ticket]\
Hit *Save*.

### ConnectWise
ConnectWise Developer Documentation: https://developer.connectwise.com/ \
You will need this to generate your ConnectWise API Token **(cwToken)** located in *connectWiseConnect.js*

### User Connection / Database
Currently the setup uses a Users.json file located in a Models folder. This is used in the *connectWiseConnect.js* file to load in the users and match the incoming request from a *Slack* user to their *ConnectWise* equivalent.
You can use any Database you would like instead of the JSON file!\
Make sure you have the following fields in whatever you use:\
    - **name**: Name of the User\
    - **slackName**: The slack name of the user (ex: firstname.lastname)\
    - **CWname**: Name of the ConnectWise member (their member id). This can be found under System>Members and it is their *Member ID*.\
**If you use a database**: Within the *connectWiseConnect.js* file you will need to change the **findMatchingCWSlackUser** to use your connection point rather than the JSON file.

**Feel free to reach out to me for any questions or comments.**
