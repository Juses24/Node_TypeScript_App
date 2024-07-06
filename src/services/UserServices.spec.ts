import { UserService } from "./UserServices";
import * as jwt from 'jsonwebtoken'

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
    initialize: jest.fn()
})
jest.mock('jsonwebtoken')

const mockUserRepository = require('../repositories/UserRepository')


describe('UserService', () => {
    const userService = new UserService(mockUserRepository);
    const mockUser = {
        user_id: '12345',
        name: 'raquel',
        email: 'raquel@example.com',
        password: '12345'
    }
    
    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
        const response = await userService.createUser('jesus', 'jesus@test.com', '12345');
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({
            user_id: '12345',
            name: 'raquel',
            email: 'raquel@example.com',
            password: '12345'
        })
    })

    it('Deve retornar um token de usuário', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser))
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
        const token = await userService.getToken('raquel@example.com', '12345')
        expect(token).toBe('token')
    })

    it('Deve retornar um erro, caso não encontre um usuário', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null))
        await expect(userService.getToken('invalid@test.com', '12345')).rejects.toThrow(new Error('Email/password invalid!'))
    })
})