# SETUP

#### Clone
- [x] `git clone https://github.com/ishantd/superintern.git`

- [x] `cd superintern`

- [x] Install required libraries and dependencies <br/>
        `sudo apt-get update -y && sudo apt-get install python3-pip python3-dev libpq-dev postgresql postgresql-contrib python3-venv nginx -y`

### Create Virtual Env (Preferred)
bash/shell
- [x] `python3 -m venv env` or `virtualenv env`
switch to virtual environment 
- [x] `source env/bin/activate`
##### Install dependencies 
- [x] `pip3 install -r requirements.txt`

### Django setup

##### To run dev server
- [x] `python3 manage.py runserver`

To setup up database go to `settings.py` 

- [x] modify this code with your username (Linux/Mac)

```
if 'Your Username' in os.getcwd():
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
            # 'NAME': os.path.join(BASE_DIR, 'serverdb.sqlite3'),
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            # 'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
            'NAME': os.path.join(BASE_DIR, 'serverdb.sqlite3'),
        }
    }
```

- [x] Navigate to http://127.0.0.1:8000 to view dev server



## SCRAPER ON AWS

sudo apt update
sudo apt install unzip libnss3 python3-pip python3-venv xvfb


cd /tmp/
sudo wget https://chromedriver.storage.googleapis.com/83.0.4103.39/chromedriver_linux64.zip
sudo unzip chromedriver_linux64.zip
sudo mv chromedriver /usr/bin/chromedriver
chromedriver --version

wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install ./google-chrome-stable_current_amd64.deb

google-chrome-stable --version

pip3 install selenium --user

git clone https://github.com/ishantd/superintern.git

source env/bin/activate
pip3 install -r requirements.txt

python3 manage.py makemigrations
python3 manage.py migrate

sudo wget https://chromedriver.storage.googleapis.com/83.0.4103.39/chromedriver_linux64.zip
sudo unzip chromedriver_linux64.zip


## STEPS TO RUN REACT FRONT END

#### 1) Navigate to the ~/client directory from your terminal
- [x] `cd superintern`
- [x] `cd client`

#### 2) Install dependencies 
`npm install`

#### 3)Run frontend application
`npm start`


# Cronjob for tasks


0    9    *    *    *   . /home/super/superintern/env/bin/activate /home/super/superintern/manage.py internshala yes
. /path-to-env/bin/activate && /home/user/Desktop/job/dp/manage.py statistics


Server Setup:


sudo nano /etc/systemd/system/gunicorn.service

[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=super
Group=www-data
WorkingDirectory=/home/super/superintern
ExecStart=/home/super/superintern/env/bin/gunicorn --access-logfile - --workers 3 --bind unix:/home/super/superintern.sock superintern.wsgi:application

[Install]
WantedBy=multi-user.target

sudo nano /etc/nginx/sites-available/superintern

server {
    listen 80;
    server_name superintern.co ;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root /home/super/superintern;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/home/super/superintern.sock;
    }

    location /media/ {
        alias /home/super/superintern/media/;
    }
}

sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled

#### To restart server
sudo pkill gunicorn
sudo systemctl daemon-reload
sudo systemctl start gunicorn
sudo systemctl restart nginx
sudo systemctl restart gunicorn.service




python3 manage.py collectstatic --no-input