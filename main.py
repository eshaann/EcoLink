
from datetime import datetime
from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from flask import after_this_request, request
from flask_bcrypt import Bcrypt


app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
db = SQLAlchemy(app)
app.config['SQL_ALCHEMY_TRACK_MODIFICATIONS']=False
CORS(app, support_credentials=True)
bcrypt = Bcrypt(app)
abc = 5
##########################
####DB####################
##########################
class UserModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(100), nullable=False)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    city = db.Column(db.String(20), nullable=False)
    state = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f"User(email= {self.email}, password= {self.password}, first_name= {self.first_name}, last_name= {self.last_name}"

class Events(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    creator_email=db.Column(db.String(50))
    address = db.Column(db.String(50))
    description = db.Column(db.String(100))
    city = db.Column(db.String(50))
    state = db.Column(db.String(50))
    datetime = db.Column(db.String(50))
    duration = db.Column(db.Integer)
    people_needed = db.Column(db.Integer)

class Volunteers(db.Model):
    volunteeringSessionId = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer)
    eventId = db.Column(db.Integer)
    attended = db.Column(db.String(50))

#########################################
#########################################


user_put_args = reqparse.RequestParser()
user_put_args.add_argument("first_name", type=str, help="SEND NAME", required=True)
user_put_args.add_argument("last_name", type=str, help="SEND Last NAME", required=True)
user_put_args.add_argument("password", type=str, help="SEND PASSWORD", required=True)
user_put_args.add_argument("email", type=str, help="SEND EMAIL", required=True)
user_put_args.add_argument("city", type=str, help="SEND CITY", required=True)
user_put_args.add_argument("state", type=str, help="SEND STATE", required=True)
user = {}
resource_fields = {

    'email': fields.String,
	'password': fields.String,
	'first_name': fields.String,
    'last_name': fields.String,
    'city':fields.String,
    'state':fields.String

}


class User(Resource):
    @marshal_with(resource_fields)
    def get(self):
        user=UserModel.query.filter_by(id=abc).first()
        #print(user)
        return user

        
    @marshal_with(resource_fields)
    def post(self):
        args = user_put_args.parse_args()
        #print(args['password'])
        email = args['email']

        userz = UserModel.query.filter_by(email=email).first()
        if userz:
            return ''
        else:
            user = UserModel(first_name=args['first_name'], last_name=args['last_name'], password=bcrypt.generate_password_hash(args['password']), email=args['email'], city=args['city'], state=args['state'])
            db.session.add(user)
            db.session.commit()
            return user, 201
api.add_resource(User, "/user") 

user_login_args = reqparse.RequestParser()
user_login_args.add_argument("password", type=str, help="SEND PASSWORD", required=True)
user_login_args.add_argument("email", type=str, help="SEND EMAIL", required=True)
user = {}

resource_fields2 = {
	'email': fields.String,
	'password': fields.String
}

class Login(Resource):
    @marshal_with(resource_fields2)
    def post(self):

        args=user_login_args.parse_args()
        uEmail=args['email']
        uPassword=args['password']
        userFound = UserModel.query.filter_by(email=uEmail).first()
        if userFound and userFound.password == bcrypt.generate_password_hash(uPassword):
            return "", 200

        else:
            return "", 401
api.add_resource(Login, "/login")
####################
event_post_args = reqparse.RequestParser()
event_post_args.add_argument("title", type=str, help="SEND TITLE", required=True)
event_post_args.add_argument("description", type=str, help="SEND dESC", required=True)
#event_post_args.add_argument("creator_email", type=str, help="SEND EMAIL", required = True)
event_post_args.add_argument("city", type=str, help="SEND CITY", required = True)
event_post_args.add_argument("state", type=str, help="SEND State", required = True)
event_post_args.add_argument("datetime", type=str, help="SEND DATETIME", required = True)
event_post_args.add_argument("duration", type=int, help="SEND DURATION", required = True)
event_post_args.add_argument("address", type=str, help="SEND ADDRESS", required = True)
event_post_args.add_argument("people_needed", type=int, help="SEND NUM", required = True)

event = {}

resource_fields3 = {
	'title':fields.String,
    'description':fields.String,
    'creator_email':fields.String,
    'city':fields.String,
    'state':fields.String,
    'datetime':fields.String,
    'duration':fields.Integer,
    'address':fields.String,
    'people_needed':fields.Integer
}
class Event(Resource):
    @marshal_with(resource_fields3)
    def post(self):
        args = event_post_args.parse_args()
        event = Events(title=args['title'], description=args['description'], creator_email="nair.eshaan@gmail.com", city=args['city'].lower(), state=args['state'].lower(), datetime=args['datetime'], duration=args['duration'], address=args['address'], people_needed=args['people_needed'])
        db.session.add(event)
        db.session.commit()
        return event, 201
   
api.add_resource(Event, "/eventpost")

####################################


class EventsGet(Resource):
    @marshal_with(resource_fields3)
    def get(self, location):
        #print(location)
        city=str(location)
        eventsFound = Events.query.filter_by(city=city).all()
        #print(eventsFound)
        return eventsFound, 200
   
api.add_resource(EventsGet, "/events/<string:location>")
#####################################################

class EventsGetForUserCreated(Resource):
    @marshal_with(resource_fields3)
    def get(self):
        eventsFound = Events.query.filter_by(creator_email="nair.eshaan@gmail.com").all()
        return eventsFound, 200
api.add_resource(EventsGetForUserCreated, "/eventscreated")
############################################
volunteer_args = reqparse.RequestParser()
volunteer_args.add_argument("eventId", type=int)
#volunteer_args.add_argument("")
class EventsGetWhereUserVolunteered(Resource):
    pass

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)