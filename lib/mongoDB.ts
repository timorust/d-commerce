import mongoose from 'mongoose'

let isConnected: boolean = false

export const connectedToDB = async (): Promise<void> => {
	mongoose.set('strictQuery', true)

	if (isConnected) {
		console.log('Connect to database')
		return
	}

	try {
		await mongoose.connect(process.env.MONGODB_URL || '', {
			dbName: 'Decommerce_Admin',
		})
	} catch (error) {
		console.log(error)
	}
}
