import json
import time


def fibo(n):
    if (n < 2):
        return 1
    else:
        return fibo(n - 2) + fibo(n - 1);
    
    
def lambda_handler(event, context):
    fibo_count = 25
    headers = {
        'Content-Type': 'application/json',
        }
    
    try:
        body = {}
        start = time.perf_counter()

        body['fib'] = fibo(fibo_count)
        
        end = time.perf_counter()
        function_time = end - start
        # to ms
        body['time'] = function_time * 1000
        statusCode = '200'

    except Exception as err:
        statusCode = '400'
        body = repr(err)
    
    return {
        'statusCode': statusCode,
        'body': json.dumps(body),
        'headers': headers
    }

