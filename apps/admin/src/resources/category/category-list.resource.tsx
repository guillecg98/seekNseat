import React from 'react';
import {Datagrid, List, TextField} from 'react-admin';

const CategoryList = (props) => {
    return(
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField source="id"/>
                <TextField source="title"/>
            </Datagrid>
        </List>
    );
}

export default CategoryList;