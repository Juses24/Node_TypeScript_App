import { UserController } from './UserController';
import { UserService } from '../services/UserServices';
import { Request } from 'express'
import { makeMockResponse } from '../__mocks__/mockResponse.mock';
import { makeMockRequest } from '../__mocks__/mockRequest.mock'; 


const mockUserService = {
    createUser: jest.fn(),
    getUser: jest.fn()
}

jest.mock('../services/UserServices', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService
        })
    }
})

describe('userController', () => {
    

    const userController = new UserController();
    const mockResponse = makeMockResponse()

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Jesus',
                email: 'jesus@test.com',
                password: 'password'
            }
        } as Request

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado'})
    })

    it('Deve retornar erro caso o usuário não informe o name', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'raquel@test.com',
                password: 'password'
            } 
        } as Request

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Todos os campos são obrigatórios' })
    })

    it('Deve retornar erro caso o usuário não informe o email', () => {
        const mockRequest = {
            body: {
                name: 'Fannia',
                email: '',
                password: 'password'
            }
        } as Request

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Todos os campos são obrigatórios' })
    })

    it('Deve retornar erro caso o usuário não informe o password', () => {
        const mockRequest = {
            body: {
                name: 'Fannia',
                email: 'raquel@test.com',
                password: ''
            }
        } as Request

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request! Todos os campos são obrigatórios' })
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

    it('Deve retornar o usuário com o userId informado', () => {
        const mockRequest = makeMockRequest({
            params: {
                userId: '12345'
            }
        })

        userController.getUser(mockRequest, mockResponse)
        expect(mockUserService.getUser).toHaveBeenCalledWith('12345')
        expect(mockResponse.state.status).toBe(200)
    })
})