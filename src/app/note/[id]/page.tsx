'use client'
import { Editor } from 'novel';


export default function page() {
    return (
        <>
        <Editor 
        completionApi='/api/generate'
        className='text-gray-100 bg-black h-[100vh]' 

        />
        </>
    )
}
