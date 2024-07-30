import React from 'react'
import IconButton from '@/components/ui/IconButton';
import { BsFillGridFill } from 'react-icons/bs';
import { FaList } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { DisplayMode } from '@/interfaces/global.interface';
import { useBooks } from '@/providers/bookProvider';

export default function Filters() {

  const { displayMode, setDisplayMode, setSearchQuery } = useBooks()

 


  const handleDisplayModeChange = (newDisplayMode: DisplayMode) => {
    setDisplayMode(newDisplayMode)
  };


  return (
    <div className="flex w-full items-center justify-end gap-2">
    {/* <h3 className='body20-semi'>{pathName.replace('/etageres/', '')} </h3> */}
    <hgroup className='flex'>
      <span className='flex items-center gap-2 rounded-full bg-slate-200 py-2 px-3 mr-4'>
        <IoSearch className='w-5 h-5' />
        <input onChange={(e) => setSearchQuery(e.target.value)} type="search" className='bg-transparent outline-none' />
      </span>
      <IconButton
        ariaLabel='display books in list'
        className={`hover:bg-orange-100/30 rounded-lg ${displayMode === DisplayMode.List ? 'text-orange-400' : 'text-gray-400'}`}
        icon={<FaList />}
        onClick={() => handleDisplayModeChange(DisplayMode.List)}
      />
      <IconButton
        icon={<BsFillGridFill />}
        className={`hover:bg-orange-100/30 rounded-lg ${displayMode === DisplayMode.Grid ? 'text-orange-400' : 'text-gray-400'}`}
        ariaLabel='display books in grid'
        onClick={() => handleDisplayModeChange(DisplayMode.Grid)}
      />
    </hgroup>
  </div>
  )
}
