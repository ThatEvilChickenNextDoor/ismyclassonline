from bs4 import BeautifulSoup
import requests

def tag_scraper(request):
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
    rescode = 200
    if request.form and 'subject' in request_form:
        subject = request_form['subject'].upper()
        number = request_form['number'].upper()
        section = request_form['section'].zfill(2)
        URL = "https://courselist.wm.edu/courselist/courseinfo/searchresults?term_code=202110&term_subj={}&attr=0&attr2=0&levl=0&status=0&ptrm=0&search=Search".format(subject)
        print("getting page")
        r = requests.get(URL)
        print("got page")
        if r.status_code != 200:
            res = "Subject code not found"
        else:
            print("souping")
            soup = BeautifulSoup(r.text, 'html5lib')
            print("tabling")
            table = soup.table
            print("finding")
            code = table.find("td", string=subject+' '+number+' '+section+' ')
            print("found")
            if code is None:
                res = "Number/section not found"
            else:
                tags, name = code.find_next_siblings("td", limit=2)
                res = "<b>" + code.text + name.text + "</b>"
                tagslist = tags.text.split(", ")
                if "FS" in tagslist:
                    res += "<p>FS: Face to face, Synchronous</p>"
                elif "MIX" in tagslist:
                    res += "<p>MIX: Mix of in-person and remote</p>"
                elif "RA" in tagslist:
                    res += "<p>RA: Remote, Asynchronous</p>"
                elif "RSOC" in tagslist:
                    res += "<p>RSOC: Remote, Synchronous on Campus</p>"
                elif "RSOF" in tagslist:
                    res += "<p>RSOF: Remote, Synchronous off Campus"
                else:
                    res += "<p>Delivery attribute not found</p>"

    else:
        res = "Bad request"
        rescode = 400
        
    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    
    return (res,rescode,headers)
