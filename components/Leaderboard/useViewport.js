import { debounce } from '@material-ui/core';
import React, {useState, useEffect} from 'react'

const useViewport =() =>{
    const [width, setWidth]= React.useState(window.innerWidth);

    React.useEffect(()=>{
        const debounceHandleResize= debounce(function handleWindowResize ()
        { 
            if(window.innerWidth<622){
                setWidth(400);
            }else{
                setWidth(window.innerWidth-400);
            }
        },1000)
        window.addEventListener("resize", debounceHandleResize);
        return ()=>window.removeEventListener("resize", debounceHandleResize)
    },[]);
console.log(width)
    return {width};
}
export default useViewport