import useImage from "./useImage"


const Image = ({ fileName, alt }) => {
    const { loading, error, image } = useImage(fileName)

    console.log(error)
    return (
        <>
        
            <img
                src={image}
                alt={alt}
            />
        </>
    )
}

export default Image