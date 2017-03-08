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
	docker build -t rajeshpaulchamy/mongodb3.4 .
	exit
fi

# To run the mongodb as a background process
if [ "$1" = "run" ]; then
	echo "Selected mode is : run"
	docker stop mongodbserver || true
	docker rm mongodbserver || true
	docker run -v "$(pwd)/data":/data/db --name mongodbserver -d rajeshpaulchamy/mongodb3.4
	exit
fi

# To run the mongodb console
if [ "$1" = "runconsole" ]; then
	echo "Selected mode is : runconsole"
	echo "*** In case of errors, make sure first execture the 'run' command  ***"
	docker stop mongodbserver || true
	docker rm mongodbserver || true
	docker run -v "$(pwd)/data":/data/db --name mongodbserver -d rajeshpaulchamy/mongodb3.4
	# sleep for 5 seconds to wait for the mongod server start run
	sleep 5s
	docker exec -it mongodbserver mongo admin
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

	docker commit -m="$2" -a="Rajeshpaulchamy" "$3" rajeshpaulchamy/mongodb3.4
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
	echo "build \t\t: To build the mongodb server"
	echo "run \t\t: To run the mongodb server"
	echo "runconsole \t\t: To run the mongodb server console"
fi

