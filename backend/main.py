from flask import escape

def hello_http(request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <http://flask.pocoo.org/docs/1.0/api/#flask.Request>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>.
    """
    request_form = request.form

    if request.form and 'name' in request_form:
        name = request_form['name']
    else:
        #return "Bad request", 400
        name = "no"
    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    name = '<b>' + name + '</b>'
    return (name,200,headers)