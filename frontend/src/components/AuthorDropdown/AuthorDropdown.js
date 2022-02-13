import React, { useState, useEffect, useMemo } from 'react';
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
            setAuthors(result);
            
            if (value > 0) {
                const d = result.find(item => {
                    return item.id === value
                });
                
                setDefaultValue(d.name);
            }
        };

        fetchAuthors();
    }, [value]);

    const dropDownListComponent = useMemo(() => {
        return value > 0 && defaultValue.length > 0 && (
            <DropdownList
                defaultValue={defaultValue}
                dataKey='id'
                valueField='id'
                textField='name'
                data={authors}
                onChange={ onChange }
            />
        )
    }, [defaultValue, authors, onChange, value]);

    return (
        <div className="RegionDropdown">
            {dropDownListComponent}
        </div>
    );
}

export default AuthorDropdown;
