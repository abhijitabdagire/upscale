import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from '../HomePage/Button'
import { FaArrowRight } from 'react-icons/fa'
const InstructorSection = () => {
  return (
    <div className='mt-20'>
      <div className='flex flex-col lg:flex-row gap-20 items-center'>

        <div className='lg:w-[50%]'>
            <img src={Instructor} 
            alt="InstructorImg"
            className='shadow-white shadow-[-16px_-16px_0_0]'
            />
        </div>

        <div className='lg:w-[50%] flex gap-10 flex-col'>
            <div className='lg:w-[50%] text-4xl font-semibold'>
                Become an
                <HighlightText text={"Instructor"}></HighlightText>

            </div>
            <p className='font-medium text-[16px] text-justify w-[90%] text-richblack-300'>
                Instructors from around the world teach millions of students on Upscale. We provide the tools and skills to teach what you love.  
            </p>

           <div className='w-fit'>
           <CTAButton active={true} linkto={"/signup"}>
                <div className='flex flex-row gap-3 items-center'>
                    Start Teaching Today
                    <FaArrowRight></FaArrowRight>
                </div>
            </CTAButton>
           </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorSection
