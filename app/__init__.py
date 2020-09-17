import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask-migrate import Migrate


from app.models import db
from app.models.users import User
from app.models.wines import Wine

from app.api.user_routes import user_routes
from app.api.auth_routes import auth_routes
from app.api.wine_routes import wine_routes

from app.config import Config

app = Flask(__name__, static_url_path='')

app.config.from_object(Config)

app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(wine_routes, url_prefix='/api/wines')

db.init_app(app)
migrate = Migrate(app, db)

# Application Security
CORS(app)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get('FLASK_ENV') else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path>')
def react_root(path):
    return app.send_static_file('index.html')
