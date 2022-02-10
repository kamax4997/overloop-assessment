import React, { useState, useEffect } from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';

import { listAuthors } from '../../services/authors';

function AuthorDropdown({ value, onChange }) {
    const [authors, setAuthors] = useState([]);
    const [defaultValue, setDefaultValue] = useState('');

    useEffect(() => {
        const fetchAuthors = async () => {
            const data = await listAuthors();
            const result = data.map(author => {
                return {
                    id: author.id,
                    name: author.firstName.concat(' ', author.lastName)
                }
            });

            const d = result.find(item => {
                return item.id === value
            });
            
            setAuthors(result);
            setDefaultValue(d.name);
            console.log(d.name)
        };

        fetchAuthors();
    }, []);

    return (
        <div className="RegionDropdown">
            <DropdownList
                defaultValue={defaultValue}
                dataKey='id'
                textField='name'
                data={authors}
                onChange={ onChange }
            />
        </div>
    );
}

export default AuthorDropdown;
