import { useRouter } from 'next/router';
import Head from 'next/Head'


export default function FilePage() {
	const router=useRouter();
	const { id } = router.query;

	if(!id){
		return(<></>);
	}

	return(
		<div className="w-screen h-screen">
				<iframe className="m-auto w-screen h-screen" src={"/api/getFile/" + id}/>
		</div>
	);
}
