import React from 'react';
import {Edit, SimpleForm, TextInput} from 'react-admin';

const CategoryEdit = (props) => {
    return(
        <Edit {...props}>
            <SimpleForm>
                <TextInput source="title"/>
            </SimpleForm>
        </Edit>
    );
};

export default CategoryEdit;