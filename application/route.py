from flask import Flask,redirect,url_for,render_template,request
from application import app


@app.route('/',methods=['GET','POST'])
def home():
    if request.method=='POST':
        # Handle POST Request here
        return render_template('index.html')
    return render_template('index.html')

@app.route('/message', endpoint='message_view')
def message():
    return render_template('message.html')

@app.route('/send_message')
def send_message():
    return render_template('message_sent.html')


@app.route('/submit_complaint', methods=['POST'])
def submit_complaint():
    return redirect(url_for('message_sent'))