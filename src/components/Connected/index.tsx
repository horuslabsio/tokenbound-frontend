import React from 'react'
import { shortenAddress } from '../../../utils/helper'

function ConnectedNavBar() {
  return (
    <div className='flex space-x-4 items-center'>
        <div className='bg-gray-200 px-2 py-2 rounded-lg'>
            <h5>{shortenAddress('0x1234567890123456789012345678901234567890')}</h5>
        </div>
        <div>
            <button className='bg-black text-white px-4 py-2 rounded-lg' type="button">My NFTs &rarr;</button>
        </div>
    </div>
  )
}

export default ConnectedNavBar