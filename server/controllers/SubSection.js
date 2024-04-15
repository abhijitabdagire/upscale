const SubSetion = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const SubSection = require("../models/SubSection");

//create SubSection
exports.createSubSection = async(req, res)=>{
    try{
        // Data fetch from req body
        const{sectionId, title, description} = req.body;

        //Extract file/video
        const video = req.files.video;

        // console.log(req.files);

        //validation
        if(!sectionId || !title || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        //create a sub-section
        const SubSectionDetails = await SubSetion.create({
                                    title:title,
                                    // timeDuration:time,
                                    timeDuration:`${uploadDetails.duration}`,
                                    description:description,
                                    videoUrl : uploadDetails.secure_url,
        });

        console.log("Subsection Details: ", SubSectionDetails);

        //update section with this sub Section ObjectId
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                {
                                                    $push:{
                                                        subSection : SubSectionDetails._id,
                                                    }
                                                },
                                                {new:true}                                      
            ).populate("subSection");
        //return res.
        return res.status(200).json({
            success:true,
            message:"Sub-Section Created Successfully",
            data: updatedSection,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message : 'Unable to create SubSetion, please try again',
            error : error.message,
        });
    }
}

// update SubSection

exports.updateSubSection = async(req, res)=>{
    try{
        //data fetch
        const {sectionId, subSectionId, title, description} = req.body;
        const subSection = await SubSection.findById(subSectionId)

        //validation on subSection
        if(!subSection){
            return res.status(400).json({
                success:false,
                message: "subSection is NOT Found",
            });
        }

        if(title !== undefined){
            subSection.title = title;
        }

        if(description !== undefined){
            subSection.description = description;
        }

        if(req.files && req.files.video !== undefined){
            const video = req.files.video
            const videoDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }
        await subSection.save()

    
         // find updated section and return it
         const updatedSection = await Section.findById(sectionId).populate('subSection');

         console.log("Update Section ", updateSection);

        //return res
        return res.status(200).json({
            success:true,
            data: updatedSection,
            message:"SubSection update successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to update SubSection , please try again",
            error : error.message,
        });
    }
}

// Delete SubSetion

exports.deleteSubSection = async(req, res)=>{
    try{
        const { subSectionId, sectionId } = req.body
            await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                subSection: subSectionId,
                },
            }
        )
    const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

    if (!subSection) {
      return res
        .status(404)
        .json({ 
            success: false, 
            message: "SubSection not found" 
        })
    }

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )
    
    //return res.
    return res.json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete SubSection , please try again",
            error : error.message,
        });
    }
}

