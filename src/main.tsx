import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { Page } from './Page'
import { PredictiveCalculatorTool } from './components/predictive-calculator-tool'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page Tool={PredictiveCalculatorTool} />
  </StrictMode>,
)
