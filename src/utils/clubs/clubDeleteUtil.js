const ClubOperations = require('../../operations/cluboperations');

exports.deleteClubData = async (req) => {
    if(!req.body.criteria){
        return {
            status:"error",
            message:"error while deleting data, criteria is required",
        }
    }
    const criteria = req.body.criteria
    try {
        const clubData = await ClubOperations.deleteMany(criteria);
        if(clubData.status=="ok"){
            return {
                status:"ok",
                message:"data deleted successfully",
                data:clubData.data
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
            message: error.message || "Error while deleting club data",
            data: null
        };
    }
};