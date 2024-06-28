import Collection from '@/lib/models/Collection'
import { connectedToDB } from '@/lib/mongoDB'
import { auth } from '@clerk/nextjs/server'
import { Connection } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'
import toast from 'react-hot-toast'

export const GET = async (
	req: NextRequest,
	{ params }: { params: { collectionId: string } }
) => {
	try {
		await connectedToDB()

		const collection = await Collection.findById(params.collectionId)

		if (!collection) {
			return new NextResponse(
				JSON.stringify({ message: 'Collection not found' }),
				{ status: 404 }
			)
		}

		return NextResponse.json(collection, { status: 200 })
	} catch (error) {
		console.log('[collectionId_GET]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}

export const DELETE = async (
	req: NextRequest,
	{ params }: { params: { collectionId: string } }
) => {
	try {
		const userId = auth()

		if (!userId) return new NextResponse('Unauthorized', { status: 401 })

		await connectedToDB()

		await Collection.findByIdAndDelete(params.collectionId)

		return new NextResponse('Collection deleted successfully', { status: 200 })
	} catch (error) {
		console.log('[collectionId_DELETE]', error)
		return new NextResponse('Internal Error', { status: 500 })
	}
}
