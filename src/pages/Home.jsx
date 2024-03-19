

import Add from '../components/Add'

import Card from '../components/Card'


function Home() {
    


  return (
    <>
    <div className="container" style={{alignContent:'center', textAlign:'center'}}>
        <h1>Doc App</h1>
        <Add/>
    </div>
   <Card/>
    </>
  )
}

export default Home