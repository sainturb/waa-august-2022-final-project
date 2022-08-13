import {useRef, useState} from "react";
import './react-tags.css'
function ReactTags({onAddition, onDelete, noSuggestionsText, suggestions, tags}) {
    const [found, setFound] = useState([]);
    const inputRef = useRef();
    const onChange = (event) => {
        if (event.target.value) {
            setFound(suggestions.filter(s => s.name.includes(event.target.value.toLowerCase())));
        } else {
            setFound([]);
        }
    }

    const onSelect = (tag) => {
        onAddition(tag);
        setFound([]);
        inputRef.current.value = '';
    }

    const onDeselect = (index) => {
        onDelete(index);
    }
    return (
        <div className="wrapper-tag position relative flex row bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
            {
                tags.map((tag, index) => {
                    return (
                        <div className="ml-1 mb-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 border" key={index}>
                            <span>{tag.name}</span>
                            <span className="cursor-pointer text-l ml-1 rounded-full pl-1 pr-1 bg-slate-200 dark:bg-slate-800" onClick={() => onDeselect(index)}>&times;</span>
                        </div>
                    )
                })
            }
            <input className="bg-gray-50 ml-2 input-tag" ref={inputRef} type={'text'} placeholder={'Tag'} onChange={(event) => onChange(event)}/>
            {
                found.length > 0 ? (
                    <div className="dropdown-tag bg-slate-50 rounded">
                        {
                            found.map(tag => {
                                return (
                                    <div className="rounded p-2 cursor-pointer uppercase" key={tag.id} onClick={() => onSelect(tag)}>
                                        <span>{tag.name}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : inputRef.current && inputRef.current.value.length > 0 ? ( <span>{noSuggestionsText}</span>) : ''

            }
        </div>
    )
}

export default ReactTags;