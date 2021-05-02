import React from 'react';
import {Create, SimpleForm, TextInput} from 'react-admin';

const CategoryCreate = (props) => {
    return(
        <Create {...props}>
            <SimpleForm>
                <TextInput source="title"/>
            </SimpleForm>
        </Create>
    );
};

export default CategoryCreate;