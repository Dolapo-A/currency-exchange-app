import Lottie from 'lottie-react'
import graphLoader from '../assets/lotties/Financial_Graph_Loader.json'

function LoadingComponent() {
    return (
        <Lottie
            animationData={graphLoader}
            loop={true}
            autoplay={true}
            className="w-80 h-80 mx-auto"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
            rendererSettings={{
                preserveAspectRatio: 'xMidYMid slice',
            }}
        />
    )
}

export default LoadingComponent
