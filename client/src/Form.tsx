import React from "react";

interface Props {}

const Form = (props: Props) => {
	return (
		<div>
			<form
				action='http://localhost:5000/file'
				encType='multipart/form-data'
				method='post'
			>
				<div className='form-group'>
					<input
						type='file'
						className='form-control-file'
						name='uploaded_file'
					/>
					<input
						type='text'
						className='form-control'
						placeholder='Number of speakers'
						name='nspeakers'
					/>
					<input
						type='submit'
						value='Get me the stats!'
						className='btn btn-default'
					/>
				</div>
			</form>
		</div>
	);
};

export default Form;
