// import React from 'react'
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// const PageNotFound = () => {
//    return (
//     <DotLottieReact
//       src="https://lottie.host/038e0499-40ef-4db2-a255-49fd9753f67f/2bSJFj51mc.lottie"
//       loop
//       autoplay
//     />
//   );
// };


// export default PageNotFound
import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const PageNotFound = () => {
  const handleGoHome = () => {
    window.location.href = '/home';
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '24px',
    }}>
      <DotLottieReact
        src="https://lottie.host/038e0499-40ef-4db2-a255-49fd9753f67f/2bSJFj51mc.lottie"
        loop
        autoplay
        style={{ width: '400px', height: '400px' }}
      />
      <button
        onClick={handleGoHome}
        style={{
          padding: '12px 32px',
          fontSize: '16px',
          fontWeight: '500',
          backgroundColor: '#4F46E5',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={e => e.target.style.backgroundColor = '#4338CA'}
        onMouseLeave={e => e.target.style.backgroundColor = '#4F46E5'}
      >
        ← Go to Home
      </button>
    </div>
  );
};

export default PageNotFound;
