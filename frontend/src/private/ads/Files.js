import React from "react";
import axios from "axios";

function Files({files, onAdd, onRemove}) {

    const upload = (event) => {
        const currentFiles = event.target.files;
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'multipart/form-data',
            },
        };
        // cannot exceed from 5
        const size = (5 - files.length) < currentFiles.length ? 5 - files.length : currentFiles.length;
        if (files.length === 5) {
            alert('Maximum number of files that you can upload is 5. ')
        }
        for (let i = 0; i < size; i++) {
            const formData = new FormData();
            formData.set('file', currentFiles[i]);
            axios.post('/api/upload', formData, config).then((response) => {
                onAdd(response.data);
            })
        }
    }

    const unload = (file) => {
        axios.delete('/api/delete/' + file.id).then(() => {
            onRemove(file);
        })
    }

    return (
        <>
            <div className="mb-2">
                <label htmlFor={"upload"}>Upload files</label>
                <input id={"upload"}
                       type={"file"}
                       multiple={true}
                       hidden={true}
                       onChange={(event) => upload(event)}
                />
            </div>
            <div className="inline-flex row">
                {
                    files.map(file => {
                        return (
                            <div key={'file' + file.id} className="relative"
                                 style={{maxHeight: 64, maxWidth: 64, marginRight: 4, overflow: 'hidden'}}>
                                <img width={64} height={64}
                                     style={{objectFit: 'cover', maxHeight: 64, maxWidth: 64}}
                                     src={'http://localhost:8080/api/download/' + file.id + '?access_token=' + localStorage.getItem('access_token')}
                                     alt={file.name}/>
                                <span
                                    className="absolute"
                                    style={{
                                        cursor: 'pointer',
                                        width: 16,
                                        height: 16,
                                        borderRadius: 8,
                                        minHeight: 16,
                                        minWidth: 16,
                                        paddingBottom: 2,
                                        top: 5,
                                        right: 5,
                                        backgroundColor: 'gray',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    onClick={(event) => unload(file)}>&times;</span>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Files;