const ClubOperations = require('../../operations/cluboperations');

exports.getClubData = async (req) => {
    if(!req.body.criteria && !req.body.projection){
        return {
            status:"error",
            message:"there is no criteria",
        }
    }
    const criteria = req.body.criteria
    const projection = req.body.projection
    try {
        const clubData = await ClubOperations.find(criteria, projection);
        if(clubData.status=="ok"){
            return {
                status:"ok",
                message:"data get successfully",
                data:clubData.data
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
            message: error.message || "Error while fetching club data",
            data: null
        };
    }
};