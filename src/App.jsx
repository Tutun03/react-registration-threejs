// import React, { useState } from 'react';
// import ParticleBackground from './component/background';
// import RegistrationForm from './component/registration';

// const App = () => {
//   const [currentForm, setCurrentForm] = useState('login');

//   const switchForm = (formName) => {
//     setCurrentForm(formName);
//   };

//   return (
//     <div>
//       <ParticleBackground />
//       <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
//          (
//           < RegistrationForm onFormSwitch={switchForm} />
//         )
//       </div>
//     </div>
//   );
// };

// export default App;


import React from 'react';
import './App.css';
import ParticleBackground from './component/background';
import RegistrationForm from './component/registration';

function App() {
  const [form, setForm] = React.useState('register');

  const handleFormSwitch = (formName) => {
    setForm(formName);
  };

  return (
    <div id="root">
      <ParticleBackground />
      {form === 'register' && <RegistrationForm onFormSwitch={handleFormSwitch} />}
    </div>
  );
}

export default App;