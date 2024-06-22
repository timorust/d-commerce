'use client'
import { Separator } from '../ui/separator'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ImageUpload from '../custom ui/ImageUpload'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

const formSchema = z.object({
	title: z.string().min(2).max(50),
	description: z.string().min(2).max(500).trim(),
	image: z.string(),
})

function CollectionForm() {
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
			image: '',
		},
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true)
			const res = await fetch('/api/collections', {
				method: 'POST',
				body: JSON.stringify(values),
			})

			if (res.ok) {
				setLoading(false)
				toast.success(`Collection created successfully`)
				router.push('/collections')
			}
		} catch (error) {
			console.error('[collection_POST]', error)
			toast.error('Something went wrong! Please try again.')
		}
	}

	return (
		<div className='p-10'>
			<p className='text-heading2-bold'>Collection Form</p>
			<Separator className='bg-grey-1 mt-4 mb-7' />

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder='Title' {...field} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea placeholder='Description' {...field} rows={5} />
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='image'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Image</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value ? [field.value] : []}
										onChange={url => field.onChange(url)}
										onRemove={() => field.onChange('')}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex gap-4'>
						<Button type='submit' className='bg-green-1 text-white'>
							Submit
						</Button>
						<Button
							type='button'
							className='bg-red-1 text-white'
							onClick={() => router.push('/collection')}
						>
							Discard
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default CollectionForm
