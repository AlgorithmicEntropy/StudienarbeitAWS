import json
import time

def lambda_handler(event, context):
    body = {};
    pi_count = 5000
    statusCode = '200'
    headers = {
        'Content-Type': 'application/json',
    }

    try:
        body = {}
        start = time.perf_counter()
        # compute pi
        i = 1
        x = 3 * (10 ** pi_count)
        pi = x
        while (x > 0):
            x = x * i // ((i + 1) * 4)
            pi += x // (i + 2)
            i += 2
                
        body['pi'] = str(pi // (10 ** 20))
        end = time.perf_counter()
        function_time = end - start
        # to ms
        body['time'] = function_time * 1000

    except Exception as err:
        statusCode = '400'
        body = repr(err)
    
    return {
        'statusCode': statusCode,
        'body': json.dumps(body),
        'headers': headers
    }
