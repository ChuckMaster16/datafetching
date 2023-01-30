import React from 'react'

const Header = () => {
  return (
    <div className='p-10 h-11 w-screen'>
        <div className='flex gap-10 shadow-xl w-[80%] items-center rounded-2xl p-5'>
            <label htmlFor="">Selected Period:</label>  
            <div className='flex gap-3 items-center'>
                <label>from</label>
                <input type="date" />
                <label>To</label>
                <input type="date" />
                <label >Offices</label>
                <select name="" id="" className='border px-20 py-2'>
                    <option value="">office 1</option>
                    <option value="">office 2</option>
                    <option value="">office 3</option>
                    <option value="">office 4</option>
                </select>
            </div>

        </div>
        
    </div>
  )
}

export default Header