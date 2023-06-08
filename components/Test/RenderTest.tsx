'use client';

import { useState } from 'react';
import { Rules, Multistep } from '../';

export const RenderTest = () => {
    const [testStatus, setTestStatus] = useState<{ status: boolean; fullName: string }>({
        status: false,
        fullName: '',
    });
    return <>{!testStatus?.status ? <Rules setTestStatus={setTestStatus} /> : <Multistep />}</>;
};
