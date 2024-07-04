import Collection from '@/lib/models/Collection'
import Product from '@/lib/models/Product'
import { connectedToDB } from '@/lib/mongoDB'
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
	try {
		const { userId } = auth()

		if (!userId) return new NextResponse('Unauthorized', { status: 401 })

		await connectedToDB()

		const {
			title,
			description,
			media,
			category,
			collections,
			tags,
			sizes,
			colors,
			price,
			expense,
		} = await req.json()

		if (!title || !description || !media || !category || !price || !expense)
			return new NextResponse('Not enough data to create a product', {
				status: 400,
			})

		const newProduct = await Product.create({
			title,
			description,
			media,
			category,
			collections,
			tags,
			sizes,
			price,
			expense,
			colors,
		})

		await newProduct.save()

		if (collections) {
			for (const collectionId of collections) {
				const collection = await Collection.findById(collectionId)
				if (collection) {
					collection.products.push(newProduct._id)
					await collection.save()
				}
			}
		}

		return NextResponse.json(newProduct, { status: 200 })
	} catch (error) {
		console.log('[products_POST]', error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}

export const GET = async (req: NextRequest) => {
	try {
		await connectedToDB()
		const products = await Product.find()
			.sort({ createdAt: 'desc' })
			.populate({ path: 'collections', model: 'Collection' })
		return NextResponse.json(products, { status: 200 })
	} catch (error) {
		console.log('[products_GET]', error)
		return new NextResponse('Internal error', { status: 500 })
	}
}
