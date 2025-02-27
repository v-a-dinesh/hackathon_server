//src\utils\user\userFindUtil.js


const UserOperations = require('../../operations/useroperations');
exports.getUserData = async (req) => {
    if(!req.body.criteria && !req.body.projection){
        return {
            status:"error",
            message:"error while fetching data",
        }
    }
    const criteria =req.body.criteria
    const projection =req.body.projection
    try {
        const userData = await UserOperations.find(criteria, projection);
       if(userData.status=="ok"){
        return {
            status:"ok",
            message:"data get successfully",
            data:userData.data
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
            message: error.message || "Error while fetching user data",
            data: null
        };
    }
};