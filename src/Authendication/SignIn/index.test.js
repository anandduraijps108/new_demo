    import React from 'react'
    import { render, screen, waitFor } from "@testing-library/react"
    import LoginPage from "./index"
    import userEvent from "@testing-library/user-event"
    
    const onSubmit = jest.fn()
    
   
    beforeEach(()=>{
        render(<LoginPage/>)
    })
    
    test('Login form test', async () => {
      const eMail = screen.getByTestId('text-input-element')
      const password = screen.getByTestId('password-input-element')
      userEvent.type(eMail, "fillWithTestUsername")
      userEvent.type(password, "fillWithTestPassword")
    
      userEvent.click(screen.getByTestId('login-button-element'))
    
      await waitFor(()=>{
        expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})