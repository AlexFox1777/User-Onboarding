import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import {Form, Field, withFormik} from 'formik';
import axios from 'axios';

function UserForm({errors, touched, status}) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status]);
    return (
        <div>
            <h1>Form</h1>
            <Form>
                <Field type="text" name="name" placeholder="Name.."/>
                {touched.name && errors.name && (
                    <p>{errors.name}</p>
                )}
                <Field type="text" name="email" placeholder="Email.."/>
                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}
                <Field type="number" name="password" placeholder="Password.."/>
                {touched.password && errors.password && (
                    <p>{errors.password}</p>
                )}
                <label>
                    Terms of Service
                    <Field type="checkbox" name="terms" placeholder="Terms of Service.."/>
                </label>
                <button type="submit">Submit</button>
            </Form>

            {users.map((user, index) => (
                <p key={index}>{user.name}</p>
            ))}
        </div>

    )
}

const User = withFormik({
    mapPropsToStatus({name, email, password, terms}) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || false,
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        terms: Yup.boolean()
    }),

    handleSubmit(values, {setStatus}) {
        axios
            .post('https://reqres.in/api/users/', values)
            .then(res => {
               setStatus(res.data)
            })
            .catch(err => console.log(err.response));
    }
})(UserForm);

export default User;