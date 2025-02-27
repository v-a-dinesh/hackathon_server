const OpportunityOperations = require('../../operations/opportunityoperations');

exports.getOpportunityData = async (req) => {
    if(!req.body.criteria && !req.body.projection){
        return {
            status:"error",
            message:"there is no criteria",
        }
    }
    const criteria = req.body.criteria
    const projection = req.body.projection
    try {
        const opportunityData = await OpportunityOperations.find(criteria, projection);
        if(opportunityData.status=="ok"){
            return {
                status:"ok",
                message:"data get successfully",
                data:opportunityData.data
            }
        }
        else{
            return {
                status:"error",
                message:"error while fetching data",
            }
        }

    } catch (error) {
        return {
            status: "error",
            message: error.message || "Error while fetching opportunity data",
            data: null
        };
    }
};