const ClubOperations = require('../../operations/cluboperations');

exports.updateClubData = async (req) => {
    if(!req.body.criteria && !req.body.updatedInfo){
        return {
            status:"error",
            message:"error while updating data, criteria and updatedInfo are required",
        }
    }
    const criteria = req.body.criteria
    const updatedInfo = req.body.updatedInfo
    try {
        const clubData = await ClubOperations.updateMany(criteria, updatedInfo);
        if(clubData.status=="ok"){
            return {
                status:"ok",
                message:"data updated successfully",
                data:clubData.data
            }
        }
        else{
            return {
                status:"error",
                message:"error while updating data",
            }
        }

    } catch (error) {
        return {
            status: "error",
            message: error.message || "Error while updating club data",
            data: null
        };
    }
};