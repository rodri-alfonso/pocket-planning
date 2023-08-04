import Page from '@/layouts/Page'
import Input from '@/theme/Input'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useRegistration } from '@/context/planning'
import { arrayUnion, doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase-config'

interface Props {
	planningName: string
}

export default function EmptyStateGuests({ planningName }: Props) {
	const router = useRouter()
	const planningLink = `${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`
	const { user, setRegistration } = useRegistration()

	useEffect(() => {
		if (user.name) {
			const docRef = doc(db, 'plannings', router.query.id as string)
			setDoc(docRef, { participants: arrayUnion({ name: user.name, vote: 0 }) }, { merge: true }).then(() => {
				setRegistration(user)
			})
		}
	}, [])

	function handleCopyLink() {
		navigator.clipboard.writeText(planningLink).then(() => {
			alert('copied')
		})
	}

	return (
		<Page>
			<span>{planningName}</span>
			<span>hey, maybe you have to invite guests to your planning</span>
			<Input value={planningLink} label='' placeholder='' onChange={(e) => {}} />
			<button className='bg-gray-200 p-2' onClick={handleCopyLink}>
				Copy invitation link
			</button>
		</Page>
	)
}
