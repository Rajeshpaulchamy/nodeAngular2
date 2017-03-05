/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 05-Mar-2017  
 *     User service file
 */

/*
 * retrieve the required modules
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthService } from '../auth/index';
import { User } from '../../models/index';

/*
 * define AuthGuard class
 */
@Injectable()
export class UserService {
	/*
	 * private members
	 */
	http: Http;
	authService: AuthService;

	/*
	 * constructor
	 * @param {Http} http object
	 */
	constructor(http: Http, authServ: AuthService) {
		this.http = http;
		this.authService = authServ;
	}	

	
	/*
	 * get user
	 */
    getUser(username: string): Observable<User> {
        /* 
		 * add authorization header with jwt token
		 */
        let headers = new Headers({ 
			'Authorization': 'OAuth ' + this.authService.token 
		});
        let options = new RequestOptions({ headers: headers });

        /*
		 * get users from api
		 */
		return this.http.post('http://localhost:3000/getuser', { username: username }, options)
            .map((response: Response) => response.json());
    }

}

