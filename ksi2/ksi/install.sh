#!/bin/bash
sudo apt update
cd ..
python3 -m venv myenv
. myenv/bin/activate
cd ksi/
pip install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py collectstatic

