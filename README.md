# SETUP

` sudo apt-get update -y`
```
sudo apt-get install python3-pip python3-dev libpq-dev postgresql postgresql-contrib virtualenv nginx jupyter-notebook python3-venv -y
```
` git clone https://github.com/ishantd/triuneforum.git `

` cd triuneforum `

` python3 -m venv env && source env/bin/activate `

` pip3 install wheel && pip3 install -r requirements.txt `



# refresh the server
sudo pkill gunicorn
sudo systemctl daemon-reload
sudo systemctl start gunicorn
sudo systemctl restart nginx


# save github password
git config --global credential.helper store



# setup on other Machine




1. Installation

sudo apt-get update -y
sudo apt-get install python3-pip python3-dev libpq-dev postgresql postgresql-contrib python3-venv virtualenv nginx -y
pip3 install django django-crispy-forms django-mysql qrcode[pil] xhtml2pdf pdfkit django-session-timeout

# for PDF Generation Install this
wget https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.5/wkhtmltox_0.12.5-1.bionic_amd64.deb
sudo dpkg -i wkhtmltox_0.12.5-1.bionic_amd64.deb

<!--  -->
pip3 install git+git://github.com/ojii/pymaging.git#egg=pymaging
pip3 install git+git://github.com/ojii/pymaging-png.git#egg=pymaging-png

scp -i triune.pem /home/ubuntu/ishant_linux/triuneforum/db.sqlite3 ishant@ec2-52-23-254-99.compute-1.amazonaws.com:/home/ubuntu/triuneforum/

>>> User creation
sudo adduser ishant
sudo usermod -aG sudo ishant

sudo adduser triuneforum
sudo usermod -aG sudo triuneforum

su - ishant

sudo ufw enable
sudo ufw allow OpenSSH
sudo ufw allow 8000
sudo ufw allow 5432

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



Setup gunicorn :

sudo nano /etc/systemd/system/gunicorn.service

[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/home/ubuntu/triuneforum
ExecStart=/home/ubuntu/triuneforum/env/bin/gunicorn --access-logfile - --workers 3 --bind unix:/home/ubuntu/triuneforum.sock triuneforum.wsgi:application

[Install]
WantedBy=multi-user.target

[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=forumadmin
Group=www-data
WorkingDirectory=/home/forumadmin/triuneforum
ExecStart=/home/forumadmin/triuneforum/env/bin/gunicorn --access-logfile - --workers 3 --bind unix:/home/forumadmin/triuneforum.sock triuneforum.wsgi:application

[Install]
WantedBy=multi-user.target

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
nginx Setup:

54.227.203.60

sudo nano /etc/nginx/sites-available/triuneforum

server {
    listen 80;
    server_name 54.227.203.60;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root /home/ubuntu/triuneforum;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/home/ubuntu/triuneforum.sock;
    }
}

server {
    listen 80;
    server_name _;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root /home/forumadmin/triuneforum;
    }

    location /media/ {
        root /home/forumadmin/triuneforum;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/home/forumadmin/triuneforum.sock;
    }
}

sudo nano /etc/nginx/sites-available/triuneforums

server {
    listen 80;
    server_name tes-ceo.sensus.codes;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root /home/ubuntu/triuneforum;
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:/home/ubuntu/triuneforum.sock;
    }
}

sudo ln -s /etc/nginx/sites-available/triuneforums /etc/nginx/sites-enabled

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

Update changes on server

sudo pkill gunicorn
sudo systemctl daemon-reload
sudo systemctl start gunicorn
sudo systemctl enable gunicorn
sudo systemctl restart gunicorn


sudo nginx -t
sudo ufw delete allow 8000
sudo ufw allow 'Nginx Full'
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


sudo ufw allow 8000

jupyter notebook --ip=0.0.0.0 --port=9780


>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Resources : 


https://docs.bitnami.com/aws/apps/noalyss/administration/configure-pgadmin/

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-scalable-django-app-with-digitalocean-managed-databases-and-spaces

https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04#create-and-configure-a-new-django-project

https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04

/home/ubuntu/triuneforum/env/bin/python /home/ubuntu/triuneforum/manage.py send_queued_mail >> send_mail.log 2>&1