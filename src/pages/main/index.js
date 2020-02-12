import React from 'react'
import SearchTab from 'components/searchTab'
import EditTab from 'components/editTab'
import ViewTab from 'components/viewTab'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import useMediaQuery from '@material-ui/core/useMediaQuery'

function getSteps() {
    return ['Search address', 'Edit address structure', 'You object!']
}

function getStepsContent(activeStep) {
    switch (activeStep) {
        case 0:
            return { render: props => <SearchTab {...props} />, next: true }
        case 1:
            return { render: props => <EditTab {...props} />, back: true }
        case 2:
            return { render: props => <ViewTab {...props} />, back: true, reset: true }
        default:
            return { render: <div>Nothing</div> }
    }
}

export default function HorizontalLinearStepper() {
    const isMobile = useMediaQuery('(max-width: 600px)')

    const [activeStep, setActiveStep] = React.useState(0)

    const steps = getSteps()
    const stepContent = getStepsContent(activeStep)

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }

    const handleReset = () => {
        setActiveStep(0)
    }

    const content = (
        <>
            {stepContent.render({ onSubmit: handleNext })}
            <Box display="flex" width="100%" alignItems="center" justifyContent="center">
                {stepContent.reset && <Button onClick={handleReset}>Reset</Button>}
                {stepContent.back && (
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                    </Button>
                )}
                {stepContent.next && (
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        Next
                    </Button>
                )}
            </Box>
        </>
    )

    return (
        <Box width="100%">
            <Stepper activeStep={activeStep} orientation={isMobile ? 'vertical' : 'horizontal'}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        {isMobile && activeStep === index && <StepContent>{content}</StepContent>}
                    </Step>
                ))}
            </Stepper>
            {!isMobile && content}
        </Box>
    )
}
