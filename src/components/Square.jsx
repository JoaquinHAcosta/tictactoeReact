const Square = ({ isSelected, children, updateBoard, index}) => {
    const className = `square ${isSelected ? 'is-selected' : '' }`
  
    const handleClick = () => {
      updateBoard(index)
    }
    return (
      <div className={className} onClick={handleClick}>
        {children}
      </div>
    )
  }

export default Square