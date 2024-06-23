import { UserController } from './UserController';
import { UserService } from '../services/UserServices';
import { makeMockResponse } from '../__mocks__/mockResponse.mock';
import { Request } from 'express'

describe('userController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn()
    }

    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Jesus',
                email: 'jesus@test.com'
            }
        } as Request
        const mockResponse = makeMockResponse() 
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado'})
    })
})