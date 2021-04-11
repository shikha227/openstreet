// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
import React from 'react';// limport React from 'react';
import { shallow } from 'enzyme';
import SearchBox from './component/searchbox';

import { render, screen ,fireEvent,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Input value', () => {
    it('updates on change', () => {

      const setSearch = jest.fn((value) => {})
      
      const { queryByPlaceholderText} = render(<SearchBox/>)
  
      const searchInput = queryByPlaceholderText('Nameas')

  
      fireEvent.change(searchInput, { target: { value: 'test' } })
  
      expect(searchInput.value).toBe('test')
       


    }),
    it('updates on change',  async ()  => {

      
      render(<SearchBox/>)

      const searchInput = screen.queryByPlaceholderText('Nameas')

  
      fireEvent.change(searchInput, { target: { value: 'test' } })

    await waitFor(() => {
              expect(screen.getByTestId('alertId').value).toBeInTheDocument() 
    })


    }),
    it('updates on change', () => {

      const setSearch = jest.fn((value) => {})
      
      const { debug,queryByPlaceholderText } = render(<SearchBox />);
      const searchInput = queryByPlaceholderText('Nameas')
      fireEvent.change(searchInput, { target: { value: 'test' } })



  


  
  




    }

    )
  })
