// ۸۲۰ و ۳۸۰

import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';

function App() {
  return (
    <main className=" flex h-[724px] w-[380px]  flex-col rounded-md bg-[#f5f6fb]  shadow-md">
      <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
    </main>
  );
}

export default App;
