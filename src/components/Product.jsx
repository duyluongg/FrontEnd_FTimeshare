import {List, Datagrid, TextField} from 'react-admin'

export const listProducts = (props) =>(

    <List {...props}>
        <Datagrid>
            <TextField source='id'/>
            <TextField source='name'/>
            <TextField source='brand'/>
            <TextField source='price'/>
        
        </Datagrid>
    </List>
)