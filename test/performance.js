import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";



const baseUrl = 'https://reqres.in';
const createUrl = `${baseUrl}/api/users/`;
let id;

const createBody = JSON.stringify({
    name: 'morpheus',
    job: 'leader',
});

const updateBody = JSON.stringify({
    name: 'morpheus',
    job: 'zion resident',
});

const params = {
    headers: {
        'Content-Type': 'application/json',
    },
};

export const options = {
    vus: 1000,  
    iterations: 3500,  
    thresholds: { 
      http_req_duration: ['max <= 2000'],
      http_req_failed: ['rate < 0.1']
    }
};

export default function () {
    group('create a user with valid body', function () {
        const res_1 = http.post(createUrl, createBody, params);
        
        id = JSON.parse(res_1.body).id;

        check(
            res_1,
            {
                'Response status code is 201': (res_1) => res_1.status == 201,
                'Response name should same with request name': (res_1) => res_1.name === createBody.name,
                'Response job should same with request job': (res_1) => res_1.job === createBody.job,
                'Response id should be present': (res_1) =>  res_1.json().hasOwnProperty('id'),
                'Response createdAt should be present': (res_1) =>  res_1.json().hasOwnProperty('createdAt'),
                'Content-Type header is application/json': (res_1) => res_1.headers['Content-Type'] === 'application/json; charset=utf-8',
                'Response time should be less than 2s': (res_1) => res_1.timings.duration < 2000
            });
      });

      group('update a user with valid body', function () {
        const updateUrl = `${baseUrl}/api/users/${id}`;

        const res_2 = http.put(updateUrl, updateBody, params);
        
        check(
            res_2,
            {
                'Response status code is 200': (res_2) => res_2.status == 200,
                'Response name should same with request name': (res_2) => res_2.name === createBody.name,
                'Response job should same with request job': (res_2) => res_2.job === createBody.job,
                'Response updatedAt should be present': (res_2) =>  res_2.json().hasOwnProperty('updatedAt'),
                'Content-Type header is application/json': (res_2) => res_2.headers['Content-Type'] === 'application/json; charset=utf-8',
                'Response time should be less than 2s': (res_2) => res_2.timings.duration < 2000
            });
      });

      sleep(1);    
}

export function handleSummary(data) {
    return {
      "report.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}
