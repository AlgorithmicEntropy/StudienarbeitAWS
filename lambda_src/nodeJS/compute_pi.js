const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    let body = {};
    const pi_count = 5000n;
    let statusCode = '200'
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        switch (event.httpMethod) {
            case 'DELETE':
                body = 'delete';
                break;
            case 'GET':
                body = {}
				var start = Date.now();
                //compute pi
                let i = 1n;
                let x = 3n * (10n ** pi_count);
                let pi = x;
                while (x > 0) {
                    x = x * i / ((i + 1n) * 4n);
                    pi += x / (i + 2n);
                    i += 2n;
                }
                body.pi = (pi / (10n ** 20n)).toString();
                //end
                var end = Date.now();
                body.time = end - start;
                break;
            case 'POST':
                body = 'post';
                break;
            case 'PUT':
                body = 'put';
                break;
            default:
                throw new Error(`Unsupported method "${event.httpMethod}"`);
        }
    } catch (err) {
        statusCode = '400';
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};
