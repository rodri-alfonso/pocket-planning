interface Props {
	text: string
	onClick: () => void
	disabled?: boolean
	secondary?: boolean
	className?: string
	type?: 'button' | 'submit' | 'reset'
}

export default function Button({ onClick, text, disabled, secondary, className = '', type = 'submit' }: Props) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			type={type}
			className={` disabled:scale-100 disabled:cursor-not-allowed px-4 py-2 active:scale-95 rounded-lg transition-all font-semibold disabled:opacity-30
             ${
								secondary
									? 'border-2 border-solid border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white'
									: 'bg-gray-800 text-white'
							} 
             ${className}`}
		>
			{text}
		</button>
	)
}
