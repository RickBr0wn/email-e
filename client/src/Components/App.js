import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Header from './Header'

const Dashboard = () => <div className="container"><h1>Dashboard</h1></div>
const SurveyNew = () => <div className="container"><h1>SurveyNew</h1></div>
const Landing = () => <div className="container"><h1>Landing</h1></div>

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App