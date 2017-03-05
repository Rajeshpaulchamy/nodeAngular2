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
# Rev.01 : 02-Mar-2017  
#     Script file added
#

# To build the image
if [ "$1" = "build" ]; then
	echo "Selected mode is : build"
	docker build -t rajeshpaulchamy/rethinkdb2.3.5 .
	exit
fi

# To run the mysql as a background process
if [ "$1" = "run" ]; then
	echo "Selected mode is : run"
	docker stop rethinkdbserver || true
	docker rm rethinkdbserver || true
	docker run \
		--name rethinkdbserver \
		-v "$(pwd)/data" \
		-p 8080:8080 -p 28015:28015 -d rajeshpaulchamy/rethinkdb2.3.5

	echo "Access the web admin using the URL 'http://172.17.0.2:8080/' "
	exit
fi

# To run the mysql console
if [ "$1" = "webadmin" ]; then
	echo "Selected mode is : webadmin"
	echo "*** In case of errors, make sure first execture the 'run' command  ***"
	$BROWSER "http://$(docker inspect --format \
		'{{ .NetworkSettings.IPAddress }}' rethinkdbserver):8080"
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

	docker commit -m="$2" -a="Rajeshpaulchamy" "$3" rajeshpaulchamy/rethinkdb2.3.5
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
	echo "build \t\t: To build the rethinkdb server"
	echo "run \t\t: To run the rethinkdb server"
	echo "webadmin \t\t: To run the rethinkdb in webadmin console"
fi

