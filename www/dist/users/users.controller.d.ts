import { UsersService } from './users.service';
import { User } from './user.entity';
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    get(params: any): Promise<User>;
    create(user: User): Promise<void>;
    update(user: User): Promise<void>;
    delete(params: any): Promise<void>;
}
