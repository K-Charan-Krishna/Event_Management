// import { registerUser } from './auth.controller.js'; 

// test('Register User', async () => {
//   const res = {
//     status: jest.fn().mockReturnThis(),  
//     json: jest.fn(),
//   };

//   // 2. Create a mock request object (simulate req.body)
//   const req = {
//     body: {
//       firstName: "Alice",
//       lastName: "Johnson",
//       email: "aj@example.com",
//       password: "Krishna@2001",
//     },
//   };

//   // 3. Call your controller with mocks
//   await registerUser(req, res);

//   // 4. Assert res.status was called with 200
//   expect(res.status).toHaveBeenCalledWith(200);

//   // 5. Assert res.json was called with expected data structure
//   expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
//     success: true,
//     message: expect.any(String),
//   }));
// });
//  import {summ,inputValidate,callbackfunction,verifyInput,checkingPromiss} from './auth.controller'

//  test('testing Primitive',()=>{
//     expect(summ(1,3)).toBe(4)
//  })

//  test('testing objects',()=>{
//     let data={'one':1}
//     data['two']=2
//     expect(data).toEqual({one:1,two:2})
//  })

//  test('testing falsy value',()=>{
//     let n=""
//     expect(n).toBeFalsy()
//  })
//  test('testing Truth value',()=>{
//     let n=1
//     expect(n).toBeTruthy()
//  })

//  test('Input Type Error',()=>{
//    expect(()=>{
//       inputValidate('')
//    }).toThrow()
//  })

//  test('testing callback',done=>{
//    function callback(data){
//       try {
//          expect(data).toBe('from callback')
//          done()
//       } catch (error) {
//          done(error)
//       }
//    }
//    callbackfunction(callback)
//  })

// test('Testing Async Function',()=>{
//    return expect(checkingPromiss('hi')).resolves.toBe('hi')
// })

// test('Testing the async', async()=>{
//    let data=await checkingPromiss('hi')
//    expect(data).toBe('hi')
// })


// test('Testing Async Function',()=>{
//    return expect(checkingPromiss('hik')).rejects.toThrow('error');
// })

// Mock the dependencies


import { jest, describe, it, expect, beforeEach } from '@jest/globals'
import { login } from './auth.controller.js'
import * as responseModule from '../../utilis/response.js'
import * as authServices from './auth.services.js'

jest.mock('../../utilis/response.js')
jest.mock('./auth.services.js')

describe('login controller', () => {
  let req, res, next

  beforeEach(() => {
    // Manual mock implementation for response function
    responseModule.response = jest.fn()

    // Manual mock implementation for userLoginService
    authServices.userLoginService = jest.fn()

    req = { body: {} }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    next = jest.fn()

    jest.clearAllMocks()
  })

  it('should return 400 if email is missing', async () => {
    req.body = { password: 'test123' }
    await login(req, res, next)
    expect(responseModule.response).toHaveBeenCalledWith(res, 400, false, 'Email is  Required!')
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 400 if password is missing', async () => {
    req.body = { email: 'test@example.com' }
    await login(req, res, next)
    expect(responseModule.response).toHaveBeenCalledWith(res, 400, false, 'Password is  Required!')
    expect(next).not.toHaveBeenCalled()
  })

  it('should call next() with userDetails if valid input', async () => {
    req.body = { email: 'test@example.com', password: 'test123' }
    const fakeUser = { id: 1, email: 'test@example.com' }
    authServices.userLoginService.mockResolvedValue(fakeUser)

    await login(req, res, next)

    expect(req.userDetails).toEqual(fakeUser)
    expect(next).toHaveBeenCalled()
    expect(responseModule.response).not.toHaveBeenCalled()
  })

  it('should return 500 if userLoginService throws error', async () => {
    req.body = { email: 'test@example.com', password: 'test123' }
    const error = new Error('DB error')
    authServices.userLoginService.mockRejectedValue(error)

    await login(req, res, next)

    expect(responseModule.response).toHaveBeenCalledWith(res, 500, false, 'DB error', [])
    expect(next).not.toHaveBeenCalled()
  })
})
