#!/bin/bash
sudo apt update
cd ..
python3 -m venv myenv
. myenv/bin/activate
pip install --upgrade pip
cd ksi/
pip install -r requirements.txt


