# Instagram Chat Analyzer - UVEC 2025 HACKATHON
A fully self-hosted web-application, displays in a visual manners a peek into the users digital life. As people spend more and more time online, they wish to know more about how this time is spent. We solve this through informing the user on  
- Top friends (by message count)  
- Activity Timeline  
- Word Frequenecy  
- Emoji Insights  
- Message Patterns  
    - Most active time of day for recieveing and sending  
    - Weekday vs Weekend heat maps  
    - Average message length by friend  
    - Conversation Streaks  
  
Finally, wrap all of this information in a summary card with  
- DM Wrapped  
    - Your longest conversation streak  
    - Total messages sent  
    - Total messages recieved  
    - Most Used Word  
Giving the user the ability to reflect on the conversations they spend time on.  

## Quick Start
Install our dependencies, by 
```python3
python -m venv venv
source venv/bin/activate
pip3 -r requirements.txt
```
Then go to instagram webiste and [ADD HERE LATER]

## Tech Stack  
We will be using a NextJS for the front end and Flask - python for the backend. Our main dataformat is the pandas DataFrame. 

## Division Of Labour  
This project has three components: Front End, Back End Infra, Analysis Logic.  
[Ali](https://github.com/ali-gaineshev)  
Worked on the Front-End  
[Ngan](https://github.com/nlhngan)  
Worked on the Flask End-Points and Business Logic  
[Khnanh](https://github.com/Khanh150104)  
Worked on Analysis Logic  
[Abil]()  
Worked on Analysis Logic  