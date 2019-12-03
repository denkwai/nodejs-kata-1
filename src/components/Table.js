import React, { useState } from 'react';

import './styles.css';
import { getAllFields } from '../utils/mergePublishingData';
import { MAP_FIELDS_TO_TITLE } from './constants';
import Row from './Row';

const Books = ({ contents, sortBy }) => {
    const [isbnSearch, setIsbnSearch] = useState('');
    const [emailSearch, setEmailSearch] = useState('');
    const [filters, setFilters] = useState({});

    const fields = getAllFields(contents);

    const contentToDisplay = filters.field
        ? contents.filter(obj => {
            if (filters.field === 'authors') {
                return obj[filters.field].find(el => el.email === filters.value);
            }

            return obj[filters.field] === filters.value;
        })
        : contents;


    if (sortBy) {
        contentToDisplay.sort((el1, el2) => el1[sortBy] > el2[sortBy]);
    }

    const headers = fields.map(field => (
        <th key={field}>
            {MAP_FIELDS_TO_TITLE[field]}
        </th>
    ));
    const rows = contentToDisplay.map((obj, i) => (
        <Row object={obj} fields={fields} key={i} />
    ));

    const clearFilters = e => {
        e.preventDefault();

        setIsbnSearch('');
        setEmailSearch('');
        setFilters({});
    }
    
    const filterIsbn = e => {
        e.preventDefault();

        setFilters({
            field: 'isbn',
            value: isbnSearch
        });
    }

    const filterAuthor = e => {
        e.preventDefault();

        setFilters({
            field: 'authors',
            value: emailSearch
        });
    };

    return (
        <table className="app-table">
            <caption className="app-table__caption">
                <form>
                    <label className="app-table__filter">
                        <input placeholder="1234-5678-9000" value={isbnSearch} onChange={(e) => setIsbnSearch(e.target.value)} />
                        <button onClick={filterIsbn}>Filter by by ISBN</button>
                    </label>

                    <label className="app-table__filter">
                        <input placeholder="example@domain.com" value={emailSearch} onChange={(e) => setEmailSearch(e.target.value)} />
                        <button onClick={filterAuthor}>Filter by author email</button>
                    </label>
                    <button onClick={clearFilters}>Clear filters</button>
                </form>
            </caption>
            <thead>
                <tr>
                    {headers}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default Books;