import Collections from '@/app/(dashboard)/collections/page'
import Collection from '@/lib/models/Collection'
import Product from '@/lib/models/Product'
import { connectedToDB } from '@/lib/mongoDB'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
	req: NextRequest,
	{ params }: { params: { productId: string } }
) => {
	try {
		await connectedToDB()

		const product = await Product.findById(params.productId).populate({
			path: 'collections',
			model: Collection,
		})

		if (!product) {
			return new NextResponse(
				JSON.stringify({ message: 'Product not found' }),
				{ status: 404 }
			)
		}
		return new NextResponse(JSON.stringify(product), {
			status: 200,
		})
	} catch (err) {
		console.log('[productId_GET]', err)
		return new NextResponse('Internal error', { status: 500 })
	}
}
