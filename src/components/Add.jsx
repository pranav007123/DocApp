import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, Modal, TextField } from '@mui/material';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../fireBaseConfiq';
import { useNavigate } from 'react-router-dom';
function Add() {

  const [open, setOpen] = useState(false);
  const [allDocs, setAllDocs] = useState([]);
  const [docTitle, setDocTitle] = useState('');
  const [reload, setReload] = useState('');
  const navigate = useNavigate();

  const docsCollectionRef = collection(db, 'notes');

  // Fetch data from db
  const getAllDocs = async () => {
      const docsData = await getDocs(docsCollectionRef);
      const data = docsData.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
      }));
      setAllDocs(data);
  };

  useEffect(() => {
      getAllDocs();
  }, [reload]);

  const postData = async () => {
      await addDoc(docsCollectionRef, {
          title: docTitle,
          description: ''
      });
      setReload(Date.now()); // Trigger a reload by changing the state
  };

  const deleteDocs = async (id) => {
      await deleteDoc(doc(db, 'notes', id));
      setReload(Date.now()); // Trigger a reload by changing the state
  };

  const handleEdit = data => {
      navigate('/card', { state: data });
  };

  const handleOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleChange = e => {
      setDocTitle(e.target.value);
  };

  const handleAdd = () => {
      postData();
      alert(`Document ${docTitle} added successfully`);
      setDocTitle('');
      setOpen(false);
  };
  return (
    <>
    
 
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button onClick={handleOpen} variant="contained">
                    Add Document
                </Button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        p: 4,
                        width: 400,
                        maxWidth: '90%'
                    }}
                >
                    <form onSubmit={handleAdd}>
                        <TextField
                            id="outlined-basic"
                            label="Title"
                            variant="outlined"
                            onChange={e => handleChange(e)}
                            value={docTitle}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ padding: '15px', marginLeft: '20px' }}
                        >
                            Add
                        </Button>
                    </form>
                </Box>
            </Modal>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {
                allDocs.map(note => (
                    <Card key={note.id} sx={{ minWidth: 275, maxWidth: 500, margin: '10px' }} style={{borderColor:'red'}}>
                        <CardContent>
                            <h3>{note.title}</h3>
                            <p style={{textAlign:'justify'}} className='px-3'>{note.description.replace(/<[^>]+>/g, '')}</p>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => handleEdit(note)} size="small"><i class="fa-solid fa-pen-to-square"></i>Edit</Button>
                            <Button onClick={() => deleteDocs(note.id)} size="small"><i class="fa-solid fa-trash"></i>Delete</Button>
                          
                        </CardActions>
                    </Card>
                ))}
            </div>
            
    </>
  )
}

export default Add