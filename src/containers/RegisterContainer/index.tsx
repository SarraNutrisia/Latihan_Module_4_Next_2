import { useSearchParams } from 'react-router-dom';
import { Input, Text, Button, Card, Table } from '../../components';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

interface DataProps {
    name: string;
    email: string;
    password: string;
}

const RegisterContainer = () => {

    const [searchParams] = useSearchParams();

    console.log(searchParams.get('queryKey'))

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
            email: '',
            password: ''
        },
        onSubmit: (values, { resetForm }) => {
            setUsers([...users, values])
            resetForm()
        },
        validationSchema:yup.object({
            name: yup.string().required(),
            email: yup.string().required(),
            password: yup.string().required()
        }),
        enableReinitialize: true
    });

    const onDelete = (index: number) => {
        setUsers((prevState) => prevState.filter((_, dataIndex) => dataIndex !== index))
    }

    const onEdit = (index: number) => {
        const findUser = users.find((_, dataIndex) => dataIndex === index);

        setSelectedUser(findUser);
    
    }

    const handleInsertToken = () => {
        localStorage.setItem('token', 'aksjsjjdjfajfbah')
    }

    return (
        <div style={{display:'flex'}} className='justify-center align-center mt-44'>
        <Card border={false} className={'flex flex-col gap-2.5'}>
            <Card border style={{ 
            width: "300px", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center" 
        }}>
            <form onSubmit={formMik.handleSubmit}>
                <div>
                    <Text>{'Name'}</Text>
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
                    <Text>{'Email'}</Text>
                    <Input className="block border-neutral-400 border"
                         name={'email'}
                         value={formMik.values.email}
                         onChange={formMik.handleChange('email')}
                         />
                         {
                            formMik.errors.email && (
                                <Text>{formMik.errors.email}</Text>
                            )
                         }
                </div>
                <div className='my-4'>
                    <Text>{'Password'}</Text>
                    <Input className="block border-neutral-400 border"
                         name={'password'}
                         value={formMik.values.password}
                         onChange={formMik.handleChange('password')}
                         />
                         {
                            formMik.errors.password && (
                                <Text>{formMik.errors.password}</Text>
                            )
                         }
                </div>
                <Button label={'Submit'} type={'submit'} className={'bg-green-500'}/>
            </form>   
        </Card>
        {/* <Card border>
            <Table headers={[
                {
                    label: 'Name',
                    key: 'name'
                },
                {
                    label: 'Email',
                    key: 'email'
                },
                {
                    label: 'Password',
                    key: 'password'
                }
            ]} data={users}
            onEdit={onEdit}
            onDelete={onDelete}/>
        </Card> */}
        {/* <Card border>
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

        </Card> */}
        {/* <Card border>
            <Button label='Login' onClick={handleInsertToken}/>

        </Card> */}
    </Card>
</div>
    )
}
       

export default RegisterContainer