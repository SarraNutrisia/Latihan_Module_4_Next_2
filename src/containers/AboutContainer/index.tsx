import { useSearchParams } from 'react-router-dom';

const AboutContainer = () => {

    const [searchParams] = useSearchParams();

    console.log(searchParams.get('queryKey'))

    return (
        <div>
            
            Halaman About
        </div>
    )
}

export default AboutContainer