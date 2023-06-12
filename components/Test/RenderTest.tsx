'use client';

import { FC, useEffect, useState } from 'react';
import { Rules, Multistep } from '../';
import { ITimedTest, useTimedTest } from '../Providers/TimedTestProvider';
import { useRouter } from 'next/router';
import { useGetTestById } from '~/hooks/useTestQueryRequests';

export const RenderTest = () => {
    const { test: testState, startTest } = useTimedTest();
    const router = useRouter();
    const { data } = useGetTestById(Number(router?.query?.id));
    console.log('test data => ', data);

    const [testStatus, setTestStatus] = useState<{ status: boolean; fullName: string }>({
        status: false,
        fullName: '',
    });

    useEffect(() => {
        if (data?.test?.testSets instanceof Array) {
            let randomSet: number = Math.floor(Math.random() * data?.test.testSets.length);
            startTest({ ...data?.test, set: data?.test.testSets[randomSet] });
        }
    }, [data]);

    console.log('RenderTest test set data => ', { testState });

    return <>{!testStatus?.status ? <Rules setTestStatus={setTestStatus} /> : <Multistep />}</>;
};
