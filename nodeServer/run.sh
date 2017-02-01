#!/bin/bash

# coding=utf-8
#
# OORA Software Solutions India Pvt.Ltd, Bangalore - India.
# 
# Copyright (c) 2017. OORA Software Solutions India Private Limited.
# All Rights Reserved.
# 
# 
# Revision number:
# ******************
# Rev.01 : 28-Jan-2017  
#     Script file added
#

# To build the image
if [ "$1" = "build" ]; then
	echo "Selected mode is : build"
	docker build -t rajeshpaulchamy/ubuntu16-04-nodejs7-4 .
	exit
fi

# To run the container
if [ "$1" = "run" ]; then
	echo "Selected mode is : run"
	docker stop nodewebserver || true
	docker rm nodewebserver || true
	docker run -v "$(pwd)":/app \
		-w /app \
		-p 3000:3000 \
		--link mongodbserver:mongodburl \
		--name nodewebserver \
		-d rajeshpaulchamy/ubuntu16-04-nodejs7-4
	exit
fi

# To run the node webserver console
if [ "$1" = "runconsole" ]; then
	echo "Selected mode is : runconsole"
	docker stop nodewebserver || true
	docker rm nodewebserver || true
	docker run -v "$(pwd)":/app \
		-w /app \
		-p 3000:3000 \
		--link mongodbserver:mongodburl \
		--name nodewebserver \
		rajeshpaulchamy/ubuntu16-04-nodejs7-4
	exit
fi

# To update the image
if [ "$1" = "commit" ]; then
	echo "Selected mode is : commit"

	if [ "$2" = "" ]; then
		echo "The second param is missing, pass the commit message"
		exit
	fi

	if [ "$3" = "" ]; then
		echo "The third param is missing, pass the image container id"
		exit
	fi

	docker commit -m="$2" -a="Rajeshpaulchamy" "$2" rajeshpaulchamy/ubuntu16-04-nodejs7-4
	exit
fi


if [ "$1" = "" ]; then
	echo "##################################"
	echo "Command-line utility, version 1.0"
	echo "##################################"
	echo ""
	echo "Available commands and usage details:"
	echo "====================================="
	echo "usage: sh run.sh [options] [args]"
	echo ""
	echo "COMMANDS:"
	echo "========="
	echo "build \t\t: To build the node server"
	echo "commit \t\t: To update the node server"
	echo "run \t\t: To run the node server"
	echo "runconsole \t\t: To run the node server in console"
fi

