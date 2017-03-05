#!/bin/bash
 

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
#     Script file added for docker help
#                                                                                                   
                                                                                                    
# To stop all containers
if [ "$1" = "stop" ]; then                                                                         
    echo "Selected mode is : stop"                                                                 
	docker stop $(docker ps -a -q)
    exit                                                                                            
fi                                                                                                  

# To remove all containers
if [ "$1" = "remove" ]; then                                                                           
    echo "Selected mode is : remove"                                                                   
	docker rm $(docker ps -a -q)
    exit                                                                                            
fi                                                                                                  
 
# To remove all images
if [ "$1" = "delete" ]; then                                                                           
    echo "Selected mode is : delete"                                                                   
	docker stop $(docker ps -a -q)
	docker rm $(docker ps -a -q)
	docker rmi $(docker images -a -q)
    exit                                                                                            
fi                                                                                                  

 
# To inspect a container to find IP Address and Port number
if [ "$1" = "inspect" ]; then
    echo "Selected mode is : inspect"
    echo "Usage detail : sh run.sh inspect docker-container-name"                                                                   
	docker inspect $2
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
    echo "stop \t\t: To stop all containers"     
    echo "remove \t\t: To remove all containers"         
    echo "delete \t\t: To delete all images"         
    echo "inspect \t\t: To get IP Address and Port number of a container"        
fi                 


