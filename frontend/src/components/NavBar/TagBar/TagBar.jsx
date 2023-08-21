import './TagBar.css'

const TagBar =  () => {
    
    function importAll(r) {
        return r.keys().map(r);
    }
    const images = importAll(require.context('../../../assets/tags', false, /\.jpeg$/));
    const makeTagElements = () => {
        return images.map((imageUrl, i) => (
            <div className='tag-container'>
                <img src={imageUrl} alt="" />
            </div>
        ));
    }

    return (
        <div className="tag-bar">
            <div className='inner-tag-bar'>

                {makeTagElements()}
            </div>
        </div>
    )
}

export default TagBar