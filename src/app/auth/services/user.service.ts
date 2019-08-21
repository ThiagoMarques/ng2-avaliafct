import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserInterface } from '../models/user-interface';
import { MEAT_API } from 'src/app/app.api';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<UserInterface[]>(`${MEAT_API}/users`);
    }

    getById(id: number) {
        return this.http.get(`${MEAT_API}/users/` + id);
    }

    register(user: UserInterface) {
        return this.http.post(`${MEAT_API}/users/register`, user);
    }

    update(user: UserInterface) {
        return this.http.put(`${MEAT_API}/users/` + user.id_acesso, user);
    }

    delete(id: number) {
        return this.http.delete(`${MEAT_API}/users/` + id);
    }
}
