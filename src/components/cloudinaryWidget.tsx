import { CldUploadWidget } from 'next-cloudinary';

<CldUploadWidget signatureEndpoint="/api/upload">
    {({ open }) => {
        function handleOnClick(e) {
            e.preventDefault();
            open();
        }
        return (
            <button className="button" onClick={handleOnClick}>
                Upload an Image
            </button>
        );
    }}
</CldUploadWidget>