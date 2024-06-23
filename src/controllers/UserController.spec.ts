import { UserController } from './UserController';
import { UserService } from '../services/UserServices';
import { Request } from 'express'
import { makeMockResponse } from '../__mocks__/mockResponse.mock';
import { makeMockRequest } from '../__mocks__/mockRequest.mock'; 

describe('userController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn()
    }

    const userController = new UserController(mockUserService as UserService);
    const mockResponse = makeMockResponse()

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Jesus',
                email: 'jesus@test.com'
            }
        } as Request

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado'})
    })

    it('Deve retornar erro caso o usuário não informe o name', () => {
        const mockRequest = {
            body: {
                name: 'Raquel',
                email: 'raquel@test.com'
            } 
        } as Request

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado'})
    })

    it('Deve retornar erro caso o usuário não informe o email', () => {
        const mockRequest = {
            body: {
                name: 'Fannia',
                email: ''
            }
        } as Request

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Name e email obrigatorio' })
    })

    it('Deve retornar a lista de usuários', () => {
        const mockRequest = makeMockRequest({})
        userController.getAllUsers(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
    })

    it('Deve retornar a lista de usuários', () => {
        const mockRequest = makeMockRequest({})
        userController.getAllUsers(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
    })

    it('Deve retornar a messagem de usuário deletado', () => {
        const mockRequest = {
            body: {
                name: 'Jesus',
                email: ''
            }
        } as Request

        userController.deleteUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado' })
    })
})