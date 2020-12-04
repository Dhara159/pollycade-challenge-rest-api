/**
* Basic error handler to generalize try/catch block
*/
const handleError = async ({ tryFunc, ctx }) => {
	try {
		await tryFunc();
	} catch (error) {
		ctx.status = error.statusCode || error.status || 500;
		ctx.body = {
			success: false,
			message: error.message || 'Oops! Something went wrong!'
		};
	}
};

export default handleError;
