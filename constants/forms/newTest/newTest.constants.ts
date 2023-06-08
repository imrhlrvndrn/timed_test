import { TTextInput } from '~/pages/admin';

export const newTestPreData: TTextInput[] = [
    {
        id: 'test_title',
        name: 'title',
        type: 'text',
        placeholder: 'Enter test title',
        label: 'Title',
    },
    {
        id: 'test_description',
        name: 'description',
        type: 'text',
        isOptional: true,
        placeholder: 'Enter test description',
        label: 'Description',
    },
    {
        id: 'test_set',
        name: 'testsetTitle',
        type: 'text',
        placeholder: 'Enter test set title',
        label: 'Test-Set Title',
    },
];
