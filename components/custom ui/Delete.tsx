import { Trash } from 'lucide-react'
import React from 'react'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { Button } from '../ui/button'
const Delete = () => {
	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Button className='bg-red-1 text-white'>
					<Trash className='h-4 w-4' />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className='bg-white text-grey-1'>
				<AlertDialogHeader>
					<AlertDialogTitle className='text-red-1'>
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						collections.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className='bg-grey-2 text-white'>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction className='bg-red-1 text-white'>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default Delete
