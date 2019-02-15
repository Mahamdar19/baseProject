


const success = (message,data,status,res)=>{

	let successObject = {}
	successObject.message = message
	successObject.code = status
	successObject.record = data

    res.status(200).json(successObject)
}

const error = (message,data,status,res) =>{

	let errorObject = {}
	errorObject.message = message
	errorObject.code = status
	errorObject.record = []
	
    res.status(status).json(errorObject)

}

module.exports = {
success,
error
}