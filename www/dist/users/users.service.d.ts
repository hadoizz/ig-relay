import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    getUsers(): Promise<User[]>;
    getUser(where: {
        [key: string]: any;
    }): Promise<User>;
    updateUser(user: User): Promise<void>;
    deleteUser(user: User): Promise<void>;
    createUser(user: User): Promise<void>;
}
