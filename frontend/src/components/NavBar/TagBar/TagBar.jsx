
const TagBar =  () => {
    
    function importAll(r) {
        return r.keys().map(r);
    }
    const images = importAll(require.context('../../../assets/tags', false, /\.jpeg$/));
    <div className="tag-bar">
        {images}
    </div>
}

export default TagBar