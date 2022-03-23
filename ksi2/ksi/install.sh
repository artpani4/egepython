#!/bin/bash
sudo apt update
apt-get install python3-venv
cd ..
python3 -m venv myenv
. myenv/bin/activate
pip install --upgrade pip
cd ksi/
pip install -r requirements.txt
apt install npm


