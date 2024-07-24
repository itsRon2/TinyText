import React from 'react';

function SideBar(props) {
    return (
        <div className=' flex flex-col items-start text-black px-1  w-full'>
            <button className='p-2  mx-auto my-2 w-full rounded-sm  bg-app-primary text-sm'>New SMS</button>
            <button className='p-2  mx-auto my-2 w-full rounded-sm  bg-app-primary text-sm'>Failed SMS</button>
            {/*<button className='p-2  mx-auto my-2 w-full rounded-sm bg-app-primary text-sm'>Archive</button>*/}
        </div>
    );
}

export default SideBar;