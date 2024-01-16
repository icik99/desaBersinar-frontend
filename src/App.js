import { Route, Routes } from 'react-router-dom';
import './App.css';
import FieldMap from './components/FieldMap';
import Dashboard from './pages/Dashboard';
import LaporForm from './pages/LaporForm';
import LoginAdmin from './pages/LoginAdmin';
import { Toaster } from 'react-hot-toast';
import Admin from './pages/Admin';
import Relawan from './pages/Relawan';
import DaerahRawanNarkoba from './pages/DaerahRawanNarkoba';
import Responden from './pages/Responden';
import Kuesioner from './pages/Kuesioner';
import KuesionerType from './pages/KuesionerType';
import DetailDaerah from './pages/DetailDaerah';

function App() {
  return (
    <div className='font-Poppins'>

      <Toaster
          position="top-center"
          reverseOrder={true}
      />

      <Routes>
        <Route name='LoginAdmin' path="/" element={<LoginAdmin/>}/>
        <Route name='Dashboard' path="/dashboard" element={<Dashboard/>}/>
        <Route name='DaerahRawanNarkoba' path="/daerah-rawan-narkoba" element={<DaerahRawanNarkoba/>}/>
        <Route name='DetailDaerah' path="/daerah-rawan-narkoba/detail-daerah" element={<DetailDaerah />}/>
        <Route name='LaporForm' path="/form-lapor" element={<LaporForm/>}/>
        <Route name='Admin' path="/admin" element={<Admin/>}/>
        <Route name='Relawan' path="/relawan" element={<Relawan/>}/>
        <Route name='Responden' path="/responden" element={<Responden/>}/>
        <Route name='Kuesioner' path="/kuesioner" element={<Kuesioner/>}/>
        <Route name='KuesionerType' path="/kuesionerType" element={<KuesionerType />}/>
      </Routes>
    </div>
  );
}

export default App;
