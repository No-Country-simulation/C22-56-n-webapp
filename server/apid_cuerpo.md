#Endpoints

POST
http://localhost:5000/api/auth/register
body:
{
    "nombres": "example", 
    "apellidos": "example",  
    "email": "example@example.com", 
    "username": "demo", 
    "password": "123"
}


POST
http://localhost:5000/api/auth/login
body:
{
    "username": "demo",
    "password": "123"
}
