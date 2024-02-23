const Header = () => {
    //TODO: rewrite this in tailwind css
    return (
      <>
        <style>
          {`
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); }
            }
          `}
        </style>
        <header style={headerStyle}>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia"/>
          <h1>Watch together</h1>
          <div style={textWithImageStyle}>
            <p style={pStyle}>...or miss the moment</p>
            <img src="/heart.svg" style={imageStyle} alt="heart" />
          </div>
        </header>
      </>
    );
  };
  
  const headerStyle: React.CSSProperties = {
    backgroundColor: '#000000',
    color: 'white',
    textAlign: 'center',
    padding: '30px 0',
    fontSize: '30px',
    borderBottom: '3px solid #c76c6c', 
    fontWeight: 'bold',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
  };
  
  const textWithImageStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', 
    left: '100px', 
  };
  
  const pStyle: React.CSSProperties = {
    fontSize: '10px',
    fontFamily: 'Sofia, sans-serif',
    margin: 0,
    marginRight: '10px'
  };
  
  const imageStyle: React.CSSProperties = {
    height: '20px',
    width: 'auto',
    animation: 'pulse 2s infinite ease-in-out'
  };
  
  export default Header;
  