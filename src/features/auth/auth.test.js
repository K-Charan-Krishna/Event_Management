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
 import {summ} from './auth.controller'

 test('testing Primitive',()=>{
    expect(summ(1,3)).toBe(4)
 })

 test('testing objects',()=>{
    let data={'one':1}
    data['two']=2
    expect(data).toEqual({one:1,two:3})
 })

 test('testing falsy value',()=>{
    let n=""
    expect(n).toBeFalsy()
 })
 test('testing Truth value',()=>{
    let n=1
    expect(n).toBeTruthy()
 })