import React from 'react'

const Newslatter=()=> {

const onsubmithandler =(evetnt)=>{
    evetnt.preventDefault();
}

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
            Explore our handpicked selection of the season’s freshest arrivals. From stylish fashion essentials to must-have accessories, our latest collections are crafted to elevate your everyday look. Whether you're refreshing your wardrobe or shopping for gifts, we’ve got something new for everyone.
        </p>

        <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm-flex-1 outline-none' type="email" placeholder='Enter Your Name' />
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>Subscribe</button>
        </form>
    </div>
  )
}

export default Newslatter