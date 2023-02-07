import React, { useState }  from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DatosCliente } from '../forms/formDatosCliente';
import { Container } from '@mui/system';
import { DatosPlan } from '../forms/formDescripcionPlan/DatosPlan';
import { DatosBien } from '../forms/formDescripcionBien/DatosBien';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';



const steps = ['Datos del cliente', 'Descripción del bien', 'Descripción del plan'];

export const StepperForm = () => {

  
  // Se obtiene los valores del State Global del cliente
  const { 
      cliente,
      correoCliente,
      enAtencionA,
      promotor,
      telefono,
      tipoCliente } = useSelector((stateCliente:RootState)=>stateCliente.cliente)

  // Se obtiene los valores del State Global del plan
  const {
      plazo,
      comisionApertura,
      anticipoArrendamiento,
      plan,
      tipoSeguro,
      rentasDeposito,
      tipoResidual,
      fondoReserva,
      valorResidualConvenido } = useSelector((statePlan:RootState)=>statePlan.plan)

   // Se obtiene los valores del State Global del bien
   const {
      tipoActivo,
      cantidadUnidades,
      marca,
      modelo,
      version,
      estado,
      precioActivo,
      accesorios } = useSelector((stateBien: RootState) => stateBien.bien)


    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{
      [k: number]: boolean;
    }>({});
  
    const totalSteps = () => {
      return steps.length;
    };
  
    const completedSteps = () => {
      return Object.keys(completed).length;
    };
  
    const isLastStep = () => {
      return activeStep === totalSteps() - 1;
    };
  
    const allStepsCompleted = () => {
      return completedSteps() === totalSteps();
    };
  
    const handleNext = () => {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStep = (step: number) => () => {
      setActiveStep(step);
    };
  
    const handleComplete = () => {
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      console.log('Completed: ', completed)
      console.log('new completed: ',newCompleted)
      setCompleted(newCompleted);
      handleNext();
    };
  
    const handleReset = () => {
      setActiveStep(0);
      setCompleted({});
    };
  return (
    <Box sx={{ width: '100%' }}>
      <Container sx={{ position:'relative', paddingBottom:3 }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Container>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {
              (activeStep+1)==1 ?
                <DatosCliente/> :
              (activeStep+1)==2 ?
                <DatosBien/> :
              (activeStep+1)==3 ?
                <DatosPlan/> : ''
            }
            <Container>
              {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                Step {activeStep + 1}
              </Typography> */}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                {
                  activeStep>0?
                  <Button
                    color="inherit"
                    variant='contained'
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Atrás
                  </Button>
                   : ''
                }
                <Button onClick={handleNext} variant='contained' color='success' sx={{ mr: 1 }}>
                  Siguiente
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant="caption" sx={{ display: 'inline-block' }}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete} variant='contained'>
                      {completedSteps() === totalSteps() - 1
                        ? 'Cotizar'
                        : 'Complete'}
                    </Button>
                  ))}
              </Box>
            </Container>
          </React.Fragment>
        )}
      </div>
    </Box>
  )
}
