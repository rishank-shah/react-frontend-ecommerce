import React from 'react'
import Typewriter from 'typewriter-effect'

const TypeWritterEffect = ({arrayOfText}) =>(
    <Typewriter
        options={{
            strings:arrayOfText,
            autoStart:true,
            loop:true
        }}
    />
)

export default TypeWritterEffect