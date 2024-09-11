import React from 'react'
import useRoutersCustom from './hooks/useRoutersCustome'

function App() {
  const routers = useRoutersCustom();
  return (
    <div>
      {routers}
    </div>
  )
}

export default App
