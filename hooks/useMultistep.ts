import { useEffect, useState } from 'react';

type TMultistepFormStep = {
    component: React.ReactNode;
    title: string;
    subtitle?: string;
    order: number;
    isActive?: boolean;
};

type TMultistepHookProps = {
    formSteps: TMultistepFormStep[];
    options?: {
        initialStep: number;
    };
};

export const useMultistep = ({ formSteps, options }: TMultistepHookProps) => {
    let initialStep = 1;
    if (options) {
        initialStep = options.initialStep ?? 1;
    }

    const [steps, setSteps] = useState<TMultistepFormStep[]>(formSteps);
    const [currentStep, setCurrentStep] = useState(initialStep);
    let totalSteps = steps?.length;

    useEffect(() => {
        setSteps((prevState) =>
            prevState.map((step) =>
                step.order === initialStep
                    ? { ...step, isActive: true }
                    : { ...step, isActive: false }
            )
        );
    }, []);

    const gotoStep = (step: number) => {
        // if (!!totalSteps[step]) return setCurrentStep(step);
    };

    console.log('currentStep => ', currentStep);

    const nextStep = () => {
        let nextStep = currentStep + 1;

        if (nextStep > totalSteps) return;
        else {
            // if (props)
            //     setTotalSteps((prevState) => prevState?.map((step) => ({ ...step, Props: props })));
            setSteps((prevState) =>
                prevState.map((step) =>
                    step.order === nextStep
                        ? { ...step, isActive: true }
                        : { ...step, isActive: false }
                )
            );
            setCurrentStep(() => nextStep);
            return;
        }
    };

    const previousStep = () => {
        let previousStep = currentStep - 1;

        if (previousStep === 0) return;
        else {
            // if (props)
            //     setTotalSteps((prevState) => prevState?.map((step) => ({ ...step, Props: props })));
            setSteps((prevState) =>
                prevState.map((step) =>
                    step.order === previousStep
                        ? { ...step, isActive: true }
                        : { ...step, isActive: false }
                )
            );
            setCurrentStep(() => previousStep);
            return;
        }
    };

    return {
        nextStep,
        previousStep,
        gotoStep,
        activeStep: steps?.filter((step) => step?.isActive)[0],
        totalSteps,
    };
};
