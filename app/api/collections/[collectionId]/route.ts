import Collection from '@/lib/models/Collection'
import { connectedToDB } from '@/lib/mongoDB'
import { auth } from '@clerk/nextjs/server'
import { Connection } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

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
