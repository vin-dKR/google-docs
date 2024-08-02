import Image from 'next/image'
import React from 'react'

function Loader() {
    return (
        <div className='loader'>
            <Image
                src="/assets/icons/loader.svg"
                alt="Loader"
                width={30}
                height={30}
                className='animate-spin'
            />
            <p className='text-sm text-muted-foreground text-light-1'>
                Loading...
            </p>
        </div>
    )
}

export default Loader