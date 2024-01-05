import { Input, Text, Button, Card, Table } from '../../components';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

interface DataProps {
    name: string;
    age: string;
    hobby: string;
}

const HomeContainer = () => {

    const [users, setUsers] = useState<DataProps[]>([]);
    const [selectedUser, setSelectedUser] = useState<DataProps>();
    const [step, setStep] = useState<number>(1);

    const handleNext = () => {
        if(step === 3) {
            return
        }
        setStep((prevState) => prevState + 1);
    }

    const handlePrevious = () => {
        if (step === 1) {
            return 
        }
        setStep((prevState) => prevState -1);
    }

    const formMik = useFormik({
        initialValues: selectedUser ?? {
            name: '',
            age: '',
            hobby: ''
        },
        onSubmit: (values, { resetForm }) => {
            // logic edit, kl selectedUser nya itu ada, cari index data itu, kemudian update data array
            setUsers([...users, values])
            resetForm()
        },
        validationSchema:yup.object({
            name: yup.string().required(),
            age: yup.string().required(),
            hobby: yup.string().required()
        }),
        enableReinitialize: true
    });

    const onDelete = (index: number) => {
        setUsers((prevState) => prevState.filter((_, dataIndex) => dataIndex !== index))
    }

    const onEdit = (index: number) => {
        const findUser = users.find((_, dataIndex) => dataIndex === index);

        setSelectedUser(findUser);
        // formMik.setFieldValue('name', selectedUser?.name)
        // formMik.setFieldValue('age', selectedUser?.age)
        // formMik.setFieldValue('hobby', selectedUser?.hobby)
    }

    const handleInsertToken = () => {
        localStorage.setItem('token', 'aksjsjjdjfajfbah')
    }

    return (
        <Card border={false} className={'flex flex-col gap-2.5'}>

            <Card border>
            <form onSubmit={formMik.handleSubmit}>
                <div>
                    <Text>{'Nama'}</Text>
                    <Input className="block border-neutral-400 border"
                         name={'name'}
                         value={formMik.values.name}
                         onChange={formMik.handleChange('name')}
                         />
                         {
                            formMik.errors.name && (
                                <Text>{formMik.errors.name}</Text>
                            )
                         }
                </div>
                <div>
                    <Text>{'Umur'}</Text>
                    <Input className="block border-neutral-400 border"
                         name={'age'}
                         value={formMik.values.age}
                         onChange={formMik.handleChange('age')}
                         />
                         {
                            formMik.errors.age && (
                                <Text>{formMik.errors.age}</Text>
                            )
                         }
                </div>
                <div className='my-4'>
                    <Text>{'Hobi'}</Text>
                    <Input className="block border-neutral-400 border"
                         name={'hobby'}
                         value={formMik.values.hobby}
                         onChange={formMik.handleChange('hobby')}
                         />
                         {
                            formMik.errors.hobby && (
                                <Text>{formMik.errors.hobby}</Text>
                            )
                         }
                </div>
                <Button label={'Submit'} type={'submit'} className={'bg-green-500'}/>
            </form>   
        </Card>
        <Card border>
            <Table headers={[
                {
                    label: 'Name',
                    key: 'name'
                },
                {
                    label: 'Umur',
                    key: 'age'
                },
                {
                    label: 'Hobi',
                    key: 'hobby'
                }
            ]} data={users}
            onEdit={onEdit}
            onDelete={onDelete}/>
        </Card>
        <Card border>
            {step === 1 && (
                <div>
                    A
                </div>
            )}
            
            {step === 2 && (
                <div>
                    B
                </div>
            )}
            
            {step === 3 && (
                <div>
                    C
                </div>
            )}
            <Button label={'Previous'} onClick={handlePrevious} type={'button'} className={'bg-green-500'}/>
            <Button label={'Next'} onClick={handleNext} type={'button'} className={'bg-green-500'}/>

        </Card>
        <Card border>
            <Button label='Login' onClick={handleInsertToken}/>

        </Card>
    </Card>
        
    )
}

export default HomeContainer