'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { columns } from '@/components/products/ProductColumns'
import { DataTable } from '@/components/custom ui/DataTable'
import Loader from '@/components/custom ui/Loader'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const Products = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [products, setProducts] = useState<ProductType[]>([])

	const getProducts = async () => {
		try {
			const res = await fetch('/api/products', {
				method: 'GET',
			})

			const data = await res.json()

			setProducts(data)
			setLoading(false)
		} catch (error) {
			console.log('[products_GET]', error)
		}
	}

	useEffect(() => {
		getProducts()
	}, [])

	return loading ? (
		<Loader />
	) : (
		<div className='px-10 py-5'>
			<div className='flex items-center justify-between'>
				<p className='text-heading2-bold'>Products</p>

				<Button
					className='bg-yellow-1 text-white'
					onClick={() => router.push('/products/new')}
				>
					<Plus className='h-4 w-4 mr-2' />
					Create Product
				</Button>
			</div>
			<Separator className='bg-grey-1 my-4' />
			<DataTable columns={columns} data={products} searchKey='title' />
		</div>
	)
}

export default Products
