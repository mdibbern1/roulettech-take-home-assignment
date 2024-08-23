# Roulettech Take Home Assignment
This is my take home assignment for Roulettech. This project is a basic cryptcurrency tracker. When you go the home page of the site it, it will show the prices of the cryptocurrency you select for the past week. When you sign in, it will show you the value of that coin in your portfolio (it will multiply the price by the quantity owned and display those values from the past week).

### To run the project
1. clone the project and open the directory in a terminal
2. change into the client folder by doing ```cd client```
    - once in the client folder, type ```npm install```
        - this will install all dependencies in the package.json file
3. go back the root directory and go into the server folder by doing ```cd server```
    - change directory again, going into the backend folder by doing ```cd backend```
    - once here, enter the following command to start the backend
        - mac: ```python3 manage.py runserver```
        - windows: ```python manage.py runserver```

### End Points
There are two simple endpoints in this project, one for signing up/registering and another for logging in.
 - signing up is simple, it just requires an email and password.
 - the login endpoint is also simple, just enter the username and password you used while signing up and you will be logged in!