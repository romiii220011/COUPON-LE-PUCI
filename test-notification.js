const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const url = 'http://localhost:3000/use-coupon';
const data = {
    couponId: '12345'
};

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
})
.catch(error => {
    console.error('Error:', error);
});
