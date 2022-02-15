import React, { useState, useEffect } from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';

import { listAuthors } from '../../services/authors';

function AuthorDropdown({ value, onChange }) {
    const [authors, setAuthors] = useState([]);
    const [dropdownValue, setDropdownValue] = useState('');
    
    useEffect(() => {
        const fetchAuthors = async () => {
            const data = await listAuthors();
            const result = data.map(author => {
                return {
                    id: author.id,
                    name: author.firstName.concat(' ', author.lastName)
                }
            });
            result.unshift({ id: 0, name: 'No author' });
            setAuthors(result);
            
            const d = result.find(item => {
                return item.id === value
            });
            d?.name && setDropdownValue(d.name);
        };

        fetchAuthors();
    }, [value, dropdownValue]);

    return (
        <div className="RegionDropdown">
            <DropdownList
                value={dropdownValue}
                dataKey='id'
                valueField='id'
                textField='name'
                data={authors}
                onChange={ onChange }
            />
        </div>
    );
}

export default AuthorDropdown;
