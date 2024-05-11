# Final Task Rakamin Academy X Evermos PBI QA Using K6 On The ReqRes API

## Pre-requisites
+ [Visual Studio Code](https://code.visualstudio.com/download)
+ [K6 tools](https://dl.k6.io/msi/k6-latest-amd64.msi)

## Scenario
In this final task, integration and performance tests will be conducted using the k6 tool on the [ReqRes API](https://reqres.in), utilizing both the POST and PUT methods.

For the integration test, the objective is to ensure that the API endpoints behave as expected by verifying response status codes, response body contents, and other relevant aspects of the API responses.

For the performance test, the goal is to evaluate the API's performance under load. This will involve simulating a total of 1000 virtual users across 3500 iterations. A maximum response time threshold of 2 seconds will be set to ensure that the API response times remain within acceptable limits even under heavy load.

### API Create (POST)
| Base URL | ```https://reqres.in``` | 
| :--- | :--- | 
| Path URL | ```/api/users/``` | 
| Header | ```application/json``` | 
| Method | ```POST``` | 
| Request Body | ```{ 'name': 'morpheus', 'job': 'leader' }``` |
| Status Code | ```201 Created```| 

### API Update (PUT)
| Base URL | ```https://reqres.in``` | 
| :--- | :--- | 
| Path URL | ```/api/users/{id}``` | 
| Header | ```application/json``` | 
| Method | ```PUT``` | 
| Request Body | ```{ 'name': 'morpheus', 'job': 'zion resident' }``` |
| Status Code | ```200 OK```| 

## Run K6
**For Integration Test**
```
k6 run integration.js
```

**For Performance Test**
```
k6 run performance.js
```

## Report



