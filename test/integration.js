import http from 'k6/http';
import { sleep, check, group } from 'k6';

const baseUrl = 'https://reqres.in';
const createUrl = `${baseUrl}/api/users/`;
let id;

const createBody = JSON.stringify({
    name: 'Selvia',
    job: 'QA Analyst',
});

const updateBody = JSON.stringify({
    name: 'Selvia',
    job: 'QA Engineer',
});

const params = {
    headers: {
        'Content-Type': 'application/json',
    },
};

export default function () {
    group('create a user with valid body', function () {
        const res_1 = http.post(createUrl, createBody, params);
        
        id = JSON.parse(res_1.body).id;

        check(
            res_1,
            {
                'Response status code is 201': (res_1) => res_1.status == 201,
                'Respone name should same with request name': (res_1) => res_1.name === createBody.name,
                'Respone job should same with request job': (res_1) => res_1.job === createBody.job,
                'Response id should be present': (res_1) =>  res_1.json().hasOwnProperty('id'),
                'Response createdAt should be present': (res_1) =>  res_1.json().hasOwnProperty('createdAt'),
                'Content-Type header is application/json': (res_1) => res_1.headers['Content-Type'] === 'application/json; charset=utf-8'
            });
      });

      group('update a user with valid body', function () {
        const updateUrl = `${baseUrl}/api/users/${id}`;

        const res_2 = http.put(updateUrl, updateBody, params);
        
        check(
            res_2,
            {
                'Response status code is 200': (res_2) => res_2.status == 200,
                'Respone name should same with request name': (res_2) => res_2.name === createBody.name,
                'Respone job should same with request job': (res_2) => res_2.job === createBody.job,
                'Response updatedAt should be present': (res_2) =>  res_2.json().hasOwnProperty('updatedAt'),
                'Content-Type header is application/json': (res_2) => res_2.headers['Content-Type'] === 'application/json; charset=utf-8'
            });
      }); 

      sleep(1);
}

