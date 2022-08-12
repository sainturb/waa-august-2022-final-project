import React, {useEffect, useState} from 'react';
import axios from "axios";
import {STATES} from "../../constants/States";
import ReactTags from "./ReactTags";
import Files from "./Files";

function CreateAdDialog({buttonText, fetch, editBody}) {
    const [body, setBody] = useState(editBody ? editBody : {
        id: null,
        title: '',
        description: '',
        benefit: '',
        state: '',
        city: '',
        company: '',
        salary: 0,
        tags: [],
        files: []
    });
    const states = STATES;
    const [tagSuggestions, setTagSuggestions] = useState([]);
    const [dialog, setDialog] = useState(false);
    const showDialog = (event) => {
        event.preventDefault();
        setDialog(true);
    }
    const hideDialog = () => {
        setDialog(false);
    }
    const onChange = (event) => {
        setBody({...body, [event.target.name]: event.target.value})
    }
    const save = (event) => {
        event.preventDefault();
        axios.post('/api/advertisements', body).then(response => {
            hideDialog();
            fetch();
        });
    }
    const fetchTagSuggestions = () => {
        axios.get('api/tags').then(response => {
            if(response.data) {
                setTagSuggestions(response.data);
            }
        });
    };

    const onAddition = (newTag) => {
        setBody({...body, tags: [...body.tags, newTag]});
    };

    const onDelete = (tagIndex) => {
        setBody({...body, tags: body.tags.filter((_, i) => i !== tagIndex)});
    };

    const onAddFiles = (file) => {
        body.files.push(file);
        setBody({...body, files: body.files});
    }

    const onRemoveFiles = (file) => {
        body.files.splice(body.files.findIndex(f => f.id === file.id), 1);
        setBody({...body, files: body.files});
    }

    useEffect(() => {
        fetchTagSuggestions();
    }, [])

    return (
        <div className="mb-2">
            <button type="button"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={(event) => showDialog(event)}>
                {buttonText}
            </button>

            {
                dialog ?
                    (
                        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity"></div>

                            <div className="fixed z-10 inset-0 overflow-y-auto">
                                <div
                                    className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                                    <div
                                        className="relative bg-white dark:bg-slate-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                        <div className="bg-white dark:bg-slate-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                            <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                                                    id="modal-title">Create Ad</h3>
                                                <div className="mt-2">
                                                    <div className="grid gap-6 mb-6 md:grid-cols-1">
                                                        <div>
                                                            <input type="text"
                                                                   value={body.title}
                                                                   name={'title'}
                                                                   onChange={(event) => onChange(event)}
                                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                   placeholder="Title" required/>
                                                        </div>
                                                        <div>
                                                            <textarea
                                                                value={body.description}
                                                                name={'description'}
                                                                onChange={(event) => onChange(event)}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder="Description">
                                                            </textarea>
                                                        </div>
                                                        <div>
                                                            <textarea
                                                                value={body.benefit}
                                                                name={'benefit'}
                                                                onChange={(event) => onChange(event)}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder="Benefits">
                                                            </textarea>
                                                        </div>
                                                        <div>
                                                            <select name={'state'}
                                                                    value={body.state}
                                                                    onChange={(event) => onChange(event)}
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                                <option>Choose the state</option>
                                                                {
                                                                    states.map(state => {
                                                                        return (
                                                                            <option key={state.name} value={state.name}>{state.name}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <input type="text"
                                                                   value={body.city}
                                                                   name={'city'}
                                                                   onChange={(event) => onChange(event)}
                                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                   placeholder="City" required/>
                                                        </div>
                                                        <div>
                                                            <input type="text"
                                                                   value={body.company}
                                                                   name={'company'}
                                                                   onChange={(event) => onChange(event)}
                                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                   placeholder="Company" required/>
                                                        </div>
                                                        <div>
                                                            <label>Salary</label>
                                                            <input type="number"
                                                                   value={body.salary}
                                                                   name={'salary'}
                                                                   onChange={(event) => onChange(event)}
                                                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                   placeholder="Salary" required/>
                                                        </div>
                                                        <div>
                                                            <ReactTags
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                tags={body.tags}
                                                                suggestions={tagSuggestions}
                                                                noSuggestionsText="No matching tags"
                                                                onAddition={onAddition}
                                                                onDelete={onDelete}
                                                            />
                                                        </div>
                                                        <div>
                                                            <Files
                                                                files={body.files}
                                                                onAdd={onAddFiles}
                                                                onRemove={onRemoveFiles}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-slate-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                            <button type="button"
                                                    onClick={(event) => save(event)}
                                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">Save
                                            </button>
                                            <button type="button"
                                                    onClick={(event) => hideDialog()}
                                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    : <></>
            }
        </div>
    )
}

export default CreateAdDialog;
