import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    get(params: any): Promise<User>;
}
