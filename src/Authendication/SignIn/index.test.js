    import React from 'react'
    import LoginPage from "./index"
    import { BrowserRouter } from 'react-router-dom';
    import {render, screen, waitFor} from '@testing-library/react'
    
    beforeEach(()=>{
        
        render(<BrowserRouter>
            <LoginPage/>
          </BrowserRouter>);
    });

    describe('Login test-01', () => {
     it('signIn',()=>{
        var signInText =  screen.getByTestId('signin-text');
        expect(signInText).not.toBeUndefined();
     })   
   
   });

   
   describe("Login test-02", () => {
     test("Submit button click", async () => {
       const onSubmit = jest.fn().mockResolvedValue({
         email: "anand",
         password: "123",
       });

       const eMail = screen.getByPlaceholderText("Email Address*");
       const password = screen.getByPlaceholderText("Password*");

       expect(eMail).not.toBeUndefined();
       expect(password).not.toBeUndefined();
       await onSubmit();
       expect(onSubmit).toBeCalledTimes(1);
     });
   });