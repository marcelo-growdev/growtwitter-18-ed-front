import DefaultTheme from './config/theme/DefaultTheme';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <>
      <DefaultTheme>
        <AppRoutes />
        {/* <GlobalStyled /> */}
      </DefaultTheme>
    </>
  );
}

export default App;
