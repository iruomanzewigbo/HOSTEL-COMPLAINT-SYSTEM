from flask import Flask,redirect,url_for,render_template,request
from application import app


@app.route('/',methods=['GET','POST'])
def login():
    if request.method=='POST':
        # Handle POST Request here
        return render_template('login.html')
    return render_template('login.html')

@app.route('/register', endpoint='register')
def register():
    return render_template('register.html')

@app.route('/home', endpoint='home')
def home():
    return render_template('home.html')

@app.route('/message', endpoint='message_view')
def message():
    return render_template('message.html')

@app.route('/send_message', endpoint='message_sent')
def send_message():
    return render_template('message_sent.html')


@app.route('/submit_complaint', methods=['POST'])
def submit_complaint():
    return redirect(url_for('message_sent'))