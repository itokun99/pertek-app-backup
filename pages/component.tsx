import SelectPropertyUnit from '@components/select/SelectPropertyUnit';
import { useState } from 'react';
import ProtectedPage from '../src/template/ProtectedPage';

const Component = () => {
  const [form, setForm] = useState(null);

  const handleSelectChange = (name: string, value: any) => {
    console.info('name', name);
    console.info('value', value);
    setForm(value);
  };

  return (
    <ProtectedPage>
      {/* <SelectFamilyStatus onChange={handleSelectChange} value={form} /> */}
      <SelectPropertyUnit onChange={handleSelectChange} value={form} />
    </ProtectedPage>
  );
};

export default Component;
