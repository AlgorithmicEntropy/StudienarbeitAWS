exports.handler = async (event) => {
    
    const fibo_count = 25;
    
    const headers = {
        'Content-Type': 'application/json',
    };
    
    function fibo(n) { 
        if (n < 2) {
            return 1;
        } else {
            return fibo(n - 2) + fibo(n - 1);
        }
    }
    // body to hold data
    let body = {}
    
    //start function timing
    let start = Date.now();
    
    // calculations
    body.fib = fibo(fibo_count)
    
    // end time
    let end = Date.now();
    body.time = end - start;
    
    body = JSON.stringify(body);
   
    const response = {
        statusCode: 200,
        body,
        headers
    };
    return response;
};
