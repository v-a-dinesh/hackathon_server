const OpportunityOperations = require('../../operations/opportunityoperations');

exports.updateOpportunityData = async (req) => {
    if(!req.body.criteria && !req.body.updatedInfo){
        return {
            status:"error",
            message:"error while updating data, criteria and updatedInfo are required",
        }
    }
    const criteria = req.body.criteria
    const updatedInfo = {
        ...req.body.updatedInfo,
        $set: {
            ...req.body.updatedInfo.$set,
            updatedAt: new Date()
        }
    }
    try {
        const opportunityData = await OpportunityOperations.updateMany(criteria, updatedInfo);
        if(opportunityData.status=="ok"){
            return {
                status:"ok",
                message:"data updated successfully",
                data:opportunityData.data
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
            message: error.message || "Error while updating opportunity data",
            data: null
        };
    }
};