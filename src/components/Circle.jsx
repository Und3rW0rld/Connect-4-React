export const Circle = ({turn, updateBoard, index}) => {
    const className = `circle ${turn ? 'circle-'+turn : ''}`
    const handleClick = () => {
    updateBoard(index);
    }
    return (
        <div onClick={handleClick} className={className}>
        </div>
    )
}