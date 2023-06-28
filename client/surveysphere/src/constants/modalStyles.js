const modalStyles =  {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      padding: '20px',
      maxWidth: '400px',
      width: '100%',
      maxHeight: '80vh',
      overflowY: 'auto',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000, // Hinzufügen eines höheren zIndex-Werts
    },
  };

export default modalStyles;

