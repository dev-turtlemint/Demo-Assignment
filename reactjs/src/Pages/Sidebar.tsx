import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

  return (
    <div className='pagecolumn'>
        <Button onClick={() => navigate('/add')}>
        Add Patient
        </Button>
        <Button onClick={() => navigate('/edit')}>
        Edit Patient
        </Button>
        <Button onClick={() => navigate('/search')}>
        Search
        </Button>
        <Button onClick={() => navigate('/select')}>
        Select File
        </Button>
    </div>
  )
}

export default Sidebar