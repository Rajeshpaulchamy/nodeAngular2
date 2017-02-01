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

# To build the client files
if [ "$1" = "build" ]; then
	echo "Selected mode is : build"
	ng build
	exit
fi

# To watch the changes and build the client files
if [ "$1" = "watch" ]; then
	echo "Selected mode is : watch"
	ng build -o dist -w
	exit
fi

# To build the client files for production
if [ "$1" = "production" ]; then
	echo "Selected mode is : production"
	ng build --prod
	exit
fi


# To start the ng server for local development
if [ "$1" = "run" ]; then
	echo "Selected mode is : run"
	ng serve
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
	echo "build \t\t: To build the client files"
	echo "watch \t\t: To watch the changes and build the client files"
	echo "production \t\t: To build the client files for production"
	echo "run \t\t: To start the ng server for local development"
fi

