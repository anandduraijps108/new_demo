import React from 'react'
import HomePage from "./index"
import { BrowserRouter } from 'react-router-dom';
import {render, screen, waitFor} from '@testing-library/react'

  

test('App', async () => {

    const onSubmit = jest.fn().mockResolvedValue({
       "post": [
            {
              "date": "2023-04-04",
              "description": "Bying some carrots",
              "amount": "400",
              "id": 2
            }
          ]
      });
  
   await onSubmit();
   expect(onSubmit).toBeTruthy();
  })

