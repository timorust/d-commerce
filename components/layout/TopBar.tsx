'use client'
import { navLinks } from '@/lib/constants'
import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

export default function TopBar() {
	const pathname = usePathname()

	const [dropdownMenu, setDropdownMenu] = useState(false)
	return (
		<div className='sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden'>
			<Image src='/logo.png' alt='logo' width={150} height={70} />

			<div className='flex gap-8 max-md:hidden'>
				{navLinks.map(navLink => (
					<Link
						href={navLink.url}
						key={navLink.label}
						className='flex gap-4 text-body-medium'
					>
						<p>{navLink.label}</p>
					</Link>
				))}
			</div>

			<div className='relative flex gap-4 items-center'>
				<Menu
					className='cursor-pointer md:hidden'
					onClick={() => setDropdownMenu(!dropdownMenu)}
				/>
				{dropdownMenu && (
					<div className='absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg'>
						{navLinks.map(navLink => (
							<Link
								href={navLink.url}
								key={navLink.label}
								className={`flex gap-4 text-body-medium ${
									pathname === navLink.url ? 'text-blue-1' : 'text-grey-1'
								}`}
							>
								{navLink.icon} <p>{navLink.label}</p>
							</Link>
						))}
					</div>
				)}
				<UserButton />
			</div>
		</div>
	)
}
