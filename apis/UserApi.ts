import { APIRequestContext } from "@playwright/test";
import User from "../models/User";

                               ////Check readme Note////
export default class UserApi {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async register (user: User) {
       return await this.request.post('', {
            data: {
                email: user.getEmail(),
                password: user.getPassword(),
                firstName: user.getFirstName(),
                lastName: user.getLastName(),
            },
        });
    }
}
