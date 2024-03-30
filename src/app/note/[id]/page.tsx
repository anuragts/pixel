'use client'
import { Editor } from 'novel';


export default function page() {
    return (
        <>
        <Editor 
        completionApi='/api/generate'
        className='text-gray-900 bg-gray-100 h-[100vh]' 
        />
        </>
    )
}
