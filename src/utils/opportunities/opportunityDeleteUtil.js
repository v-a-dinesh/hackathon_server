const OpportunityOperations = require('../../operations/opportunityoperations');

exports.deleteOpportunityData = async (req) => {
    if(!req.body.criteria){
        return {
            status:"error",
            message:"error while deleting data, criteria is required",
        }
    }
    const criteria = req.body.criteria
    try {
        const opportunityData = await OpportunityOperations.deleteMany(criteria);
        if(opportunityData.status=="ok"){
            return {
                status:"ok",
                message:"data deleted successfully",
                data:opportunityData.data
            }
        }
        else{
            return {
                status:"error",
                message:"error while deleting data",
            }
        }

    } catch (error) {
        return {
            status: "error",
            message: error.message || "Error while deleting opportunity data",
            data: null
        };
    }
};